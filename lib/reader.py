import re

def read (file):
  structuredInput = []
  def emptyModule():
    return {
      "definitionMap":{},
      "usageMap":{},
      "programInstructions":[]
    }
  chars = open(file, 'r').read()
  chars = re.sub(re.compile(r"\s+", re.MULTILINE), ' ', chars).strip().split(' ')
  count = 0

  while (count < len(chars)):
    currentModule = emptyModule()
    defLen = int(chars[count])
    count+=1
    offset = count
    while (count < ((2*defLen)+offset)):
      currentModule["definitionMap"][chars[count]] = int(chars[count+1])
      count+=2
    useLen = int(chars[count])
    count+=1

    offset = count
    while (count < ((2*useLen)+offset)):
      currentModule["usageMap"][chars[count]] = int(chars[count+1])
      count+=2
    instructionLen = int(chars[count])
    count+=1

    offset = count
    while (count < ((2*instructionLen)+offset)):
      code = int(chars[count+1])
      instruction = {
        "type": chars[count],
        "address": code%1000,
        "opcode": int(str(code)[0])
      }
      currentModule["programInstructions"].append(instruction)
      count+=2

    structuredInput.append(currentModule)
  return structuredInput