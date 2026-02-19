if(!localStorage.balance) localStorage.balance=100000;
if(!localStorage.portfolio) localStorage.portfolio="{}";
if(!localStorage.history) localStorage.history="[]";

function updateBalance(){
 document.getElementById("balance").innerText =
 Number(localStorage.balance).toFixed(2);
}
updateBalance();

async function getPrice(symbol="THYAO"){
 const r = await fetch(
 "https://financialmodelingprep.com/api/v3/quote/"+symbol+".IS?apikey=demo"
 );
 const d = await r.json();
 const p=d[0].price;
 document.getElementById("price").innerText=p;
 return p;
}

getPrice();

function saveHistory(type,symbol,lot,price){
 let h=JSON.parse(localStorage.history);
 h.push({type,symbol,lot,price,date:new Date()});
 localStorage.history=JSON.stringify(h);
 renderHistory();
}

async function buy(){
 const s=symbol.value;
 const l=Number(lot.value);
 const p=await getPrice(s);
 const cost=l*p;

 if(localStorage.balance>=cost){
  localStorage.balance-=cost;

  let pf=JSON.parse(localStorage.portfolio);
  pf[s]=(pf[s]||0)+l;
  localStorage.portfolio=JSON.stringify(pf);

  saveHistory("AL",s,l,p);
  updateBalance();
  renderPortfolio();
 }
}

async function sell(){
 const s=symbol.value;
 const l=Number(lot.value);
 const p=await getPrice(s);

 let pf=JSON.parse(localStorage.portfolio);
 if((pf[s]||0)>=l){
  pf[s]-=l;
  localStorage.portfolio=JSON.stringify(pf);

  localStorage.balance=Number(localStorage.balance)+l*p;

  saveHistory("SAT",s,l,p);
  updateBalance();
  renderPortfolio();
 }
}
