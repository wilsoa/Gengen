function generateKenken (size) {
    var kenken = new Kenken(size)
    renderKenken(kenken)
}


// A class for the ken ken board
function Kenken (size) {
    this.size = size;
    this.board = [];
	this.minGroupSize = 1
	this.maxGroupSize = 5 //TO DO: This should be determined from web page
	var builderArray = shuffledArray(size)
    
    for (var x = 0; x < size; x++) {
        this.board[x] = []
        for (var y = 0; y < size; y++) {
			// Fills the board with cells, where each row of cells have the values
			// of the builderArray, cyclically shifted to the left by x (the row number)
            this.board[x][y] = new Cell(this, x, y, builderArray[(x+y)%size])
        }
    }
	shuffleBoard(size,this.board)
}

function shuffleBoard (size,board) {
	// Swap two columns and then two rows. Do this 'size' times to get a decent mix up of the board.
	for (var i = 0; i < size; i++) {
		// Generate two random integers in the range [0,size)
		var column1 = Math.floor(size*Math.random())
		var column2 = Math.floor(size*Math.random())
		// Swap the two columns
		for(var i = 0; i < size; i++) {
			var tempValue = board[i][column1]
			board[i][column1] = board[i][column2]
			board[i][column2] = tempValue
		}
		
		// Generate two random integers in the range [0,size)
		var row1 = Math.floor(size*Math.random())
		var row2 = Math.floor(size*Math.random())
		// Swap the two rows, a lot easier than swapping two columns
		var tempRow = board[row1]
		board[row1] = board[row2]
		board[row2] = tempRow
	}
}

// A class for a single grouping of cells on the ken ken board
function CellGroup (kenken, cell, id) {
	// The ken ken board this group belongs to (is this necessary?)
	this.kenken = kenken
	// The id of this group of cells
	this.groupID = id
	// The array that will hold the cells in this group, starting with the initial cell
	this.cells = [cell]
	// Set the cellGroup of the initial cell to this CellGroup Object
	cell.setCellGroup(this)
	// The current size of the cell group
	this.currentSize = 1
}

// Grow the cell group up to maximum size, or smaller if board is not big enough
// Returns true if growing was successful, false if it was unsuccessful
CellGroup.prototype.grow = function() {
	// Generate a random integer in range [0,cells.size()-1] for which cell we should attempt to grow at first
	var startingCellNumber = Math.floor(this.cells.length*Math.random())
	var cellNum = startingCellNumber
	while(true) {
		var validCellFound = false
		var cellToGrowFrom = this.cells[cellNum]
		var cellNeighbors = cellToGrowFrom.getNeighbors()
		// TO DO: Figure out how to randomize picking which neighbor to choose from!
		
		// If all the neighbors were invalid, try the next cell in the list
		if(validCellFound == false) {
			cellNum = (cellNum + 1) % this.cells.size() 
			if(cellNum == startingCellNumber) {
			// we have gone through the whole list with no valid neighbors
			return false
			}
		}
		
	}
}

// A class for a single cell in the Kenken which houses data on the cell and methods for finding adjacent cells
function Cell (kenken, x, y, value) {
    this.kenken = kenken
    this.x = x
    this.y = y
	this.cellGroup = undefined
	this.value = value
}

// Function for setting the cell group that a cell belongs to
Cell.prototype.setCellGroup = function(cellGroup) {
	this.cellGroup = cellGroup
}

// Return an object with the cell's neighbors indexed by relative location
Cell.prototype.getNeighbors = function () {
    var neighbors = {}
    
    if (this.x > 0) neighbors.left = this.kenken.board[this.x-1][this.y]
    if (this.y > 0) neighbors.up = this.kenken.board[this.x][this.y-1]
    if (this.x < this.kenken.size - 1) neighbors.right = this.kenken.board[this.x+1][this.y]
    if (this.y < this.kenken.size - 1) neighbors.down = this.kenken.board[this.x][this.y+1]
    
    return neighbors
}

// Function to generate an array with the numbers 1 through n in a random order
function shuffledArray (n) {
	var numberArray=[]
	// Fill the array with numbers 1 through n
	for(var i = 0; i < n; i++) {
		numberArray.push(i+1)
	}
	
	// Randomly shuffle the array, doing the algorithm once forward and once
	// backward, to help create more "randomness" and to attemp to resolve the 
	// first element problem. (First element would never end up in first spot)
	for (var i = 0; i < n-1; i++) {
		// Generate a random integer in the range [i,n-1]
		// Since Math.random() generates a number in the range [0,1)
		var randomNum = Math.floor((n-i)*Math.random()+i)
		
		//swap the array at spots i and randomNum
		var numToSwap = numberArray[i]
		numberArray[i] = numberArray[randomNum]
		numberArray[randomNum] = numToSwap
    }
	
	//return then shuffled array
	return numberArray
}