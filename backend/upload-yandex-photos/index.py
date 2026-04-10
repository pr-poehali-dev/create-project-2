"""
Скачивает новые/обновлённые файлы с Яндекс Диска и сохраняет в S3 под именем catalog2/ART.ext.
"""
import os
import json
import requests
import boto3
from botocore.client import Config

PUBLIC_KEY = "https://disk.yandex.ru/d/kkGLrc6Df14ZDA"
YANDEX_DL_API = "https://cloud-api.yandex.net/v1/disk/public/resources/download"
YANDEX_LIST_API = "https://cloud-api.yandex.net/v1/disk/public/resources"

# Точные имена файлов на диске — обновлённые и новые
MAPPING = {
    "USM-001": "Аккумуляторная болгарка (УШМ) TOUA DBLAG125-1.jpg",
    "USM-002": "Болгарка (УШМ) KEYANG DG-1102C.jpg",
    "USM-003": "Болгарка (УШМ) Makita GA 9020 SF.jpg",
    "PWR-001": "Бензиновый генератор Huter DY4000L.jpg",
}

# Дополнительно — ищем по ключевым словам для новых файлов
KEYWORDS = {
    "ELT-021": ["aspro", "шлифмашина aspro", "c3 2650"],
    "ELT-022": ["эшм 125", "шлифмашина пульсар"],
    "OTH-008": ["кран гусь", "кран-гусь", "гидравлический кран"],
}


def get_all_files():
    files = []
    offset = 0
    while True:
        resp = requests.get(YANDEX_LIST_API,
            params={"public_key": PUBLIC_KEY, "limit": 100, "offset": offset, "sort": "name"},
            timeout=15)
        data = resp.json()
        items = data.get("_embedded", {}).get("items", [])
        for item in items:
            if item.get("type") == "file":
                files.append(item["name"])
        total = data.get("_embedded", {}).get("total", 0)
        offset += 100
        if offset >= total:
            break
    return files


def find_by_keywords(files, keywords):
    for fname in files:
        fl = fname.lower()
        for kw in keywords:
            if kw.lower() in fl:
                return fname
    return None


def download_and_upload(filename, s3_key, s3_client):
    resp = requests.get(YANDEX_DL_API,
        params={"public_key": PUBLIC_KEY, "path": f"/{filename}"}, timeout=10)
    resp.raise_for_status()
    download_url = resp.json()["href"]
    img_resp = requests.get(download_url, timeout=30)
    img_resp.raise_for_status()
    ext = filename.rsplit(".", 1)[-1].lower()
    content_type = "image/jpeg" if ext in ("jpg", "jpeg") else f"image/{ext}"
    s3_client.put_object(Bucket="files", Key=s3_key, Body=img_resp.content, ContentType=content_type)
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{s3_key}"


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": ""}

    s3 = boto3.client("s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        config=Config(signature_version="s3v4"))

    all_files = get_all_files()
    results = {}
    errors = {}
    matched = {}

    # Загружаем по точным именам
    for art, filename in MAPPING.items():
        ext = filename.rsplit(".", 1)[-1].lower()
        s3_key = f"catalog2/{art}.{ext}"
        try:
            cdn_url = download_and_upload(filename, s3_key, s3)
            results[art] = cdn_url
            matched[art] = filename
        except Exception as e:
            errors[art] = f"{filename}: {str(e)}"

    # Ищем по ключевым словам
    for art, keywords in KEYWORDS.items():
        found = find_by_keywords(all_files, keywords)
        if not found:
            errors[art] = f"Not found by keywords: {keywords}"
            continue
        ext = found.rsplit(".", 1)[-1].lower()
        s3_key = f"catalog2/{art}.{ext}"
        try:
            cdn_url = download_and_upload(found, s3_key, s3)
            results[art] = cdn_url
            matched[art] = found
        except Exception as e:
            errors[art] = f"{found}: {str(e)}"

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "uploaded": len(results), "results": results, "matched": matched, "errors": errors}, ensure_ascii=False),
    }
