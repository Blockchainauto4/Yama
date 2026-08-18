import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Replace the album URI with a playlist URI to match "playlist" request, and add autoplay=1
old_iframe = 'src="https://open.spotify.com/embed/album/2oEU7FFDsfa3fheCfFXKoc?utm_source=generator&theme=0"'
new_iframe = 'src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9kKAG1x43nS?utm_source=generator&theme=0&autoplay=1"'
content = content.replace(old_iframe, new_iframe)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
