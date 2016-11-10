// A class for the ken ken board
function Kenken (size) {
    this.size = size;
    this.board = [];
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

// A class for a single cell in the Kenken which houses data on the cell and methods for finding adjacent cells
function Cell (kenken, x, y, value) {
    this.kenken = kenken
    this.x = x
    this.y = y
	this.groupID = 0
	this.value = value
}

// Return an object with the cell's neighbors, returning false if there are no neighbors
Cell.prototype.getNeighbors = function () {
    var neighbors = {}, empty = true
    
    if (this.x > 0) {
        neighbors.left = this.kenken.board[this.x-1][this.y]
        empty = false
    }
    if (this.y > 0){
        neighbors.up = this.kenken.board[this.x][this.y-1]
        empty = false
    }
    if (this.x < this.kenken.size - 1) {
        neighbors.right = this.kenken.board[this.x+1][this.y]
        empty = false
    }
    if (this.y < this.kenken.size - 1) {
        neighbors.down = this.kenken.board[this.x][this.y+1]
        empty = false
    }
    
    // If there are no neighbors, return false
    return empty || neighbors
}

// Function to generate an array with the numbers 1 through n in a random order
function shuffledArray (n) {
	numberArray=[]
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
		 randomNum = Math.floor((n-i)*Math.random()+i)
		
		//swap the array at spots i and randomNum
		numToSwap = numberArray[i]
		numberArray[i] = numberArray[randomNum]
		numberArray[randomNum] = numToSwap
    }
	
	//return then shuffled array
	return numberArray
}