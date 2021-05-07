/* eslint-disable no-console */
import EditTeacherListingPricingForm from './EditTeacherListingPricingForm';

export const Empty = {
  component: EditTeacherListingPricingForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditTeacherListingPricingForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save price',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
