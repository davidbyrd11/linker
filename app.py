import sys
import pprint
from lib.reader import read
from lib.linker import *

file = sys.argv[1]
modules = read(file)
symbolTable = getSymbolTable(modules)
memoryMap = getMemoryMap(modules, symbolTable)

pp = pprint.PrettyPrinter(indent=2)
print("Symbol Table:")
pp.pprint(symbolTable)
print("Memory Map:")
pp.pprint(memoryMap)
