import getEnvParams from './getEnvParams';

const { apiUrl } = getEnvParams();

export default function getUserAvatarPath(avatar: string) {
  return `${apiUrl}${avatar}`;
}
