/**
 * pty.js
 * Copyright (c) 2012, Christopher Jeffrey (MIT License)
 *
 * pty.cc:
 *   This file is responsible for starting processes
 *   with pseudo-terminal file descriptors.
 *
 * See:
 *   man pty
 *   man tty_ioctl
 *   man termios
 *   man forkpty
 */

#include <v8.h>
#include <node.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>

#include <pty.h>

#include <termios.h> /* tcgetattr, tty_ioctl */

/* environ for execvpe */
/* node/src/node_child_process.cc */
extern char **environ;

/* for pty_getproc */
#include <stdio.h>
#include <stdint.h>

using namespace std;
using namespace node;
using namespace v8;



extern "C" void
init(Handle<Object>);
/**
 * PtyFork
 * pty.fork(file, args, env, cwd, cols, rows)
 */

 /* ptmx */

static int
pty_nonblock(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    if (flags == -1) return -1;
    return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}

static Handle<Value>
PtmxCreate(const Arguments& args) {
    HandleScope scope;

    /*
     * There's no arguments in this methode. Commented just in case.
     if (args.Length() != 6
     || !args[0]->IsString()
     || !args[1]->IsArray()
     || !args[2]->IsArray()
     || !args[3]->IsString()
     || !args[4]->IsNumber()
     || !args[5]->IsNumber()) {
     return ThrowException(Exception::Error(
     String::New("Usage: pty.fork(file, args, env, cwd, cols, rows)")));
     }
     */

    // create master and slave
    //

    // fork the pty
    //
    int masterfd,slavefd;
    char *slavedevice;


    masterfd = posix_openpt(O_RDWR|O_NOCTTY);

    if (masterfd == -1
            || grantpt (masterfd) == -1
            || unlockpt (masterfd) == -1
            || (slavedevice = ptsname (masterfd)) == NULL)
        return ThrowException(Exception::Error(
                    String::New("Could not set master fd to nonblocking.")));
    ;

    if (pty_nonblock(masterfd) == -1) {
        return ThrowException(Exception::Error(
                    String::New("Could not set master fd to nonblocking.")));
    }


    /* Catalyde ECHO STAFF */
    slavefd = open(slavedevice, O_RDWR | O_NOCTTY);
    struct termios orig_termios;
    if (tcgetattr (slavefd, &orig_termios) < 0) {
        perror ("ERROR getting current terminal's attributes");
        _exit(1);
    }
    //cfmakeraw (&orig_termios); 
    orig_termios.c_lflag &= ~(ECHO | ECHOE | ECHOK | ECHONL);
    orig_termios.c_oflag &= ~(ONLCR);
    tcsetattr (slavefd, TCSANOW, &orig_termios);
    // if (tcsetattr (slavefd, TCSANOW, &orig_termios) < 1) {
    //     perror ("ERROR setting current terminal's attributes");
    //     _exit(1);
    // }
    /**/


    Local<Object> obj = Object::New();
    obj->Set(String::New("masterfd"), Number::New(masterfd));
    obj->Set(String::New("slavefd"), Number::New(slavefd));
    obj->Set(String::New("slavedevice"), String::New(slavedevice));

    return scope.Close(obj);
}

/**
 * Init
 */

static Handle<Value>
PtmxFlush(const Arguments& args) {
  HandleScope scope;
  if (args.Length() != 1
      || !args[0]->IsNumber()) {
    return ThrowException(Exception::Error(
      String::New("Usage: ptmx.flush(int file)")));
  }
  int fildes = args[0]->IntegerValue();
  int resul  = tcflush(fildes, TCIOFLUSH);

  Local<Object> obj = Object::New();
  obj->Set(String::New("tcflush_result"), Number::New(resul));
  return scope.Close(obj);
}

extern "C" void
init(Handle<Object> target) {
    NODE_SET_METHOD(target, "create_ptmx", PtmxCreate);
    NODE_SET_METHOD(target, "flush_ptmx", PtmxFlush);
}
