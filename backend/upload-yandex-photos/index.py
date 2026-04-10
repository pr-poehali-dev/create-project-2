"""
Получает список файлов с Яндекс Диска, сопоставляет по ключевому слову в имени файла
с позициями каталога, скачивает и сохраняет в S3. Возвращает маппинг art -> cdn_url.
"""
import os
import json
import requests
import boto3
from botocore.client import Config

PUBLIC_KEY = "https://disk.yandex.ru/d/kkGLrc6Df14ZDA"
YANDEX_LIST_API = "https://cloud-api.yandex.net/v1/disk/public/resources"
YANDEX_DL_API = "https://cloud-api.yandex.net/v1/disk/public/resources/download"

CATALOG = {
    "USM-001": "TOUA DBLAG125",
    "USM-002": "KEYANG DG-1102",
    "USM-003": "Makita GA 9020",
    "DRL-001": "AT-S",
    "DRL-002": "Diam 400",
    "CUT-001": "Concrete SAW 400",
    "CUT-002": "BHJ500",
    "CON-001": "DMR1000",
    "CON-002": "БМ-165",
    "CMP-001": "TR72",
    "CMP-002": "VS-244",
    "CMP-003": "TOR-C",
    "CMP-004": "Grost VH 85",
    "CMP-005": "VS-104",
    "CMP-006": "SVR 170",
    "CON-003": "ZKVD1500",
    "CON-004": "CV71101",
    "DRL-003": "FPB 52",
    "DRL-004": "FPB 71",
    "CUT-003": "CS146",
    "CON-005": "Zongshen",
    "PWR-001": "DY4000",
    "PWR-002": "DY6500",
    "PWR-003": "DY8000",
    "PWR-004": "BCV2200",
    "PWR-005": "PASSAT-50",
    "HGT-001": "тура 1.0",
    "HGT-002": "тура 1.2",
    "HGT-003": "Алюмет 2.2",
    "HGT-004": "Алюмет 9",
    "HGT-005": "Gigant L-03",
    "HGT-006": "СИБРТЕХ",
    "GRD-001": "LM4122",
    "GRD-002": "XME34",
    "GRD-003": "БМК-6.5",
    "GRD-004": "БМК-7.0",
    "GRD-005": "MK-7800",
    "GRD-006": "DAT 2200",
    "GRD-007": "GSC4840",
    "GRD-008": "SE1738",
    "GRD-009": "BG 225",
    "GRD-010": "Jonco 5000",
    "GRD-011": "МР300",
    "GRD-012": "Т433",
    "GRD-013": "WB 7066",
    "PMP-001": "ДН-1100",
    "PMP-002": "PG 950",
    "ELT-001": "Makita 4326",
    "ELT-002": "RH2538",
    "ELT-003": "П-1400",
    "ELT-004": "МРД-1400",
    "ELT-005": "GSH25",
    "ELT-006": "GSH65",
    "ELT-007": "GSH90",
    "ELT-008": "CS51185",
    "ELT-009": "AJG06",
    "ELT-010": "D28730",
    "ELT-011": "ПТН 210",
    "ELT-012": "ПТН 305",
    "ELT-013": "ЗШ-П30",
    "ELT-014": "ЗШ-П65",
    "ELT-015": "РЭ 110",
    "ELT-016": "Лобзик",
    "ELT-017": "ДА-13",
    "ELT-018": "1800 Нм",
    "ELT-019": "GSN50",
    "ELT-020": "PN2190",
    "ELT-021": "Aspro C3",
    "ELT-022": "ЭШМ 125",
    "ELT-023": "СО-206",
    "ELT-024": "DERZHI",
    "ELT-025": "twin-850",
    "ELT-026": "EX-16V",
    "ELT-027": "FT1241",
    "ELT-028": "АСПТ-1000",
    "ELT-029": "МЕГЕОН",
    "ELT-030": "РС-305",
    "ELT-031": "Afacan",
    "WLD-001": "OVERMAN 200",
    "WLD-002": "VARTEG 230",
    "WLD-003": "AVS-5000",
    "OTH-001": "ADA BASIS",
    "OTH-002": "GH10F",
    "OTH-003": "ТДП-20000",
    "OTH-004": "JHAVD-120",
    "OTH-005": "Champion 256",
    "OTH-006": "DACS 5820",
    "OTH-007": "TSS-95",
    "OTH-008": "кран-гусь",
    "OTH-009": "Рохля",
    "OTH-010": "W195",
    "OTH-011": "DAW 500",
    "OTH-012": "W200i",
    "OTH-013": "Vira ET12200",
    "OTH-014": "DAVC 2516",
    "OTH-015": "ASA 25",
    "OTH-016": "Домкрат",
}


def get_all_files():
    files = []
    offset = 0
    limit = 100
    while True:
        resp = requests.get(
            YANDEX_LIST_API,
            params={"public_key": PUBLIC_KEY, "limit": limit, "offset": offset, "sort": "name"},
            timeout=15
        )
        data = resp.json()
        items = data.get("_embedded", {}).get("items", [])
        for item in items:
            if item.get("type") == "file":
                files.append(item["name"])
        total = data.get("_embedded", {}).get("total", 0)
        offset += limit
        if offset >= total:
            break
    return files


def find_match(filename: str, keyword: str) -> bool:
    fname = filename.lower().replace("-", " ").replace("_", " ").replace(".", " ")
    kw = keyword.lower().replace("-", " ").replace("_", " ").replace(".", " ")
    return kw in fname


def download_and_upload(filename: str, s3_key: str, s3_client) -> str:
    resp = requests.get(
        YANDEX_DL_API,
        params={"public_key": PUBLIC_KEY, "path": f"/{filename}"},
        timeout=10
    )
    resp.raise_for_status()
    download_url = resp.json()["href"]

    img_resp = requests.get(download_url, timeout=30)
    img_resp.raise_for_status()

    ext = filename.rsplit(".", 1)[-1].lower()
    content_type = "image/jpeg" if ext in ("jpg", "jpeg") else f"image/{ext}"

    s3_client.put_object(
        Bucket="files",
        Key=s3_key,
        Body=img_resp.content,
        ContentType=content_type
    )

    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{s3_key}"


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        config=Config(signature_version="s3v4"),
    )

    all_files = get_all_files()

    results = {}
    matched = {}
    errors = {}

    for art, keyword in CATALOG.items():
        found = None
        for fname in all_files:
            if find_match(fname, keyword):
                found = fname
                break

        if not found:
            errors[art] = f"No file matching '{keyword}'"
            continue

        ext = found.rsplit(".", 1)[-1].lower()
        s3_key = f"catalog2/{art}.{ext}"

        try:
            cdn_url = download_and_upload(found, s3_key, s3)
            results[art] = cdn_url
            matched[art] = found
        except Exception as e:
            errors[art] = str(e)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "success": True,
            "uploaded": len(results),
            "results": results,
            "matched": matched,
            "errors": errors,
        }, ensure_ascii=False),
    }
