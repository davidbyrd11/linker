import re

# #
# This method reads a text file and builds an
#   abstract syntax tree in order to make the
#   linker less complicated.
#
# @param file is the path of an input file
#
def read (file):
  structuredInput = []
  # this is defined as a closure so that a new one is created every time.
  def emptyModule():
    return {
      "definitionMap":{},
      "usageMap":{},
      "programInstructions":[]
    }
  chars = open(file, 'r').read()
  # convert all whitespace to spaces, remove spaces from beginning and end, then split by a space.
  # you are left with an array of 
  chars = re.sub(re.compile(r"\s+", re.MULTILINE), ' ', chars).strip().split(' ')
  
  # The count variable is the index of the character you're on in the loop.
  count = 0

  # Each iteration of the loop is a different module
  while (count < len(chars)):
    currentModule = emptyModule()
    defLen = int(chars[count])
    count+=1

    # offset is the number of characters before the definitions in this module.
    # this is true throughout the method
    offset = count
    
    # This goes through all of the definitions in this module. builds DefinitionMap in AST.
    while (count < ((2*defLen)+offset)):
      currentModule["definitionMap"][chars[count]] = int(chars[count+1])
      count+=2
    useLen = int(chars[count])
    count+=1
    offset = count

    # This goes through all of the uses in this module. builds usageMap in AST.
    while (count < ((2*useLen)+offset)):
      currentModule["usageMap"][chars[count]] = int(chars[count+1])
      count+=2
    instructionLen = int(chars[count])
    count+=1

    offset = count
    # This goes through all of the instructions in this module. builds instructions array in AST.
    while (count < ((2*instructionLen)+offset)):
      code = int(chars[count+1])
      instruction = {
        "type": chars[count],
        "address": code%1000,
        "opcode": int(str(code)[0])
      }
      currentModule["programInstructions"].append(instruction)
      count+=2

    structuredInput.append(currentModule) # a dd this module as a dicitonary to the array of modules which acts as an AST.
  return structuredInput # after every module has been added to the AST return it.
