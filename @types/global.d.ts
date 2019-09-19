declare module "file-loader*" {
  const pathToFile: string;
  export = pathToFile;
}

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
declare module '*.png';
declare module '*.jpg';

declare var serviceWorkerOption: {
  assets: string[],
};