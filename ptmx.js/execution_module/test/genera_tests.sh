#!/bin/bash
for i in 1 2 3 4 5
do
    gcc -o progs/test$i progs/test$i.cc -g
done
