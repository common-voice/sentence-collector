import { useRouteMatch } from 'react-router-dom';

type LocaleMatch = { locale: string };

export const getReviewUrl = (language: string | undefined) => {
  const match = useRouteMatch<LocaleMatch>();
  const locale = match?.params?.locale;
  const prefix = locale ? `/${locale}` : '';
  const languageToReview = language || '';
  return `${prefix}/review/${languageToReview}`;
};

export const useLocaleUrl = (path: string) => {
  const match = useRouteMatch<LocaleMatch>();
  const locale = match?.params?.locale;
  const prefix = locale ? `/${locale}` : '';
  const pathWithSlash = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${pathWithSlash}`;
};
