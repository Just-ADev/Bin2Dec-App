// --------------------
// MODEL
// --------------------

const convertBinaryToDecimal = (binary) => {
  let decimal = 0;

  for (let i = binary.length - 1, exponent = 0; i >= 0; i -= 1) {
    if (binary[i] === "1") {
      decimal += Math.pow(2, exponent);
    }

    exponent += 1;
  }

  return decimal;
};

// --------------------
// VIEW
// --------------------

const nodes = {
  binaryDigits: document.querySelectorAll(".binary__digit"),
  binaryNumber: document.querySelector(".binary__number"),
  decimalNumber: document.querySelector(".decimal__number"),
};

const changeBinaryDigit = (digit) => {
  if (digit.innerText == "0") {
    digit.innerText = "1";
  } else {
    digit.innerText = "0";
  }
};

const updateDecimalNumber = (decimal) => {
  nodes.decimalNumber.innerText = decimal;
};

const getBinaryFromDigits = () => {
  const binary = Array.from(nodes.binaryDigits).reduce(
    (accumulator, current) => (accumulator += current.innerText),
    ""
  );

  return binary;
};

// --------------------
// CONTROLLER
// --------------------

nodes.binaryDigits.forEach((digit) =>
  digit.addEventListener("click", () => {
    changeBinaryDigit(digit);
    const binary = getBinaryFromDigits();
    const decimal = convertBinaryToDecimal(binary);
    updateDecimalNumber(decimal);
  })
);

nodes.binaryNumber.addEventListener("input", (e) => {
  console.log(e);
  if (
    e.data !== "0" &&
    e.data !== "1" &&
    e.inputType !== "deleteContentBackward"
  ) {
    nodes.binaryNumber.value = nodes.binaryNumber.value.slice(0, -1);
  } else {
    const binary = nodes.binaryNumber.value;
    const decimal = convertBinaryToDecimal(binary);
    updateDecimalNumber(decimal);
  }
});
