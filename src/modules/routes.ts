export const routes = {
  auth: '/auth',
  chat: '/chat',
  profile: '/profile',
};

export const defaultRoute = routes.chat;

export type NavigationRoute = { title: string, url: string, icon?: string };

export const navigationRoutes: NavigationRoute[] = [
  { title: 'Messages', url: routes.chat, icon: 'message' },
  { title: 'Profile', url: routes.profile, icon: 'setting' },
];
