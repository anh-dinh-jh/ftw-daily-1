/* eslint-disable no-console */
import TeacherListingPricingForm from './TeacherListingPricingForm';

export const Empty = {
  component: TeacherListingPricingForm,
  props: {
    onSubmit: values => {
      console.log('Submit TeacherListingPricingForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save price',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
