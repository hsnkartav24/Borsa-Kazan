function renderPortfolio(){
 const pf=JSON.parse(localStorage.portfolio);
 let html="";
 for(let s in pf){
  if(pf[s]>0) html+=s+" : "+pf[s]+" lot<br>";
 }
 document.getElementById("portfolio").innerHTML=html;
}
renderPortfolio();
