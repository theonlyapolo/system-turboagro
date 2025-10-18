const cacheName = "turboagro-cache-v4"; // sempre mude o número ao atualizar
const filesToCache = [
  "./",
  "./home.html",
  "./captura_analise.html",
  "./configuracoes.html",
  "./login.html",
  "./configanalise.css",
  "./fazenda1.jpeg",
  "./fazenda2.jpeg",
  "./fazenda3.jpeg",
  "./fazenda4.jpeg",
  "./alice.jpg",
  "./fazendas.html",
  "./historico_analise.html",
  "./script.js",
  "./login.jpeg",
  "./loginturbo.png",
  "./processando_analise.html",
  "./processando.jpeg",
  "./resultados.html",
  "./img/icone.png",
  "./manifest.json"
];

// Instala o service worker e guarda arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(() => self.skipWaiting()) // ativa imediatamente
      .catch(err => console.log("Erro ao cachear arquivos:", err))
  );
});

// Remove caches antigos quando houver nova versão
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log("Removendo cache antigo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Busca primeiro no cache, depois na rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
