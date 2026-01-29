🎵 Spotify Token Generator

⚠️ Important Legal Notice
This project is strictly for educational and research purposes only. It demonstrates how Spotify's TOTP-based authentication mechanism works by generating temporary anonymous access tokens.
It is not intended for production use or to bypass Spotify’s official API terms.


---

📖 Overview

This Node.js server illustrates how anonymous Spotify Web Player tokens can be obtained by replicating Spotify’s internal token generation process.

By reverse-engineering the API and re-implementing the TOTP verification step, this project shows how Spotify issues short-lived tokens for its Web Player.

This repo is meant to:

🔍 Study reverse-engineering techniques

⏱️ Understand TOTP (Time-based One-Time Passwords)

🌐 Learn about web API authentication flows

🛠️ Provide an educational playground for experimenting with auth systems



---

⚠️ Disclaimer

Usage of this endpoint is not permitted under:

Spotify Developer Terms of Service

Spotify Developer Policy

Applicable laws regarding unauthorized access


By using this project, you agree that:

1. You are using it for educational purposes only


2. You will not misuse it to access Spotify services improperly


3. You understand the legal and ethical implications of reverse engineering


4. You take full responsibility for how you use this code




---

npm install
npm start

---

🚀 Installation & Setup


1. **Clone the repository and install dependencies:**
  ```sh
  git clone https://github.com/CycloneAddons/spotify-token-generator.git
  cd spotify-token-generator
  npm install
  ```

2. **Start the server locally:**
  ```sh
  npm start
  ```
  The server runs on port `37353` by default.

3. **Request a token:**
  ```http
  GET http://localhost:37353/api/getToken
  ```

---

🤖 Automated Secret Updates (GitHub Actions)

This project uses a GitHub Actions workflow to keep the Spotify secrets up to date automatically:

- Every hour, the workflow runs `update.js` to fetch the latest secrets from Spotify's web player.
- If the secrets change, the workflow commits and pushes the updated JSON files to the `secrets/` directory.
- The server always uses the latest available secrets, falling back to live extraction if the GitHub source is unavailable.

**Manual update:**
You can also run `node update.js` locally to refresh the secrets and save them in the `secrets/` folder.

---

📦 Example API Response

Here’s an example of the response returned by the server (anonymous Web Player token):

```json
{
  "clientId": "d8a5ed958d274c2e8ee717e6a4b0971d",
  "accessToken": "BQBk7vI7X2WHXlxZueGDHz709AvH5fCtiduLaeOwWc2mr9ffDqKmqaJkvVjS1u9z79TQ57KdEYPFNQUxLeICgzjMTrw2Zl68x8PqMS9_XUMGe3yuJQBtsmtjBmwskP96q_mjkXa_Y9c",
  "accessTokenExpirationTimestampMs": 1757250003632,
  "isAnonymous": true,
  "_notes": "Usage of this endpoint is not permitted under the Spotify Developer Terms and Developer Policy, and applicable law"
}
```

---


🎯 Key Features

- Recreates Spotify’s hidden authentication flow
- Demonstrates TOTP-based web API security
- Reverse-engineers and documents the Web Player token process
- Automated secret updates via GitHub Actions
- Robust fallback: If GitHub secrets are unavailable, the server extracts secrets live from Spotify

---

✅ Responsible Alternatives

If you want to work with Spotify data legitimately, you should:

1. Use the official Spotify Developer API


2. Register your application properly


3. Follow their OAuth 2.0 flow


4. Respect Spotify’s terms and developer guidelines




---

📜 License

MIT License — for educational use only.


---

⚡ Note: This project is a showcase of reverse engineering skills.
It’s not meant for misuse, but it does flex how we can bypass the hidden Web Player token flow and still get a valid token response. 🚀


---
