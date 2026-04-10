"""
Возвращает полный список файлов с Яндекс Диска.
"""
import json
import requests

PUBLIC_KEY = "https://disk.yandex.ru/d/kkGLrc6Df14ZDA"
YANDEX_LIST_API = "https://cloud-api.yandex.net/v1/disk/public/resources"


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": ""}

    files = []
    offset = 0
    while True:
        resp = requests.get(
            YANDEX_LIST_API,
            params={"public_key": PUBLIC_KEY, "limit": 100, "offset": offset, "sort": "name"},
            timeout=15
        )
        data = resp.json()
        items = data.get("_embedded", {}).get("items", [])
        for item in items:
            if item.get("type") == "file":
                files.append(item["name"])
        total = data.get("_embedded", {}).get("total", 0)
        offset += 100
        if offset >= total:
            break

    russian = [f for f in files if any('\u0400' <= c <= '\u04ff' for c in f)]
    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"total": len(files), "russian_count": len(russian), "russian": russian}, ensure_ascii=False)
    }