import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';

import css from './TeacherListingPage.module.css';

const SectionTeachingType = props => {
  const { teachingType, teachingHours } = props;
  return teachingType ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="TeacherListingPage.teachingTypesTitle" />
      </h2>
      <p className={css.description}>
        {`${teachingType} - ${teachingHours}h`}
      </p>
    </div>
  ) : null;
};

export default SectionTeachingType;
