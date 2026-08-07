#!/usr/bin/env sh
# تحويل أصول المشهد عالية الدقّة إلى WebP داخل public/scene.
#
# لماذا؟ الأصول الأصلية PNG بحجم ~2.5MB للصورة الواحدة (14MB إجمالًا)، وهذه
# دعوة تُفتح غالبًا من واتساب على شبكة الهاتف. التحويل ينزل بالمجموع إلى
# ~1MB دون فرق مرئي على الشاشة.
#
# الاستعمال:  sh tools/convert-assets.sh <مجلد-الأصول>
# يتوقّع داخل المجلد الأسماء الأصلية للأصول الستّة.

set -e
SRC="${1:-new}"
OUT="public/scene"
mkdir -p "$OUT"

conv() { # <ملف-المصدر> <اسم-الخرج> <العرض> <الجودة>
  ffmpeg -v error -y -i "$SRC/$1" -vf "scale=$3:-1:flags=lanczos" \
    -c:v libwebp -quality "$4" -compression_level 6 "$OUT/$2"
}

# المشاهد الكاملة المعتمة (941 × 1672)
conv "main door.png"    gate-closed.webp 941 76
conv "opening door.png" gate-open.webp   941 76
conv "hill.png"         hill.webp        941 78
conv "background.png"   panel.webp       941 74

# الإطار العمودي واللوحة الأفقية: شفافيتهما جزء من التصميم — نحافظ عليها،
# ونقصّ الهامش الشفّاف حول الزخرفة حتى لا يحجز مساحةً فارغة في التخطيط.
# -pix_fmt yuva420p يُبقي قناة ألفا داخل WebP.
conv_alpha() { # <ملف-المصدر> <اسم-الخرج> <القصّ> <العرض> <الجودة>
  ffmpeg -v error -y -i "$SRC/$1" -vf "crop=$3,scale=$4:-1:flags=lanczos,format=rgba" \
    -c:v libwebp -pix_fmt yuva420p -quality "$5" -compression_level 6 "$OUT/$2"
}

conv_alpha "frame.png"  frame.webp  800:1492:110:16 820 74
conv_alpha "header.png" plaque.webp 1536:590:0:170  900 76

# خامة واحدة مقتطعة: قلب العاج الخالي من الزخرفة داخل اللوح. تُستعمل
# سطحًا لنصوص البطاقات وخامةً خفيفة على كامل لوح الدعوة — عالم واحد
# فلا حاجة إلى خامتين كما في النسخة الداكنة السابقة.
ffmpeg -v error -y -i "$SRC/background.png" \
  -vf "crop=520:760:210:560,scale=420:-1:flags=lanczos" \
  -c:v libwebp -quality 74 "$OUT/surface.webp"

ls -la "$OUT"
