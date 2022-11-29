const tipsBtns = document.querySelectorAll('#tipBtn');
const btnReset = document.querySelector('.btn--reset');

const customTipInput = document.querySelector('#customTip');
const billInput = document.querySelector('#billInput');
const numberPeopleInput = document.querySelector('#guestNumber');

const tipAmountDisplay = document.querySelector('#tipAmount');
const totalAmountDisplay = document.querySelector('#totalAmount');
const errorPopup = document.querySelectorAll('#error');

billInput.value = '';
numberPeopleInput.value = '';
customTipInput.value = '';

let tipOption;

// Event Listeners
customTipInput.addEventListener('blur', customTipToPercent);
billInput.addEventListener('blur', calculateTip);
numberPeopleInput.addEventListener('blur', calculateTip);
btnReset.addEventListener('click', e => {
  e.preventDefault();
  resetApp();
});

// Getting the tip value from each button
tipsBtns.forEach(tip => {
  tip.addEventListener('click', function () {
    tipOption = parseFloat(tip.innerHTML);
    const tipValue = tipOption / 100;
    calculateTip(tipValue);
  });
});

// calcuate the tip and display amount
function calculateTip(tipValue) {
  if (billInput.value === '' || numberPeopleInput.value === '') renderError();
  else {
    const tipCalculated =
      (billInput.value * tipValue) / numberPeopleInput.value;
    const totalBillPerPerson =
      parseInt(billInput.value) / numberPeopleInput.value + tipCalculated;

    displayUI(tipCalculated, totalBillPerPerson);
  }
}

// convert the custom tip into a percent
function customTipToPercent() {
  const tipPercent = customTipInput.value / 100;
  calculateTip(tipPercent);
}

// create error message if number of people or bill input is 0
function renderError() {
  const html = `<p class="error">Can't be zero</p>`;
  errorPopup.forEach(cur => cur.insertAdjacentHTML('beforeend', html));
  billInput.style.border = '2px solid red';
  numberPeopleInput.style.border = '2px solid red';

  setTimeout(() => {
    billInput.style.border = 'none';
    numberPeopleInput.style.border = 'none';
    document.querySelectorAll('.error').forEach(p => p.remove());
  }, 3000);
}

// display the tip and total
function displayUI(tipCalculated, totalBillPerPerson) {
  tipAmountDisplay.innerText = '$' + tipCalculated.toFixed(2);
  totalAmountDisplay.innerText = '$' + totalBillPerPerson.toFixed(2);
}

// Reset inputs and display when reset button clicked
function resetApp() {
  billInput.value = '';
  numberPeopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.innerText = '$' + '0.00';
  totalAmountDisplay.innerText = '$' + '0.00';
}
