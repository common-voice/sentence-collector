import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { getReviewUrl } from './review';

type Props = {
  total: number;
  validated: number;
  rejected: number;
  unreviewedByYou: number;
  language: string;
  languageName: string;
  nativeLanguageName: string;
};

type LanguageInfoRouteMatch = {
  locale: string;
};

const LanguageInfo = (props: Props) => {
  const {
    total,
    validated,
    rejected,
    unreviewedByYou,
    language,
    languageName,
    nativeLanguageName,
  } = props;
  const match = useRouteMatch<LanguageInfoRouteMatch>();

  const totalSentences = total;
  const totalInReview = total - validated - rejected;
  const unreviewedSentencesByYou = unreviewedByYou;
  const validatedSentences = validated;
  const rejectedSentences = rejected;

  return (
    <section>
      <h3>
        {nativeLanguageName} ({languageName})
      </h3>
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
          {unreviewedByYou > 0 &&
            <Link to={getReviewUrl(match.params.locale, language)}>
              <Localized id="sc-lang-info-review-now">
                Review now!
              </Localized>
            </Link>
          }
          {total - validated === 0 &&
            <Localized id="sc-lang-info-add-more" elems={{
              addLink: (<Link to={'/add'}></Link>)
            }}>
              <Link to={'/add'}>Add more sentences now!</Link>
            </Localized>
          }
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
