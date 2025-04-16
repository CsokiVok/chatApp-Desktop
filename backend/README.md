# Chat Application - Backend

Ez a chat alkalmazás backend része, amely Node.js és Express technológiákra épül. Az alkalmazás biztosítja a felhasználók kezelését, üzenetküldést, valós idejű kommunikációt és adminisztrációs funkciókat.

## Főbb funkciók

- **Felhasználói hitelesítés**: Regisztráció, bejelentkezés, kijelentkezés, és hitelesítés ellenőrzése.
- **Felhasználók kezelése**: Felhasználók listázása, bannolás és unbannolás.
- **Üzenetküldés**: Szöveges és képes üzenetek küldése és fogadása.
- **Valós idejű kommunikáció**: Socket.IO segítségével.
- **Képek tárolása**: Cloudinary integrációval.

## Technológiák

- **Node.js és Express**: A szerveroldali logika megvalósításához.
- **MongoDB**: Az adatok tárolására.
- **Socket.IO**: Valós idejű kommunikációhoz.
- **Cloudinary**: Képek tárolására.
- **JWT**: Felhasználói hitelesítéshez.


### Swagger dokumentáció
A Swagger dokumentáció elérhető a következő címen: http://localhost:5001/api-docs

## Mappastruktúra
controllers/: Az üzleti logika.
models/: Mongoose modellek.
routes/: API végpontok.
middleware/: Middleware-ek, például hitelesítés.
lib/: Segédfüggvények és konfigurációk (pl. Cloudinary, Socket.IO).