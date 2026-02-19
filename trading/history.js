function renderHistory(){
 const h=JSON.parse(localStorage.history);
 let html="";
 h.slice().reverse().forEach(t=>{
  html+=`${t.date} | ${t.type} | ${t.symbol} | ${t.lot} | ${t.price}<br>`;
 });
 document.getElementById("history").innerHTML=html;
}
renderHistory();
