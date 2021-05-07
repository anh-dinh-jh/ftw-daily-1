import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';

import css from './TeacherListingPage.module.css';

const SectionSubjects = props => {
  const { subjects } = props;
  return subjects ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="TeacherListingPage.subjectsTitle" />
      </h2>
      {subjects.map((subject, index) => 
      (<p key={index} className={css.description}>
        {subject}
      </p>))}
    </div>
  ) : null;
};

export default SectionSubjects;
