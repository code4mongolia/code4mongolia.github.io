import { CSV } from "https://js.sabae.cc/CSV.js";

addEventListener("load", async () => {
  const lang0 = navigator.language;
  const n = lang0.indexOf("_");
  const lang1 = n >= 0 ? lang0.substring(0, n) : lang0;
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || lang1;
  if (lang == "ja") return;
  
  console.log("translate ja to " + lang);
  const data = await CSV.fetchJSON("./trans.csv");
  data.sort((a, b) => b.ja.length - a.ja.length);

  let s = document.body.innerHTML;
  for (const item of data) {
    const t = item[lang];
    if (t) {
      s = s.replace(new RegExp(item.ja, "g"), t);
    }
  }
  document.body.innerHTML = s;
});
