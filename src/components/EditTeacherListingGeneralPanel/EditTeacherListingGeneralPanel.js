import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_TYPE_TEACHER, LISTING_STATE_DRAFT, TEACHING_TYPE_PART_TIME } from '../../util/types';
import { ListingLink } from '..';
import { EditTeacherListingGeneralForm } from '../../forms';
import config from '../../config';

import css from './EditTeacherListingGeneralPanel.module.css';

const EditTeacherListingGeneralPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditTeacherListingGeneralPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditTeacherListingGeneralPanel.createListingTitle" />
  );

  const subjectOptions = findOptionsForSelectFilter('subjects', config.custom.filters);
  const levelOptions = findOptionsForSelectFilter('levels', config.custom.filters);
  const teachingTypeOptions = findOptionsForSelectFilter('teaching-type', config.custom.filters);
  
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditTeacherListingGeneralForm
        className={css.form}
        initialValues={{ title, description, levels: publicData.levels, subjects: publicData.subjects, teachingType: publicData.teachingType || TEACHING_TYPE_PART_TIME, sessionHours: publicData.sessionHours || 1 }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, levels, subjects, teachingType, sessionHours } = values;
          const updateValues = {
            title: title.trim(),
            description,
            publicData: { levels, subjects, teachingType, sessionHours, listingType: LISTING_TYPE_TEACHER },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        levelOptions={levelOptions}
        subjectOptions={subjectOptions}
        teachingTypeOptions={teachingTypeOptions}
      />
    </div>
  );
};

EditTeacherListingGeneralPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditTeacherListingGeneralPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditTeacherListingGeneralPanel;
