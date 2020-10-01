import React from 'react'
import './CountryBlock.css'

/**
 * Компонент отрисовки наименования страны

*/

export const CountryBlock = (props) => {
    return (
        <ul className="CountryBlock">
            <li>
                {props.country}
            </li>       
        </ul>
    )
}