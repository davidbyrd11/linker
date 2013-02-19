/**
 * Generate symbol table
 */
exports.getSymbolTable = function (modules) {
  var symbolTable = {},
      offset = 0;
  
  for (var i = 0; i < modules.length; i++) {
    var module = modules[i],
        definitions = module.definitionMap,
        moduleLength = module.programInstructions.length;

    for (var definition in definitions) {

      if(definitions[definition] > module.programInstructions.length - 1) {
        definitions[definition] = 0 
        console.log("Error: Definition of " + definition + " exceeds the size of module " + i)
      }

      !symbolTable[definition] ? 
        symbolTable[definition] = definitions[definition] + offset : console.log("Error: Cannot define a symbol twice.");
      
    }
    offset += moduleLength;
  
  }

  return symbolTable;
}

/**
 * Generate memory map
 */
exports.getMemoryMap = function (ms, symbolTable) {
  var memoryMap = {},   // a map of index: (opcode*1000) + address
      count = 0,        // the num of the instruction we're on
      offset = 0,       // the offset for relative addresses
      symbolsUsed = []; // to handle the warning case that a symbol is defined and not used

  for (var i = 0; i < ms.length; i++) {
    for (var use in ms[i].usageMap) {
      var indexOfUse = ms[i].usageMap[use];

      if (indexOfUse > ms[i].programInstructions.length + 1) {
        console.log("Error: Use of " + use + " outside the bouds of module " + i);
        indexOfUse = 0;
      }


      indexOfNextUse = ms[i].programInstructions[indexOfUse].address;

      symbolsUsed.push(use);// so we can check that all symbols defined were used.
      
      var useValue;
      if (!symbolTable[use]) {
        useValue = 0;
        console.log("Error: Undefined Variable '" + use + "'' was used.")
      } else {
        useValue = symbolTable[use];
      }

      
      ms[i].programInstructions[indexOfUse].address = useValue;
      
      while (indexOfNextUse != 777) {
        if (ms[i].programInstructions[indexOfUse].type != "E") {
          console.log("Error: Address on a use list is not of type E");
          ms[i].programInstructions[indexOfUse].type = "E";
        }

        var tmp = ms[i].programInstructions[indexOfNextUse].address; //TODO (davidbyrd11) error comes up here
        ms[i].programInstructions[indexOfNextUse].address = useValue;
        indexOfNextUse = tmp;

      }
    }

    for (var j = 0; j < ms[i].programInstructions.length; j++) {
      var instruction = ms[i].programInstructions[j];

      if (instruction.type == "I" || instruction.type == "A" || instruction.type == "E")
        memoryMap[count] = (instruction.opcode * 1000) + instruction.address;
      else if (instruction.type == "R")
        memoryMap[count] = (instruction.opcode * 1000) + instruction.address + offset;
      else console.log("Error: Invalid Letter");
      
      count++;
    }
    offset = count; //relative addresses are adjusted by the size of modules before them, not the instructions in the same module
  }


  /* Check that all defined symbols were used */
  for (var symbol in symbolTable)
    if (symbolsUsed.indexOf(symbol) == -1)
      console.log("Warning: Symbol " + symbol + " was defined and not used");
  

  return memoryMap;
}