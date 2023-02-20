import React from 'react';

function CurrencySelector({currencies, currencyId, setCurrencyId}) {
    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    return (
        <select value={currencyId} onChange={changeCurrency} className="btn btn-default client__details">
            {currencies.map(currency => {
                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
            })}
        </select>
    )
}

export default CurrencySelector;
