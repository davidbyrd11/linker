############################################################################

  David Byrd
  
  Lab #1 Linker (Node.js version)
  Operating Systems | NYU
  2.17.13

############################################################################

1. Compilation command
  
  This requires node.js & npm to be installed and will not work on i5.
  
      $ npm install linker -g         // downloads linker & adds to path
    
      $ which linker                  // just to check that its in your path
  
2. Running Program

  Run the following command from anywhere on your computer:

      $ linker path/to/file.txt

3. Directory Structure

  inputs/
    - contains all of the example inputs

  lib/
    - contains the reader that turns input files into an AST
    - has the linker code which includes methods to create the symbol table and memory map given the AST
    
  app.js
    - This is the executable that is added to your path when installed

4. Description

  The executable passes the file name to the reader which parses it and returns an abstract syntax tree.

  The AST is then passed to linker#getSymbolTable which returns the Symbol Table. The Symbol Table is then printed.

  linker#getMemoryMap takes the original ast and the symbol table as arguments and then returns the memory map. The Memory Map is then printed. This method also handles errors that are found in the AST and prints out Error and Warning statements.
  
5. Dependencies

    Node.js >= 4.4
    NPM >= 1.1x
    A unix based operating system