import { chromium, devices } from "playwright";
import { mkdir } from "fs/promises";

const args = process.argv.slice(2);
const BASE_URL = args[0] || "http://localhost:3000";
const ONLY_PROFILE = args[1] || null;
const ONLY_PAGE = args[2] || null;
const OUT_DIR = "playwright-mobile-checks";

const ALL_PROFILES = [
  "iPhone 14",
  "iPhone 14 landscape",
  "Pixel 7",
  "Pixel 7 landscape",
  "iPad Mini",
  "iPad Mini landscape",
  "iPad Pro 11",
  "iPad Pro 11 landscape",
];

const ALL_PAGES = ["/", "/contact", "/work/ai-test-failure-analyzer", "/this-page-does-not-exist"];

const profiles = ONLY_PROFILE ? [ONLY_PROFILE] : ALL_PROFILES;
const pages = ONLY_PAGE ? [ONLY_PAGE] : ALL_PAGES;

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();

for (const name of profiles) {
  const descriptor = devices[name];
  if (!descriptor) {
    console.error(`Unknown device profile: ${name}`);
    continue;
  }
  const context = await browser.newContext(descriptor);
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });

    // Scroll through the whole page first so Framer Motion's `whileInView`
    // reveal animations (see src/components/Reveal.tsx) have a chance to
    // fire for every below-the-fold section, then return to the top before
    // capturing — otherwise fullPage screenshots can show blank gaps for
    // sections that never entered the viewport.
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await sleep(120);
      }
      window.scrollTo(0, 0);
      await sleep(400);
    });

    const fileSafeName = name.replace(/\s+/g, "-").toLowerCase();
    const fileSafePath = path === "/" ? "home" : path.replace(/\//g, "-").slice(1);
    await page.screenshot({
      path: `${OUT_DIR}/${fileSafeName}_${fileSafePath}.png`,
      fullPage: true,
    });
    console.log(`Captured ${name} ${path}`);
  }
  await context.close();
}

await browser.close();
console.log(`Done. Screenshots in ${OUT_DIR}/`);
