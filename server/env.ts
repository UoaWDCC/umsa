import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { config, parse } from "dotenv";
import { readFileSync } from "node:fs";

const envPath = [new URL("./.env", import.meta.url), new URL("../.env", import.meta.url)]
  .map(path => fileURLToPath(path))
  .find(path => existsSync(path));

if (envPath) {
  config({ path: envPath, quiet: true });
  const uri = process.env.ATLAS_URI?.trim() ?? "";

  if (process.env.NODE_ENV !== "production" && !/^mongodb(\+srv)?:\/\//.test(uri)) {
    const localUri = parse(readFileSync(envPath)).ATLAS_URI?.trim();
    if (localUri && /^mongodb(\+srv)?:\/\//.test(localUri)) {
      process.env.ATLAS_URI = localUri;
      console.warn("Using ATLAS_URI from server/.env instead of an invalid inherited value.");
    }
  }
}
