const bist = ["THYAO","GARAN","ASELS","KRDMD","EREGL"];

async function scan(){

 document.getElementById("scan").innerHTML = "Tarama yapılıyor...";

 let out = "";

 for (let s of bist){

  try{

   const r = await fetch(
   "https://financialmodelingprep.com/api/v3/quote/"+s+".IS?apikey=demo"
   );

   const d = await r.json();

   if(!d || !d[0]){
    out += s + " veri alınamadı<br>";
    continue;
   }

   const price = d[0].price;

   if(price < 50){
    out += "🟢 " + s + " uygun fiyat bölgesi ("+price+")<br>";
   }else{
    out += "⚪ " + s + " pahalı ("+price+")<br>";
   }

  }catch(e){
   out += s + " hata oluştu<br>";
  }

 }

 document.getElementById("scan").innerHTML = out;
}
