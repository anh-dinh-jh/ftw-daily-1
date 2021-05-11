import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import css from './TeacherListingPage.module.css';

const SectionLevels = props => {
  const { options, levels } = props;
  return levels ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="TeacherListingPage.levelsTitle" />
      </h2>
      <PropertyGroup
        id="TeacherListingPage.levels"
        options={options}
        selectedOptions={levels}
        twoColumns={true}
      />
    </div>
  ) : null;
};

export default SectionLevels;
