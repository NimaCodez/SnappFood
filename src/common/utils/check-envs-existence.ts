import { ENV_VARS } from '../envs/env-vars';

export function validateENVVariables() {
  let anyKeyMissing = false;
  Object.keys(ENV_VARS).forEach(key => {
    if (!ENV_VARS[key] || ENV_VARS[key] === undefined) {
      console.error(`environment variable ${key} is not in your .env file`);
      anyKeyMissing = true;
    }
  });
  if (anyKeyMissing) {
    throw "MISSING ENVs, CAN'T START THE SERVER";
  }
}
