# Chat Application - Electron

Ez a chat alkalmazás asztali verziója, amely az Electron keretrendszerre épül. Az alkalmazás lehetővé teszi a platformfüggetlen futtatást, és integrálja a frontend és backend részeket.

## Főbb funkciók

- **Platformfüggetlen futtatás**: Windows, macOS és Linux támogatás.
- **Frontend és backend integráció**: A React frontend és Node.js backend egyesítése.
- **Natív funkciók**: Értesítések, fájlkezelés és egyéb asztali alkalmazás-specifikus funkciók.

## Telepítés

### 1. Klónozd a repót
```bash
git clone <https://github.com/CsokiVok/chatApp-Desktop.git>
cd chatApp-Desktop
```

### 2. Telepítsd a függőségeket
Az összes részhez (frontend, backend, gyökérmappa):
```bash
npm install
```

### 3. Backemd környezeti változók beállítása
Hozz létre egy `.env` fájlt a `backend` mappában, és add meg a következő változókat:

PORT=5001
MONGODB= mongodb+srv://dudas04bence:5ysbjxQVvrrFCULa@cluster0.g7ce8.mongodb.net/chatdb?retryWrites=true&w=majority&appName=Cluster0
JWTSECRET= secret
CLOUDNARY_NAME = dbwfyovro
CLOUDNARY_APIKEY = 353439521735365
CLOUDNARY_SECRET = We__aXwhGXuHeybNCMrnqTwx3U8

### 4. Indítsd el az alkalmazást fejlesztői módban
Nem működik jól dev-ben mivel nem találja az oldalakat, buildeltben működik
```bash
npm start
```

### Build készítése
Ha kész alkalmazást szeretnél készíteni:

### 1. Frontend kibuildelés
```bash
npm run build:frontend
```

### 2. Frontend build átírása
A frontend buildelése után nyisd meg a frontend/dist/index.html fájlt, és a CSS és JS linkek elé rakj egy pontot:
<!-- Példa -->
<link href="./assets/index-BRF-9M4e.css" rel="stylesheet">
<script type="module" src="./assets/index-jqC60G9h.js"></script>

### 3. Alkalmazás buildelése
```bash
npm run pack
```

### Telepíthető alkalmazás készítése
Ha telepíthető alkalmazást szeretnél készíteni:

### 1. Frontend kibuildelés
```bash
npm run build:frontend
```

### 2. Frontend build átírása
A frontend buildelése után nyisd meg a frontend/dist/index.html fájlt, és a CSS és JS linkek elé rakj egy pontot:
<!-- Példa -->
<link href="./assets/index-BRF-9M4e.css" rel="stylesheet">
<script type="module" src="./assets/index-jqC60G9h.js"></script>


### 3. Telepítő készítése
```bash
npm run dist
```

### Mappastruktúra
main.js: Az Electron fő folyamata, amely kezeli az ablakokat és az alkalmazás életciklusát.
frontend/: A React alapú felhasználói felület.
backend/: A Node.js és Express alapú szerveroldali logika.