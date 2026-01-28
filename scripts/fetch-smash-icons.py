#!/usr/bin/env python3
import json
import os
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import urlopen, urlretrieve

API_URL = "https://akabab.github.io/smash-ultimate-api/api/characters"
ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "assets" / "smash" / "icons"


def ensure_dir() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)


def filename_from_url(url: str) -> str:
    return os.path.basename(urlparse(url).path)


def download_icon(url: str) -> Path | None:
    filename = filename_from_url(url)
    if not filename:
        return None
    destination = ICON_DIR / filename
    if destination.exists():
        return destination
    urlretrieve(url, destination)
    return destination


def main() -> None:
    ensure_dir()
    with urlopen(API_URL) as response:
        data = json.load(response)

    downloaded = 0
    for fighter in data:
        url = fighter.get("icon") or fighter.get("image")
        if not url:
            continue
        if download_icon(url):
            downloaded += 1

    print(f"Downloaded {downloaded} icons to {ICON_DIR}")


if __name__ == "__main__":
    main()
