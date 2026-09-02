const BASE_URL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const updateMsg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected"
        } else if(select.name === "to" && currCode==="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}${fromCurr.value}`;
    // console.log(URL);

    try{
        let response = await fetch(URL);
        const jsonRes = await response.json();
        let rate = jsonRes.rates[toCurr.value];

        // console.log(toCurr.value);
        // console.log(jsonRes);
        // console.log(rate);
        // console.log(amtVal);

        let finalAmount = Number(amtVal) * rate;
        let roundedAmount = Number(finalAmount.toFixed(2));
        updateMsg.innerText = `${amtVal} ${fromCurr.value} = ${roundedAmount} ${toCurr.value}`;
    }catch(error){
        console.log(error);
    }
        
}

window.addEventListener("load", () => {
    updateExchangeRate();
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();

    updateMsg.innerText = "---- = ----";
    
    updateExchangeRate();    
});

