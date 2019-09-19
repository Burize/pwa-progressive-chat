export default function getEnvParams() {
  const env = process.env.NODE_ENV;
  const apiUrl = process.env.API_URL;
  const wsUrl = process.env.WS_URL;
  const cacheVersion = process.env.CACHE_VERSION || 'cache-v1';

  const withAnalyze = process.env.WITH_ANALYZE_MODE;

  if (!apiUrl || !wsUrl) {
    throw Error(`Incorrect environment, apiUrl: ${apiUrl}, wsUrl: ${wsUrl}`);
  }

  const envParams = {
    env,
    apiUrl,
    wsUrl,
    cacheVersion,
    withAnalyze,
  };

  return envParams;
}
