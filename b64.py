import base64
import re
import os

images = ["react2.webp", "next2.webp", "node2.webp", "express.webp", "mongo.webp", "mysql.webp", "typescript.webp", "javascript.webp"]
base64_urls = []
for img in images:
    path = os.path.join("images", img)
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
        base64_urls.append(f'"data:image/webp;base64,{b64}"')

b64_array = '[\n    ' + ',\n    '.join(base64_urls) + '\n  ]'

with open("physics_engine.js", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(
    r'const imageUrls = \[.*?\];',
    f'const imageUrls = {b64_array};',
    text,
    flags=re.DOTALL
)

with open("physics_engine.js", "w", encoding="utf-8") as f:
    f.write(text)

print("success!")
