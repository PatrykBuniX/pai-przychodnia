(🇵🇱 PL)

# 👨🏻‍⚕️ Przychodnia lekarska

## 🚀 Wersja Live

Aplikacja dostępna jest online pod adresem: **_[pai-przychodnia-gorka.vercel.app](http://pai-przychodnia-gorka.vercel.app/)_**

---

## 📖 O projekcie

### Założenia (polecenie)  

Witryna powinna się składać z co najmniej **3 stron**. Pierwsza strona powinna zawierać opcję **zakładania konta i logowania**. Po założeniu konta/zalogowaniu się powinna się uruchamiać strona nr 2, na której będzie można **wybrać lekarza i godzinę wizyty**. Do wyboru powinno być **dwóch lekarzy** – pierwszy przyjmuje pacjentów **co 20 minut w godzinach 8:00 – 14:00**, drugi również **co 20 minut w godzinach 14:20 – 20:00**.

W momencie wyboru lekarza i godziny, kolejny **pacjent nie powinien mieć możliwości wyboru wizyty wcześniej zajętej przez innego pacjenta**.

Po wyborze lekarza i wizyty oraz jej zatwierdzeniu, powinniśmy być **przekierowani na stronę, która będzie nas informowała o dokonanej rezerwacji wizyty**.

W celu stworzenia witryny należy skorzystać z HTML, CSS, JavaScript/PHP, MySQL.

---

## 🛠 Zastosowane Technologie

- 🍊 Frontend:

  - [React.js](https://reactjs.org/) z frameworkiem [Next.js](https://nextjs.org/) (JavaScript)
  - [tailwindcss](https://tailwindcss.com/) - style CSS

- 🍑 Backend

  - [API Routes](https://nextjs.org/docs/api-routes/introduction) - endpointy
  - [PostgreSQL](https://www.postgresql.org/) - baza danych
  - [Prisma.js](https://www.prisma.io/) ORM - narzędzie ułatwiające komunikację z bazą danych

- ☁️ Hosting

  - aplikacja: [Vercel](https://vercel.com/) - darmowy plan
  - baza danych: [Heroku](https://www.heroku.com/) - darmowy plan

---

## 💻 Uruchomienie lokalnie (development mode):

⚠️ Uwaga!

- Aby uruchomić projekt lokalnie, wymagany jest [Node.js](https://nodejs.org/) (najlepiej v16.13.0)

Po pobraniu zawartości repozytorium (pobranie i rozpakowanie `.zip` lub `git clone`) należy będąc w roocie projektu wykonać polecenia:

- instalacja wymaganych paczek:

  ```bash
  npm install
  ```

- generowanie modeli Prismy do komunikacji z bazą danych

  ```bash
  npx prisma generate
  ```

- lokalne uruchomienie projektu na serwerze `localhost`
  ```bash
  npm run dev
  ```

Po wykonaniu poleceń aplikacja będzie **dostępna pod adresem _[http://localhost:3000](http://localhost:3000)_**.
