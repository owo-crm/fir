# Brainstorm

Portal do nauki makroekonomii (WSB Gdańsk): artykuły podzielone na podtematy, słownik pojęć z podpowiedziami, interaktywne wykresy, fiszki i testy. Język polski z tłumaczeniem na rosyjski.

- `index.html` — aplikacja (bez zależności, otwórz w przeglądarce)
- `content.js` — wykłady i podtematy
- `glossary.js` — słownik pojęć

Poprzednia zawartość repozytorium (Ritm calendar) jest w gałęzi `ritm-calendar-legacy`.

## Hosting i statystyka
Portal działa jako Cloudflare Worker (`worker.js`, pliki w `public/`). Anonimowe statystyki trafiają do bazy D1 `brainstorm-stats`; panel admina: `/admin` (hasło z sekretu `ADMIN_PASSWORD`). Wdrożenie: GitHub Action `.github/workflows/deploy.yml` przy każdym pushu do `main`.
