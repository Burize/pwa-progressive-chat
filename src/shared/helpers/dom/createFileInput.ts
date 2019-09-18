export default function createFileInput(options: Partial<HTMLInputElement>) {
  const { accept, multiple } = options;
  const input = document.createElement('input') as HTMLInputElement;
  input.hidden = true;
  input.type = 'file';
  input.accept = accept!;
  input.multiple = multiple!;
  document.body.appendChild(input);
  return input;
}
