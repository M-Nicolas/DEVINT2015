function Score(queueTime) {
	// Initial score value	
	this.value = 0
	this.update()

	// Number of seconds that the combo point counter stays active
	this.queueTime = queueTime
	this.comboScore = 0
	this.comboNumber = 0
	// Combo multiplier
	this.comboMultiplier = 0
	this.comboRange = 1	// Multiplier increment range
	// Used to calculate the time between two inputs
	this.lastInputTime = 0
}


Score.prototype = {
	value: this.value,
	
	add: function(points) {
		var t = new Date().getTime();
		var inputDifference = t - this.lastInputTime
		console.log(inputDifference)
		if (inputDifference <= this.queueTime * 1000) {
			console.log("combo((points)")
			this.combo(points)
		} else {
			this.lastInputTime = t;
			this.value += points + this.comboScore
			this.update()
			this.comboScore = 0;
			this.comboMultiplier = 0;
			this.comboNumber = 0;
		}
	},

	combo: function(points) {
		this.lastInputTime = new Date().getTime()
		this.comboMultiplier = ++this.comboNumber / this.comboRange
		this.comboScore += points
	},

	update: function() {
		document.getElementById('gauge').innerHTML = this.value
	}
}
