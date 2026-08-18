import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# We want to insert the Spotify iframe between the Logo and the Navigation Tabs.
spotify_iframe = """        {/* Spotify Embedded Player (Visible on Desktop when Logged In) */}
        {currentUser && (
          <div className="hidden lg:block h-[60px] w-[300px] overflow-hidden rounded-xl border border-slate-200">
            <iframe 
              src="https://open.spotify.com/embed/album/2oEU7FFDsfa3fheCfFXKoc?utm_source=generator&theme=0" 
              width="100%" 
              height="80" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              style={{ marginTop: '-10px' }}
            ></iframe>
          </div>
        )}

"""

content = content.replace(
    '{/* Mode Navigation Tabs */}',
    spotify_iframe + '        {/* Mode Navigation Tabs */}'
)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
