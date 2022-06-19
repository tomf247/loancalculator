const form = document.getElementById('form');


form.addEventListener('submit', e => {

	e.preventDefault();

    let loan = new LoanObject();
    
	if (loan.validate()) {

        loan.calcMonthlyPayment();     // A fixed amount paid each period.	
    }
}
);

class LoanObject {

	constructor() {

		// Obtain the HTML input elements and the values contained in them.

		this.loanAmount = document.getElementById('loan-amount');
		this.interestRate = document.getElementById('interest-rate');
		this.loanTenure = document.getElementById('loan-tenure');
		this.loanAmountValue = parseFloat(this.loanAmount.value);
		this.interestRateValue = parseFloat(this.interestRate.value);
		this.loanTenureValue = parseFloat(this.loanTenure.value);
	}
	
	validate () {

		let amountValidated, rateValidated, tenureValidated, inputsValidated = false;
		

		if(isNaN(this.loanAmountValue)) {
			amountValidated = false;
			setErrorFor(this.loanAmount, 'The loan amount should not be blank');
		}else if(this.loanAmountValue === '') {
			amountValidated = false;
			setErrorFor(this.loanAmount, 'The loan amount should not be blank');
		} else if (this.loanAmountValue < 1){
			amountValidated = false;
			setErrorFor(this.loanAmount, 'The loan amount must be greater than one');
		} else if (this.loanAmountValue % 1 != 0){
			amountValidated = false;
			setErrorFor(this.loanAmount, 'Numeric digits, no decimals please');
		} else {
			amountValidated = true;
			setSuccessFor(this.loanAmount);
		}

		
		if(isNaN(this.interestRateValue)) {
			rateValidated = false;
			setErrorFor(this.interestRate, 'The interest rate should not be blank');
		} else if (this.interestRateValue <= 0){
			rateValidated = false;
			setErrorFor(this.interestRate, 'The interest rate should not be negative');
		} else {
			rateValidated = true;
			setSuccessFor(this.interestRate);
		}
		
		
		if(this.loanTenureValue === '') {
			tenureValidated = false;
			setErrorFor(this.loanTenure, 'The loan term cannot be blank');
		} else if (this.loanTenureValue < 1){
			tenureValidated = false;
			setErrorFor(this.loanTenure, 'The term should not be negative');
		} else if (this.loanTenureValue % 1 != 0){
			tenureValidated = false;
			setErrorFor(this.loanTenure, 'Numeric digits, no decimals please');
		} else {
			tenureValidated = true;
			setSuccessFor(this.loanTenure);
		}

		
		inputsValidated = (amountValidated && rateValidated && tenureValidated);

		return inputsValidated; // true or false
			
	}

    calcMonthlyPayment () {

		// as per industry standard

		this.monthlyPayment =

		  this.loanAmountValue * (this.interestRateValue / 100 / 12) *

		  Math.pow(1 + this.interestRateValue / 100 / 12, this.loanTenureValue) /

		  (Math.pow(1 + this.interestRateValue / 100 / 12, this.loanTenureValue) - 1);
		
		// output to the viewport

		document.getElementById('amt').innerHTML = this.loanAmountValue.toLocaleString();
		document.getElementById('pmt').innerHTML = this.monthlyPayment.toFixed(2);
		document.getElementById('period').innerHTML = this.loanTenureValue.toLocaleString();

		return this.monthlyPayment;
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}


function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}