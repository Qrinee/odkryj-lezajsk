# Odkryj Leżajsk - Zbierz Miasto

Interaktywna aplikacja webowa do eksploracji zabytków miasta Leżajsk. Użytkownicy mogą odkrywać kolejne budynki wpisując kody z nakrętek wody Leżajsk.

## Funkcje

- 🏛️ **Interaktywna mapa 3D** - zbudowana przy użyciu Three.js i React Three Fiber
- 🏆 **Zbieranie budynków** - wpisz kod z nakrętki, aby odblokować kolejne zabytki
- 🎰 **Ruletka nagród** - losuj nagrody po odblokowaniu budynków
- 🌙 **Tryb nocny** - przełączaj między trybem dziennym i nocnym
- 📱 **PWA** - możliwość instalacji na urządzeniach mobilnych

## Zbudowane z

- **Next.js 14** - Framework React
- **React Three Fiber** - Biblioteka 3D dla React
- **Three.js** - Grafika 3D
- **Tailwind CSS** - Stylizacja
- **Framer Motion** - Animacje

## Wymagania

- Node.js 18.x lub nowszy
- npm lub yarn

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone <repo-url>
cd odkryj-lezajsk
```

2. Zainstaluj zależności:

```bash
npm install
# lub
yarn install
```

## Uruchomienie

### Tryb deweloperski

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000)

### Budowanie produkcyjne

```bash
npm run build
```

### Uruchomienie produkcyjne

```bash
npm start
```

## Struktura projektu

```
odkryj-lezajsk/
├── app/
│   ├── components/       # Komponenty React
│   │   ├── city3d/      # Komponenty 3D (Scene, Building, CameraController)
│   │   └── roulette/    # Komponenty ruletki
│   ├── data/           # Dane miasta (cityData.js)
│   ├── hooks/          # Custom hooks (useCityGame)
│   ├── globals.css     # Globalne style
│   ├── layout.js       # Layout aplikacji
│   └── page.js         # Główna strona
├── public/
│   ├── dworzec/        # Zdjęcia dworca
│   ├── klasztor/       # Zdjęcia klasztoru
│   ├── muzeum/         # Zdjęcia muzeum
│   ├── ratusz/         # Zdjęcia ratusza
│   └── fbx/            # Modele 3D (.fbx)
└── package.json
```

## Jak grać

1. Wpisz kod z nakrętki wody Leżajsk w polu na stronie głównej
2. Po poprawnym kodzie, budynek zostanie odblokowany na mapie 3D
3. Kliknij na budynek, aby zobaczyć szczegóły i ciekawostki
4. Po odblokowaniu wszystkich budynków weź udział w ruletce nagród

## Rozwiązywanie problemów

### Problem z cache przeglądarki

Jeśli aplikacja nie ładuje się poprawnie:

1. Otwórz DevTools (F12)
2. Idź do zakładki **Application**
3. W sekcji **Storage** kliknij **Clear site data**
4. Odśwież stronę (Ctrl+F5)

### Problem z .next

Jeśli występują błędy:

```bash
rm -rf .next
npm run dev
```

## Licencja

MIT
