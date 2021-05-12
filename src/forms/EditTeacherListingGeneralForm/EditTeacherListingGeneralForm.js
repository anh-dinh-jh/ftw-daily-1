import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy, Field } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import { propTypes, TEACHING_TYPE_PART_TIME, TEACHING_TYPE_FULL_TIME } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldCheckboxGroup, FieldSelect } from '../../components';

import css from './EditTeacherListingGeneralForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditTeacherListingGeneralFormComponent = props => (
<FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        subjectOptions,
        levelOptions,
        teachingTypeOptions,
        className,
        disabled,
        ready,
        handleSubmit,
        form,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditTeacherListingGeneralForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditTeacherListingGeneralForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.descriptionRequired',
      });
      const teachingTypePlaceholder = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.teachingTypesPlaceholder',
      })
      const teachingTypesLabel = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.teachingTypesLabel',
      });
      const teachingHoursLabel = intl.formatMessage({
        id: 'EditTeacherListingGeneralForm.teachingHoursLabel',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditTeacherListingGeneralForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditTeacherListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditTeacherListingGeneralForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditTeacherListingGeneralForm.showListingFailed" />
        </p>
      ) : null;
      

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      return (
        <Form className={classes} onSubmit={handleSubmit} >
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          <FieldCheckboxGroup className={css.checkboxes} id='subjects' name='subjects' label="Subjects" options={subjectOptions}/>
        
          <FieldCheckboxGroup className={css.checkboxes} id='levels' name='levels' label="Levels" options={levelOptions}/>

          <FieldTextInput
            id='teaching-hours'
            name='sessionHours'
            className={css.description}
            type='number'
            label={teachingHoursLabel}
            max='8'
            min='1'
            onChange={(e) => {
              const hours = e.target.value;
              if (Number(hours) >= 8) {
                form.change('sessionHours', 8);
                form.change('teachingType', TEACHING_TYPE_FULL_TIME);
                return;
              }
              
              form.change('sessionHours', Number(hours) <= 0 ? 1 : hours);
              form.change('teachingType', TEACHING_TYPE_PART_TIME);
            }}
            validate={composeValidators(required(titleRequiredMessage))}
          />

          <FieldSelect         
            id='teaching-type'
            name='teachingType'
            className={css.category}
            label={teachingTypesLabel}
            disabled
            validate={composeValidators(required(titleRequiredMessage))}
          >
              {teachingTypeOptions.map(t => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
          </FieldSelect>

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditTeacherListingGeneralFormComponent.defaultProps = { className: null, fetchErrors: null };

EditTeacherListingGeneralFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditTeacherListingGeneralFormComponent);
