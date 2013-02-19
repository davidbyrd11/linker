def getSymbolTable (modules):
  symbolTable = {}
  offset = 0

  for i in range(0,len(modules)):
    module = modules[i]
    definitions = module["definitionMap"]
    moduleLength = len(module["programInstructions"])

    for definition in definitions:
      if definitions[definition] > (len(module["programInstructions"]) - 1):
        definitions[definition] = 0
        print("Error: Definition of " + definition + " exceeds the size of module " + str(i))

      if not symbolTable.has_key(definition):
        symbolTable[definition] = definitions[definition] + offset
      else:
        print("Error: Cannot define a symbol twice.")

    offset += moduleLength

  return symbolTable

def getMemoryMap (ms, symbolTable):
  memoryMap = {}
  count = 0
  offset = 0
  symbolsUsed = []

  for i in range(0,len(ms)):
    for use in ms[i]["usageMap"]:
      indexOfUse = int(ms[i]["usageMap"][use])

      if indexOfUse > (len(ms[i]["programInstructions"])+1):
        print("Error: Use of " + use + " outside the bouds of module " + i)
        indexOfUse = 0

      indexOfNextUse = ms[i]["programInstructions"][indexOfUse]["address"]
      symbolsUsed.append(use)

      if not symbolTable.has_key(use):
        useValue = 0
        print("Error: Undefined Variable '" + use + "' was used.")
      else:
        useValue = symbolTable[use]

      ms[i]["programInstructions"][indexOfUse]["address"] = useValue

      while indexOfNextUse != 777:
        
        if ms[i]["programInstructions"][indexOfUse]["type"] is not "E":
          print("Error: Address on a use list is not of type E")
          ms[i]["programInstructions"][indexOfUse][type] = "E"


        if len(ms[i]["programInstructions"]) > indexOfNextUse:
          tmp = ms[i]["programInstructions"][indexOfNextUse]["address"] #TODO (Davidbyrd11) It breaks here
          ms[i]["programInstructions"][indexOfNextUse]["address"] = useValue
          indexOfNextUse = tmp
        else:
          print("Error: Pointer in use chain exceeds module size; chain terminated.")
          indexOfNextUse = 777

    for j in range(0, len(ms[i]["programInstructions"])):
      instruction = ms[i]["programInstructions"][j]

      if instruction["type"] is "I" or instruction["type"] is "A" or instruction["type"] is "E":
        memoryMap[count] = (instruction["opcode"]*1000) + instruction["address"]
      elif instruction["type"] is "R":
        memoryMap[count] = (instruction["opcode"]*1000) + instruction["address"] + offset
      else:
        print("Error: Invalid Letter")

      count+=1

    offset = count

  for symbol in symbolTable:
    if symbol not in symbolsUsed:
      print("Warning: Symbol " + symbol + " was defined and not used")

  return memoryMap



