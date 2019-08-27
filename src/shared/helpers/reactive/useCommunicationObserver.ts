import { Observable } from 'rxjs';

import { ICommunication } from 'shared/types/reactive';

import useObservable from './useObservable';

import { initialCommunicationField } from './initialCommunicationField';

export default function useCommunicationObserver(
  createState: () => Observable<ICommunication<string>>) {

  const [state] = useObservable<ICommunication<string>, any>(createState, initialCommunicationField);

  return [state];
}
