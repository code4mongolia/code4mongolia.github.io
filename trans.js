import { CSV } from "https://js.sabae.cc/CSV.js";

addEventListener("load", async () => {
  const lang0 = navigator.language;
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || lang0;
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
