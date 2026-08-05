import re

with open('src/components/CartManager.tsx', 'r') as f:
    content = f.read()

content = content.replace('((clubeTotal * 5) / 100)', '((clubeTotal * 50) / 100)')
content = content.replace('Cadastre-se grátis agora para ganhar mais', 'Faça o Pre-save grátis agora para ganhar')

with open('src/components/CartManager.tsx', 'w') as f:
    f.write(content)
