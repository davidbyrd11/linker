function parseModules () {

  var modules = [
  {
    definitionMap:{
      "xy": 2
    },
    usageMap:{
      "z": 4
    },
    programInstructions:[
      {
        opcode: 1,
        address: 4,
        type: "R"
      },
      {
        opcode: 5,
        address: 678,
        type: "I"
      },
      {
        opcode: 2,
        address: 777,
        type: "E"
      },
      {
        opcode: 8,
        address: 2,
        type: "R"
      },
      {
        opcode: 7,
        address: 2,
        type: "E"
      }
    ]
  },
  {
    definitionMap:{},
    usageMap:{
      "z": 3
    },
    programInstructions:[
      {
        opcode: 8,
        address: 1,
        type: "R"
      },
      {
        opcode: 1,
        address: 777,
        type: "E"
      },
      {
        opcode: 1,
        address: 1,
        type: "E"
      },
      {
        opcode: 3,
        address: 2,
        type: "E"
      },
      {
        opcode: 1,
        address: 2,
        type: "R"
      },
      {
        opcode: 1,
        address: 10,
        type: "A"
      }
    ]
  },
  {
    definitionMap:{},
    usageMap:{
      "z": 1
    },
    programInstructions:[
      {
        opcode: 5,
        address: 1,
        type: "R"
      },
      {
        opcode: 4,
        address: 777,
        type: "E"
      }
    ]
  },
  {
    definitionMap:{
      "z": 2
    },
    usageMap: {
      "xy": 2
    },
    programInstructions: [
      {
        opcode: 8,
        address: 0,
        type: "A"
      },
      {
        opcode: 1,
        address: 777,
        type: "E"
      },
      {
        opcode: 2,
        address: 1,
        type: "E"
      }
    ]
  }];
  return modules;
}

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

      switch (instruction.type) {
        case "I":
          memoryMap[count] = (instruction.opcode * 1000) + instruction.address;
        break;
        case "A":
          memoryMap[count] = (instruction.opcode * 1000) + instruction.address;
        break;
        case "R":
          memoryMap[count] = (instruction.opcode * 1000) + instruction.address + offset;
        break;
        case "E":
          memoryMap[count] = (instruction.opcode * 1000) + instruction.address;//already been adjusted
        break;
        default:
          console.log("Error: Invalid Letter");

      }
      count++;
    }
    offset = count; //relative addresses are adjusted by the size of modules before them, not the instructions in the same module
  }
  return memoryMap;
}


var modules = parseModules();
var symbolTable = getSymbolTable(modules);
console.log("Symbol Table");
console.log(symbolTable);
console.log("Memory Map");
console.log(getMemoryMap(modules, symbolTable));
