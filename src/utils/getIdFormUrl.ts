export function getIdFormUrl(url: string) {
  return url.slice(url.lastIndexOf('/') + 1);
}