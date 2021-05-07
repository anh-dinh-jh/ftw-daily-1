import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';

import css from './TeacherListingPage.module.css';

const SectionLevels = props => {
  const { levels } = props;
  return levels ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="TeacherListingPage.levelsTitle" />
      </h2>
      {levels.map((level, index) => 
      (<p key={index} className={css.description}>
        {level}
      </p>))}
    </div>
  ) : null;
};

export default SectionLevels;
