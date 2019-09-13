export function getAcronym(name: string) {
  return name.split(' ').map(item => item[0].toUpperCase()).join('');
}
