const user = Math.ceil(Math.random() * 1000);
let event = 1000000;

export function log(e: string) {
  event -= 1;
  gtag("event", `${event.toString().padStart(6, "0")} - ${e}`, {
    event_category: `User ${user} (v${process.env.GITHUB_RUN_NUMBER || 0})`,
  });
}

export function logStateChange(key: string, value: string) {
  log(`${key} = ${value}`);
}
