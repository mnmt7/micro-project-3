let res = "";
const controlsEl = document.querySelector(".controls");
const displayEl = document.querySelector(".display");

controlsEl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  let text = e.target.textContent;

  if (text === "Del") {
    res = res.substring(0, res.length - 1);
  } else if (text === "Reset") {
    res = "";
  } else if (text === "=") {
    let exp = "";
    for (let char of res) {
      exp += char === "x" ? "*" : char;
    }

    try {
      res = String(eval(exp));
    } catch (e) {
      console.log("error");
      displayEl.innerHTML = '<span style="color: red;">Wrong Input</span>';
      setTimeout(() => (displayEl.textContent = res), 1000);
      return;
    }
  } else {
    const lastChar = res.charAt(res.length - 1);

    if (isOperator(text) && isOperator(lastChar)) {
      res = res.substring(0, res.length - 1);
    } else if (isOperator(text) || isOperator(lastChar)) {
      res += " ";
    }
    res += text;
  }

  if (res.length === 0) {
    displayEl.innerHTML = '<span class="placeholder">0</span>';
  } else {
    displayEl.textContent = res;
  }
});

function isOperator(s) {
  return s == "+" || s == "-" || s == "/" || s == "x";
}
