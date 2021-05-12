import React from 'react';
import classNames from 'classnames';
import config from '../../config';
import { DATE_TYPE_DATE, DATE_TYPE_DATETIME, LINE_ITEM_HOURS} from '../../util/types';
import { HourlyBookingBreakdown, BookingBreakdown } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build BookingBreakdown
const BreakdownMaybe = props => {
  const { className, rootClassName, breakdownClassName, transaction, transactionRole, unitType } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;
  const isHourlyBooking = unitType === LINE_ITEM_HOURS;
  const classes = classNames(rootClassName || css.breakdownMaybe, className);
  const breakdownClasses = classNames(breakdownClassName || css.breakdown);
  return loaded ? (
    <div className={classes}>
      { isHourlyBooking ?
          (<HourlyBookingBreakdown
            className={breakdownClasses}
            userRole={transactionRole}
            unitType={unitType}
            transaction={transaction}
            booking={transaction.booking}
            dateType={DATE_TYPE_DATETIME}
          />)
        : (<BookingBreakdown
            className={breakdownClasses}
            userRole={transactionRole}
            unitType={unitType}
            transaction={transaction}
            booking={transaction.booking}
            dateType={DATE_TYPE_DATE}
          />)
      }
    </div>
  ) : null;
};

export default BreakdownMaybe;
