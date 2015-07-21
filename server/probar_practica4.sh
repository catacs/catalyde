#!/bin/bash

db="development"
if [ $# == "1" ] && [ $1 == "production" ]; then
    db="production"
    mongo Catalyde --eval "db.dropDatabase();"
    echo "deleted production"
else
     mongo Catalyde-dev --eval "db.dropDatabase();"
     echo "deleted development"
fi

echo "DB: $db"

node uploadall.js -H localhost -p 8123 -f ../practicas/users/users.json -D $db &
sleep 3
node upload_practice.js -H localhost -p 8123 -d ../practicas/practica4/ -D $db &
sleep 3
node upload_practice.js -H localhost -p 8123 -d ../practicas/practica8/ -D $db &
sleep 3
node upload_practice.js -H localhost -p 8123 -d ../test/practica_en_blanco/ -D $db &
sleep 3
# Poner aquí las practicas que queramos poner

echo "Fin!!!"
