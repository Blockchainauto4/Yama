import re

with open('src/data/mockData.ts', 'r') as f:
    content = f.read()

image_mapping = {
    "Patinho": "1607623814075-e51df1bdc82f",
    "Coxão Duro": "1603048297172-c92544798d5e",
    "Contra Filé": "1558030006-450675393462",
    "Molho de Tomate": "1557499305-bd68d0ece7e4",
    "Detergente": "1584820927508-0138ff91d14c",
    "Sabão em Pó": "1610555356070-d1c8104597b8",
    "Sabonete": "1600857544200-b2f666a9a2ec",
    "Shampoo": "1629732152862-d9e2eb47bd21",
    "Açúcar": "1581441363689-1f3c3c414635",
    "Café": "1559525839-b184a4d698c7",
    "Leite em Pó": "1626082896492-766af4eb6501",
    "Achocolatado": "1618342410313-9a3d4f40f0c0",
    "Leite UHT": "1550583724-b2692b85b150",
    "Laranja": "1611080626919-7cf5a9dbab5b",
    "Batata": "1518977676601-b53f82aba655",
    "Tomate": "1592924357228-91a4daadcfea",
    "Melancia": "1587049352846-4a222e784d38",
    "Maionese": "1592534604812-706509fbe798",
    "Garrafa Térmica": "1517256064527-09c73fc73e38",
    "Papel Higiênico": "1584556812952-905ffd0c611a",
    "Pão de Forma": "1509440159596-0249088772ff",
    "Heineken": "1608270586620-248524c67de9",
    "Cerveja": "1610557892470-55d9e80c0bce"
}

# Find each product block { ... } and replace imageUrl inside it based on the name.
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

# The regex matches { up to } (non-greedy) to isolate each object
pattern = re.compile(r'\{[^{}]*name:\s*"[^"]+"[^{}]*imageUrl:\s*"[^"]+"[^{}]*\}')
new_content = pattern.sub(replace_in_block, content)

with open('src/data/mockData.ts', 'w') as f:
    f.write(new_content)
