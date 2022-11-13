export function getQueryVariable(url: string, key: string) {
  const query = url.split('?');
  if (query.length === 0) {
    return '';
  }
  const vars = query[1].split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == key) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', key);
  return '';
}
