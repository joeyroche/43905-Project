# LandLens Indy

Off-market parcel discovery and AI development underwriting dashboard for Marion County, IN. Built with React, Vite, Tailwind CSS, and React Leaflet.

## Features

- Interactive Leaflet map of Marion County with per-parcel zoning markers
- Filterable/searchable parcel list (zoning district, minimum acreage, off-market signal count)
- Parcel detail panel with three tabs:
  - **Parcel & Signals** — ownership off-market signals and GIS constraint (floodplain/setback) deductions
  - **AI Development Engine** — capacity estimate, transparent opportunity score breakdown, comparable projects, and an editable residual land value calculator
  - **AI Analyst Chat** — simulated chat assistant that answers questions about the selected parcel
- Persistent watchlist for saving parcels of interest

## Getting started

```bash
npm install
cp .env.example .env   # add your own Mapbox token (see below)
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

### Mapbox token

The map tiles are served from Mapbox's Styles API and need a token in `.env` as `VITE_MAPBOX_TOKEN`. Get a free public token at [mapbox.com](https://account.mapbox.com/access-tokens/) and put it in `.env` (see `.env.example`). This is a client-side public token, not a secret key.

## Project structure

```
src/
  data/parcels.js          # mock parcel dataset (Marion County corridors)
  components/
    Header.jsx
    Sidebar.jsx             # search + filters + parcel list
    ParcelCard.jsx
    MapView.jsx             # Leaflet map + markers
    DetailPanel.jsx         # tabbed detail panel
    WatchlistModal.jsx
    tabs/
      OverviewTab.jsx
      AIEngineTab.jsx
      ChatTab.jsx
  App.jsx                   # top-level state (filters, selection, watchlist)
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

## Notes

All parcel, ownership, and comparable-project data is mock data seeded with real Indianapolis street corridors for demonstration purposes — it is not live GIS data.
