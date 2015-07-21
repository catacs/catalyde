#!/bin/bash 
#################################################################
#
# @author: Catalin Costin Stanciu
# @nick: kta
# @email: ktalin605@gmail.com
#
#################################################################


# This script is used to solve a problem when mongodb crash
# Usage sudo repMongo  

#################################################################
#
# Tue Apr  3 12:18:57 *** warning: spider monkey build without utf8 support.  
# consider rebuilding with utf8 support
# connecting to: test
# Tue Apr  3 12:18:57 Error: couldn't connect to server 127.0.0.1 (anon):1137
# exception: connect failed
#
#################################################################

sudo rm /var/lib/mongodb/mongod.lock
sudo -u mongodb mongod -f /etc/mongodb.conf --repair
sudo start mongodb
mongo 
