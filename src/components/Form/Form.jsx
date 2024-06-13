import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { date, plus } from '../../utils/Icons';

registerLocale('pt', pt);
setDefaultLocale('pt');

function Form() {
    const {language, addIncome, Incomescategories, error, setError, accounts, getAccounts } = useGlobalContext();
    const [inputState, setInputState] = useState({
      account_id: '',
      category_id: '',
      amount: '',
      is_income: '1',
      payment_date: '',
      description: ''
    });
  
    const { account_id, amount, payment_date, category_id, description, is_income, useCurrentTime } = inputState;
  
    const handleInput = (name) => (e) => {
      setInputState({ ...inputState, [name]: e.target.value });
      setError('');
    };
  
    const toggleCurrentTime = () => {
        setInputState({
          ...inputState,
          useCurrentTime: !useCurrentTime,
          payment_date: !useCurrentTime ? new Date() : '',
        });
      };
      
    const handleDatePickerChange = (date) => {
      setInputState({ ...inputState, payment_date: date });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const amountInCents = (parseFloat(inputState.amount) * 100).toString();
    
    try {
        await addIncome({ ...inputState, amount: amountInCents });
        setInputState({
          account_id: '',
          category_id: '',
          amount: '',
          is_income: '1',
          payment_date: '',
          description: ''
        });
      } catch (error) {
      }
    };
    

    useEffect(() => {
      getAccounts();
    }, [])
  
    return (
        <FormStyled onSubmit={handleSubmit} autoComplete="off">
          {error && <p className='error'>{error}</p>}
          <div className="input-control">
            <input
              required
              type="text"
              value={amount}
              name={"amount"}
              placeholder={language === 'Portuguese' ? 'Valor da receita' : 'Income amount'}
              onChange={handleInput("amount")}
            />
          </div>
          <div className="input-control">
            <DatePicker
              required
              locale="pt"
              id="payment_date"
              placeholderText={language === 'Portuguese' ? 'Insira uma data' : 'Enter a date'}
              selected={useCurrentTime ? new Date() : payment_date}
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
                bg={"var(--default-gradient)"}
                color={"#fff"}
                hColor={"red"}
                type="button"
            >
            </Button>
          </div>
          <div className="selects input-control">
            <select required value={category_id} name="category_id" id="category_id" onChange={handleInput("category_id")}>
              <option value="" disabled>{language === 'Portuguese' ? 'Selecionar categoria' : 'Select category'}</option>
              {Incomescategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
            <textarea
              value={description}
              name={"description"}
              id="description"
              placeholder={language === 'Portuguese' ? 'Insira uma descrição' : 'Enter a description'}
              cols="30"
              rows="4"
              onChange={handleInput("description")}
            />
          </div>
          <div className="submit-btn">
            <Button
              name={language === 'Portuguese' ? 'Adicionar receita' : 'Add income'}
              icon={plus}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              color={"#fff"}
              hColor={"red"}
            />
          </div>
        </FormStyled>
      );
    }

const FormStyled = styled.form`
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
        border: 2px solid var(--border-color);
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: var(--primary-color);
        &::placeholder{
            color: var(--primary-color3);
        }
    }

    .datepicker-disabled {
        color: var(--primary-color3);
        cursor: not-allowed; 
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
            color: var(--primary-color3);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            background: var(--default-gradient);
            &:hover{
                cursor: pointer;
                opacity: 90%;
            }
        }
    }
`;

export default Form