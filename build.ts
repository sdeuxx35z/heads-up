// Static build for hosting (the Quest needs HTTPS for WebXR).
const out = await Bun.build({ entrypoints: ["./src/index.html"], outdir: "./dist", minify: true });
if (!out.success) { console.error(out.logs); process.exit(1); }
console.log(out.outputs.map((o) => o.path).join("\n"));
