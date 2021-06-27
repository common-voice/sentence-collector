import type { LanguageState } from './reducers/languages';
import type { LoginState } from './reducers/login';
import type { SentencesState } from './reducers/sentences';
import type { SettingsState } from './reducers/settings';

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

export type PersonalLanguageStatsEntry = {
  added: number
}

export type StatsRecordByLanguage = Record<string, LanguageStatsEntry>

export type TotalStats = {
  total: number
  languages: number
}

export type LanguageStats = {
  userUnreviewed: Record<string, number>
  all: StatsRecordByLanguage
  totals: TotalStats
}

export type UserStats = Record<string, PersonalLanguageStatsEntry>

export type SentenceRecord = {
  id?: number
  sentence: string
  source?: string
}

export type SubmissionFailures = Record<string, string[]>

export type BackendSentenceFailure = {
  sentence: string
  error: string
}

export type RejectedSentences = Record<string, SentenceRecord[]>

export type ReviewedState = {
  validated: SentenceRecord[]
  invalidated: SentenceRecord[]
  unreviewed: SentenceRecord[]
}
