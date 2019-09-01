import { Subject } from 'rxjs';

import { Action } from '../namespace';
import { initialDataState } from './initial';
import { createDataObserver, createCommunicationObserver } from './observers';

export const actions$ = new Subject<Action>();

export const dataState$ = createDataObserver(actions$, initialDataState);

export const communicationState = createCommunicationObserver(actions$);
