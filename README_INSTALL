
1. Download the project from svn: svn co https://cafre.dsic.upv.es/svn/editor

2. install node (more details here https://github.com/joyent/node/wiki/Installation)
	Option 1:
		2.1 Download node from www.node.org/#download (http://nodejs.org/dist/vX.X.X/node-vX.X.X.tar.gz)
		2.2 >> tar -zxf node-vX.X.X.tar.gz #Download this from nodejs.org
		2.3 >> cd node-vX.X.X

	Option 2:
		2.1 >> git clone https://github.com/joyent/node.git
		2.2 >> cd node
        
        For Both:
		2.4 >> ./configure
		2.5 >> make
		2.6 >> sudo make install

ERRORS:

/home/kta/PFC/node-v0.6.15/wscript:374: error: Could not autodetect OpenSSL support. Make sure OpenSSL development packages are installed. Use configure --without-ssl to disable this message.


>> sudo apt-get install g++ gcc curl libssl-dev apache2-utils

3. install npm (more details http://npmjs.org/)
	3.1 >> sudo apt-get install curl
    3.2 >> sudo curl http://npmjs.org/install.sh | sudo sh


4. install mongodb
	4.1 >>  sudo apt-get install mongodb : 
	4.2 >>  installing pty.js was modified for better output so you have to install the provided pty.js.(pty.node executable)

5. Updating/Installing node_modules:
	5.1 >> npm update (in the project folder)
        # If bcrypt_lib -> ERROR
        5.2 >> npm install bcrypt
6. Execute:
	6.1 >> node main.js
