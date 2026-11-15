import index from "./src/index.html";

const server = Bun.serve({
  port: Number(process.env.PORT) || 7820,
  routes: { "/": index },
  // icons, manifest and service worker
  fetch(req) {
    const name = new URL(req.url).pathname.slice(1);
    if (/^[\w.-]+$/.test(name)) return new Response(Bun.file(`./public/${name}`));
    return new Response("Not found", { status: 404 });
  },
  development: { hmr: false, console: true },
});
console.log(`Heads Up on ${server.url}`);
