function hslToHex(h:number, s:number, l:number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n:number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `0x${f(0)}${f(8)}${f(4)}`;
}

export default function RGBToHex(colorstring: string) {
  if (colorstring.charAt(0) == "#"){
    colorstring = colorstring.replace("#", "0x");
    return colorstring;
  }
  if (colorstring.charAt(0) == "r") {
    // Choose correct separator
    const sep = colorstring.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    const rgbArray = colorstring.substr(4).split(")")[0].split(sep);
  
    let r = (+rgbArray[0]).toString(16),
        g = (+rgbArray[1]).toString(16),
        b = (+rgbArray[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "0x" + r + g + b;
  }
  if (colorstring.charAt(0) == "h") {

    const hslArray = colorstring.substr(4).split(")")[0].split(",");
    const h = Number(hslArray[0]);
    const s = Number(hslArray[1].replace("%", ""));
    const l = Number(hslArray[2].replace("%", ""));

    return hslToHex(h, s, l);
  }
}