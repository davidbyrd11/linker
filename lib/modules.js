module.exports= function (file) {
  var structuredInput = [],
      emptyModule = function () { 
        return {
          definitionMap:{},
          usageMap:{},
          programInstructions:[]
        }
      },
      chars = require('fs').readFileSync(file).toString().replace(/\s+/g, ' ').split(' ');
  
  var count = 0;//This is the character we're on
  while (count < chars.length) {
    var currentModule = emptyModule();
    //gets calculated incorreclty the second time
    var defLen = parseInt(chars[count], 10);
    count++;
    offset = count;
    while (count < ((2*defLen)+offset)) {
      currentModule.definitionMap[chars[count]] = parseInt(chars[count+1], 10);
      count+=2;
    }
    var useLen = parseInt(chars[count], 10);
    count++;

    var offset = count;
    while (count < ((2*useLen)+offset)) {
      currentModule.usageMap[chars[count]] = parseInt(chars[count+1], 10);
      count+=2;
    }
    var instructionLen = parseInt(chars[count], 10);
    count++;

    offset = count;
    while (count < ((2*instructionLen)+offset)) {
      var code = parseInt(chars[count+1], 10);
      var instruction = {
        type: chars[count],
        address: code%1000,
        opcode: parseInt(code.toString().slice(0,1), 10)
      };
      currentModule.programInstructions.push(instruction);
      count+=2;
    }
    structuredInput.push(currentModule);
  }
  
  return structuredInput;
    
}