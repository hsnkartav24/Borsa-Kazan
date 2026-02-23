const API_KEY = "4UWZxxcgBTUT2Qrc5xqfDwRK2CyKoy49";   // <<< kendi key

const bist = ["THYAO","GARAN","ASELS","KRDMD","EREGL"];

async function scan(){

 document.getElementById("scan").innerHTML = "Tarama yapılıyor...";

 let out = "";

 for (let s of bist){

  try{

   const url =
   `https://financialmodelingprep.com/api/v3/quote/${s}.IS?apikey=${API_KEY}`;

   const r = await fetch(url);
   const d = await r.json();

   if(!d || !d[0]){
    out += s + " veri yok<br>";
    continue;
   }

   const price = d[0].price;

   if(price < 50){
    out += "🟢 " + s + " uygun fiyat ("+price+")<br>";
   }else{
    out += "⚪ " + s + " fiyat: "+price+"<br>";
   }

  }catch(e){
   out += s + " hata oluştu<br>";
  }

 }

 document.getElementById("scan").innerHTML = out;
}
