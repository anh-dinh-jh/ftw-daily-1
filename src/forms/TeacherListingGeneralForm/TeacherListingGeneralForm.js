import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import { propTypes, TEACHING_TYPE_PART_TIME } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldCheckboxGroup, FieldSelect } from '../../components';

import css from './TeacherListingGeneralForm.module.css';

const TITLE_MAX_LENGTH = 60;

const TeacherListingGeneralFormComponent = props => (
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
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'TeacherListingGeneralForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'TeacherListingGeneralForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'TeacherListingGeneralForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'TeacherListingGeneralForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'TeacherListingGeneralForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'TeacherListingGeneralForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'TeacherListingGeneralForm.descriptionRequired',
      });
      const teachingTypePlaceholder = intl.formatMessage({
        id: 'TeacherListingGeneralForm.teachingTypesPlaceholder',
      })
      const teachingTypesLabel = intl.formatMessage({
        id: 'TeacherListingGeneralForm.teachingTypesLabel',
      });
      const teachingHoursLabel = intl.formatMessage({
        id: 'TeacherListingGeneralForm.teachingHoursLabel',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="TeacherListingGeneralForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of TeacherListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="TeacherListingGeneralForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="TeacherListingGeneralForm.showListingFailed" />
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
          <FieldCheckboxGroup className={css.checkboxes} id='subjects' name='subjects' label="Subjects" options={subjectOptions} />
        
          <FieldCheckboxGroup className={css.checkboxes} id='levels' name='levels' label="Levels" options={levelOptions} />

          <FieldSelect           
            id='teaching-type'
            name='teachingTypes'
            className={css.category}
            label={teachingTypesLabel}
            >
            <option disabled value="">
              {teachingTypePlaceholder}
            </option>
            {teachingTypeOptions.map(t => (
              <option key={t.key} value={t.key}>{t.label}</option>
            ))}
          </FieldSelect>

          <FormSpy subscription={{ values: true }}>
            {({ values }) => {
                  if (values.teachingTypes) {
                    return (
                      <FieldTextInput
                      id='teaching-hours'
                      name='teachingHours'
                      className={css.description}
                      type='number'
                      label={teachingHoursLabel}
                      defaultValue={values.teachingTypes === TEACHING_TYPE_PART_TIME ? 1 : 8}
                      max='8'
                      min='1'
                      disabled={values.teachingTypes !== TEACHING_TYPE_PART_TIME}
                      validate={composeValidators(required(titleRequiredMessage))}
                    />
                    )
                  } else return null;
                }
              } 
          </FormSpy>

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

TeacherListingGeneralFormComponent.defaultProps = { className: null, fetchErrors: null };

TeacherListingGeneralFormComponent.propTypes = {
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

export default compose(injectIntl)(TeacherListingGeneralFormComponent);
