import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { date, plus } from '../../utils/Icons';

registerLocale('pt', pt);
setDefaultLocale('pt');

function Form() {
    const { addIncome, categories, getIncomes } = useGlobalContext();
    const [inputState, setInputState] = useState({
      account_id: '12',
      category_id: '',
      amount: '',
      is_income: '1',
      payment_date: '',
      description: ''
    });
  
    const { account_id, amount, payment_date, category_id, description, is_income, useCurrentTime } = inputState;
  
    const handleInput = (name) => (e) => {
      setInputState({ ...inputState, [name]: e.target.value });
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addIncome(inputState);
      getIncomes();
    };
  
    return (
        <FormStyled onSubmit={handleSubmit} autoComplete="off">
          <div className="input-control">
            <input
              type="text"
              value={amount}
              name={"amount"}
              placeholder="Income amount"
              onChange={handleInput("amount")}
            />
          </div>
          <div className="input-control">
            <DatePicker
              locale="pt"
              id="payment_date"
              placeholderText="Enter a date"
              selected={useCurrentTime ? new Date() : payment_date}
              dateFormat="Pp"
              showTimeSelect
              disabled={useCurrentTime}
              onChange={handleDatePickerChange}
              className={useCurrentTime ? 'datepicker-disabled' : ''}
            />
            <Button
                onClick={toggleCurrentTime}
                name={useCurrentTime ? 'Choose' : 'Now'} 
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
          <div className="selects input-control">
            <select required value={category_id} name="category_id" id="category_id" onChange={handleInput("category_id")}>
              <option value="" disabled>Select Option</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-control">
            <textarea
              value={description}
              name={"description"}
              id="description"
              placeholder="Enter a description"
              cols="30"
              rows="4"
              onChange={handleInput("description")}
            />
          </div>
          <div className="submit-btn">
            <Button
              name={"Add income"}
              icon={plus}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
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
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .datepicker-disabled {
        color: rgba(34, 34, 96, 0.4);
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
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;            
            }
        }
    }
`;

export default Form