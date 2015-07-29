Catalyde
====

`Catalyde` is a web-based IDE for novel programmers.

[![Demo Catalyde](http://img.youtube.com/vi/WZeIi_7aoME/0.jpg)](http://www.youtube.com/watch?v=WZeIi_7aoME "Demo Catalyde")



`Catalyde`’s current features:

- HTTPS authentication (for running Catalyde on a public server)




What's new in Catalyde since 0.1.0 was released:
============================================

- Nide now supports syntax highlighting for filetypes other than JavaScript.
- A simple cache mechanism is now present to avoid unnecessary directory listings.
- Directory listing is now much faster and more reliable.
- Nide is now able to launch the user's default browser from the command line
- The client code has been almost completely refactored so it's now easier to mantain.
- Nide will now check for file size before opening a file.
- HTML files can now be previewed directly from Nide.

Instructions
============

First, install Catalyde with:

    

On a new or existing directory, use the following command to setup a new nide project:

    catalyde init

This command will setup a `workspace` and start server on port 8123. Fire up your web browser
at `localhost:8123` to use Catalyde. If a directory workspace is present you cas only run 
using:

    catalyde

License
=======

Catalyde is released under a **GPL V3 License**:

    Catalyde is a code IDE for academic usage.
    Copyright (C) 2012  Catalin Costin Stanciu

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
