# BEST AI 3.0 – Vercel telepítés iPhone-ról

Ez a projekt statikus weboldalból és Vercel Serverless Functionből áll. A Groq API-kulcs kizárólag a Vercel szerveroldali környezeti változói között van; a böngésző nem kapja meg.

## Közzététel iPhone-ról

1. A ZIP-et töltsd le és csomagold ki a Fájlok alkalmazásban.
2. Hozz létre egy GitHub-fiókot, ha még nincs.
3. Safari-ban nyisd meg a GitHubot, hozz létre egy új, **Private** repositoryt `best-ai` néven.
4. A repositoryban válaszd az **Add file → Upload files** lehetőséget, és töltsd fel a kicsomagolt projekt tartalmát úgy, hogy az `index.html` a gyökérben, az `api` mappa pedig mellette legyen. Ne a ZIP-et töltsd fel.
5. Nyisd meg a https://vercel.com oldalt, jelentkezz be GitHubbal, majd válaszd az **Add New → Project** lehetőséget.
6. Importáld a `best-ai` repositoryt, majd válaszd a **Deploy** gombot.
7. A Vercel projektben nyisd meg: **Settings → Environment Variables**.
8. Add hozzá:
   - Name: `GROQ_API_KEY`
   - Value: az új Groq API-kulcsod
   - Environment: Production (és igény szerint Preview)
9. Opcionális modellváltozó:
   - Name: `GROQ_MODEL`
   - Value: `llama-3.3-70b-versatile`
10. Mentsd el, majd menj a **Deployments** oldalra, és válaszd a legutóbbi deploymentnél a **Redeploy** lehetőséget.

Ezután a Vercel által adott `https://...vercel.app` címen megnyithatod a BEST AI-t iPhone-on.

## iPhone főképernyő
Safari-ban nyisd meg a kész Vercel címet → Megosztás → **Főképernyőhöz adás**.

## Fontos biztonság
- A korábban chatben megosztott Groq API-kulcsot vond vissza a Groq Console-ban, és készíts újat.
- Az API-kulcsot soha ne tedd az `index.html` fájlba vagy GitHubra.
- A GitHub repository maradjon Private.
- A Vercel és a Groq ingyenes keretei és feltételei változhatnak; használat előtt ellenőrizd a fiókodban elérhető limiteket.
- A projektet itt nem tudtam a te Vercel/Groq fiókoddal élesben telepíteni vagy API-kulccsal tesztelni.
