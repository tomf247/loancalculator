const form = document.getElementById('form');
let loanChart = ''

form.addEventListener('submit', e => {

	e.preventDefault();
	
	// App flow is directed from this funcion.

	let loan = new LoanObject();
	loan.clearViewport();          // Prevent any prior data from being displayed.

	// The three variables below are for the Chart Object,which needs the DOM for scope.
	data = [];
	labels=[];
	paidToDate = [];
		
		if (loan.validate()) {

			loan.calcMonthlyPayment();     // A fixed amount paid each period.

			loan.buildPaymentPlan();       // Apportions between balance and interest per period.

			loan.buildHTMLTable();         // With the payment plan built, display it to user.

			loan.buildChart();	           // Display the payment plan graphically.
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

    buildPaymentPlan() {
    
		this.paymentPlan = [] ; 
		let _monthlyPayment = this.monthlyPayment;
		let _amountTowardsInterest = 0;
		let _amountTowardsBalance = 0;
		let _runningBalancePaid = this.loanAmountValue;
		let _runningInterestPaid = 0;
	
		for (let _row = 0; _row < this.loanTenureValue; _row++) {

		// another industry standard calculation


		  _amountTowardsInterest = ((this.interestRateValue / 100 / 12) * _runningBalancePaid);
	
		  if (_monthlyPayment > _runningBalancePaid) {
				_monthlyPayment = _runningBalancePaid + _amountTowardsInterest;
		  }

		  _amountTowardsBalance = _monthlyPayment - _amountTowardsInterest;

		  _runningInterestPaid = _runningInterestPaid + _amountTowardsInterest;

		  _runningBalancePaid = _runningBalancePaid - _amountTowardsBalance;


		// Add results to an array. Can be used as basis for further financial modelling.


		  this.paymentPlan[_row] = [

			_row + 1, // Add 1 to zero-based count, for display purposes. 

			parseFloat(_monthlyPayment.toFixed(2)),

			parseFloat(_amountTowardsBalance.toFixed(2)),

			parseFloat(_amountTowardsInterest.toFixed(2)),

			parseFloat(_runningInterestPaid.toFixed(2)),

			parseFloat(_runningBalancePaid.toFixed(2)),

		  ];

		}

		return this.paymentPlan;
		
	}

    buildHTMLTable() {

		// DOM API may be cleaner, here is innerHTML manipulation. Can change in future.
		// Use the Payment Plan object to display table.


		// Opening Tags

		let tbody = document.getElementById('tbody');
		tbody.innerHTML ='';
		let tablerows = '<tr>';


		// One row per payment, with six columns.

		for (let row = 0; row < this.paymentPlan.length; row++) { 

			for (let column = 0; column < 6; column++) {

				tablerows += '<td>' + this.paymentPlan[row][column].toLocaleString() + '</td>';
			}

		  	tablerows += '</tr>';
		}

		// Closing tags

		  tablerows += '</tbody></table>';
		  tbody.innerHTML = tablerows;
	 
	}

    buildChart() {
		if (loanChart) {
			loanChart.destroy();
		  }
		let chartContext = document.getElementById('graph-canvas').getContext("2d");
		data, labels, paidToDate = [];
		for (let amt = 0; amt < this.paymentPlan.length; amt++) {
			data.push(this.paymentPlan[amt][5]);
			labels.push("Month " + (this.paymentPlan[amt][0]));
			paidToDate.push(this.monthlyPayment * (amt + 1));
		}
		loanChart = new Chart(chartContext, {
			type: "bar",
			  data: {
				labels,
				datasets: [
				  {
					label: "Amount Owing",
					data,
					fill: true,
					backgroundColor: "rgba(12, 141, 0, 0.7)",
				  },
				  {
					label: "Payments Made",
					fill: true,
					backgroundColor: "rgba(104, 158, 217, 0.8)",
					data: paidToDate,
				  },
				],
			  },
		}   );
	}

    clearViewport () {

		let tbody = document.getElementById('tbody'); //Empty old table values
		tbody.innerHTML = '';
		document.getElementById('amt').innerHTML = 0.00
		document.getElementById('pmt').innerHTML = 0.00
		document.getElementById('period').innerHTML = 0



		try {   

			if (loanChart) {            // Clear previous chart object (if any).

				loanChart.destroy();
				chartContext = null;
			}

		  }

		   catch(e) {
			let loanChart = ''
			
		 	let chartContext = document.getElementById('graph-canvas').getContext("2d");

		   }
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