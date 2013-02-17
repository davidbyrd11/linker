#!/usr/bin/env node
!function (file) {
  var modules = require('./lib/reader')(file),
      linker = require('./lib/linker'),
      symbolTable = linker.getSymbolTable(modules);

  console.log("Symbol Table");
  console.log(symbolTable);
  console.log("Memory Map");
  console.log(linker.getMemoryMap(modules, symbolTable));
}(process.argv.slice(2)[0])
