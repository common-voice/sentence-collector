import React, { Children, useEffect, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { ReactLocalization, LocalizationProvider } from '@fluent/react';

import type { RootState } from './types';

export const DEFAULT_LOCALE = 'en';

async function fetchMessages(locale: string): Promise<[string, string]> {
  const response = await fetch(`locales/${locale}/messages.ftl`);
  const messages = await response.text();
  return [locale, messages];
}

function* lazilyParsedBundles(fetchedMessages: Array<[string, string]>) {
  for (const [locale, messages] of fetchedMessages) {
    const resource = new FluentResource(messages);
    const bundle = new FluentBundle(locale);
    bundle.addResource(resource);
    yield bundle;
  }
}

interface AppLocalizationProviderProps {
  children: ReactNode;
}

export function AppLocalizationProvider({ children }: AppLocalizationProviderProps) {
  const { allLanguages = [], currentUILocale } = useSelector((state: RootState) => state.languages);
  const [currentLocales, setCurrentLocales] = useState([DEFAULT_LOCALE]);
  const [l10n, setL10n] = useState<ReactLocalization | null>(null);

  const isRTL = (localeCode: string) => {
    const matchingLanguage = allLanguages.find((language) => language.id === localeCode);
    return !!matchingLanguage?.isRTL;
  };

  useEffect(() => {
    const locales = [...navigator.languages];
    if (currentUILocale) {
      locales.unshift(currentUILocale);
    }
    changeLocales(locales);
  }, [currentUILocale, allLanguages.length]);

  useEffect(() => {
    const mainLocale = currentLocales[0];
    const { documentElement } = document;
    documentElement.setAttribute('lang', mainLocale);
    documentElement.setAttribute('dir', isRTL(mainLocale) ? 'rtl' : 'ltr');
  }, [currentLocales]);

  async function changeLocales(userLocales: Array<string>) {
    const allLanguageCodes = allLanguages.map((lang) => lang.id);
    const negotiatedLocales = negotiateLanguages(userLocales, allLanguageCodes, {
      defaultLocale: DEFAULT_LOCALE,
    });
    setCurrentLocales(negotiatedLocales);

    const fetchedMessages = await Promise.all(negotiatedLocales.map(fetchMessages));

    const bundles = lazilyParsedBundles(fetchedMessages);
    setL10n(new ReactLocalization(bundles));
  }

  if (l10n === null) {
    return null;
  }

  return (
    <>
      <LocalizationProvider l10n={l10n}>{Children.only(children)}</LocalizationProvider>
    </>
  );
}
