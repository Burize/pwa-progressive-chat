import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    runtime.register();
  });
}
