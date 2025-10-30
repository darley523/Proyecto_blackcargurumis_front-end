blackcatgurumis es un emprendimiento que vende articulos hechos a mano, actualmente solo cuenta con una pagina de instagram y por ello busca expandirse a traves de una tienda de e-commerce. En esta version el administrador puede añadir productos desde la misma pagina (que se guardan en la bdd) puede eliminar usuarios, puede ver los diversos pedidos que han sido hechos ademas de poder editar sus estados. Ademas las contraseñas son encriptadas al guardarse en la base de datos

Tecnologias usadas: Springboot para el backend, Bootstrap (para el panel de administracion principalmente), react, vite, javaScript, jwt para la autenticacion de los usuarios, spring security para proteger rutas privadas.

Requisitos para ejecutar el proyecto completo (backend-frontend)-> Vs code (con extensiones: extension pack for java y spring boot extension pack) XAMPP, MySqlWorkbench, npm, vite y Java minimo 17

1.Abrir Xampp y dar start en los modulos de apache y MySqlWorkbench
2.Abrir MySqlWorkbench y crear una conexion de usuario root y contraseña vacia
3.En MySqlWorkbench crear un nuevo scheme de nombre blackcatgurumi
4.En vs code abrir proyecto_blackcatugurumis_back-end 
5.En vs code buscar a la izquierda el icono de Spring Boot Dashboard y darle a ejecutar a blackend-blackcatgurumis (esto creara la estructura de la base de datos)
6.Abrir proyecto_blackcatgurumis_front-end y lanzarlo con npm run dev

Documentación Swagger
http://localhost:8080/swagger-ui/index.html


*IMPORTANTE PREVIO A LA EJECUCUCION VERIRIFICAR ESTOS MODULOS DE NODE
# Para el enrutamiento
npm install react-router-dom

# Para los componentes de UI
npm install react-bootstrap bootstrap

# Para decodificar tokens de autenticación
npm install jwt-decode
