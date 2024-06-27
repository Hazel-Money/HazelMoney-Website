import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import RegularPaymentForm from './RegularPaymentForm';
import { useGlobalContext } from '../../context/globalContext';
import RegularPaymentsItem from './Item';
import DetailedIncomeInfo from './ItemInformation';
import GuidedTour from '../GuidedTour/RegularPaymentsGuidedTour';
import HelpButton from '../HelpButton/HelpButton';

function RegularPayments() {
  const {
    language,
    getAllCategories,
    getAccountCurrency,
    getExpensesCategories,
    slicePayments,
    paymentsSliced,
    navigatePayments,
    currentPaymentIndex,
    deleteRegularPayments,
    regularPayments,
    getIncomesCategories,
    getFrequencies,
    getRegularPayments,
  } = useGlobalContext();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    slicePayments();
  }, [currentPaymentIndex, regularPayments]);

  useEffect(() => {
    getAccountCurrency();
    getRegularPayments();
    getIncomesCategories();
    getExpensesCategories();
    getFrequencies();
    getAllCategories();
  }, []);

  const handleTransactionItemClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <RegularPaymentsStyled>
      <InnerLayout>
        {open && <GuidedTour />}
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Adicionar pagamento regular' : 'Add regular payment'}</h1>
        </div>
        <div className="payment-content">
          <div className="payment-form-container">
            <RegularPaymentForm />
          </div>
          <div className="payment">
            {paymentsSliced.map((payment) => {
              const {
                id,
                account_id,
                frequency_id,
                currency,
                categoryName,
                amount,
                is_income,
                next_payment_date,
                description,
                icon,
                categoryColor,
              } = payment;
              return (
                <RegularPaymentsItem
                  key={id}
                  id={id}
                  account_id={account_id}
                  category={categoryName}
                  amount={amount}
                  is_income={is_income}
                  next_payment_date={next_payment_date}
                  description={description}
                  icon={icon}
                  color={categoryColor}
                  indicatorColor={is_income == '1' ? 'var(--color-green)' : 'red'}
                  deleteItem={deleteRegularPayments}
                  currency={currency}
                  onSelect={handleTransactionItemClick}
                  frequency_id={frequency_id}
                />
              );
            })}
            <div className="arrow-icons">
              <i
                className={
                  currentPaymentIndex > 0
                    ? 'fa-solid fa-arrow-left'
                    : 'fa-solid fa-arrow-left disabled'
                }
                onClick={() => navigatePayments('prev')}
              />
              <i
                className={
                  currentPaymentIndex * 3 + 3 < regularPayments.length
                    ? 'fa-solid fa-arrow-right'
                    : 'fa-solid fa-arrow-right disabled'
                }
                onClick={() => navigatePayments('next')}
              />
            </div>
          </div>
          <HelpButton onClick={handleClickOpen} language={language} />
        </div>
      </InnerLayout>
      {selectedTransaction && (
        <DetailedIncomeInfo
          transaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
      )}
    </RegularPaymentsStyled>
  );
}

const RegularPaymentsStyled = styled.div`
  display: flex;
  overflow: auto;
  .top {
    display: flex;
    width: 100%;
    height: 4rem;
    h1 {
      float: left;
      width: 95%;
    }
  }
  .payment-form-container {
    margin-top: 5vh;
  }
  .payment-content {
    display: flex;
    gap: 2rem;
    position: relative; /* Added this line */
    .payment {
      margin-top: 5vh;
      flex: 1;
      height: 50%;
    }
  }
  .arrow-icons {
    position: relative;
    display: flex;
    gap: 92%;
    color: var(--primary-color2);
    i {
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
    .disabled {
      color: rgba(70, 70, 97, 0.176) !important;
      cursor: not-allowed;
    }
  }
  @media only screen and (max-width: 600px) {
    .total-payment {
      margin-top: -0.6rem;
      h3 {
        display: none;
      }
      padding: 0.5rem;
      margin: 0.5 0;
      font-size: 2rem;
      gap: 0.5rem;
      span {
        font-size: 2rem;
        font-weight: 800;
      }
    }
    .payment-content {
      flex-direction: column;
      align-items: center;
    }
    .payment-form-container {
      margin-bottom: 2rem;
    }
    .arrow-icons {
      gap: 82% !important;
    }
    .help {
      bottom: -15vh;
    }
  }
`;

export default RegularPayments;
