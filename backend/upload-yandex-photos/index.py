"""
Скачивает файлы с Яндекс Диска по точному имени и сохраняет в S3 под именем catalog2/ART.ext.
"""
import os
import json
import requests
import boto3
from botocore.client import Config

PUBLIC_KEY = "https://disk.yandex.ru/d/kkGLrc6Df14ZDA"
YANDEX_DL_API = "https://cloud-api.yandex.net/v1/disk/public/resources/download"

MAPPING = {
    "USM-001": "Болгарка TOUA DBLAG125-1.jpg",
    "USM-002": "Болгарка (УШМ) KEYANG DG-1102C.jpg",
    "USM-003": "Болгарка Makita GA 9020.jpg",
    "DRL-001": "Установка алмазного бурения AT-S.jpg",
    "DRL-002": "Установка алмазная Diam 400.jpg",
    "DRL-003": "Мотобур FUBAG FPB 52.jpg",
    "DRL-004": "Мотобур 71.png",
    "CUT-002": "Бетонорез кольцевой.jpg",
    "CUT-003": "Резчик швов слипстоун.jpg",
    "CON-001": "Машина затирочная (вертолёт) TSS DMR1000L.jpg",
    "CON-002": "Бетономешалка.jpg",
    "CON-003": "Портативный вибратор Zitrek.jpg",
    "CON-004": "Вибратор Sturm.jpg",
    "CON-005": "Бензиновая виброрека.jpg",
    "CMP-006": "Виброплита риверсивная.jpg",
    "GRD-001": "Газонокосилка Chempion.jpg",
    "GRD-007": "Скарификатор бензиновый Champion GSC4840.jpg",
    "GRD-008": "Скарификатор электрический Sturm SE1738.jpg",
    "GRD-009": "Воздуходув-пылесос бензиновый PATRIOT BG 225.jpg",
    "GRD-010": "Садовый измельчитель Jonco 5000225.jpg",
    "GRD-011": "Садовый измельчитель Дровосек МР300.jpg",
    "HGT-001": "Вышка тура 2.7.jpg",
    "HGT-002": "Вышка-Тура 5.2.jpg",
    "PMP-001": "Дренажный насос Вихрь ДН-1100Н.jpg",
    "PMP-002": "Мотопомпа FUBAG PG 950T для грязной воды.jpg",
    "ELT-003": "Перфоратор Вихрь П-1400к SDS-Plus.jpg",
    "ELT-015": "Рубанок электрический Пульсар РЭ 110-1300.jpg",
    "ELT-016": "Лобзик электрический (ручной).jpg",
    "ELT-017": "Дрель-шуруповёрт ИНТЕРСКОЛ .jpg",
    "ELT-018": "Гайковёрт аккумуляторный 1800 Нм Makita.jpg",
    "ELT-019": "Гвоздезабивной пистолет TOUA GSN50E аккум..jpg",
    "ELT-020": "Пневматический нейлер Denzel PN2190 50–90мм.jpg",
    "ELT-023": "Паркетошлифовальная машина МИСОМ СО-206.1.jpg",
    "ELT-025": "Плиткорез ручной Diam Extra Line twin-850L.jpg",
    "ELT-028": "Аппарат для сварки ПП труб Ресанта АСПТ-1000.jpg",
    "ELT-029": "Опрессовщик МЕГЕОН 98025.jpg",
    "ELT-030": "Рейсмусовый станок ЗУБР РС-305 305мм 2000Вт.jpeg",
    "ELT-031": "Ручной станок для гибки арматуры Afacan 12PT.jpg",
    "WLD-001": "Сварочный полуавтомат Aurora PRO OVERMAN 200.jpg",
    "WLD-002": "Сварочный аппарат Foxweld VARTEG 230.jpg",
    "OTH-009": "Рохля гидравлическая 2 тонны.jpg",
    "OTH-013": "Моющий пылесос Arnica Vira ET12200 ).jpg",
    "OTH-014": "Промышленный пылесос Daewoo DAVC 2516S 25л.jpg",
    "OTH-015": "Промышленный пылесос Metabo ASA 25 L PC.jpg",
    "OTH-016": "Домкрат автомобильный ЗУБР.jpg",
}


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
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": ""}

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        config=Config(signature_version="s3v4"),
    )

    results = {}
    errors = {}

    for art, filename in MAPPING.items():
        ext = filename.rsplit(".", 1)[-1].lower()
        s3_key = f"catalog2/{art}.{ext}"
        try:
            cdn_url = download_and_upload(filename, s3_key, s3)
            results[art] = cdn_url
        except Exception as e:
            errors[art] = f"{filename}: {str(e)}"

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "uploaded": len(results), "results": results, "errors": errors}, ensure_ascii=False),
    }
