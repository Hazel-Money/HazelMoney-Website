import React, {useEffect,useState} from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import RegularPaymentForm from './RegularPaymentForm';
import { useGlobalContext } from '../../context/globalContext';
import RegularPaymentsItem from "./Item"
import DetailedIncomeInfo from './ItemInformation'
import GuidedTour from '../GuidedTour/RegularPaymentsGuidedTour';
import Button from '@mui/material/Button';

function RegularPayments() {
  const {language,getAllCategories, getAccountCurrency, getExpensesCategories, slicePayments, paymentsSliced, navigatePayments, currentPaymentIndex, deleteRegularPayments, regularPayments, getIncomesCategories, getFrequencies, getRegularPayments} = useGlobalContext();

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
        <div className='payment-content'>
          <div className="payment-form-container">
            <RegularPaymentForm />
          </div>
          <div className="payment">
            {paymentsSliced.map((payment) => {
              const {id, account_id ,frequency_id ,currency,categoryName, amount, is_income, next_payment_date, description, icon, categoryColor} = payment;
              return <RegularPaymentsItem
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
                  indicatorColor={is_income == '1' ? "var(--color-green)" : "red"}
                  deleteItem={deleteRegularPayments}
                  currency={currency}
                  onSelect={handleTransactionItemClick}
                  frequency_id={frequency_id}
              />
            })}
            <div className="arrow-icons">
              <i
              className={currentPaymentIndex > 0 ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-left disabled"}
              onClick={() => navigatePayments('prev')}
              />
              <i
              className={currentPaymentIndex * 3 + 3 < regularPayments.length ? "fa-solid fa-arrow-right" : "fa-solid fa-arrow-right disabled"}
              onClick={() => navigatePayments('next')}
              />
            </div>
            </div>
        </div>

        <div className='help'>
          <Button className='help-button' variant="help-button" onClick={handleClickOpen}> 
              {language === 'Portuguese' ? '?' : '?'}
          </Button>
        </div>
      </InnerLayout>
      {selectedTransaction && <DetailedIncomeInfo transaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} />}
    </RegularPaymentsStyled>
  )
}

const RegularPaymentsStyled = styled.div`
    display: flex;
    overflow: auto;
    .top{
        display: flex;
        width: 100%;
        height: 4rem;
        h1{
            float: left;
            width: 95%;
        }
    }
    .payment-form-container{
      margin-top: 5vh;
    }
    .payment-content{
      display: flex;
      gap: 2rem;
      .payment{
        margin-top: 5vh;
        flex: 1;
        height: 50%;
      }
    }
    .help{
      position: absolute;
      bottom: 2vh;
      right: 3vh;
      border-radius: 50%;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      vertical-align: center;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      background: var(--default-gradient);
      &:hover{
        cursor: pointer;
        opacity: 90%;
      }
      .help-button{
        font-family: inherit;
        color: white;
        right: 8px;
        bottom: 10px;
        font-size: 30px;
      }
    }
    .arrow-icons {
      position: relative;
      display: flex;
      gap: 92%;
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
`;

export default RegularPayments