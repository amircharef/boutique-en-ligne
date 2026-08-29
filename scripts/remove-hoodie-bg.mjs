import { removeBackground } from "@imgly/background-removal-node";
import path from "node:path";
import fs from "node:fs/promises";

const SRC_DIR = path.resolve("public/hoodies");
const OUT_DIR = path.resolve("public/hoodies/cutout");
await fs.mkdir(OUT_DIR, { recursive: true });

const files = [
  "hoodie-oversize-noir.jpg",
  "hoodie-print-wave-marine.jpg",
  "hoodie-print-montrouge-blanc.jpg",
  "hoodie-zippe-chine-bleu.jpg",
  "hoodie-lapin-rose.jpg",
  "hoodie-oversize-kaki.jpg",
];

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const buf = await fs.readFile(srcPath);
  const blob = new Blob([buf], { type: "image/jpeg" });
  const resultBlob = await removeBackground(blob);
  const arrayBuffer = await resultBlob.arrayBuffer();
  const outName = file.replace(/\.jpe?g$/i, ".png");
  const outPath = path.join(OUT_DIR, outName);
  await fs.writeFile(outPath, Buffer.from(arrayBuffer));
  console.log(`cutout: ${outName}`);
}

console.log("Done.");
