const result = document.getElementById("generate");
const Length = document.getElementById("length");
const upperCase = document.getElementById("uppercase");
const lowerCase = document.getElementById("lowercase");
const number = document.getElementById("numbers");
const symbol = document.getElementById("symbols");
const generate = document.getElementById("passwordGenerate");
const clipboard = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};


clipboard.addEventListener("click", () => {
  const password = result.innerText;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard");
});

generate.addEventListener("click", () => {
  const lengths = +Length.value;
  const hasUpper = upperCase.checked;
  const hasLower = lowerCase.checked;
  const hasNumber = number.checked;
  const hasSymbol = symbol.checked;

  result.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    lengths
  );
});


function generatePassword(lower, upper, number, symbol, lengths) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { number }, { symbol }, { upper }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < lengths; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, lengths);
  return finalPassword;
}



function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[]=<>/,.'
    return symbol[Math.floor(Math.random() * symbol.length)]
}














