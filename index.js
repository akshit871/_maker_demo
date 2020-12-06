const fs = require("fs");
const obj2 = {
  vMnU_1_BUTTON_TOP_LEVEL: {
    font: {
      color: "#d80e0e",
      "font-family": "consolas",
      "font-size": "45px",
      "font-weight": "980",
    },
    size: {
      width: "198px",
      height: "230px",
      "min-width": "0px",
      "min-height": "0px",
      "max-width": "0px",
      "max-height": "0px",
      overflow: "px",
    },
  },
  KfHi_2_BUTTON_SPAN: {
    layout: {
      display: "flex",
      direction: "row-reverse",
      wrap: "wrap-reverse",
      "justify-content": "space-between",
      "align-content": "end",
    },
    margin: {
      "margin-top": "5px",
      "margin-right": "13px",
      "margin-bottom": "10px",
      "margin-left": "9px",
    },
    padding: {
      "padding-top": "4px",
      "padding-right": "4px",
      "padding-bottom": "3px",
      "padding-left": "4px",
    },
    border: {
      "border-style": "inset",
      "border-width": "11px",
      "border-color": "#8fe60e",
      "border-radius": "9px",
    },
    size: {
      width: "7px",
      height: "8px",
      min_width: "2px",
      min_height: "2px",
      max_width: "20px",
      max_height: "20px",
      overflow: "hiddenpx",
    },
    background: {
      "background-color": "#3a19e0",
      "background-image": "",
      "background-repeat": "no-repeat",
      "background-position": "top",
      opacity: "0.39",
    },
    font: {
      color: "#e41919",
      "font-family": "helvetica",
      "font-size": "22px",
      "font-weight": "980",
    },
  },
};
let s = `import '../../modules';\n\n\n`;
const tabbify = (n) => Array(n).fill(" ").join("");

function prettyPrint(data) {
  let tabbify = (n) => Array(n).fill(" ").join("");

  let traverse = (data, tab = 1) => {
    let output = "",
      open = `{\n`,
      close = `\n${tabbify(tab - 1)}}`;

    output += open;

    Object.entries(data).forEach(([key, val], i, { length }) => {
      if (typeof val === "string") {
        output += `${tabbify(tab)} "${key}": "${val}"`;
      } else if (typeof val === "object") {
        output += open;
        if (Object.keys(val).length > 0) {
          output += `,\n${tabbify(tab)} "${key}": ${traverse(val, tab + 2)}${
            i === length - 1 ? "" : ",\n"
          }`;
          output += close;
        } else {
          output += `,\n${tabbify(tab)} "${key}": {}`;
        }
      }
    });

    output += close;
    return output;
  };

  return traverse(data);
}
// console.log(prettyPrint(obj2));
Object.entries(obj2).forEach(([key, val], i, { len }) => {
  s += `${tabbify(1)}.${key} {\n\n`;
  Object.entries(val).forEach(([k2, v2], i2, { len2 }) => {
    s += `${tabbify(3)}&.${k2} {\n`;
    Object.entries(v2).forEach(([k3, v3], i3, { len3 }) => {
      s += `${tabbify(5)}${k3}:${v3};\n`;
    });
    s += `${tabbify(3)}}\n\n`;
  });
});

console.log(s);

function prettyPrint(data) {
  let tabbify = (n) => " ".repeat(n);

  let traverse = (data, tab = 1) => {
    let output = "",
      open = `\n`,
      close = `\n${tabbify(tab - 1)}}`;

    output += open;
    Object.entries(data).forEach(([key, val], i, { length }) => {
      if (typeof val === "string") {
        if (val != "" && val != 0) output += `${tabbify(tab)}${key}: ${val}\n`;
      } else if (typeof val === "object") {
        if (Object.keys(val).length > 0) {
          output += `\n${tabbify(tab)} &.${key} {\n${traverse(
            val,
            tab + 5
          )}${tabbify(tab)}}${i === length - 1 ? "" : "\n"}`;
        } else {
          output += `,\n${tabbify(tab)} ${key}: {}`;
        }
      }
    });

    return output;
  };

  return traverse(data);
}
let s2 = prettyPrint(obj2);
console.log(s2);

const path = "./t91.scss";
const storeData = (obj_new, path) => {
  try {
    fs.writeFileSync(path, obj_new);
  } catch (err) {
    throw err;
  }
};
storeData(s, path);
