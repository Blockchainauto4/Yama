import re

with open('src/components/CartManager.tsx', 'r') as f:
    content = f.read()

content = content.replace('const welcomeDiscountPercent = currentUser?.welcomeDiscountActive ? 5 : 0;',
                          'const welcomeDiscountPercent = currentUser ? (currentUser.welcomeDiscountActive ? 50 : 15) : 0;')
content = content.replace('Bônus Cadastro (5% OFF no Total):',
                          'Desconto Especial (Ouvinte Fluxo):')
content = content.replace('Ganhe 5% OFF ao Criar Sua Conta!',
                          'Ganhe 50% OFF na 1ª compra ao fazer Pre-save!')
content = content.replace('Criar Conta & Liberar 5% OFF',
                          'Fazer Pre-save & Liberar 50% OFF')
content = content.replace('// 5% Welcome discount calculation for registered accounts',
                          '// Discount calculation for registered accounts')

with open('src/components/CartManager.tsx', 'w') as f:
    f.write(content)
