import React from 'react';
import { Link } from 'react-router-dom';
import { Localized, useLocalization } from '@fluent/react';

import { useLocaleUrl, useReviewUrl } from '../urls';

type Props = {
  total: number;
  validated: number;
  rejected: number;
  unreviewedByYou: number;
  language: string;
};

const LanguageInfo = (props: Props) => {
  const { total, validated, rejected, unreviewedByYou, language } = props;
  const { l10n } = useLocalization();
  const totalSentences = total;
  const totalInReview = total - validated - rejected;
  const unreviewedSentencesByYou = unreviewedByYou;
  const validatedSentences = validated;
  const rejectedSentences = rejected;

  const localizedAddUrl = useLocaleUrl('/add');
  const localizedReviewUrl = useReviewUrl(language);

  const title = l10n.getString(language) || language;

  return (
    <section>
      <h3>{title}</h3>

      <ul>
        <Localized id="sc-lang-info-total" vars={{ totalSentences }}>
          <li></li>
        </Localized>
        <Localized id="sc-lang-info-in-review" vars={{ totalInReview }}>
          <li></li>
        </Localized>
        <li>
          <Localized id="sc-lang-info-left-for-you" vars={{ unreviewedSentencesByYou }}>
            <span></span>
          </Localized>
          &nbsp;
          {unreviewedByYou > 0 && (
            <Localized
              id="sc-lang-info-review-now"
              elems={{
                reviewLink: <Link to={localizedReviewUrl}></Link>,
              }}
            >
              <span></span>
            </Localized>
          )}
          {unreviewedByYou === 0 && (
            <Localized
              id="sc-lang-info-add-more"
              elems={{
                addLink: <Link to={localizedAddUrl}></Link>,
              }}
            >
              <span></span>
            </Localized>
          )}
        </li>
        <Localized id="sc-lang-info-validated" vars={{ validatedSentences }}>
          <li></li>
        </Localized>
        <Localized id="sc-lang-info-rejected" vars={{ rejectedSentences }}>
          <li></li>
        </Localized>
      </ul>
    </section>
  );
};

export default LanguageInfo;
