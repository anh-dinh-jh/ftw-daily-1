import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { PrimaryButton, SecondaryButton } from '../../components';

import css from './TransactionPanel.module.css';
import { TRANSITION_ACCEPT } from '../../util/transaction';

// Functional component as a helper to build ActionButtons for
// provider when state is preauthorized
const SaleActionButtonsMaybe = props => {
  const {
    className,
    rootClassName,
    showButtons,
    transaction,
    acceptInProgress,
    declineInProgress,
    cancelInProgress,
    acceptSaleError,
    declineSaleError,
    cancelSaleError,
    onAcceptSale,
    onDeclineSale,
    onCancelSale,
    isTransactionAccepted
  } = props;

  const buttonsDisabled = acceptInProgress || declineInProgress || cancelInProgress;

  const acceptErrorMessage = acceptSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.acceptSaleFailed" />
    </p>
  ) : null;
  const declineErrorMessage = declineSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.declineSaleFailed" />
    </p>
  ) : null;
  const cancelErrorMessage = cancelSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.cancelSaleFailed" />
    </p>
  ) : null;

  const classes = classNames(rootClassName || css.actionButtons, className);
  return showButtons ? ( isTransactionAccepted
    ? (<div className={classes}>
        <div className={css.actionErrors}>
          {cancelErrorMessage}
        </div>
        <div className={css.actionButtonWrapper}>
          <SecondaryButton
            inProgress={cancelInProgress}
            disabled={buttonsDisabled}
            onClick={onCancelSale}
          >
            <FormattedMessage id="TransactionPanel.cancelButton" />
          </SecondaryButton>
        </div>
      </div>)
    : (<div className={classes}>
        <div className={css.actionErrors}>
          {acceptErrorMessage}
          {declineErrorMessage}
        </div>
        <div className={css.actionButtonWrapper}>
          <SecondaryButton
            inProgress={declineInProgress}
            disabled={buttonsDisabled}
            onClick={onDeclineSale}
          >
            <FormattedMessage id="TransactionPanel.declineButton" />
          </SecondaryButton>
          <PrimaryButton
            inProgress={acceptInProgress}
            disabled={buttonsDisabled}
            onClick={onAcceptSale}
          >
            <FormattedMessage id="TransactionPanel.acceptButton" />
          </PrimaryButton>
        </div>
      </div>)
  ) : null;
};

export default SaleActionButtonsMaybe;
