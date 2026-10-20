"""Embed copyright metadata into site images without re-encoding them.

JPEG gets an EXIF block (Artist / Copyright, only if it has no EXIF yet) and a
comment segment; PNG gets tEXt chunks. Pixel data is untouched, and files that
already carry the signature are skipped, so it is safe to re-run after adding
new images:

    python tools/sign_images.py

WebP and GIF are left as they are.
"""
import struct
import sys
import zlib
from pathlib import Path

from PIL import Image

TAG = 'SV-TK-7F3A9C'
ARTIST = 'Taehui Kim (Studio Vec)'
COPYRIGHT = '(c) 2025-2026 Taehui Kim. All rights reserved. https://studiovec.com'
COMMENT = '%s Unauthorized use or AI training prohibited. [%s]' % (COPYRIGHT, TAG)

ROOT = Path(__file__).resolve().parent.parent
MARK = TAG.encode()


def exif_segment():
    exif = Image.Exif()
    exif[0x013B] = ARTIST       # Artist
    exif[0x8298] = COPYRIGHT    # Copyright
    data = exif.tobytes()
    if not data.startswith(b'Exif\x00\x00'):
        data = b'Exif\x00\x00' + data
    return b'\xff\xe1' + struct.pack('>H', len(data) + 2) + data


def com_segment():
    data = COMMENT.encode('ascii')
    return b'\xff\xfe' + struct.pack('>H', len(data) + 2) + data


def sign_jpeg(buf):
    if buf[:2] != b'\xff\xd8':
        return None
    pos, after_app0, after_apps, has_exif = 2, 2, 2, False
    while pos + 4 <= len(buf) and buf[pos] == 0xFF:
        marker = buf[pos + 1]
        if not 0xE0 <= marker <= 0xEF:
            break
        length = struct.unpack('>H', buf[pos + 2:pos + 4])[0]
        end = pos + 2 + length
        if marker == 0xE0 and pos == 2:
            after_app0 = end
        if marker == 0xE1 and buf[pos + 4:pos + 10] == b'Exif\x00\x00':
            has_exif = True
        pos = after_apps = end
    out = buf[:after_app0]
    if not has_exif:
        out += exif_segment()
    return out + buf[after_app0:after_apps] + com_segment() + buf[after_apps:]


def png_chunk(key, value):
    data = key.encode('latin-1') + b'\x00' + value.encode('latin-1')
    body = b'tEXt' + data
    return struct.pack('>I', len(data)) + body + struct.pack('>I', zlib.crc32(body))


def sign_png(buf):
    iend = buf.rfind(b'IEND')
    if buf[:8] != b'\x89PNG\r\n\x1a\n' or iend < 4:
        return None
    chunks = (png_chunk('Author', ARTIST) + png_chunk('Copyright', COPYRIGHT)
              + png_chunk('Comment', COMMENT))
    return buf[:iend - 4] + chunks + buf[iend - 4:]


def pixels(path):
    with Image.open(path) as im:
        return im.mode, im.size, im.tobytes()


def main():
    signed = skipped = 0
    for path in sorted((ROOT / 'assets').rglob('*')):
        ext = path.suffix.lower()
        if ext not in ('.jpg', '.jpeg', '.png'):
            continue
        buf = path.read_bytes()
        if MARK in buf:
            skipped += 1
            continue
        new = sign_jpeg(buf) if ext != '.png' else sign_png(buf)
        if new is None:
            print('not a valid image, left alone:', path.relative_to(ROOT))
            continue
        before = pixels(path)
        path.write_bytes(new)
        if pixels(path) != before:
            path.write_bytes(buf)
            print('pixel mismatch, restored:', path.relative_to(ROOT))
            continue
        signed += 1
    print('signed %d, already signed %d' % (signed, skipped))


if __name__ == '__main__':
    sys.exit(main())
