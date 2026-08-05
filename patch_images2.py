import re

with open('src/data/mockData.ts', 'r') as f:
    content = f.read()

image_mapping = {
    "Toddynho": "1618342410313-9a3d4f40f0c0",
    "Macarrão": "1612808381896-189f7f4d2216", # Pasta
    "Cerveja": "1608270586620-248524c67de9",
}

def replace_in_block(match):
    block = match.group(0)
    name_match = re.search(r'name:\s*"([^"]+)"', block)
    if name_match:
        name = name_match.group(1)
        for key, img_id in image_mapping.items():
            if key in name:
                url = f"https://images.unsplash.com/photo-{img_id}?w=500&q=80"
                return re.sub(r'imageUrl:\s*"[^"]+"', f'imageUrl: "{url}"', block)
    return block

pattern = re.compile(r'\{[^{}]*name:\s*"[^"]+"[^{}]*imageUrl:\s*"[^"]+"[^{}]*\}')
new_content = pattern.sub(replace_in_block, content)

with open('src/data/mockData.ts', 'w') as f:
    f.write(new_content)
