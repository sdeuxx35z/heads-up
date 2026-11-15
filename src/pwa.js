// Manifest and offline cache; kept out of index.html so the bundler leaves the files alone.
export const HEAD = `<link rel="manifest" href="./manifest.webmanifest"><link rel="icon" href="./icon-192.png"><meta name="theme-color" content="#07090b"><script>if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'))</script>`;
