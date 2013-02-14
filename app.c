#include <stdio.h>

int main ( int argc, char *argv[] ) {
  if ( argc != 2 ) printf( "usage: %s filename\n", argv[0] );
  else {

    FILE *file = fopen( argv[1], "r" );

    if ( file == 0 ) printf( "Could not open file. \n");
    else {
      int x;

      while ( ( x = fgetc( file ) ) != EOF )
        printf( "%c", x );

      fclose( file ); printf("\n");
    }
  }


  // char *names[] = {
  //   "David": 19
  // , "Marcus": 17
  // , "Kelsey": 21
  // };


  
  // for (size_t i = 0; i < sizeof(names) / sizeof(names[0]); i++)
  //   printf("%s\n", names[i]);
  
  return 0;
}
