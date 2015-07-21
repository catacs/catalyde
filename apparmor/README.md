nstalar:

		sudo apt-get install apparmor-utils

- COPIAR usr.bin.gdb A /etc/apparmor.d

		cp usr.bin.gdb /etc/apparmor.d/

- Ejecuta:

		sudo apparmor_parser -r usr.bin.gdb

- Ejecuta: 

		sudo aa-enforce usr.bin.gdb
