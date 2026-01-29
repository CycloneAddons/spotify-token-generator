/**
 * Spotify Web Player Secrets Extractor
 * Extracts secret tokens from Spotify's web player JavaScript bundle.
 */

const SPOTIFY_URL = "https://open.spotify.com/";
const USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";
const PLAYER_JS_REGEX = /"(https:\/\/[^" ]+\/web-player\.[0-9a-f]+\.js)"/;
const SECRETS_REGEX = /\{\s*secret\s*:\s*(["'])(.*?)\1\s*,\s*version\s*:\s*(\d+)\s*\}/g;

function validateHttpStatus(status) {
  if (status < 200 || status > 299) {
    throw new Error(`HTTP request failed with status code ${status}`);
  }
}

function createFetchOptions() {
  return {
    headers: {
      "User-Agent": USER_AGENT,
    },
  };
}

async function fetchPlayerJsUrl() {
  const response = await fetch(SPOTIFY_URL, createFetchOptions());
  validateHttpStatus(response.status);

  const html = await response.text();
  const match = html.match(PLAYER_JS_REGEX);

  if (!match) {
    throw new Error("Player JS URL not found in Spotify homepage");
  }

  return match[1];
}

async function fetchPlayerJs(playerJsUrl) {
  const response = await fetch(playerJsUrl, createFetchOptions());
  validateHttpStatus(response.status);

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("javascript")) {
    throw new Error(`Invalid content type: ${contentType}`);
  }

  return response.text();
}

function extractSecretsFromSource(playerJs) {
  const secrets = [];
  let match;

  while ((match = SECRETS_REGEX.exec(playerJs)) !== null) {
    secrets.push({
      version: parseInt(match[3], 10),
      secret: match[2],
    });
  }

  return secrets;
}

function secretsToBytes(secrets) {
  return secrets.map(({ version, secret }) => ({
    version,
    secret: Array.from(secret, (char) => char.charCodeAt(0)),
  }));
}

function secretsToDict(secrets) {
  return secrets.reduce((dict, { version, secret }) => {
    dict[String(version)] = Array.from(secret, (char) => char.charCodeAt(0));
    return dict;
  }, {});
}

export async function extractSecrets() {
  try {
    const playerJsUrl = await fetchPlayerJsUrl();
    const playerJs = await fetchPlayerJs(playerJsUrl);
    const secrets = extractSecretsFromSource(playerJs);

    return {
      success: true,
      secrets: secrets,
      secretsBytes: secretsToBytes(secrets),
      secretsDict: secretsToDict(secrets)
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export function getLatestSecret(secretsDict) {
  const versions = Object.keys(secretsDict).map(Number);
  const latestVersion = Math.max(...versions);
  return {
    version: latestVersion,
    secret: secretsDict[latestVersion]
  };
}
