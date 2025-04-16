const swaggerDocument = {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "ChatApp API",
      description: "A ChatApp backend API dokumentációja",
    },
    host: "localhost:5001",
    basePath: "/api",
    schemes: ["http"],
    paths: {
      "/auth/signup": {
        post: {
          summary: "Felhasználó regisztráció",
          description: "Új felhasználó regisztrálása",
          parameters: [
            {
              in: "body",
              name: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["name", "email", "password"],
              },
            },
          ],
          responses: {
            201: { description: "Sikeres regisztráció" },
            400: { description: "Hibás kérés" },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Bejelentkezés",
          description: "Felhasználó bejelentkezése",
          parameters: [
            {
              in: "body",
              name: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          ],
          responses: {
            200: { description: "Sikeres bejelentkezés" },
            400: { description: "Hibás email vagy jelszó" },
            403: { description: "Felhasználó bannolva" },
          },
        },
      },
      "/auth/logout": {
        post: {
          summary: "Kijelentkezés",
          description: "Felhasználó kijelentkezése",
          responses: {
            200: { description: "Sikeres kijelentkezés" },
          },
        },
      },
      "/auth/check": {
        get: {
          summary: "Hitelesítés ellenőrzése",
          description: "Ellenőrzi, hogy a felhasználó hitelesítve van-e",
          responses: {
            200: { description: "Hitelesített felhasználó adatai" },
            401: { description: "Nem hitelesített felhasználó" },
          },
        },
      },
      "/auth/update-profile": {
        put: {
          summary: "Profil frissítése",
          description: "Felhasználói profilkép frissítése",
          parameters: [
            {
              in: "body",
              name: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  profilePic: { type: "string" },
                },
                required: ["profilePic"],
              },
            },
          ],
          responses: {
            200: { description: "Profil sikeresen frissítve" },
            400: { description: "Hibás kérés" },
          },
        },
      },
      "/auth/ban/{userId}": {
        put: {
          summary: "Felhasználó bannolása",
          description: "Egy felhasználó bannolása",
          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              type: "string",
              description: "A bannolandó felhasználó azonosítója",
            },
          ],
          responses: {
            200: { description: "Felhasználó sikeresen bannolva" },
            404: { description: "Felhasználó nem található" },
          },
        },
      },
      "/auth/unban/{userId}": {
        put: {
          summary: "Felhasználó bannolásának feloldása",
          description: "Egy felhasználó bannolásának feloldása",
          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              type: "string",
              description: "A feloldandó felhasználó azonosítója",
            },
          ],
          responses: {
            200: { description: "Felhasználó bannolása feloldva" },
            404: { description: "Felhasználó nem található" },
          },
        },
      },
      "/messages/users": {
        get: {
          summary: "Felhasználók lekérdezése",
          description: "Az összes felhasználó lekérdezése (kivéve a bejelentkezett felhasználót)",
          responses: {
            200: { description: "Felhasználók sikeresen lekérdezve" },
          },
        },
      },
      "/messages/{id}": {
        get: {
          summary: "Üzenetek lekérdezése",
          description: "Egy adott felhasználóval folytatott üzenetek lekérdezése",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              type: "string",
              description: "A felhasználó azonosítója",
            },
          ],
          responses: {
            200: { description: "Üzenetek sikeresen lekérdezve" },
            404: { description: "Felhasználó nem található" },
          },
        },
      },
      "/messages/send/{id}": {
        post: {
          summary: "Üzenet küldése",
          description: "Új üzenet küldése egy adott felhasználónak",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              type: "string",
              description: "A címzett felhasználó azonosítója",
            },
            {
              in: "body",
              name: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  image: { type: "string" },
                },
              },
            },
          ],
          responses: {
            201: { description: "Üzenet sikeresen elküldve" },
            400: { description: "Hibás kérés" },
          },
        },
      },
      "/messages/sent/{id}": {
        get: {
          summary: "Elküldött üzenetek lekérdezése",
          description: "Egy adott felhasználónak küldött üzenetek lekérdezése",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              type: "string",
              description: "A címzett felhasználó azonosítója",
            },
          ],
          responses: {
            200: { description: "Elküldött üzenetek sikeresen lekérdezve" },
          },
        },
      },
    },
  };
  
  export default swaggerDocument;