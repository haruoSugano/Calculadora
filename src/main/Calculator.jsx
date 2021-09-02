import React, { Component } from 'react'
import './calculator.css'

import Buttons from '../components/Buttons'
import Display from '../components/Display'
 // Aplicar um estado inicial
const initialState = {
    displayValue: '0', // Valor que está sendo exibido no display da calculadora
    clearDisplay: false, // Se ele precisa ou não limpar o display
    operation: null, // Variável que será necessário para o armazenamento de + - / *
    values: [0, 0], // array para armazenar dois valores ex: x + y
    current: 0 // Valor atual sendo manipulado
}

export default class Calculator extends Component {

    state = { ...initialState } // atribuindo ao clone o initialState

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    /**
     * Voltando o estado inicial do display
     */
    clearMemory(){
        this.setState({ ...initialState })
    }
    /**
     * Manipulando as operações
     * @param {*} operation 
     */
    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        }
        else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) // pega o primeiro valor armazena o tipo de operaçao pega o segundo  -> armazendo no [0]
            }
            catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0
            
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    /**
     * Adicionando digitos
     */
    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) { // evitar para ter dois pontos
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay // display que contém o único 0 
        
        const currentValue = clearDisplay ? '' : this.state.displayValue 
        
        const displayValue = currentValue + n

        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} /> 
                <Buttons label="AC" click={this.clearMemory} triple/>
                <Buttons label="/" click={this.setOperation} operation/>
                <Buttons label="7" click={this.addDigit}/>
                <Buttons label="8" click={this.addDigit}/>
                <Buttons label="9" click={this.addDigit}/>
                <Buttons label="*" click={this.setOperation} operation/>
                <Buttons label="4" click={this.addDigit}/>
                <Buttons label="5" click={this.addDigit}/>
                <Buttons label="6" click={this.addDigit}/>
                <Buttons label="-" click={this.setOperation} operation/>
                <Buttons label="1" click={this.addDigit}/>
                <Buttons label="2" click={this.addDigit}/>
                <Buttons label="3" click={this.addDigit}/>
                <Buttons label="+" click={this.setOperation} operation/>
                <Buttons label="0" click={this.addDigit} double/>
                <Buttons label="." click={this.addDigit}/>
                <Buttons label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}