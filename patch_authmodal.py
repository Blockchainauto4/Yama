with open('src/components/AuthModal.tsx', 'r') as f:
    content = f.read()

content = content.replace('Preços Bloqueados!', 'Desbloqueie 50% OFF!')
content = content.replace(
    'Para liberar a visibilidade de todos os preços e ofertas, acesse o link abaixo e ouça o melhor do Sertanejo e do Funk!',
    'Faça o pre-save da música Dona do meu passo, o melhor do Sertanejo com o Fluxo, e ganhe 50% de desconto na sua primeira compra e 15% em todas as próximas!'
)
content = content.replace('Álbum: O Traço e a Tinta', 'Música: Dona do meu passo')
content = content.replace('Artista: Fluxo</p>', 'Artista: Fluxo (Sertanejo)</p>')
content = content.replace('Ouvir no Spotify & Liberar Preços', 'Fazer Pre-save & Liberar 50% OFF')
content = content.replace(
    'Ao clicar, você será redirecionado para o Spotify e os preços do Yammá serão desbloqueados automaticamente.',
    'Ao clicar, você será redirecionado para fazer o pre-save e os preços do Yammá serão desbloqueados com 50% de desconto.'
)

with open('src/components/AuthModal.tsx', 'w') as f:
    f.write(content)
