import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const SRC = "C:/Users/acer/AppData/Local/Temp/claude/c--Users-acer-Documents-GitHub-boutique-en-ligne/f9e3e055-aafc-4019-ad0d-de21b91c2f7a/scratchpad/hoodies";
const OUT = path.resolve("public/hoodies");
await fs.mkdir(OUT, { recursive: true });

const jobs = [
  { src: "hoodie-man.jpg", out: "hoodie-oversize-noir.jpg", rotate: 0 },
  { src: "fc-back1.jpg", out: "hoodie-print-wave-marine.jpg", rotate: 0 },
  { src: "fc-back2.jpg", out: "hoodie-print-montrouge-blanc.jpg", rotate: 0 },
  { src: "young-man-hoodie.jpg", out: "hoodie-zippe-chine-bleu.jpg", rotate: 0 },
  { src: "woman-spring.jpg", out: "hoodie-lapin-rose.jpg", rotate: -90 },
  { src: "hoodie-person.jpg", out: "hoodie-oversize-kaki.jpg", rotate: 0 },
];

for (const job of jobs) {
  const buf = await fs.readFile(path.join(SRC, job.src));
  let pipeline = sharp(buf).rotate(job.rotate || undefined);
  pipeline = pipeline.resize({ width: 1200, height: 1500, fit: "cover", withoutEnlargement: true });
  const dest = path.join(OUT, job.out);
  await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
  const stat = await fs.stat(dest);
  console.log(`saved: ${job.out} (${(stat.size / 1024).toFixed(0)} KB)`);
}

console.log("Done.");
