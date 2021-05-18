import type { LanguageState } from './reducers/languages'
import type { LoginState } from './reducers/login'
import type { SentencesState } from './reducers/sentences'
import type { SettingsState } from './reducers/settings'

export type RootState = {
  languages: LanguageState
  login: LoginState
  sentences: SentencesState
  settings: SettingsState
}

export type Language = {
  id: string
  name: string
  nativeName: string
}

export type LanguageStatsEntry = {
  validated: number
  rejected: number
  added: number
}

type StatsRecordByLanguage = Record<string, LanguageStatsEntry>

export type AllStats = {
  [key: string]: LanguageStatsEntry
  total: number
  languages: number
}

export type LanguageStats = {
  userUnreviewed: Record<string, number>
  user: StatsRecordByLanguage
  all: AllStats
}

export type SentenceRecord = {
  id: number
  sentence: string
}

export type SentenceWithSource = {
  sentence: string
  source: string
}

export type SubmissionFailures = Record<string, string[]>

export type RejectedSentences = Record<string, SentenceRecord[]>
