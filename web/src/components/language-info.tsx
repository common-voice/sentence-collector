import React from 'react';
import { Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { useLocaleUrl, useReviewUrl } from '../urls';

type Props = {
  total: number;
  validated: number;
  rejected: number;
  unreviewedByYou: number;
  addedByYou: number;
  language: string;
};

const LanguageInfo = (props: Props) => {
  const { total, validated, rejected, unreviewedByYou, addedByYou, language } = props;
  const totalSentences = total;
  const totalInReview = total - validated - rejected;
  const unreviewedSentencesByYou = unreviewedByYou;
  const validatedSentences = validated;
  const rejectedSentences = rejected;

  const localizedAddUrl = useLocaleUrl('/add');
  const localizedReviewUrl = useReviewUrl(language);

  return (
    <section>
      <Localized id="sc-lang-info-title-total">
        <h3></h3>
      </Localized>

      <ul>
        <Localized id="sc-lang-info-total" vars={{ totalSentences }}>
          <li></li>
        </Localized>
        <Localized id="sc-lang-info-in-review" vars={{ totalInReview }}>
          <li></li>
        </Localized>
        <Localized id="sc-lang-info-validated" vars={{ validatedSentences }}>
          <li></li>
        </Localized>
        <Localized id="sc-lang-info-rejected" vars={{ rejectedSentences }}>
          <li></li>
        </Localized>
      </ul>

      <Localized id="sc-lang-info-title-personal">
        <h3></h3>
      </Localized>

      <ul>
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
        <Localized id="sc-personal-added-by-you" vars={{ sentences: addedByYou }}>
          <li></li>
        </Localized>
      </ul>
    </section>
  );
};

export default LanguageInfo;
