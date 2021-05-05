import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';
import { Form as FinalForm } from 'react-final-form';

import css from './TeacherListingGeneralForm.module.css';

const CustomCategorySelectFieldMaybe = props => {
  const { name, id, teachingHoursType, intl } = props;
  const teachingHoursTypeLabel = intl.formatMessage({
    id: 'TeacherListingGeneralForm.teachingHoursTypeLabel',
  });
  const teachingHoursTypePlaceholder = intl.formatMessage({
    id: 'TeacherListingGeneralForm.teachingHoursTypePlaceholder',
  });
  const teachingHoursTypeRequired = required(
    intl.formatMessage({
      id: 'TeacherListingGeneralForm.teachingHoursTypeRequired',
    })
  );
  return teachingHoursType ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={teachingHoursTypeLabel}
      validate={teachingHoursTypeRequired}
    >
      {teachingHoursType.map(t => (
        <option key={t.key} value={t.key}>
          {t.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomCategorySelectFieldMaybe;
