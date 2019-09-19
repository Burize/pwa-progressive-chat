import getEnvParams from 'shared/helpers/getEnvParams';

const _self: ServiceWorkerGlobalScope = self as any;

const { cacheVersion } = getEnvParams();

const urlsToPreCache = serviceWorkerOption.assets;

const urlsToCache = urlsToPreCache.concat(['assets/avatars/']);

_self.addEventListener('install', (event) => {

  caches.open(cacheVersion)
    .then((cache) => {
      return cache.addAll(urlsToPreCache);
    });
});

_self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;
  if (urlsToCache.some(cacheUrl => requestUrl.includes(cacheUrl))) {
    returnCache(event);
    return;
  }

  event.respondWith(fetch(event.request));
});

function returnCache(event: FetchEvent) {
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        (response) => {

          if (!isAssetsRequest(event.request) &&
            (!response || response.status !== 200 || response.type !== 'basic')) {
            return response;
          }
          const responseToCache = response.clone();

          caches.open(cacheVersion)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        },
      );
    }));
}

function isAssetsRequest(request: Request) {
  return request.method === 'GET' && request.url.includes('assets/');
}
