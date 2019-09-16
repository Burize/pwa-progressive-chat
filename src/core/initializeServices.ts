import getDeps from './getDeps';

const { socket } = getDeps();

export async function initializeServices() {
  socket.initialize(); // we don't need await there because, we can launch app without open socket connection
}
