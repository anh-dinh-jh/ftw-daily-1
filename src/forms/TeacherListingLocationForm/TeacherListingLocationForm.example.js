/* eslint-disable no-console */
import TeacherListingLocationForm from './TeacherListingLocationForm';

export const Empty = {
  component: TeacherListingLocationForm,
  props: {
    onSubmit: values => {
      console.log('Submit TeacherListingLocationForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save location',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
