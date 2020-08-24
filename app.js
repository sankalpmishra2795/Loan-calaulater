// listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // showresult
  document.getElementById("result").style.display = "none";
  // show loder
  document.getElementById("loading").style.display = "block";
  setTimeout(calcuateResult, 3000);

  e.preventDefault();
});

//  calculat result
function calculateResult() {
  console.log("calculating.....");
  //   UI var
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const year = document.getElementById("year");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //   calcuataion
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(year.value) * 12;

  //   compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    document.getElementById("result").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check your number");
  }
}

// show error
function showError(error) {
  // create a div
  const errorDiv = document.createElement("div");

  // get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add a class
  errorDiv.className = "alert alert-danger";

  //
  errorDiv.appendChild(document.createTextNode(error));

  // append child
  card.insertBefore(errorDiv, heading);
  // clear error
  setTimeout(clearError, 3000);
}
// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
