import { Branding } from './utils';

export type FileType = 'pdf' | 'doc' | 'xls' | 'txt' | 'zip' | 'jpg' | 'png' | 'unknown';

export type MegaBytes = number;
export type Bytes = number;
export type DataUrl = string;
export type Base64 = Branding<'Base64', string>;

export interface IFile {
  type: FileType;
  name: string;
  initialName: string;
  dataUrl: DataUrl;
  size: MegaBytes;
}

export type MimeTypes =
  'image/png' |
  'image/gif' |
  'application/pdf' |
  'image/jpeg' |
  'application/zip';
