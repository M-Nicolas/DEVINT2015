function Combo(queueTime) {
	// Number of seconds that the combo point counter stays active
	this.queueTime = queueTime;
	this.comboScore = 0;
	this.comboNumber = 0;
	// Combo multiplier
	this.multiplier = 0;
	this.range = 1;	// Multiplier increment range
	// Used to calculate the time between two inputs
	this.lastInputTime = 0;
}

Combo.prototype = {
	time: this.time,
	score: this.score,
	number: this.number,
	multiplier: this.multiplier,
	range: this.range,
	lastinputTime: this.inputTime;

	add: function(points) {
		this.lastInputTime = new Date().getTime();
		this.multiplier = ++this.number / this.range;
		this.score += points;
		document.getElementById('combo-points').innerHTML = "Combo points: "+this.score;
		document.getElementById('combo-multiplier').innerHTML = "x"+this.multiplier;
	},

	reset: function() {
		this.score = 0;
		this.multiplier = 0;
		this.number = 0;
		document.getElementById('combo-points').innerHTML = "";
		document.getElementById('combo-multiplier').innerHTML = "";
	}
}
