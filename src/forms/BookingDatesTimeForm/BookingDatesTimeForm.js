import React, { Component } from 'react';
import { string, bool, arrayOf, array, func, number } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import moment from 'moment';
import config from '../../config';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { required, composeValidators } from '../../util/validators';
import { END_TIME, START_TIME } from '../../util/dates';
import { propTypes, LINE_ITEM_HOURS } from '../../util/types';
import { Form, IconSpinner, PrimaryButton, FieldDateInput, FieldSelect } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesTimeForm.module.css';
import { is } from '@babel/types';

const identity = v => v;
const TIME_OF_ONE_DAY = [8, 9, 10, 11, 12, 13, 14, 15, 16];

export class BookingDatesTimeFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.getStartAndEndTime = this.getStartAndEndTime.bind(this);
  }

  getStartAndEndTime(date, fromTime, toTime) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setHours(fromTime);
    endDate.setHours(toTime);
    endDate.setDate(endDate.getDate() + 1);
    return { startDate, endDate };
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // display errors, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { bookingDates, fromTime, toTime } = e;
    if (bookingDates && fromTime, toTime) {
      const newBookingDates = this.getStartAndEndTime(bookingDates.date, fromTime, toTime);
      this.props.onSubmit({bookingDates: newBookingDates});
    }
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues) {
    const { date } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};
    const fromTime = formValues.values && Number(formValues.values.fromTime);
    const toTime = formValues.values && Number(formValues.values.toTime);
      if (date && fromTime && toTime && !this.props.fetchLineItemsInProgress) {
        const newBookingDates = this.getStartAndEndTime(date, fromTime, toTime);
        const listingId = this.props.listingId;
        const isOwnListing = this.props.isOwnListing;
        const isFirstTimeBooking = this.props.isFirstTimeBooking;
        this.props.onFetchTransactionLineItems({
          bookingData: { ...newBookingDates, isFirstTimeBooking },
          listingId,
          isOwnListing,
        });
        return;
    }
  }

  render() {
    const { rootClassName, className, price: unitPrice, isHourlyBooking, sessionHours, isFirstTimeBooking, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            form,
            startDatePlaceholder,
            formId,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
          } = fieldRenderProps;
          const { date } = values && values.bookingDates ? values.bookingDates : {};
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const requiredMessage = intl.formatMessage({
            id: 'BookingDatesForm.requiredDate',
          });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const fromTimeLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingFromTime',
          });
          const toTimeLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingToTime',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data.
          // Note: lineItems are calculated and fetched from FTW backend
          // so we need to pass only booking data that is needed otherwise
          // If you have added new fields to the form that will affect to pricing,
          // you need to add the values to handleOnChange function
          const fromDefaultTime = values.fromTime ? Number(values.fromTime) : START_TIME;
          const toDefaultTime = values.toTime ? Number(values.toTime) : START_TIME + sessionHours;
          const newBookingDates = date ? this.getStartAndEndTime(date, fromDefaultTime, toDefaultTime) : null;
          const bookingData =
            newBookingDates
              ? {
                  unitType: LINE_ITEM_HOURS,
                  ...newBookingDates
                }
              : null;
          const showEstimatedBreakdown =
            bookingData && lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;
            
          const bookingInfoMaybe = showEstimatedBreakdown ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} lineItems={lineItems}/>
            </div>
          ) : null;

          const loadingSpinnerMaybe = fetchLineItemsInProgress ? (
            <IconSpinner className={css.spinner} />
          ) : null;

          const bookingInfoErrorMaybe = fetchLineItemsError ? (
            <span className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.fetchLineItemsError" />
            </span>
          ) : null;

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const getTimeOption = (time) => {
            if (time < 10) {
              return <option key={time} value={time}>{`0${time}:00`}</option>
            }
            else return <option key={time} value={time}>{`${time}:00`}</option>
          }

          const timeOptions = TIME_OF_ONE_DAY.map((time) => {
              if (time + sessionHours <= END_TIME)
                return getTimeOption(time);
          });

          return (
            <Form onSubmit={handleSubmit} className={classes} enforcePagePreloadFor="CheckoutPage">
              {timeSlotsError}
              <FormSpy
                subscription={{ values: true }}
                onChange={values => {
                  this.handleOnChange(values);
                }}
              />
              <FieldDateInput 
                className={css.bookingDates}
                name="bookingDates"
                id={`${formId}.bookingStartDate`}
                label={bookingStartLabel}
                placeholder={startDatePlaceholderText}
                format={identity}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(requiredMessage),
                )}
                disabled={fetchLineItemsInProgress}
              />
              <div className={css.selectFields}>
                <FieldSelect         
                  id='from-time'
                  name='fromTime'
                  className={css.select}
                  label={fromTimeLabel}
                  defaultValue={fromDefaultTime}
                  disabled={!values.bookingDates}
                  onChange={(e) => {
                    form.change('fromTime', e.target.value);
                    form.change('toTime', Number(e.target.value) + Number(sessionHours));
                  }}
                >
                  {timeOptions}
                </FieldSelect>
                <FieldSelect         
                  id='to-time'
                  name='toTime'
                  className={css.select}
                  label={toTimeLabel}
                  defaultValue={toDefaultTime}
                  disabled={!values.bookingDates}
                >
                  {getTimeOption(toDefaultTime)}
                </FieldSelect>
              </div>
                
              {bookingInfoMaybe}
              {loadingSpinnerMaybe}
              {bookingInfoErrorMaybe}

              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesTimeFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
  isHourlyBooking: false,
  sessionHours: null,
  isFirstTimeBooking: false
};

BookingDatesTimeFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,
  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,

  sessionHours: number
};

const BookingDatesTimeForm = compose(injectIntl)(BookingDatesTimeFormComponent);
BookingDatesTimeForm.displayName = 'BookingDatesTimeForm';

export default BookingDatesTimeForm;
