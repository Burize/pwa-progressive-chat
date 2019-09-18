import { RemoteData } from '@devexperts/remote-data-ts';

export type EditableField = 'phone' | 'name' | 'avatar';

export type UpdatingUser = RemoteData<string, null>;
