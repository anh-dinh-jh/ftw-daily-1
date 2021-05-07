import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { Reviews } from '../../components';

import css from './TeacherListingPage.module.css';

const SectionReviews = props => {
  const { reviews, fetchReviewsError } = props;

  const reviewsError = (
    <h2 className={css.errorText}>
      <FormattedMessage id="TeacherListingPage.reviewsError" />
    </h2>
  );

  return reviews.length > 0 && (
    <div className={css.sectionReviews}>
      <h2 className={css.reviewsHeading}>
        <FormattedMessage id="TeacherListingPage.reviewsHeading" values={{ count: reviews.length }} />
      </h2>
      {fetchReviewsError ? reviewsError : null}
      <Reviews reviews={reviews} />
    </div>
  );
};

export default SectionReviews;
