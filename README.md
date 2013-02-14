- (I) an immediate operand, which is unchanged;
- (A) an absolute address, which is unchanged;
- (R) a relative address, which is relocated;
- (E) an external address, which is resolved
  - look at the last 3 digits of the number that follows E and it will tell you where else it is used.
  - follow until you hit 777


All absolute addresses need to be put into the memory map & are not mutable


companies will be created
a community will be created with pizza and trophies
we will be a gatekeeper


1. Go through first lines of modules (every 3 lines) and create symbol table
2. Create the memory map


### error's I'm not handling
- If a symbol is multiply deﬁned, print an error message and use the value given in the ﬁrst deﬁnition.
- If a symbol is used but not deﬁned, print an error message and use the value zero.
- If a symbol is deﬁned but not used, print a warning message and continue.
- If an address appearing in a deﬁnition exceeds the size of the module, print an error message and treat the address
given as 0 (relative).
- If an address appearing in a use list exceeds the size of the module, print an error message and treat the address
as the sentinel ending the list.
- If an address on a use list is not type E, print an error message and treat the address as type E.
- If a type E address is not on a use list, print an error message and treat the address as type I.
