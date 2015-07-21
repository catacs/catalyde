Apuntar aquí los bugs y mejoras que encontréis. Poner descripción, persona asignada y
estado, y si queréis dificultad. Intentad mantenerlo actualizado lo máximo
posible.


Cosas que se pueden ir corrigiendo por ahora (a ratos):

- corregir el checkbutton de los codemirror, tanto a nivel estético
  como funcional (actualmente el "on" lo que hace es que compile el
  código del profesor, lo que parece estar 'al revés')


- Traducir al castellano cosas.
        - Apuntar aquí cosa que faltaría traducir: los botones undo, redo, 
          indent, etc.. de codemirror.(en teoria corregido)

- el menu de grupos y prácticas pasarlo a un accordion de jquery (hecho)

- En el checkbutton de activar y desactivar el código del profesor. Sombrear
  el codemirror para que quede más visual que el código no se va a ejecutar.

- el mensaje de alerta de errores de compilación ha de quedar más
  grande para que quepan los errores, hay que procesar el mensaje del
  compilador:

   * quitar el nombre del fichero ese del sandbox

   * posiblemente traducir ciertas cosas

   * seguramente revisar los números de línea para averiguar el bloque
     del alumno (esto ya se ha discutido)


- bug que pasa cada x tiempo (será poque aun no esta lista la conexion a bd??):

/home/kta/PFC/editor/node_modules/connect-mongodb/lib/connect-mongodb.js:115
  _collection.findOne({_id: sid}, function (err, data) {
              ^
TypeError: Cannot call method 'findOne' of null
    at MongoStore.get (/home/kta/PFC/editor/node_modules/connect-mongodb/lib/connect-mongodb.js:115:15)
    at Manager.<anonymous> (/home/kta/PFC/editor/server/server.js:117:25)
    at Manager.authorize (/home/kta/PFC/editor/node_modules/socket.io/lib/manager.js:853:31)
    at Manager.handleHandshake (/home/kta/PFC/editor/node_modules/socket.io/lib/manager.js:730:8)
    at Manager.handleRequest (/home/kta/PFC/editor/node_modules/socket.io/lib/manager.js:559:12)
    at HTTPSServer.<anonymous> (/home/kta/PFC/editor/node_modules/socket.io/lib/manager.js:112:10)
    at HTTPSServer.emit (events.js:70:17)
    at HTTPParser.onIncoming (http.js:1514:12)
    at HTTPParser.onHeadersComplete (http.js:102:31)
    at CleartextStream.ondata (http.js:1410:22)

