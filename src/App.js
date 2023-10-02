import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

// 'https://cdn.cur.su/api/latest.json'

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('TJS');
  const [fromPrice, setFromPrice] = useState(0)
  const [toCurrency, setToCurrency] = useState('USD');
  const [toPrice, setToPrice] = useState(0)
  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then((json) => {
        setRates(json.rates)
        console.log(json.rates)
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
    setToPrice(value)
  }

  const onСhangeFromCurrency = (cur) => {
    setFromCurrency(cur);
    onChangeFromPrice(fromPrice)
  }


  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={onСhangeFromCurrency}
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