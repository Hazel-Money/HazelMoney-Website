import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useGlobalContext } from '../../context/globalContext';
import { date, plus } from '../../utils/Icons';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);
setDefaultLocale('pt');

function RegularPaymentForm() {
  const {language,setPaymentError, paymentError, addRegularPayment, getUserFromCookies, Incomescategories,Expensescategories, frequencies, accounts, getAccounts  } = useGlobalContext();

  const user = getUserFromCookies();

  const [inputState, setInputState] = useState({
    account_id: '',
    category_id: '',
    frequency_id: '',
    amount: '',
    is_income: '',
    start_date: '',
    description: '',
  });

  const { account_id, category_id, frequency_id, amount, is_income, start_date, description, useCurrentTime } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setPaymentError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountInCents = (parseFloat(inputState.amount) * 100).toString();

    addRegularPayment({...inputState, account_id: account_id, amount: amountInCents });
    setInputState({
        account_id: '',
        category_id: '',
        frequency_id: '',
        amount: '',
        is_income: '',
        start_date: '',
        description: '',
    })
  };

    const toggleCurrentTime = () => {
        setInputState({
        ...inputState,
        useCurrentTime: !useCurrentTime,
        start_date: !useCurrentTime ? new Date() : '',
        });
    };

    const handleDatePickerChange = (date) => {
    setInputState({ ...inputState, start_date: date });
    };

    useEffect(() => {
      getAccounts();
    }, [])
  
  
  return (
    <RegularPaymentFormStyled onSubmit={handleSubmit} autoComplete="off">
      {paymentError && <p className='error'>{paymentError}</p>}
      <div className="form-content">
        <div className="form-inputs">
          <div className="selects input-control">
            <select
              required
              value={is_income}
              name="is_income"
              id="is_income"
              onChange={handleInput("is_income")}
            >
              <option value="" disabled>{language === 'Portuguese' ? 'Tipo' : 'Type'}</option>
              <option value="1">{language === 'Portuguese' ? 'Receita' : 'Income'}</option>
              <option value="0">{language === 'Portuguese' ? 'Despesa' : 'Expense'}</option>
            </select>
          </div>
          <div className="selects input-control">
            <select 
            required 
            value={category_id} 
            name="category_id" 
            id="category_id" 
            onChange={handleInput("category_id")}
            >
              <option value="" disabled>{language === 'Portuguese' ? 'Categoria' : 'Category'}</option>
              {is_income == '0' ? Expensescategories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
                )) : Incomescategories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
                ))}
            </select>
          </div>
          <div className="selects input-control">
            <select 
              required 
              value={frequency_id} 
              name="frequency_id" 
              id="frequency_id" 
              onChange={handleInput("frequency_id")}
            >
              <option value="" disabled>{language === 'Portuguese' ? 'Frequência' : 'How often'}</option>
              {language === 'Portuguese' ? (
                <>
                  <option value="1">Todos os dias</option>
                  <option value="2">Todas as semanas</option>
                  <option value="3">Todos os meses</option>
                  <option value="4">Todos os quartis</option>
                  <option value="5">Todos os anos</option>
                </>
              ) : (
                frequencies.map((frequency) => (
                  <option key={frequency.id} value={frequency.id}>
                    {frequency.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="selects input-control">
            <select required value={account_id} name="account_id" id="account_id" onChange={handleInput("account_id")} >
            <option value="" disabled>{language === 'Portuguese' ? 'Selecionar conta' : 'Select account'}</option>
            {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                {account.name}
                </option>
            ))}
            </select>
          </div>
          <div className="input-control">
            <input
              required
              type="text"
              value={amount}
              name={"amount"}
              placeholder={language === 'Portuguese' ? 'Montante' : 'Payment amount'}
              onChange={handleInput("amount")}
            />
          </div>
          <div className="input-control">
            <DatePicker
              required
              locale="pt"
              id="start_date"
              placeholderText={language === 'Portuguese' ? 'Inserir data' : 'Enter a data'}
              selected={useCurrentTime ? new Date() : start_date}
              dateFormat="Pp"
              showTimeSelect
              disabled={useCurrentTime}
              onChange={handleDatePickerChange}
              className={useCurrentTime ? 'datepicker-disabled' : ''}
            />
            <Button
                onClick={toggleCurrentTime}
                name={useCurrentTime ? (language === 'Portuguese' ? 'Seleciona' : 'Choose') : (language === 'Portuguese' ? 'Agora' : 'Now')} 
                icon={date}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent"}
                color={"#fff"}
                hColor={"red"}
                type="button"
            >
            </Button>
          </div>
          <div className="input-control">
            <input
              required
              type="text"
              value={description}
              name="description"
              placeholder={language === 'Portuguese' ? 'Descrição' : 'Description'}
              onChange={handleInput("description")}
            />
          </div>
          <div className="submit-btn">
            <Button
              name={language === 'Portuguese' ? 'Adicionar pagamento regular' : "Add Regular Payment"}
              bPad={".8rem 1.6rem"}
              icon={plus}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              hColor={"red"}
            />
          </div>
        </div>
      </div>
    </RegularPaymentFormStyled>
  );
    }

const RegularPaymentFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input, textarea, select{
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: .5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder{
          color: rgba(34, 34, 96, 0.4);
      }
    }

    .preview-section{
      margin-right: 8vh;
      margin-top: 30vh;
      font-size: 10vh;
      .selected-icon{
        padding: 5px 15px 0px;
        background-color: rgb(240, 234, 234);
        border-radius: 15%;
      }
    }

    .form-content {
      display: flex;
      gap: 3rem;
    }
    .form-inputs {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      height: 10%;
      .color-picker label{
        margin-right: 4vh;
      }
      .color-picker input{
        height: 8vh;
        width: 13vh;
      }
    }

    .icon-selection {
      display: grid;
      grid-template-rows: repeat(20, 1fr);
      flex-direction: row;
      label {
        margin-bottom: 5px;
        grid-row: 1;
        height: 2vh;
      }
      .icon-container {
        float: right;
        margin-top: 5vh;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
        grid-row: 2 / -1;
      }
      .selected-icon-name {
        margin-top: 10px;
        color: var(--primary-color);
      }
    }

    .icon {
      cursor: pointer;
      border: 2px solid transparent;
      padding: 5px;
    }

    .icon.selected {
      color: var(--primary-color);
    }

    .input-control{
      display: flex;
      align-items: center;
      input{
        width: 100%;
      }
      Button{
        margin-left: 3vh;
        display: flex;
      }
    }

    .selects{
      display: flex;
      justify-content: flex-end;
      align-items:center;
      
      select{
        color: rgba(34, 34, 96, 0.4);
        &:focus, &:active{
            color: rgba(34, 34, 96, 1);
        }
      }
    }
`;

export default RegularPaymentForm