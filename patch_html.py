with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    '<title>Yammá | Pre-save de Dona do meu passo: Ganhe 50% OFF!</title>',
    '<title>Yammá Supermercados | Ofertas e Delivery na Zona Sul de SP</title>'
)
content = content.replace(
    '<meta name="title" content="Yammá | Pre-save de Dona do meu passo: Ganhe 50% OFF!" />',
    '<meta name="title" content="Yammá Supermercados | Ofertas e Delivery na Zona Sul de SP" />'
)
content = content.replace(
    '<meta name="description" content="Faça o pre-save da música Dona do meu passo do Fluxo e ganhe 50% de desconto na sua primeira compra no Yammá, mais 15% em todas as próximas. Compare preços e economize!" />',
    '<meta name="description" content="Economize com o Yammá Supermercados. Compare preços, aproveite nosso encarte de ofertas e peça delivery rápido na Zona Sul de São Paulo." />'
)

content = content.replace(
    '<meta property="og:title" content="Yammá | Pre-save de Dona do meu passo: Ganhe 50% OFF!" />',
    '<meta property="og:title" content="Yammá Supermercados | Ofertas e Delivery na Zona Sul de SP" />'
)
content = content.replace(
    '<meta property="og:description" content="Faça o pre-save da música Dona do meu passo do Fluxo e ganhe 50% de desconto na sua primeira compra no Yammá, mais 15% em todas as próximas." />',
    '<meta property="og:description" content="Economize com o Yammá Supermercados. Compare preços, aproveite nosso encarte de ofertas e peça delivery rápido na Zona Sul de São Paulo." />'
)
content = content.replace(
    '<meta property="twitter:title" content="Yammá | Pre-save de Dona do meu passo: Ganhe 50% OFF!" />',
    '<meta property="twitter:title" content="Yammá Supermercados | Ofertas e Delivery na Zona Sul de SP" />'
)
content = content.replace(
    '<meta property="twitter:description" content="Faça o pre-save da música Dona do meu passo do Fluxo e ganhe 50% de desconto na sua primeira compra no Yammá!" />',
    '<meta property="twitter:description" content="Economize com o Yammá Supermercados. Compare preços e peça delivery rápido na Zona Sul de São Paulo." />'
)

with open('index.html', 'w') as f:
    f.write(content)
