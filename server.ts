import index from "./src/index.html";

const server = Bun.serve({
  port: Number(process.env.PORT) || 7820,
  routes: { "/": index },
  development: { hmr: false, console: true },
});
console.log(`Heads Up on ${server.url}`);
