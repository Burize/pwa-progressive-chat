function getErrorMessage(error: any): string {

  if (error instanceof Error) {
    return error.message.replace(/^"(.*)"$/, '$1');
  }

  return String(error);
}

export default getErrorMessage;
