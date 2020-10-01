import React, {Component} from 'react';
import {CountryBlock} from '../../Components/CountryBlock/CountryBlock'
import {Preloader} from '../../Components/Preloader/Preloader'
import {NotFounded} from '../../Components/NotFounded/NotFounded'
import './App.css'

/**
 * Контейнер отрисовывающий компоненты приложения и содержащий логику работы
 * @param {Array} countriesData Массив с полученным с сервера данными
 * @param {Number} activeLimit Выбранное количество отображаемых записей
 * @param {Array} limit Массив с возможным количеством отображаемых записей
 * @param {String} value Значение строки ввода названия страны
 * @param {Boolean} isLoading Переключатель лоадера
 * @param {Function} handleChangeCountries Обработчик ввода данных в поле
 * @param {Function} handleChangeLimit Обработчик переключения количества отображаемых записей

*/

export class App extends Component {
    state = {
        countriesData: [],
        activeLimit: 10,
        limit: [10, 20, 50],
        value: '',
        isLoading: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        setTimeout(() => {
            fetch('https://restcountries.eu/rest/v2/all')
                .then(res => res.json())
                .then((result) => {
                    this.setState({
                        countriesData: result
                    })
                },
                    (error) => {
                        console.log(error)
                    }
                )
            this.setState({
                isLoading: false
            })
        }, 0)
    }

    handleChangeCountries(event) {
        this.setState({
            value: event.target.value,
            isLoading: true
        });
        setTimeout(() => {
            let api = this.state.value === '' ?
                'https://restcountries.eu/rest/v2/all' :
                `https://restcountries.eu/rest/v2/name/${this.state.value}`

            fetch(api)
                .then(res => res.json())
                .then((result) => {
                    this.setState({
                        countriesData: result
                    })
                },
                    (error) => {
                        console.log(error)
                    }
                )
            this.setState({
                isLoading: false
            })
        }, 0)
    }

    handleChangeLimit(event) {
        this.setState({ activeLimit: event.target.value });
    }

    render() {
        this.handleChangeCountries = this.handleChangeCountries.bind(this)
        this.handleChangeLimit = this.handleChangeLimit.bind(this)

        let countryBlockElements = Array.isArray(this.state.countriesData) ? this.state.countriesData.slice(0, this.state.activeLimit)
            .map((country, key) => <CountryBlock key={key} country={country.name} />) : <NotFounded />

        let optionElements = this.state.limit.map(number => <option key={number} value={number}>{number}</option>)

        return (
            <div className="App">
                <div>
                    <form >
                        <input
                            type="text"
                            placeholder="Country name"
                            value={this.state.value}
                            onChange={this.handleChangeCountries}
                            autoFocus
                        />
                        <select value={this.state.activeLimit} onChange={this.handleChangeLimit}>
                            {optionElements}
                        </select>
                    </form>
                </div>
                {
                    this.state.isLoading ? <Preloader /> :
                    <div className="App__countryBlockWrap">
                        {countryBlockElements}
                    </div>
                }
            </div>
        )
    }
}


