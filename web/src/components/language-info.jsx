import React from 'react';
import { Link } from 'react-router-dom';

import { getReviewUrl } from './pages/review';

const LanguageInfo = (props) => {
  const {
    total,
    validated,
    language,
    languageName,
  } = props;

  return (
    <section>
      <h3>{languageName}</h3>
      <ul>
        <li>{total} total sentences.</li>
        <li>
         {total - validated} sentences in review.&nbsp;
         { total - validated > 0 && (
           <Link to={getReviewUrl(language)}>Review now!</Link>
         )}
         { total - validated === 0 && (
           <Link to={'/add'}>Add more sentences now!</Link>
         )}
        </li>
        <li>{validated} validated sentences.</li>
      </ul>
    </section>
  );
};

export default LanguageInfo;