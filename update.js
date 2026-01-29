import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractSecrets } from './getSecret.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = await extractSecrets();
if (!result.success) {
  console.error("Error:", result.message);
  process.exit(1);
}

const secretsDir = path.join(__dirname, "secrets");
if (!fs.existsSync(secretsDir)) {
  fs.mkdirSync(secretsDir, { recursive: true });
}

fs.writeFileSync(
  path.join(secretsDir, "secrets.json"),
  JSON.stringify(result.secrets, null, 2)
);
fs.writeFileSync(
  path.join(secretsDir, "secretsBytes.json"),
  JSON.stringify(result.secretsBytes)
);
fs.writeFileSync(
  path.join(secretsDir, "secretDict.json"),
  JSON.stringify(result.secretsDict)
);

console.log("Secrets saved to secrets folder");