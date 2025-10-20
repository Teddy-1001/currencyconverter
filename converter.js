const converterForm= document.getElementById("converterForm");
const fromCurrency= document.getElementById("from-currency");
const toCurrency= document.getElementById("to-currency");
const amountInput= document.getElementById("amount");
const resultOutput= document.getElementById("result");

window.addEventListener("load", fetchCurrencies)

converterForm.addEventListener("submit", convertCurrency)





async function fetchCurrencies(){
   //2fd76783ef1ec5b868cc761c
   const res = await fetch("https://v6.exchangerate-api.com/v6/2fd76783ef1ec5b868cc761c/latest/USD")
   const data = await res.json();
   console.log(data);
   const currencyOption = Object.keys(data.conversion_rates)
   
    currencyOption.forEach(currency=>{
        const option1=document.createElement("option")
        option1.value=currency;
        option1.textContent=currency;
        fromCurrency.appendChild(option1)

        const option2=document.createElement("option")
        option2.value=currency;
        option2.textContent=currency;
        toCurrency.appendChild(option2)

    })

}



async function convertCurrency(e){
    e.preventDefault()

    const amount= parseFloat(amountInput.value)
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (amount<0) {
        alert("Please enter a valid amount");
        return;
    }
    const res = await fetch (`https://v6.exchangerate-api.com/v6/2fd76783ef1ec5b868cc761c/latest/${fromCurrencyValue}`)
    const data=  await res.json();

    const rate = data.conversion_rates[toCurrencyValue]
    const convertedAmount = (amount * rate).toFixed(2)

    resultOutput.textContent=`${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;

}