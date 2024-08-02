const nameParts = fullName.split(" ");

let firstName = nameParts[0];
let lastName = nameParts.slice(1).join(" ");

const suffixes = ["Jr", "Sr", "II", "III", "IV", "V"];
if (suffixes.includes(nameParts[nameParts.length - 1])) {
  lastName = nameParts.slice(1, nameParts.length - 1).join(" ");
  lastName += ` ${nameParts[nameParts.length - 1]}`;
}

const cardClick = () => {
  setView((prevView) => (prevView + 1) % 3);
};

const formatDecimal = (number) => {
  if (isNaN(number)) {
    return number;
  }
  return parseFloat(number).toFixed(2);
};
