cd ../server
node uploadgroup.js -H localhost -p 8123 -f ../test/groups/groups.json &
node uploaduser.js -H localhost -p 8123 -f ../test/users/users.json  &
node upload.js -H localhost -p 8123 -d ../test/practica0.2/ &
cd -