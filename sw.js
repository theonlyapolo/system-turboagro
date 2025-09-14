const cacheName = "turboagro-cache-v3";
const filesToCache = [
  "home.html",
  "captura_analise.html",
  "configuracoes.html",
  "login.html",
  "configanalise.css",
  "fazenda1.jpeg",
  "fazenda2.jpeg",
  "fazenda3.jpeg",
  "fazenda4.jpeg",
  "alice.jpg",
  "fazendas.html",
  "historico_analise.html",
  "script.js",
  "login.jpeg",
  "loginturbo.png",
  "processando_analise.html",
  "processando.jpeg",
  "resultados.html",
  "img/icone.png",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
      .catch(err => console.log("Erro ao cachear arquivos:", err))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
