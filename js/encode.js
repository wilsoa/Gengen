var optionKeys = ["size", "difficulty", "seed", "maxGroupSize", "torus"], optionOperations = ["addition", "subtraction", "multiplication", "division", "min", "max", "range", "mod"]

function encodeOptions (options) {
    var data = [], operations = []
    
    for (var i = 0; i < optionKeys.length; i++) {
        data.push(options[optionKeys[i]])
    }
    
    for (var i = 0; i < optionOperations.length; i++) {
        operations.push(options.operations[optionOperations[i]]? 1 : 0)
    }
    
    
    return btoa(JSON.stringify(data) + "::" + JSON.stringify(operations))
}

function decodeOptions (string) {
    string = atob(string).split("::")
    var data = JSON.parse(string[0]), operations = JSON.parse(string[1]), options = {operations: {}}
    
    for (var i = 0; i < optionKeys.length; i++) {
        options[optionKeys[i]] = data[i]
    }
    
    for (var i = 0; i < optionOperations.length; i++) {
        options.operations[optionOperations[i]] = operations[i] ? true : false
    }
    
    return options
}