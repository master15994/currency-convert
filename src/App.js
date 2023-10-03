import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

// 'https://www.cbr-xml-daily.ru/latest.js'

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('TJS');
  const [fromPrice, setFromPrice] = useState(1)
  const [toCurrency, setToCurrency] = useState('USD');
  const [toPrice, setToPrice] = useState(1)
  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then((json) => {
        setRates(json.rates)
        onChangeToPrice(1)

      })
      .catch(err => {
        console.warn(err)
        alert('Ошибка')
      })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency]
    setToPrice(result)
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency])
    setFromPrice(result)
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [])


  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [])




  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;