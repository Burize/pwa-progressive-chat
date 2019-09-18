import { FileType, Bytes, MimeTypes, IFile } from 'shared/types/file';
import { replace } from 'ramda';

export function validateFileTypes(acceptFileTypes: FileType[], files: IFile[]): boolean {
  return files.every(f => !acceptFileTypes.every(type => type !== f.type));
}

export function readFileAsDataUrl(file: File): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => reader.onloadend = () => resolve(reader.result as any));
}

export const getFileName = replace(/(.+?)\.?[^.]+?$/, '$1');

export function getMimetype(signature: string): MimeTypes | 'Unknown filetype' {
  switch (signature) {
    case '89504E47':
    case 'png':
      return 'image/png';
    case '47494638':
    case 'gif':
      return 'image/gif';
    case '25504446':
    case 'pdf':
      return 'application/pdf';
    case 'FFD8FFDB':
    case 'FFD8FFE0':
    case 'FFD8FFE1':
    case 'FFD8FFE2':
    case 'FFD8FFE3':
    case 'FFD8FFE8':
    case 'jpg':
      return 'image/jpeg';
    case '504B0304':
    case 'zip':
      return 'application/zip';
    default:
      return 'Unknown filetype';
  }
}

export function getFileType(file: File): Promise<FileType> {

  const reader = new FileReader();
  const blob = file.slice(0, 4);
  reader.readAsArrayBuffer(blob);

  return new Promise((resolve) => reader.onloadend = (event) => {
    const target = event.currentTarget as any;
    const uint = new Uint8Array(target.result);
    const bytes: any = [];
    uint.forEach((byte) => {
      bytes.push(byte.toString(16));
    });
    const hex = bytes.join('').toUpperCase();
    const binaryFileType = getMimetype(hex);
    resolve(getFileTypeByMimeType(binaryFileType));
  });
}

export function getFileTypeByMimeType(type: MimeTypes | 'Unknown filetype'): FileType {
  switch (type) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'application/pdf': return 'pdf';
    default: return 'unknown';
  }
}

export function toMegabytes(bytes: Bytes) {
  return bytes / (1024 * 1024);
}

export function fromDataUrlToBlob(data: string) {
  // convert base64 to raw binary data held in a string
  const byteString = atob(data.split(',')[1]);

  // separate out the mime component
  const mimeString = data.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const buffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(buffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([buffer], { type: mimeString });
}

export async function readFiles(files: File[]): Promise<IFile[]> {

  const metaFiles: IFile[] = [];
  for (const metaFile of files) {
    metaFiles.push({
      initialName: metaFile.name,
      name: getFileName(metaFile.name),
      type: await getFileType(metaFile),
      dataUrl: await readFileAsDataUrl(metaFile),
      size: toMegabytes(metaFile.size),
    });
  }

  return metaFiles;
}
