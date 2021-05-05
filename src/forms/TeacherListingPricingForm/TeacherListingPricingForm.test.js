import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import TeacherListingPricingForm from './TeacherListingPricingForm';

const noop = () => null;

describe('TeacherListingPricingForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <TeacherListingPricingForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save price"
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
