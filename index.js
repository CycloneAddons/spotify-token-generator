import express from 'express';
import axios from 'axios';
import crypto from 'crypto';

const app = express();
const PORT = 37353;

const TOKEN_URL = 'https://open.spotify.com/api/token';
const SERVER_TIME_URL = 'https://open.spotify.com/api/server-time';

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
  Referer: 'https://open.spotify.com/',
  Origin: 'https://open.spotify.com',
};

async function fetchSecrets() {
  const secretsUrl = 'https://github.com/Thereallo1026/spotify-secrets/blob/main/secrets/secretDict.json?raw=true';
  const response = await axios.get(secretsUrl);
  const secretsData = response.data;
  
  const versions = Object.keys(secretsData).map(Number);
  const latestVersion = Math.max(...versions);
  
  return {
    version: latestVersion,
    secret: secretsData[latestVersion]
  };
}

async function getServerTimestamp() {
  const response = await axios.get(SERVER_TIME_URL);
  return response.data.serverTime;
}

const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function encodeBase32(buffer) {
  let bits = 0;
  let value = 0;
  let output = '';

  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += BASE32_CHARS[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_CHARS[(value << (5 - bits)) & 31];
  }

  return output;
}

function generateTOTP(timestampSeconds, secretArray) {
  // Transform the secret array
  const transformedSecret = secretArray.map((element, index) => 
    element ^ ((index % 33) + 9)
  );

  const joinedSecret = transformedSecret.join('');
  const hexSecret = Buffer.from(joinedSecret, 'utf8').toString('hex');
  const secretBytes = Buffer.from(hexSecret, 'hex');
  const base32Secret = encodeBase32(secretBytes);

  const timeStep = 30;
  const counter = Math.floor(timestampSeconds / timeStep);

  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));

  const hmac = crypto.createHmac('sha1', secretBytes);
  hmac.update(counterBuffer);
  const hmacResult = hmac.digest();

  const offset = hmacResult[hmacResult.length - 1] & 0xf;
  
  const code = 
    ((hmacResult[offset] & 0x7f) << 24) |
    ((hmacResult[offset + 1] & 0xff) << 16) |
    ((hmacResult[offset + 2] & 0xff) << 8) |
    (hmacResult[offset + 3] & 0xff);

  return code % 10 ** 6;
}

app.get('/api/getToken', async (req, res) => {
  try {
    const timestamp = await getServerTimestamp();
    const { version, secret } = await fetchSecrets();
    const totp = generateTOTP(timestamp, secret);

    const queryParams = {
      reason: 'init',
      productType: 'web-player',
      totp: totp.toString().padStart(6, '0'),
      totpVer: version,
      ts: timestamp,
    };

    const response = await axios.get(TOKEN_URL, {
      headers: REQUEST_HEADERS,
      params: queryParams,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorData = error.response?.data || { error: error.message };
    
    res.status(statusCode).json(errorData);
  }
});

app.listen(PORT, () => {
  console.log(`Token server listening on port ${PORT}`);
});
