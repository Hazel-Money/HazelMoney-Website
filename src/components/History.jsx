import React from "react";
import styled from "styled-components";
import avatar from "../assets/avatar.png";


function History() {
    return (
        <Section>
            <div className="orders">
                <div className="orders_details">
                    <div>
                        <h4>History</h4>
                    </div>
                    <div>
                        <h6>Transection of last months</h6>
                    </div>
                </div>
                <div className="orders_table">
                    <table>
                        <tr>
                            <td><img src={avatar}/></td>
                            <td>Car insurance</td>
                            <td>14:10:31AM</td>
                            <td>$350.00</td>
                            <td>Complete</td>
                        </tr>
                    </table>
                </div>
            </div>
        </Section>
    )
}

export default History
const Section = styled.section`
    .orders{
        margin-top: 4rem;
        color: black;
        width: 100%;
        .orders_details{
            display:flex;
            justify-content: space-between;
            margin: 1rem 1rem;
            div{
                display: flex;
                gap: 1rem;
                color: gray;
            }
        }
        .orders_table{
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            table{
                border-collapse: collapse;
                width: 100%;
                td {
                    text-align: center;
                    padding: 5px;
                    justify-content: space-evenly;
                    img {
                        height: 2.5rem;
                        width: 2.5rem;
                        border-radius: 3rem;
                    }
                }
            }

        }
    }
`;