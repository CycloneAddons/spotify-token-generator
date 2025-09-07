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

🚀 Installation

Clone the repo and install dependencies:

npm install


---

▶️ Usage

Start the server:

npm start

By default, it runs on port 37353.

Request a token example:

GET http://localhost:37353/api/getToken


---

📦 Example Response

Here’s an example of the response returned by the server (anonymous Web Player token):

{
  "clientId": "d8a5ed958d274c2e8ee717e6a4b0971d",
  "accessToken": "BQBk7vI7X2WHXlxZueGDHz709AvH5fCtiduLaeOwWc2mr9ffDqKmqaJkvVjS1u9z79TQ57KdEYPFNQUxLeICgzjMTrw2Zl68x8PqMS9_XUMGe3yuJQBtsmtjBmwskP96q_mjkXa_Y9c",
  "accessTokenExpirationTimestampMs": 1757250003632,
  "isAnonymous": true,
  "_notes": "Usage of this endpoint is not permitted under the Spotify Developer Terms and Developer Policy, and applicable law"
}


---

🎯 Why This Project is Cool

✔️ Recreates Spotify’s hidden authentication flow
✔️ Shows how TOTP can secure web APIs
✔️ Demonstrates reverse-engineering in practice
✔️ Works as a live educational server to test against


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
