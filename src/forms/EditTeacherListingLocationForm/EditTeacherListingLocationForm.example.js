/* eslint-disable no-console */
import EditTeacherListingLocationForm from './EditTeacherListingLocationForm';

export const Empty = {
  component: EditTeacherListingLocationForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditTeacherListingLocationForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save location',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
