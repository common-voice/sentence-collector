import React from 'react';
import { Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { useLocaleUrl, getReviewUrl } from '../urls';

type Props = {
  total: number;
  validated: number;
  rejected: number;
  unreviewedByYou: number;
  language: string;
  nativeLanguageName: string;
};

const LanguageInfo = (props: Props) => {
  const { total, validated, rejected, unreviewedByYou, language, nativeLanguageName } = props;
  const totalSentences = total;
  const totalInReview = total - validated - rejected;
  const unreviewedSentencesByYou = unreviewedByYou;
  const validatedSentences = validated;
  const rejectedSentences = rejected;

  const localizedAddUrl = useLocaleUrl('/add');
  const localizedReviewUrl = getReviewUrl(language);

  return (
    <section>
      <h3>{nativeLanguageName}</h3>
      <ul>
        <Localized id="sc-lang-info-total" vars={{ totalSentences }}>
          <li>{total} total sentences.</li>
        </Localized>
        <Localized id="sc-lang-info-in-review" vars={{ totalInReview }}>
          <li>{total - validated - rejected} sentences in review.&nbsp;</li>
        </Localized>
        <li>
          <Localized id="sc-lang-info-left-for-you" vars={{ unreviewedSentencesByYou }}>
            <span>{unreviewedByYou} sentences left for you to review.</span>
          </Localized>
          &nbsp;
          {unreviewedByYou > 0 && (
            <Localized
              id="sc-lang-info-review-now"
              elems={{
                reviewLink: <Link to={localizedReviewUrl}></Link>,
              }}
            >
              <span>
                <Link to={localizedReviewUrl}>Review now!</Link>
              </span>
            </Localized>
          )}
          {total - validated === 0 && (
            <Localized
              id="sc-lang-info-add-more"
              elems={{
                addLink: <Link to={localizedAddUrl}></Link>,
              }}
            >
              <span>
                <Link to={localizedAddUrl}>Add more sentences now!</Link>
              </span>
            </Localized>
          )}
        </li>
        <Localized id="sc-lang-info-validated" vars={{ validatedSentences }}>
          <li>{validated} validated sentences.</li>
        </Localized>
        <Localized id="sc-lang-info-rejected" vars={{ rejectedSentences }}>
          <li>{rejected} rejected sentences.</li>
        </Localized>
      </ul>
    </section>
  );
};

export default LanguageInfo;
