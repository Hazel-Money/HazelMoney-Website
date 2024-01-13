import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { useGlobalContext } from '../../context/globalContext'

function Form() {
    const {addIncome} = useGlobalContext()
    const [inputState, setInputState] = useState({
        account_id: '12',
        category_id: '',
        amount: '',
        is_income:'1',
        payment_date: '',
        description: ''
    })

    const {account_id,amount,payment_date,category_id,description,is_income} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input 
                    type="text" 
                    value={amount} 
                    name={"amount"} 
                    placeholder="Salary amount" 
                    onChange={handleInput("amount")}
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id="payment_date" 
                    placeholderText="Enter a date"
                    selected={payment_date} 
                    dateFormat= "dd/MM/yyyy" 
                    onChange={(payment_date) => {
                        setInputState({...inputState, payment_date: payment_date})
                    }} 
                />
            </div>
            <div className="selects input-control">
                <select required value={category_id} name="category_id" id="category_id" onChange={handleInput("category_id")}>
                    <option value="" disabled>Select Option</option>
                    <option value="1">Salary</option>
                     {/* TODO: ADD DATABASE CATEGORIES */}
                    <option value="other">other</option>
                </select>
            </div>
            <div className="input-control">
                <input 
                    type="description" 
                    value={description} 
                    name={"description"} 
                    placeholder="Enter a description" 
                    onChange={handleInput("description")}
                />
            </div>
            <div className="submit-btn">
                <button>Add income</button>
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    
`;

export default Form