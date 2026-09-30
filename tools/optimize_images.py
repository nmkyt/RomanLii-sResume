"""Сжимает PNG/JPG из static/portfolio в WebP и печатает готовые теги <img>.

Запуск из корня репозитория:
    pip install pillow
    python tools/optimize_images.py

Оригиналы не удаляются — проверьте результат и удалите их сами.
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "static" / "portfolio"
MAX_WIDTH = 2400  # колонка сайта 1152px, x2 для ретина-экранов
QUALITY = 85


def main():
    sys.stdout.reconfigure(encoding="utf-8")  # консоль Windows по умолчанию не в UTF-8
    sources = sorted(p for ext in ("*.png", "*.jpg", "*.jpeg") for p in ROOT.glob(f"*/{ext}"))
    if not sources:
        print("Нечего сжимать: в static/portfolio нет PNG/JPG.")
        return

    for src in sources:
        image = Image.open(src)
        image = image.convert("RGBA" if "A" in image.getbands() or image.mode == "P" else "RGB")
        if image.width > MAX_WIDTH:
            height = round(image.height * MAX_WIDTH / image.width)
            image = image.resize((MAX_WIDTH, height), Image.LANCZOS)

        dst = src.with_suffix(".webp")
        image.save(dst, "WEBP", quality=QUALITY, method=6)

        before, after = src.stat().st_size / 1e6, dst.stat().st_size / 1e6
        rel = dst.relative_to(ROOT.parent.parent).as_posix()
        print(f"{src.name}: {before:.1f} MB -> {after:.2f} MB")
        print(f'    <img src="{rel}" width="{image.width}" height="{image.height}" '
              f'loading="lazy" decoding="async" alt="">')


if __name__ == "__main__":
    main()
