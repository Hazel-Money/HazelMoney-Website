import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { useGlobalContext } from '../../context/globalContext'

function Form() {
    const {addIncome} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const {title,amount,date,category,description} = inputState;

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
                    value={title} 
                    name={"title"}
                    placeholder="Salary title" 
                    onChange={handleInput("title")}
                />
            </div>
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
                    id="date" 
                    placeholderText="Enter a date"
                    selected={date} 
                    dateFormat= "dd/MM/yyyy" 
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }} 
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput("category")}>
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                     {/* TODO: ADD DATABASE CATEGORIES */}
                    <option value="other">other</option>
                </select>
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