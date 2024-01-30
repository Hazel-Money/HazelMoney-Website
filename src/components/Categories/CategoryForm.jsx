import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useGlobalContext } from '../../context/globalContext';
import * as Icons from '../../utils/Icons';


function CategoryForm() {
  const {error, setError, getUserFromCookies, addCategory } = useGlobalContext();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedIconName, setSelectedIconName] = useState(null);
  const user = getUserFromCookies();
  const [inputState, setInputState] = useState({
    user_id: user.id,
    name: '',
    is_income: '',
    icon: '',
    color: '',
  });

  const { user_id, name, is_income, icon, color } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory({...inputState, user_id: user_id});
    setInputState({
      user_id: user.id,
      name: '',
      is_income: '',
      icon: '',
      color: '',
    })
  };

  const handleIconSelect = (icon, iconName) => {
    setSelectedIcon(icon);
    setSelectedIconName(iconName);
    setInputState({ ...inputState, icon: iconName });
  };
  
  return (
    <CategoryFormStyled onSubmit={handleSubmit} autoComplete="off">
      <div className="form-content">
        <div className="form-inputs">
          <div className="input-control">
            <input
              required
              type="text"
              value={name}
              name="name"
              placeholder="Category name"
              onChange={handleInput("name")}
            />
          </div>
          <div className="selects input-control">
            <select
              required
              value={is_income}
              name="is_income"
              id="is_income"
              onChange={handleInput("is_income")}
            >
              <option value="" disabled>Select Option</option>
              <option value="1">Income</option>
              <option value="0">Expense</option>
            </select>
          </div>
          <div className="color-picker">
            <label>Color picker</label>
            <input
              required
              type="color"
              value={color}
              name="color"
              placeholder="color"
              onChange={handleInput("color")}
            />
          </div>
          <div className="submit-btn">
            <Button
              name={"Add Category"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              hColor={"red"}
            />
          </div>
        </div>
        <div className="preview-section">
            {selectedIcon && (
              <div
                className="selected-icon"
                style={{ color: color }}
              >
                {selectedIcon}
              </div>
            )}
          </div>
        <div className="icon-selection">
          <label>Select Icon:</label>
          <div className="icon-container">
            {Object.keys(Icons).map((iconName) => (
              <div
                key={iconName}
                className={`icon ${
                  selectedIcon === Icons[iconName] ? 'selected' : ''
                }`}
                onClick={() => handleIconSelect(Icons[iconName], iconName)}
              >
                {Icons[iconName]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CategoryFormStyled>
  );
    }

const CategoryFormStyled = styled.form`
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

    .submit-btn{
      button{
        float: left;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover{
            background: var(--color-green) !important;            
        }
      }
    }
`;

export default CategoryForm