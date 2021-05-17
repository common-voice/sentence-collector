export type Language = {
  id: string
  name: string
  nativeName: string
}

export type LanguageStatsEntry = {
  validated?: number
  rejected?: number
  added?: number
}

export type SentenceRecord = {
  id: number
  sentence: string
}
