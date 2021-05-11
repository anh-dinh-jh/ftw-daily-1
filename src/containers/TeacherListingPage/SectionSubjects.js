import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import css from './TeacherListingPage.module.css';

const SectionSubjects = props => {
  const { options, subjects } = props;
  return options ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="TeacherListingPage.subjectsTitle" />
      </h2>
      <PropertyGroup
        id="TeacherListingPage.subjects"
        options={options}
        selectedOptions={subjects}
        twoColumns={true}
      />
    </div>
  ) : null;
};

export default SectionSubjects;
