import { RemoteData } from '@devexperts/remote-data-ts';

import { IFile } from 'shared/types/file';

export type LoadingFiles = RemoteData<string, IFile[]>;
