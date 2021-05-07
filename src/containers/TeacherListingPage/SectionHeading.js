import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './TeacherListingPage.module.css';

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    hostLink,
    showContactUser,
    onContactUser,
  } = props;

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'TeacherListingPage.perHour'
    : isDaily
    ? 'TeacherListingPage.perDay'
    : 'TeacherListingPage.perUnit';

  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          <FormattedMessage id="TeacherListingPage.hostedBy" values={{ name: hostLink }} />
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton
                rootClassName={css.contactLink}
                onClick={onContactUser}
                enforcePagePreloadFor="SignupPage"
              >
                <FormattedMessage id="TeacherListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
