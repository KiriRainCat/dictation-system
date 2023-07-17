/// <reference types="vite/client" />

type dictationList = {
  name: string,
  lastEdited: string,
}

type dictationResult = {
  str1: string,
  str2: string,
  similarity?: string
}

type dictation = {
  title: string,
  contents: string[],
}

export { dictation, dictationList, dictationResult }