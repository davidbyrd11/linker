/**
 * Generate symbol table
 */
function getSymbolTable (modules) {
  var symbolTable = {},
      offset = 0;
  
  for (var i = 0; i < modules.length; i++) {
    var module = modules[i],
        definitions = module.definitionMap,
        moduleLength = module.programInstructions.length;

    for (var definition in definitions)
      !symbolTable[definition] ? 
        symbolTable[definition] = definitions[definition] + offset : console.log("Error: Cannot define a symbol twice.");
    
    offset += moduleLength;
  
  }

  return symbolTable;
}

/**
 * Generate memory map
 */
function getMemoryMap (ms, symbolTable) {
  var memoryMap = {}, // a map of index: (opcode*1000) + address
      count = 0,      // the num of the instruction we're on
      offset = 0;     // the offset for relative addresses
  
  for (var i = 0; i < ms.length; i++) {
    for (var use in ms[i].usageMap) {
      var indexOfUse = ms[i].usageMap[use];
      indexOfNextUse = ms[i].programInstructions[indexOfUse].address;

      var useValue = symbolTable[use];
      if (!symbolTable[use]) {
        useValue = 0;
        console.log("Error: Undefined Variable '" + use + "'' was used.")
      }

      
      ms[i].programInstructions[indexOfUse].address = useValue;
      
      while (indexOfNextUse != 777) {
        if (ms[i].programInstructions[indexOfUse].type != "E") {
          console.log("Error: Address on a use list is not of type E");
          ms[i].programInstructions[indexOfUse].type = "E";
        }

        var tmp = ms[i].programInstructions[indexOfNextUse].address;
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
  return memoryMap;
}

var modules = require('./lib/modules')();
var symbolTable = getSymbolTable(modules);
console.log("Symbol Table");
console.log(symbolTable);
console.log("Memory Map");
console.log(getMemoryMap(modules, symbolTable));
