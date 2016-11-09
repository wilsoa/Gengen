function Kenken (size) {
    this.size = size;
    this.board = [];
    
    for (var x = 0; x < size; x++) {
        this.board[x] = []
        for (var y = 0; y < size; y++) {
            this.board[x][y] = new Cell(this, x, y)
        }
    }
}


// A class for a single cell in the Kenken which houses data on the cell and methods for finding adjacent cells
function Cell (kenken, x, y) {
    this.kenken = kenken
    this.x = x
    this.y = y
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