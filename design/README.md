# Profile artwork

The profile uses the actual tenvell surface styles, theme tokens and Lamina fonts
from [raven-ai-esh/tenvell](https://github.com/raven-ai-esh/tenvell).
Those portable files are preserved in `vendor/tenvell`, with their MIT licence.
The artwork and copy live in `artwork.css` and `artwork.js`.

GitHub sanitizes README HTML, so the CSS is rendered to static JPEGs before
publication. The README uses standard `picture` elements to select light or dark
artwork and a separate mobile composition. Every project card is an ordinary link;
the images have descriptive alternatives for screen readers and failed loads.

For a local preview, serve this repository with any static HTTP server and open:

```text
/design/?art=hero&theme=dark&size=desktop
```

Artwork keys: `hero`, `mio`, `arv`, `tenvell`, `note-island`.
Themes: `light`, `dark`. Sizes: `desktop`, `mobile`.

Wait for fonts to load (`html[data-artwork-ready="true"]`), then capture the
`#artwork` rectangle. Export to `assets/{art}-{theme}-{size}.jpg`.
Desktop dimensions are 1200×480 for the hero and 1200×292 for project cards;
mobile dimensions are 630×660 and 630×420. There are no third-party badge or
statistics services, scheduled generators or runtime dependencies in the profile.
