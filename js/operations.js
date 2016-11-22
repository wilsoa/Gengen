/*
 * The following code is classes for the operations. Not sure if inheritance/abstract functions are a things in 
 * javascript so currently just making a different class for each of them.
 */
 
// The class for no operation, used for a single cell
function SingleCell() {
	this.minCells = 1 // Can operate on a minimum of 1 cell
	this.maxCells = 1 // Can operate on a maximum of 1 cell
	this.symbol = ''
}
 
// The operation function for a single cell
SingleCell.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}

	return arrayOfNumbers[0]
}
 
// The class for addition
function Addition() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = undefined // No max number of cells it can operate on
	this.symbol = '+'
}
 
// The operation function for addition
Addition.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	 
	var resultOfOperation = 0;
	for(var i = 0; i < arrayOfNumbers.length; i++) {
		resultOfOperation = arrayOfNumbers[i] + resultOfOperation
	}
	return resultOfOperation
}
 
// The class for subtraction
function Subtraction() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = 2 // Can operate on a maximum of 2 cells
	this.symbol = '-'
}
 
// The operation function for subtraction
Subtraction.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	 
	// Should only have two numbers, subtract the smaller one from the larger one
	var resultOfOperation = false;
	if(arrayOfNumbers[0] > arrayOfNumbers[1]) {
		resultOfOperation = arrayOfNumbers[0] - arrayOfNumbers[1]
	} else {
		resultOfOperation = arrayOfNumbers[1] - arrayOfNumbers[0]
	}
	return resultOfOperation
 }
 
// The class for multiplication
function Multiplication() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = undefined // No max number of cells it can operate on
	this.symbol = '&times;'
 }
 
// The operation function for multiplication
Multiplication.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	
	var resultOfOperation = 1;
	for(var i = 0; i < arrayOfNumbers.length; i++) {
		resultOfOperation = arrayOfNumbers[i] * resultOfOperation
	}
	return resultOfOperation
}
 
// The class for division
function Division() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = 2 // Can operate on a maximum of 2 cells
	this.symbol = '&divide;'
}
 
// The operation function for division
Division.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	
	// Should only have two numbers, check to see if they divide evenly. If not, return 0 indicating division failure
	var resultOfOperation = false;
	if((arrayOfNumbers[0]/arrayOfNumbers[1])%1==0) {
		// If true, then this was an integer
		resultOfOperation = arrayOfNumbers[0]/arrayOfNumbers[1]
	} else if((arrayOfNumbers[1]/arrayOfNumbers[0])%1==0) {
		// If true, then this was an integer
		resultOfOperation = arrayOfNumbers[1]/arrayOfNumbers[0]
	}
	return resultOfOperation
}

// The class for min
function Minimum() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = 3 // Can operate on a maximum of 3 cells
	this.symbol = 'min'
}

// The operation function for minimum
Minimum.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	
	var resultOfOperation = arrayOfNumbers[0]
	for(var i = 1; i < arrayOfNumbers.length; i++) {
		if(resultOfOperation > arrayOfNumbers[i]) {
			resultOfOperation = arrayOfNumbers[i]
		}
	}
	return resultOfOperation
}

// The class for max
function Maximum() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = 3 // Can operate on a maximum of 3 cells
	this.symbol = 'max'
}

// The operation function for maximum
Maximum.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	
	var resultOfOperation = arrayOfNumbers[0]
	for(var i = 1; i < arrayOfNumbers.length; i++) {
		if(resultOfOperation < arrayOfNumbers[i]) {
			resultOfOperation = arrayOfNumbers[i]
		}
	}
	return resultOfOperation
}

// The class for range
function Range() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = undefined // No max number of cells it can operate on
	this.symbol = 'range'
}

// The operation function for range
Range.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	
	var min = arrayOfNumbers[0]
	var max = arrayOfNumbers[0]
	for(var i = 1; i < arrayOfNumbers.length; i++) {
		if(max < arrayOfNumbers[i]) {
			max = arrayOfNumbers[i]
		} else if(min > arrayOfNumbers[i]) {
			min = arrayOfNumbers[i]
		}
	}
	return max-min
}

// The class for mod
function Mod() {
	this.minCells = 2 // Can operate on a minimum of 2 cells
	this.maxCells = 2 // Can operate on a maximum of 2 cells
	this.symbol = '%'
}

// The operation function for mod
Mod.prototype.operation = function(arrayOfNumbers) {
	// Verify that array length is within the size constraints, if not return 0 meaning the operation failed
	if(arrayOfNumbers.length > this.maxCells || arrayOfNumbers.length < this.minCells) {
		return false
	}
	
	// Should only have two numbers, take larger % smaller
	var resultOfOperation = false;
	if(arrayOfNumbers[0] > arrayOfNumbers[1]) {
		resultOfOperation = arrayOfNumbers[0] % arrayOfNumbers[1]
	} else {
		resultOfOperation = arrayOfNumbers[1] % arrayOfNumbers[0]
	}
	return resultOfOperation
}