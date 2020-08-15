import React from 'react';
import { Link } from 'react-router-dom';
import { getReviewUrl } from './pages/review';

const LanguageInfo = (props) => {
  const {
    total,
    validated,
    rejected,
    unreviewedByYou,
    language,
    languageName,
    nativeLanguageName,
  } = props;

  return (
    <section>
      <h3>{nativeLanguageName} ({languageName})</h3>
      <ul>
        <li>{total} total sentences.</li>
        <li>
         {total - validated - rejected} sentences in review.&nbsp;
        </li>
        <li>
         {unreviewedByYou} sentences left for you to review.&nbsp;
         { unreviewedByYou > 0 && (
           <Link to={getReviewUrl(language)}>Review now!</Link>
         )}
         { total - validated === 0 && (
           <Link to={'/add'}>Add more sentences now!</Link>
         )}
        </li>
         <li>{validated} validated sentences.</li>
         <li>{rejected} rejected sentences.</li>
      </ul>
    </section>
  );
};

export default LanguageInfo;