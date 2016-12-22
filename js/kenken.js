function generateKenken (settings) {
	if (!settings.seed) settings.seed = new Date().getTime()
    
    var kenken = new Kenken(settings)
    renderKenken(kenken)
    location.hash = encodeOptions(settings)
    return kenken
}

// A class for the ken ken board
function Kenken (settings) {
    var size = this.size = settings.size
    this.settings = settings
    this.board = []
	this.minGroupSize = 1
	this.defaultMaxGroupSize = settings.maxGroupSize
	this.maxGroupSize = undefined
	this.cellGroups = []
	// Determine operation based on checkboxes from webpage
	this.operations = [new SingleCell()]
	if(settings.operations.addition) {
		this.operations.push(new Addition())
	}
	if(settings.operations.subtraction) {
		this.operations.push(new Subtraction())
	}
	if(settings.operations.multiplication) {
		this.operations.push(new Multiplication())
	}
	if(settings.operations.division) {
		this.operations.push(new Division())
	}
	if(settings.operations.max) {
		this.operations.push(new Maximum())
	}
	if(settings.operations.min) {
		this.operations.push(new Minimum())
	}
	if(settings.operations.range) {
		this.operations.push(new Range())
	}
	if(settings.operations.mod) {
		this.operations.push(new Mod())
	}
	if(settings.operations.avg) {
		this.operations.push(new Average())
	}
	if(settings.operations.par) {
		this.operations.push(new Parity())
	}
	if(settings.operations.gcd) {
		this.operations.push(new Gcd())
	}
	
	//Determine if the default maxGroupSize needs to be made smaller due to the operations selected
	for(var i = 0; i < this.operations.length; i++) {
		var maxOperationSize = this.operations[i].maxCells
		if(maxOperationSize == undefined) {
			// There is an operation with no maximum cell group size, so use the deafult max size (or the size from the webpage)
			this.maxGroupSize = this.defaultMaxGroupSize
			// Stop the loop
			i = this.operations.length
		} else if(this.maxGroupSize == undefined) {
			this.maxGroupSize = maxOperationSize
		} else if(maxOperationSize > this.maxGroupSize) {
			this.maxGroupSize = maxOperationSize
		}
	}
	// If the max group size determined on the webpage is smaller than the max from the operations, make this the max group size
	if(this.maxGroupSize > this.defaultMaxGroupSize) {
		this.maxGroupSize = this.defaultMaxGroupSize
	}
	
	this.seed = new MersenneTwister(settings.seed)
	
	var builderArray = shuffledNumberArray(size, this.seed)
    
    for (var x = 0; x < size; x++) {
        this.board[x] = []
        for (var y = 0; y < size; y++) {
			// Fills the board with cells, where each row of cells have the values
			// of the builderArray, cyclically shifted to the left by x (the row number)
            this.board[x][y] = new Cell(this, builderArray[(x+y)%size])
        }
    }
	// Shuffle the board
	shuffleBoard(size,this.board, this.seed)
	
	// Assign cells in the now shuffled board x and y values
	for(var x = 0; x < size; x++) {
		for(var y = 0; y < size; y++) {
			this.board[x][y].x = x;
			this.board[x][y].y = y;
		}
	}
	
	// Create the cell groups
	var groupID = 1
	for(var x = 0; x < size; x++) {
		for(var y = 0; y < size; y++) {
			if(this.board[x][y].cellGroup == undefined) {
				// Generate a random integer in the range [minGroupSize,maxGroupSize] for the size of the group
				var groupSize = Math.floor((this.maxGroupSize-this.minGroupSize+1)*this.seed.random()+(this.minGroupSize))
				// Create the new CellGroup object
				var newCellGroup = new CellGroup(this, this.board[x][y], groupID)
				// Grow the new cell group groupSize-1 times, only if the groupSize is not one (since it already has size one)
				if(groupSize != 1) {
					for(var m = 0; m < groupSize-1; m++) {
						newCellGroup.grow()
					}
				}
				
				// Shuffle the operations array to get a good spread of the operations, prevents "overshadowing" where having
				//  + before x picked + more often due to how the algorithm below selects the oepration
				shuffleInputArray(this.operations,this.seed)
				
				// Start at the beginning of this now random order operations array
				var randomOperationStart = 0 //Math.floor(this.operations.length*this.seed.random())
				var randomOperation = randomOperationStart
				// Runs until valid operation is found, should never infinite loop as there should always be a valid operation
				var foundOperation = false
				while(foundOperation == false) {
					if(this.operations[randomOperation].operation(newCellGroup.getAllValues()) != false) {
						// A valid operation was found, set the operation text for the group
						newCellGroup.operationDescription = this.operations[randomOperation].symbol + this.operations[randomOperation].operation(newCellGroup.getAllValues())
						foundOperation = true
					}
					else {
						// Not a valid operation, move on to the next options
						randomOperation = (randomOperation + 1) % this.operations.length
						if(randomOperation == randomOperationStart) {
							console.log('no valid operation was found')
							break
						}
					}
				}

				// Add the new cell group to the kenken cell group member variable
				this.cellGroups.push(newCellGroup)
				
				groupID = groupID + 1
			}
		}
	}
}

function shuffleBoard (size,board,seed) {
	// Swap two columns and then two rows. Do this 'size' times to get a decent mix up of the board.
	for (var i = 0; i < size; i++) {
		// Generate two random integers in the range [0,size)
		var column1 = Math.floor(size*seed.random())
		var column2 = Math.floor(size*seed.random())
		// Swap the two columns
		for(var j = 0; j < size; j++) {
			var tempCell = board[j][column1]
			board[j][column1] = board[j][column2]
			board[j][column2] = tempCell
		}
		
		// Generate two random integers in the range [0,size)
		var row1 = Math.floor(size*seed.random())
		var row2 = Math.floor(size*seed.random())
		// Swap the two rows
		for(var j = 0; j < size; j++) {
			var tempCell = board[row1][j]
			board[row1][j] = board[row2][j]
			board[row2][j] = tempCell
		}
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
	// The variable for the string showing the operation and result this cell should have
	this.operationDescription = undefined
}

// Return the values of all cells in the group as an array
CellGroup.prototype.getAllValues = function() {
	var returnArray = []
	for(var i = 0; i < this.cells.length; i++) {
		returnArray.push(this.cells[i].value)
	}
	return returnArray
}

// Grow the cell group up to maximum size, or smaller if board is not big enough
// Returns true if growing was successful, false if it was unsuccessful
CellGroup.prototype.grow = function() {
	// Generate a random integer in range [0,cells.length-1] for which cell we should attempt to grow at first
	var startingCellNumber = Math.floor(this.cells.length*this.kenken.seed.random())
	var cellNum = startingCellNumber
	while(true) {
		var cellToGrowFrom = this.cells[cellNum]
		// Get the array of neighbors of this cell
		var cellNeighbors = cellToGrowFrom.getNeighbors()
		//Generate a random integer in range [0,cellNeighbors.length-1]
		var neighborCellNum = Math.floor(cellNeighbors.length*this.kenken.seed.random())
		// Go through each neighbor. If one is valid, make it the next cell in this group.
		for(var i = 0; i < cellNeighbors.length; i++) {
			var neighborCell = cellNeighbors[((i+neighborCellNum)%cellNeighbors.length)]
			if(neighborCell.cellGroup == undefined) {
				this.cells.push(neighborCell)
				neighborCell.setCellGroup(this)
				this.currentSize = this.currentSize + 1 // Increase the current size count of the cell group
				return true
			}
		}
		
		// If all the neighbors were invalid, try the next cell in the list
		cellNum = (cellNum + 1) % this.cells.length
		if(cellNum == startingCellNumber) {
			// we have gone through the whole list with no valid neighbors
			return false
		}
		
	}
}

CellGroup.prototype.getTopLeft = function () {
	var cells = this.cells, topLeftCell = cells[0]
	
	for (var i = 1; i < cells.length; i++) {
		if (cells[i].x <= topLeftCell.x) {
			if (cells[i].y < topLeftCell.y) topLeftCell = cells[i]
		}
	}
	
	return topLeftCell
}

// A class for a single cell in the Kenken which houses data on the cell and methods for finding adjacent cells
function Cell (kenken, value) {
    this.kenken = kenken
    this.x = undefined
    this.y = undefined
	this.cellGroup = undefined
	this.value = value
}

// Function for setting the cell group that a cell belongs to
Cell.prototype.setCellGroup = function(cellGroup) {
	this.cellGroup = cellGroup
}

// Return an array of the cells neighbors
Cell.prototype.getNeighbors = function () {
    var neighbors = []
    
    if (this.kenken.settings.torus) {
    	if (this.x > 0) neighbors.push(this.kenken.board[this.x-1][this.y])
    	else neighbors.push(this.kenken.board[this.kenken.size-1][this.y])
	    if (this.y > 0) neighbors.push(this.kenken.board[this.x][this.y-1])
    	else neighbors.push(this.kenken.board[this.x][this.kenken.size-1])
	    if (this.x < this.kenken.size - 1) neighbors.push(this.kenken.board[this.x+1][this.y])
    	else neighbors.push(this.kenken.board[0][this.y])
	    if (this.y < this.kenken.size - 1) neighbors.push(this.kenken.board[this.x][this.y+1])
    	else neighbors.push(this.kenken.board[this.x][0])
    }
    else
    {
	    if (this.x > 0) neighbors.push(this.kenken.board[this.x-1][this.y])
	    if (this.y > 0) neighbors.push(this.kenken.board[this.x][this.y-1])
	    if (this.x < this.kenken.size - 1) neighbors.push(this.kenken.board[this.x+1][this.y])
	    if (this.y < this.kenken.size - 1) neighbors.push(this.kenken.board[this.x][this.y+1])
    }
    
    return neighbors
}

// Return an object with the cell's neighbors indexed by relative location
Cell.prototype.getNeighborsOriented = function () {
    var neighbors = {}
    
    if (this.kenken.settings.torus) {
    	neighbors.left=this.x > 0 ? this.kenken.board[this.x-1][this.y] : this.kenken.board[this.kenken.size-1][this.y]
    	neighbors.up = this.y > 0 ? this.kenken.board[this.x][this.y-1] : this.kenken.board[this.x][this.kenken.size-1]
	    neighbors.right = this.x < this.kenken.size - 1 ? this.kenken.board[this.x+1][this.y] : this.kenken.board[0][this.y]
		neighbors.down = this.y < this.kenken.size - 1 ? this.kenken.board[this.x][this.y+1] : this.kenken.board[this.x][0]
    }
    else
    {
	    if (this.x > 0) neighbors.left = this.kenken.board[this.x-1][this.y]
	    if (this.y > 0) neighbors.up = this.kenken.board[this.x][this.y-1]
	    if (this.x < this.kenken.size - 1) neighbors.right = this.kenken.board[this.x+1][this.y]
	    if (this.y < this.kenken.size - 1) neighbors.down = this.kenken.board[this.x][this.y+1]
    }
    
    return neighbors
}

// Function to shuffle an array, using to shuffle operations array.
function shuffleInputArray(array, seed) {
	// Randomly shuffle the array, doing the algorithm once forward and once
	// backward, to help create more "randomness"
	for (var i = 0; i < array.length-1; i++) {
		// Generate a random integer in the range [i,n-1]
		// Since seed.random() generates a number in the range [0,1)
		var randomNum = Math.floor((array.length-i)*seed.random()+i)
		
		//swap the array at spots i and randomNum
		var numToSwap = array[i]
		array[i] = array[randomNum]
		array[randomNum] = numToSwap
    }
}

// Function to generate an array with the numbers 1 through n in a random order
function shuffledNumberArray (n, seed) {
	var numberArray=[]
	// Fill the array with numbers 1 through n
	for(var i = 0; i < n; i++) {
		numberArray.push(i+1)
	}
	
	shuffleInputArray(numberArray,seed)
	
	//return then shuffled array
	return numberArray
}
