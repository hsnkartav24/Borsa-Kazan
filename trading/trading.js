// başlangıç sanal para
if (!localStorage.balance) {
  localStorage.balance = 100000;
}

function updateBalance(){
  document.getElementById("balance").innerText =
    Number(localStorage.balance).toFixed(2);
}
updateBalance();


// fiyat çekme (örnek API)
async function getPrice(symbol="THYAO"){
  const r = await fetch(
    "https://financialmodelingprep.com/api/v3/quote/"+symbol+".IS?apikey=demo"
  );
  const d = await r.json();
  const price = d[0].price;
  document.getElementById("price").innerText = price;
  return price;
}

getPrice();


// AL
async function buy(){
  const symbol = document.getElementById("symbol").value;
  const lot = Number(document.getElementById("amount").value);

  const price = await getPrice(symbol);
  const cost = lot * price;

  if(localStorage.balance >= cost){
    localStorage.balance -= cost;
    updateBalance();
    alert("Alındı");
  }else{
    alert("Bakiye yetersiz");
  }
}


// SAT
async function sell(){
  const symbol = document.getElementById("symbol").value;
  const lot = Number(document.getElementById("amount").value);

  const price = await getPrice(symbol);
  const gain = lot * price;

  localStorage.balance =
    Number(localStorage.balance) + gain;

  updateBalance();
  alert("Satıldı");
}
