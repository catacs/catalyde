En mi opinión, los casos de uso son situaciones de utilización de la aplicación (el nombre lo dice). Según la wikipedia, "los casos de uso sirven para especificar la comunicación y el comportamiento de un sistema mediante su interacción con los usuarios y otros sistemas" Es decir, tienes que definir lo que va a hacer el usuario en la aplicación, y como mucho cosas que pueden tener un resultado (como guardar un registro en la bd o algo), pero no entrar en detalles como bloques, bloques de usuario, renderizado de templates, y cosas que el usuario ni se entera...

Yo creo que al igual que los requisitos, deben definir lo que se puede hacer con tu aplicación y yo me limitaría a eso. Y entrar en un poco de detalle en plan: si el usuario ya está registrado "Mostrar mensaje de error", con toda la casuística, o al menos la básica.

*con casuística me refiero a ifs de toda la vida: "Si el programa tiene errores de compilación esto, si no lo otro"

Pongo aquí los que creo que son los casos de uso (en mi opinión) y una breve descripción:

-> Sobre la interfaz principal:

- Login/Salir (En Salir y el resto de casos de uso poner como precondición estar logeado con un usuario válido)
- Listar Grupos/Prácticas (lo puedes poner dentro de la opción de login): se mostrará un listado con los grupos y prácticas del usuario. 
- Seleccion Práctica: Hacer click sobre la práctica y que se abrá la practica. Aquí puedes meter algo de casuística diciendo que el contenido de los editables son el valor por defecto de la plantilla del profesor o si tiene guardado se coge este.
- Guardar: El contenido de la práctica que ha sido editado durante la sesión se guarda. También poner el caso de que no hayan prácticas abiertas.
- Guardado automático: Aquí es igual pero el actor es el sistema.
- Imprimir
- Pantalla Completa.

-> Sobre las acciones
- Ejecutar una acción: aquí como las acciones son muy generales tampoco se puede concretizar mucho. Puedes poner la típica acción de ejecutar, y poner la casuística de error de compilación y abrir la terminal.
- Ejecutar un programa en la terminal: caso de uso una vez se ha abierto la terminal y se interactúa con el programa. Yo pondría algo como la entrada del usuario interacciona con el programa y viceversa (ya le daremos forma).

-> Interfaz de administración
(como precondicion para todos estar registrado y ser admin)
- Listar grupos: al entrar en la ventana de administración, sale una la lista de grupos y prácticas.
- Listar usuarios: igual que arriba.
- Listar prácticas de grupo: al seleccionar un grupo se muestran las prácticas que contiene.
- Añadir práctica a grupo: seleccionar una práctica, un grupo, y ya pones el tema de si ya existe en el grupo o no.
- Añadir usuario a grupo: parecido arriba pero con usuarios.

Y dado que la aplicación no sube prácticas y están hechas como script yo no definiría casos de uso para subir prácticas por el profesor, aunque se pueden poner casos de usos del script. Esta es mi opinión, creo que dista bastante de lo que había planteado Catalin en un principio, así que me gustaría que lo discutieramos, pero yo como casos de uso entiendo esto. Son los requisitos pero con casuística y una especie de "flujo" en plan verborrea, vamos una mierda, pero es lo que hay. Si es mucho curro, puedo ayudar con la redacción. Pero antes estaría bien que lo consesuaramos. Y seguro que me he dejado casos de usos, pero creo que la idea se entiende.
