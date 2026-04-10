"""
Скачивает фото с Яндекс Диска и сохраняет в S3 хранилище проекта.
Возвращает постоянные CDN-ссылки для каждого фото.
"""
import os
import json
import requests
import boto3
from botocore.client import Config

PUBLIC_KEY = "https://disk.yandex.ru/d/kkGLrc6Df14ZDA"
YANDEX_API = "https://cloud-api.yandex.net/v1/disk/public/resources/download"

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        config=Config(signature_version='s3v4')
    )

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    results = {}
    errors = {}

    for i in range(1, 51):
        filename = f"{i}..jpg"
        s3_key = f"catalog/{i}.jpg"

        try:
            resp = requests.get(
                YANDEX_API,
                params={"public_key": PUBLIC_KEY, "path": f"/{filename}"},
                timeout=10
            )
            if resp.status_code != 200:
                errors[i] = f"Yandex API error: {resp.status_code}"
                continue

            download_url = resp.json()["href"]

            img_resp = requests.get(download_url, timeout=30)
            if img_resp.status_code != 200:
                errors[i] = f"Download error: {img_resp.status_code}"
                continue

            s3.put_object(
                Bucket='files',
                Key=s3_key,
                Body=img_resp.content,
                ContentType='image/jpeg'
            )

            cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{s3_key}"
            results[i] = cdn_url

        except Exception as e:
            errors[i] = str(e)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'uploaded': len(results),
            'results': results,
            'errors': errors
        })
    }
