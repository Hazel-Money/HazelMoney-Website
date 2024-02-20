import React, { useEffect, useState  }from 'react'
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form'
import IncomeItem from '../IncomeItem/IncomeItem';
import DetailedIncomeInfo from '../IncomeItem/ItemInformation'
import hazelMoneyIcon from '../../img/hazelmoneyIcon.png'

function currencyFormat(num) {
  return (num/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function Income() {
  const {language, accountCurrency, getAccountCurrency,accountIncome, addIncome,accountIncomeAmount , sliceIncomes, currentIncomeIndex, incomesSliced, navigateIncomes, getIncomes, deleteIncomes, totalIncomeAmount, getIncomesCategories, totalIncome, incomes} = useGlobalContext()
  
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  useEffect(() => {
    sliceIncomes();
  }, [currentIncomeIndex, incomes]);

  useEffect(() => {
    getAccountCurrency();
    getIncomes();
    getIncomesCategories();
    sliceIncomes();
    accountIncome()
  }, []);

  const handleTransactionItemClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        <div className="top">
          <h1>{language === 'Portuguese' ? 'Receitas' : 'Incomes'}</h1>
        </div>
        <h2 className="total-income">{language === 'Portuguese' ? 'Total ganho: ' : 'Total income: '}<span>{accountCurrency}{currencyFormat(accountIncomeAmount)}</span></h2>
        <div className="income-content">
          <div className="form-container">
              <Form />
          </div>
          <div className="incomes"> 
            {incomesSliced.map((income) => {
              const {id, account_id , categoryName, currency, amount, is_income, payment_date, description, icon, categoryColor} = income;
              return <IncomeItem 
                  key={id}
                  id={id}
                  account_id={account_id}
                  category={categoryName}
                  amount={amount}
                  is_income={is_income}
                  payment_date={payment_date}
                  description={description}
                  icon={icon}
                  color={categoryColor}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncomes}
                  currency={currency}
                  onSelect={handleTransactionItemClick}
              />
            })}
            <div className="arrow-icons">
              <i
              className={currentIncomeIndex > 0 ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-left disabled"}
              onClick={() => navigateIncomes('prev')}
              />
              <i
              className={currentIncomeIndex + 2 < incomes.length ? "fa-solid fa-arrow-right" : "fa-solid fa-arrow-right disabled"}
              onClick={() => navigateIncomes('next')}
              />
            </div>
          </div>
        </div>
        
      </InnerLayout>
      {selectedTransaction && <DetailedIncomeInfo transaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} />}

    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
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
    .total-income{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-green);
      }
    }
    .income-content{
      display: flex;
      gap: 2rem;
      position: relative;
      .incomes{
        flex: 1;
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

export default Income