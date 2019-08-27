import formatStringByPattern from 'format-string-by-pattern';

export function makePhoneNormalizer(phonePatter: string) {
  return (value: string) => {
    if (!value) {
      return value;
    }
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return formatStringByPattern(phonePatter, onlyNumbers);
  };

}
