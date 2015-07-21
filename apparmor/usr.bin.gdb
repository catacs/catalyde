#include <tunables/global>
/usr/bin/gdb {
   #include <abstractions/base>
   
   set rlimit data <= 100M,
   set rlimit stack <= 100M,
   set rlimit cpu <= 5s,
}
