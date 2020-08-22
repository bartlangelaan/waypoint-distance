import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const user = Math.ceil(Math.random() * 1000);
let event = SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

export function log(e: string) {
  event += 1;
  gtag("event", `${event.toString().padStart(6)} - ${e}`, {
    event_category: `User ${user} (v${process.env.GITHUB_RUN_NUMBER || 0})`,
  });
}

export function logStateChange(key: string, value: string) {
  log(`${key} = ${value}`);
}
