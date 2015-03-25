function Score(queueTime) {
	// Initial score value	
	this.value = 0;
	this.update();
	this.combo = new Combo(queueTime);
}


Score.prototype = {
	value: this.value,
	
	combo: this.combo,
	
	add: function(points) {
		var t = new Date().getTime();
		var inputDifference = t - this.combo.lastInputTime;
		//console.log(inputDifference);
		if (inputDifference <= this.combo.queueTime * 1000) {
			//console.log("combo((points)");
			this.combo.add(points);
		} else {
			this.combo.lastInputTime = t;
			this.value += points + this.combo.score * this.combo.multiplier;
			this.update();
			this.combo.reset();
		}
	},

	substract: function(points) {
		this.combo.reset();
		this.value -= points;
		this.update();
	},

	update: function() {
		document.getElementById('score').innerHTML = this.value;
	}
}

function Combo(queueTime) {
	// Number of seconds that the combo point counter stays active
	this.queueTime = queueTime;
	this.score = 0;
	this.number = 0;
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
	lastInputTime: this.lastInputTime,

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
