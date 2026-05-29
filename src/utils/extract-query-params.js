export function extractQueryParams(query = '') {
  return query
    .replace('?', '')
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=');
      if (key) acc[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
      return acc;
    }, {});
}