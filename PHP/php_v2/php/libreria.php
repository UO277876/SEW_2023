<?php
        class Libreria {

            private $db;

            public function __construct() {
                $this->crearTablas();
            }

            protected function connectionBD() {
                $server = "localhost";
                $user = "DBUSER2023";
                $pass = "DBPSWD2023";

                // Conexión al SGBD local con XAMPP con el usuario creado 
                $this->db = new mysqli($server,$user,$pass);

                //comprobamos conexión
                if($this->db->connect_error) {
                    exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
                }
            }

            protected function crearBD() {
                $this->connectionBD();

                $sql = "CREATE DATABASE IF NOT EXISTS tienda COLLATE utf8_spanish_ci";
                $this->db->query($cadenaSQL);
                $this->cerrarBD();  
            }

            protected function cerrarBD(){
                $this->db->close();
            }

            protected function crearTablas() {
                $this->connectionBD();
                $this->db -> select_db("tienda");

                $this->db->query("CREATE TABLE IF NOT EXISTS autor (
                    idAutor VARCHAR(9) NOT NULL UNIQUE,
                    nombrea VARCHAR(255) NOT NULL, 
                    apellidosa VARCHAR(255) NOT NULL, 
                    PRIMARY KEY (idAutor)
                );");

                $this->db->query("CREATE TABLE IF NOT EXISTS libro (
                    idLibro VARCHAR(9) NOT NULL UNIQUE,
                    titulo VARCHAR(255) NOT NULL,
                    generoLit VARCHAR(255) NOT NULL,
                    precio DOUBLE NOT NULL,
                    idAutor VARCHAR(9) NOT NULL,
                    FOREIGN KEY (idAutor) REFERENCES Autor(idAutor),
                    PRIMARY KEY (idLibro)
                );");

                $this->db->query("CREATE TABLE IF NOT EXISTS libreria (
                    idLibreria VARCHAR(9) NOT NULL UNIQUE,
                    ciudadl VARCHAR(255) NOT NULL,
                    PRIMARY KEY (idLibreria)
                );");

                $this->db->query("CREATE TABLE IF NOT EXISTS usuario (
                    idUsuario VARCHAR(9) NOT NULL UNIQUE,
                    nombreu VARCHAR(255) NOT NULL,
                    edadu INTEGER NOT NULL,
                    generou VARCHAR(255) NOT NULL,
                    emailu VARCHAR(255) NOT NULL,
                    PRIMARY KEY (idUsuario)
                );");     
                
                $this->db->query("CREATE TABLE IF NOT EXISTS contiene (
                    idLibro VARCHAR(9) NOT NULL,
                    idLibreria VARCHAR(9) NOT NULL, 
                    cantidad INTEGER DEFAULT -1, 
                    PRIMARY KEY (idLibro,idLibreria),
                    FOREIGN KEY (idLibro) REFERENCES Libro(idLibro),
                    FOREIGN KEY (idLibreria) REFERENCES Libreria(idLibreria)
                );");   

                $this->db->query("CREATE TABLE IF NOT EXISTS compra (
                    idLibro VARCHAR(9) NOT NULL,
                    idUsuario VARCHAR(9) NOT NULL,
                    PRIMARY KEY (idLibro,idUsuario),
                    FOREIGN KEY (idLibro) REFERENCES Libro(idLibro),
                    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
                );");   
            }

            public function getLibros(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM libro ORDER BY idAutor");
                $consultaPre->execute();

                $libros = $consultaPre->get_result();
        
                if ($libros->num_rows > 0) {
                    echo "<table>
                            <caption>Libros</caption>
                            <tr>
                                <th scope='col' id='idLibro'>id</th>
                                <th scope='col' id='titulo'>Titulo</th> 
                                <th scope='col' id='generoLit'>Género</th>
                                <th scope='col' id='precio'>Precio</th>
                            </tr>
                        ";

                    foreach ($libros as $libro) {
                        echo "<tr>";
                        echo "<td headers='idLibro'>".$libro["idLibro"]."</td> ";
                        echo "<td headers='titulo'>".$libro["titulo"]."</td> ";
                        echo "<td headers='generoLit'>".$libro["generoLit"]."</td> ";
                        echo "<td headers='precio'>".$libro["precio"]."</td> ";
                        echo "</tr>";
                    }

                    echo "</table>";
                } else {
                    echo "<p>No hay libros disponibles</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function getUsuarios(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM usuario");
                $consultaPre->execute();

                $usuarios = $consultaPre->get_result();
        
                if ($usuarios->num_rows > 0) {
                    echo "<table>
                            <caption>Usuarios</caption>
                            <tr>
                                <th scope='col' id='idUsuario'>id</th> 
                                <th scope='col' id='nombre'>Nombre</th> 
                                <th scope='col' id='genero'>Género</th>
                                <th scope='col' id='edad'>Edad</th>
                                <th scope='col' id='email'>Email</th>
                            </tr>
                        ";

                    foreach ($usuarios as $usuario) {
                        echo "<tr>";
                        echo "<td headers='idUsuario'>".$usuario["idUsuario"]."</td> ";
                        echo "<td headers='nombre'>".$usuario["nombreu"]."</td> ";
                        echo "<td headers='genero'>".$usuario["generou"]."</td> ";
                        echo "<td headers='edad'>".$usuario["edadu"]."</td> ";
                        echo "<td headers='email'>".$usuario["emailu"]."</td> ";
                        echo "</tr>";
                    }

                    echo "</table>";
                } else {
                    echo "<p>No hay usuarios disponibles</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function getLibrerias(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM libreria");
                $consultaPre->execute();

                $librerias = $consultaPre->get_result();
        
                if ($librerias->num_rows > 0) {
                    echo "<table>
                            <caption>Librerías</caption>
                            <tr>
                                <th scope='col' id='idLibreria'>id</th> 
                                <th scope='col' id='ciudad'>Ciudad</th> 
                            </tr>
                        ";

                    foreach ($librerias as $libreria) {
                        echo "<tr>";
                        echo "<td headers='idLibreria'>".$libreria["idLibreria"]."</td> ";
                        echo "<td headers='ciudad'>".$libreria["ciudadl"]."</td> ";
                        echo "</tr>";
                    }

                    echo "</table>";
                } else {
                    echo "<p>No hay librerías disponibles</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function getAutores(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM autor");
                $consultaPre->execute();

                $autores = $consultaPre->get_result();
        
                if ($autores->num_rows > 0) {
                    echo "<table>
                            <caption>Librerías</caption>
                            <tr>
                                <th scope='col' id='idAutor'>id</th> 
                                <th scope='col' id='nombrea'>Nombre</th> 
                                <th scope='col' id='apellidosa'>Apellidos</th>
                            </tr>
                        ";

                    foreach ($autores as $autor) {
                        echo "<tr>";
                        echo "<td headers='idAutor'>".$autor["idAutor"]."</td> ";
                        echo "<td headers='nombrea'>".$autor["nombrea"]."</td> ";
                        echo "<td headers='apellidosa'>".$autor["apellidosa"]."</td> ";
                        echo "</tr>";
                    }

                    echo "</table>";
                } else {
                    echo "<p>No hay autores disponibles</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function getLibrosAutor(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM libro WHERE idAutor=?");
                $consultaPre->bind_param('s',$_POST['idAutorLibro']); 
                $consultaPre->execute();

                $libros = $consultaPre->get_result();
        
                if ($libros->num_rows > 0) {
                    echo "<table>
                            <caption>Libros del autor seleccionado</caption>
                            <tr>
                                <th scope='col' id='idLibroaut'>id</th>
                                <th scope='col' id='tituloaut'>Titulo</th> 
                                <th scope='col' id='generoLitaut'>Género</th>
                                <th scope='col' id='precioaut'>Precio</th>
                            </tr>
                        ";

                    foreach ($libros as $libro) {
                        echo "<tr>";
                        echo "<td headers='idLibroaut'>".$libro["idLibro"]."</td> ";
                        echo "<td headers='tituloaut'>".$libro["titulo"]."</td> ";
                        echo "<td headers='generoLitaut'>".$libro["generoLit"]."</td> ";
                        echo "<td headers='precioaut'>".$libro["precio"]."</td> ";
                        echo "</tr>";
                    }

                    echo "</table>";
                } else {
                    echo "<p>No hay libros para ese autor disponibles</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function getLibrosUsuario(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM compra WHERE idUsuario=?");
                $consultaPre->bind_param('s',$_POST['idUsuario']); 
                $consultaPre->execute();

                $autores = $consultaPre->get_result();
        
                if ($autores->num_rows > 0) {
                    echo "<table>
                            <caption>Compras</caption>
                            <tr>
                                <th scope='col' id='idAutor'>id</th> 
                                <th scope='col' id='nombrea'>Nombre</th> 
                                <th scope='col' id='apellidosa'>Apellidos</th>
                            </tr>
                        ";

                    foreach ($autores as $autor) {
                        echo "<tr>";
                        echo "<td headers='idAutor'>".$autor["idAutor"]."</td> ";
                        echo "<td headers='nombrea'>".$autor["nombrea"]."</td> ";
                        echo "<td headers='apellidosa'>".$autor["apellidosa"]."</td> ";
                        echo "</tr>";
                    }

                    echo "</table>";
                } else {
                    echo "<p>No hay autores disponibles</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }
        }
    ?>

<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio virtual - Viajes</title>

    <!-- Metadatos-->
    <meta name ="author" content ="Andrea Auñón" />
    <meta name ="description" content ="Gestiona tu propia tienda de libros" />
    <meta name ="keywords" content ="Librería,Libros,Tienda,Añadir,Ver" />
    <!-- Para la adaptibilidad -->
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <!-- Hojas de estilo -->
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/libreria.css" />

    <!-- Icono para las pestañas del navegador -->
    <link rel="icon" href="../multimedia/imagenes/favicon_48.ico" />
</head>

<body>
    <header>
        <!-- Encabezado principal -->
        <h1> Escritorio virtual </h1>

        <!-- Barra de navegación hacia todos los documentos del sitio web -->
        <nav>
            <a accesskey="c" tabindex="1" href="../index.html">Inicio</a>
            <a accesskey="r" tabindex="2" href="../sobremi.html">Sobre mi</a>
            <a accesskey="n" tabindex="3" href="../noticias.html">Noticias</a>
            <a accesskey="g" tabindex="4" href="../agenda.html">Agenda</a>
            <a accesskey="l" tabindex="5" href="../meteorologia.html">Meteorología</a>
            <a accesskey="j" tabindex="6" href="viajes.php">Viajes</a>
            <a accesskey="o" tabindex="7" href="../juegos.html">Juegos</a>
        </nav>
    </header>

    <article>
        <h2> Juegos </h2>
        <!-- Barra de navegación hacia todos los juegos + api + libreria (php) -->
        <nav>
            <a accesskey="i" tabindex="1" href="../memoria.html">Memoria</a>
            <a accesskey="u" tabindex="2" href="../sudoku.html">Sudoku</a>
            <a accesskey="m" tabindex="3" href="crucigrama.php">Crucigrama</a>
            <a accesskey="p" tabindex="4" href="../api.html">Música</a>
            <a accesskey="l" tabindex="5" href="libreria.php">Librería</a>
        </nav>
    </article>

    <main>
        <article>
            <h2>Gestión de la tienda de libros</h2>

            <section>
                <h3>Buscar información general</h3>
                <form action="#" method="post">
                    <button type="submit" name='verUsuarios'>Usuarios</button>
                    <button type="submit" name='verLibrerias'>Librerías</button>
                    <button type="submit" name='verAutores'>Autores</button>
                    <button type="submit" name='verLibros'>Libros</button>
                </form>
                <?php
					if (count($_POST)>0) {   
                        $db = new Libreria();
						if(isset($_POST["verUsuarios"])) $db->getLibros();
                        if(isset($_POST["verLibrerias"])) $db->getLibrerias();
                        if(isset($_POST["verAutores"])) $db->getAutores();
                        if(isset($_POST["verLibros"])) $db->getLibros();
					}
				?>
            </section>

            <section>
                <h3>Ver libros por autor</h3>
                <form action='#' method='post'>                          
                    <p><label for='idAutorLibro'>idAutor:</label>
                        <input id='idAutorLibro' type='text' name='idAutorLibro' required /></p>
                    <button type="submit" name='librosAutor'>Buscar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
                        $db = new Libreria();
						if(isset($_POST["librosAutor"])) $db->getLibrosAutor();
					}
				?>
            </section> 

            <section>
                <h3>Ver compras de un usuario</h3>
                <form action='#' method='post'>                          
                    <p><label for='idUsuarioCompra'>idUsuario:</label>
                        <input id='idUsuarioCompra' type='text' name='idUsuarioCompra' required /></p>
                    <button type="submit" name='usuarioCompras'>Buscar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
                        $db = new Libreria();
						if(isset($_POST["usuarioCompras"])) $db->getLibrosUsuario();
					}
				?>
            </section> 

            <section>
                <h3>Añadir stock a una librería</h3>

                <button onclick="api.addInformation()">Añadir</button>
            </section> 
        </article>
    </main>

    <footer>
        <p>Copyright @2023 Andrea Auñón (uo277876)</p>
        <p>SEW Curso 2023-2024</p>
    </footer>
</body>
</html>