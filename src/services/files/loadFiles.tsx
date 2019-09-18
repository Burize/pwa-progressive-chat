import { FileType, IFile } from 'shared/types/file';

import { validateFileTypes, getMimetype, readFiles } from './utils';
import { createFileInput } from 'shared/helpers/dom';

type OnUploadSuccess<T = IFile | IFile[]> = (fileOrFiles: T) => void;

interface ILoadFilesArgs {
  acceptFileTypes?: FileType[];
  multiple?: boolean;
  onUploadSuccess: OnUploadSuccess;
  onChooseWrongFileType(): void;
}

export function loadFiles(props: ILoadFilesArgs) {
  const { acceptFileTypes, multiple } = props;
  const accept = acceptFileTypes && acceptFileTypes.map(getMimetype).join(',');

  const fileInput = createFileInput({ accept, multiple });

  fileInput.onchange = makeFilesSelectHandler(props);
  fileInput.click();
}

function makeFilesSelectHandler(props: ILoadFilesArgs) {

  const { acceptFileTypes, onChooseWrongFileType, onUploadSuccess, multiple } = props;

  return async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const files = input.files as FileList;
    if (!files) { return; }
    const filesArr = Array.from(files);

    const loadedFiles = await readFiles(filesArr);
    if (acceptFileTypes && !validateFileTypes(acceptFileTypes, loadedFiles)) {
      onChooseWrongFileType();
      return;
    }
    onUploadSuccess(multiple ? loadedFiles : loadedFiles[0]);

    input.remove();
  };

}
