import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("public/products");
await fs.mkdir(OUT_DIR, { recursive: true });

const images = [
  {
    slug: "robe-imprimee-estivale",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Assorted_Women%27s_Dresses_with_Different_Patterns_and_Colors.jpg",
  },
  {
    slug: "chemisier-jupe-taille-haute",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/03/Woman_wearing_blue_blouse_and_wool_mini_skirt.jpg",
  },
  {
    slug: "blazer-tailleur-femme",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Woman_in_typical_Office_Lady_attire_%2820240518160421%29.jpg",
  },
  {
    slug: "chemise-decontractee-homme",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Man_wearing_green_shirt-jacket%2C_blue_jeans_and_desert_boots_01.jpg",
  },
  {
    slug: "sac-a-main-cuir",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Black_handbag.jpg",
  },
  {
    slug: "montre-classique",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/Watch_photo.jpg",
  },
  {
    slug: "ceinture-en-cuir",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/DFC_4174_A_close-up_of_leather_belts_and_bags_neatly_displayed_at_a_bustling_outdoor_market_stall.jpg",
  },
];

// costume-chemise-cravate.jpg and veste-blazer-homme.jpg were already fetched
// (manually vetted replacements) and just need the same resize pass.
const alreadyDownloaded = ["costume-chemise-cravate", "veste-blazer-homme"];

async function fetchWithRetry(url, maxAttempts = 6) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": "boutique-en-ligne-demo/1.0 (one-time asset fetch)" },
    });
    if (res.status === 429) {
      const retryAfter = Number(res.headers.get("retry-after") ?? "30");
      console.log(`429 on ${url}, waiting ${retryAfter}s (attempt ${attempt}/${maxAttempts})`);
      await new Promise((r) => setTimeout(r, (retryAfter + 2) * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`Gave up after ${maxAttempts} attempts: ${url}`);
}

async function resizeAndSave(buffer, destPath) {
  await sharp(buffer)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);
}

for (const slug of alreadyDownloaded) {
  const p = path.join(OUT_DIR, `${slug}.jpg`);
  const buf = await fs.readFile(p);
  await resizeAndSave(buf, p);
  const stat = await fs.stat(p);
  console.log(`resized (in place): ${slug}.jpg (${(stat.size / 1024).toFixed(0)} KB)`);
}

for (const { slug, url } of images) {
  const dest = path.join(OUT_DIR, `${slug}.jpg`);
  const buffer = await fetchWithRetry(url);
  await resizeAndSave(buffer, dest);
  const stat = await fs.stat(dest);
  console.log(`saved: ${slug}.jpg (${(stat.size / 1024).toFixed(0)} KB)`);
}

console.log("Done.");
