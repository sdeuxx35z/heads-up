// Static build for hosting (the Quest needs HTTPS for WebXR).
import { readdir } from "node:fs/promises";
import { HEAD } from "./src/pwa.js";

await Bun.$`rm -rf dist`;
const out = await Bun.build({ entrypoints: ["./src/index.html"], outdir: "./dist", minify: true });
if (!out.success) { console.error(out.logs); process.exit(1); }
for (const f of await readdir("./public")) await Bun.write(`./dist/${f}`, Bun.file(`./public/${f}`));
const html = await Bun.file("./dist/index.html").text();
await Bun.write("./dist/index.html", html.replace("</head>", `${HEAD}</head>`));
console.log("built dist/");
