import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { LISTING_STATE_DRAFT, PHOTOS_TYPE_MAIN } from '../../util/types';
import { EditTeacherListingPhotosForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';
import { getImgType } from '../../util/misc';

import css from './EditTeacherListingPhotosPanel.module.css';

class EditTeacherListingPhotosPanel extends Component {
  render() {
    const {
      className,
      rootClassName,
      errors,
      disabled,
      ready,
      images,
      listing,
      onImageUpload,
      onUpdateImageOrder,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      onChange,
      onSubmit,
      onRemoveImage,
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const currentListing = ensureOwnListing(listing);
    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
    const { mainPhotos = [], otherPhotos = [] } = currentListing.attributes.publicData;
    const panelTitle = isPublished ? (
      <FormattedMessage
        id="EditTeacherListingPhotosPanel.title"
        values={{ listingTitle: <ListingLink listing={listing} /> }}
      />
    ) : (
      <FormattedMessage id="EditTeacherListingPhotosPanel.createListingTitle" />
    );

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle}</h1>
        <EditTeacherListingPhotosForm
          className={css.form}
          disabled={disabled}
          ready={ready}
          fetchErrors={errors}
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          mainPhotos={mainPhotos}
          otherPhotos={otherPhotos}
          onSubmit={values => {
            const { addImage, ...updateValues } = values;
            const newImages = [];
            updateValues.images.forEach(img => {
                if (img.imageId) {
                  if (getImgType(img.id) === PHOTOS_TYPE_MAIN) {
                    mainPhotos.push(img.imageId.uuid);
                    newImages.unshift(img);
                  }
                  else {
                    otherPhotos.push(img.imageId.uuid);
                    newImages.push(img);
                  }
                }
                else newImages.push(img);
              }
            );

            onSubmit({
              images: newImages,
              publicData: { mainPhotos, otherPhotos }
            });
          }}
          onChange={onChange}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveImage}
          saveActionMsg={submitButtonText}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
        />
      </div>
    );
  }
}

EditTeacherListingPhotosPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  images: [],
  listing: null,
};

EditTeacherListingPhotosPanel.propTypes = {
  className: string,
  rootClassName: string,
  errors: object,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  images: array,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

export default EditTeacherListingPhotosPanel;
