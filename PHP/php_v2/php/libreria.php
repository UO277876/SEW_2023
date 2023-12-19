<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio virtual - Librería</title>

    <!-- Metadatos-->
    <meta name ="author" content ="Andrea Auñón" />
    <meta name ="description" content ="Gestiona tu propia tienda de libros" />
    <meta name ="keywords" content ="Librería,Libros,Tienda,Añadir,Ver,Importar,Exportar" />
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
                <a accesskey="i" tabindex="8" href="../memoria.html">Memoria</a>
                <a accesskey="k" tabindex="9" href="../sudoku.html">Sudoku</a>
                <a accesskey="m" tabindex="10" href="crucigrama.php">Crucigrama</a>
                <!-- Considere poner el acceskey en relación con e texto, no con el .html -->
                <a accesskey="u" tabindex="11" href="../api.html">Música</a>
                <a accesskey="b" tabindex="12" href="libreria.php">Librería</a>
            </nav>
    </article>

    <?php
        class Libreria {

            private $db;

            public function __construct() {
                $this->crearBD();
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
                $this->db->query($sql);
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
                    FOREIGN KEY (idAutor) REFERENCES autor(idAutor),
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
                    FOREIGN KEY (idLibro) REFERENCES libro(idLibro),
                    FOREIGN KEY (idLibreria) REFERENCES libreria(idLibreria)
                );");   

                $this->db->query("CREATE TABLE IF NOT EXISTS compra (
                    idLibro VARCHAR(9) NOT NULL,
                    idUsuario VARCHAR(9) NOT NULL,
                    PRIMARY KEY (idLibro,idUsuario),
                    FOREIGN KEY (idLibro) REFERENCES libro(idLibro),
                    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
                );");   
            }

            public function getLibros(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM libro ORDER BY idAutor");
                $consultaPre->execute();

                $libros = $consultaPre->get_result();
        
                if ($libros->num_rows > 0) {
                    echo "<h4>Libros</h4>";
                    echo "<ol>";

                    foreach ($libros as $libro) {
                        echo "<li>IdLibro: ".$libro["idLibro"];
                        echo "<ul><li>Titulo: ".$libro["titulo"]."</li>";
                        echo "<li>Género literario: ".$libro["generoLit"]."</li>";
                        echo "<li>Precio: ".$libro["precio"]."</li></ul>";
                        echo "</li>";
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
                    echo "<h4>Usuarios</h4>";
                    echo "<ol>";

                    foreach ($usuarios as $usuario) {
                        echo "<li>IdUsuario: ".$usuario["idUsuario"];
                        echo "<ul><li>Nombre: ".$usuario["nombreu"]."</li>";
                        echo "<li>Género: ".$usuario["generou"]."</li>";
                        echo "<li>Edad: ".$usuario["edadu"]."</li>";
                        echo "<li>Email: ".$usuario["emailu"]."</li></ul>";
                        echo "</li>";
                    }

                    echo "</ol>";
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
                    echo "<h4>Librerías</h4>";
                    echo "<ol>";

                    foreach ($librerias as $libreria) {
                        echo "<li>IdLibreria: ".$libreria["idLibreria"];
                        echo "<ul><li>Ciudad: ".$libreria["ciudadl"]."</li></ul>";
                        echo "</li>";
                    }

                    echo "</ol>";
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
                    echo "<h4>Autores</h4>";
                    echo "<ol>";

                    foreach ($autores as $autor) {
                        echo "<li>IdAutor: ".$autor["idAutor"];
                        echo "<ul><li>Nombre: ".$autor["nombrea"]."</li>";
                        echo "<li>Apellidos: ".$autor["apellidosa"]."</li></ul>";
                        echo "</li>";
                    }

                    echo "</ol>";
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
                $consultaPre->bind_param('s',$_GET['idAutorLibro']); 
                $consultaPre->execute();

                $libros = $consultaPre->get_result();
        
                if ($libros->num_rows > 0) {
                    echo "<ol>";
                    echo "<h4>Libros</h4>";

                    foreach ($libros as $libro) {
                        echo "<li>IdLibro: ".$libro["idLibro"];
                        echo "<ul><li>Titulo: ".$libro["titulo"]."</li>";
                        echo "<li>Género literario: ".$libro["generoLit"]."</li>";
                        echo "<li>Precio: ".$libro["precio"]."</li></ul>";
                        echo "</li>";
                    }

                    echo "</ol>";
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
                
                $consultaPre = $this->db->prepare("SELECT *
                    FROM compra JOIN libro ON libro.idLibro = compra.idLibro
                    WHERE compra.idUsuario = ?");
                $consultaPre->bind_param('s',$_GET['idUsuarioCompra']); 
                $consultaPre->execute();

                $libros = $consultaPre->get_result();

                if ($libros->num_rows > 0) {
                    echo "<ol>";
                    $precioTotal = 0;

                    foreach ($libros as $libro) {
                        echo "<li>IdLibro: ".$libro["idLibro"];
                        echo "<ul><li>Titulo: ".$libro["titulo"]."</li>";
                        echo "<li>Género literario: ".$libro["generoLit"]."</li>";
                        echo "<li>Precio: ".$libro["precio"]."</li></ul>";
                        echo "</li>";

                        $precioTotal += floatval($libro["precio"]);
                    }

                    echo "</ol>";
                    echo "<p>Dinero gastado: ".$precioTotal."€</p>";
                } else {
                    echo "<p>No hay libros comprados por ese usuario</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function reviseStock(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM contiene WHERE idLibreria = ? AND idLibro = ?");
                $consultaPre->bind_param('ss',$_POST['idLibreriaAdd'],$_POST['idLibroAdd']); 
                $consultaPre->execute();

                $columnas = $consultaPre->get_result();

                $hayStock = false;
                $stock = intval($_POST['cantidad']);
                $stockAnterior = "";
                if ($columnas->num_rows > 0) {
                    // Primero se revisa si ya hay stock de ese libro
                    echo "<p>Ya hay stock del libro en la tienda seleccionada. Se procede a sumar.</p>";
                    $hayStock = true;
                    foreach ($columnas as $columna) {
                        $stock += intval($columna["cantidad"]);
                        $stockAnterior = $columna["cantidad"];
                    } 
                } else {
                    echo "<p>No hay stock en la tienda seleccionada, se va a añadir.</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  

                if($hayStock){
                    // Si hay stock se hace un update
                    echo "<p> Stock anterior: " .$stockAnterior . "</p>";
                    echo "<p> Nuevo stock: " .$stock . "</p>";
                    $this->updateStock($stock,$_POST['idLibreriaAdd'],$_POST['idLibroAdd']);
                } else {
                    // Si no hay stock se hace un insert
                    $this->addStock($stock,$_POST['idLibreriaAdd'],$_POST['idLibroAdd']);
                }
            }

            protected function addStock($stock,$idLibreria,$idLibro){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("INSERT INTO contiene (idLibro,idLibreria,cantidad) VALUES (?,?,?)");
                $consultaPre->bind_param('ssi',$idLibro,$idLibreria,$stock); 
                $exito = $consultaPre->execute();

                if($exito === FALSE){
                    echo "<p>Ha habido algún problema al añadir el stock.</p>";
                } else {
                    echo "<p>Stock añadido correctamente.</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            protected function updateStock($stock,$idLibreria,$idLibro){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("UPDATE contiene SET cantidad = ? WHERE idLibro = ? AND idLibreria = ?");
                $consultaPre->bind_param('ssi',$stock,$idLibro,$idLibreria); 
                $exito = $consultaPre->execute();
                
                if($exito === FALSE){
                    echo "<p>Ha habido algún problema al actualizar el stock.</p>";
                } else {
                    echo "<p>Stock actualizado correctamente.</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function viewStock(){
                $this->connectionBD();
                $this->db -> select_db("tienda");
                
                $consultaPre = $this->db->prepare("SELECT * FROM contiene WHERE idLibreria = ? AND idLibro = ?");
                $consultaPre->bind_param('ss',$_GET['idLibreriaStock'],$_GET['idLibroStock']); 
                $consultaPre->execute();

                $columnas = $consultaPre->get_result();

                if ($columnas->num_rows > 0) {
                    echo "<h4>Stock</h4>";
                    echo "<ol>";

                    foreach ($columnas as $columna) {
                        echo "<li>IdLibreria: ".$columna["idLibreria"];
                        echo "<ul><li>IdLibro: ".$columna["idLibro"]."</li>";
                        echo "<li>Cantidad: ".$columna["cantidad"]."</li></ul>";
                        echo "</li>";
                    }

                    echo "</ol>";
                } else {
                    echo "<p>No hay stock para esa librería</p>";
                }

                $consultaPre->close();
                
                // Cierra la base de datos
                $this->cerrarBD();  
            }

            public function importAutores() {
                $this->connectionBD();
                $this->db->select_db("tienda");

                $handle = fopen("autor.csv", "r");
        
                while (($data = fgetcsv($handle,10000, ",")) != false) {
                    $consultaPre = $this->db->prepare("INSERT INTO autor (idAutor,nombrea,apellidosa) VALUES (?,?,?)");
                    $consultaPre->bind_param('sss', $data[0],$data[1],$data[2]);
                    $exito = $consultaPre->execute();
                    $consultaPre->close();
                }
        
                if ($exito) {
                    echo "<p>Importación de autores exitosa.</p>";
                } else {
                    echo "<p>Ha habido algún fallo con la importación de autores.</p>";
                }

                fclose($handle);

                $this->cerrarBD(); 
            }

            public function importUsuarios() {
                $this->connectionBD();
                $this->db->select_db("tienda");

                $handle = fopen($_FILES['usuarios']['name'], "r");
        
                while (($data = fgetcsv($handle)) != false) {
                    $consultaPre = $this->db->prepare("INSERT INTO usuario (idUsuario,nombreu,edadu,generou,emailu) VALUES (?,?,?,?,?)");
                    $consultaPre->bind_param('ssiss', $data[0], $data[1],$data[2],$data[3],$data[4]);
                    $exito = $consultaPre->execute();
                    $consultaPre->close();
                }
        
                if ($exito) {
                    echo "<p>Importación de usuarios exitosa.</p>";
                } else {
                    echo "<p>Ha habido algún fallo con la importación de usuarios.</p>";
                }

                fclose($handle);

                $this->cerrarBD(); 
            }

            public function importLibrerias() {
                $this->connectionBD();
                $this->db->select_db("tienda");

                $handle = fopen($_FILES['librerias']['name'], "r");
        
                while (($data = fgetcsv($handle)) != false) {
                    $consultaPre = $this->db->prepare("INSERT INTO libreria (idLibreria,ciudadl) VALUES (?,?)");
                    $consultaPre->bind_param('ss', $data[0], $data[1]);
                    $exito = $consultaPre->execute();
                    $consultaPre->close();
                }
        
                if ($exito) {
                    echo "<p>Importación de librerías exitosa.</p>";
                } else {
                    echo "<p>Ha habido algún fallo con la importación de librerías.</p>";
                }

                fclose($handle);

                $this->cerrarBD(); 
            }

            public function importLibros() {
                $this->connectionBD();
                $this->db->select_db("tienda");

                $handle = fopen($_FILES['libros']['name'], "r");
        
                while (($data = fgetcsv($handle)) != false) {
                    $consultaPre = $this->db->prepare("INSERT INTO libro (idLibro,titulo,generoLit,precio,idAutor) VALUES (?,?,?,?,?)");
                    $consultaPre->bind_param('sssis', $data[0], $data[1],$data[2],$data[3],$data[4]);
                    $exito = $consultaPre->execute();
                    $consultaPre->close();
                }
        
                if ($exito) {
                    echo "<p>Importación de libros exitosa.</p>";
                } else {
                    echo "<p>Ha habido algún fallo con la importación de libros.</p>";
                }

                fclose($handle);

                $this->cerrarBD(); 
            }

            public function importContiene() {
                $this->connectionBD();
                $this->db->select_db("tienda");

                $handle = fopen($_FILES['contiene']['name'], "r");
        
                while (($data = fgetcsv($handle)) != false) {
                    $consultaPre = $this->db->prepare("INSERT INTO contiene (idLibro,idLibreria,cantidad) VALUES (?,?,?)");
                    $consultaPre->bind_param('ssi', $data[0], $data[1],$data[2]);
                    $exito = $consultaPre->execute();
                    $consultaPre->close();
                }
        
                if ($exito) {
                    echo "<p>Importación de contiene exitosa.</p>";
                } else {
                    echo "<p>Ha habido algún fallo con la importación de contiene.</p>";
                }

                fclose($handle);

                $this->cerrarBD(); 
            }

            public function importCompra() {
                $this->connectionBD();
                $this->db->select_db("tienda");

                $handle = fopen($_FILES['compra']['name'], "r");
        
                while (($data = fgetcsv($handle)) != false) {
                    $consultaPre = $this->db->prepare("INSERT INTO compra (idLibro,idUsuario) VALUES (?,?)");
                    $consultaPre->bind_param('ss', $data[0], $data[1]);
                    $exito = $consultaPre->execute();
                    $consultaPre->close();
                }
        
                if ($exito) {
                    echo "<p>Importación de compra exitosa.</p>";
                } else {
                    echo "<p>Ha habido algún fallo con la importación de compra.</p>";
                }

                fclose($handle);

                $this->cerrarBD(); 
            }

            public function export(){
                // 1. Se establece conexión con la BD
                $this->connectionBD();
                $this->db->select_db("tienda");

                // 2. Se va exporando cada tabla
                $this->exportTable("autor.csv","autor");
                $this->exportTable("libro.csv","libro");
                $this->exportTable("libreria.csv","libreria");
                $this->exportTable("usuario.csv","usuario");
                $this->exportTable("contiene.csv","contiene");
                $this->exportTable("compra.csv","compra");

                // 3. Se cierra la BD
                $this->cerrarBD(); 
            }

            /**
             * Exporta la tabla pasada como parámetro
             */
            public function exportTable($csvName,$nameTable) {
                $consultaPre = $this->db->prepare("SELECT * FROM " . $nameTable);
                $consultaPre->execute();
                $resultado = $consultaPre->get_result();

                $consultaPre->close();

                if ($resultado->fetch_assoc() != null) {
                    $fp = fopen($csvName, 'w');
    
                    foreach ($resultado as $fila) {
                        fputcsv($fp, $fila);
                    }
    
                    fclose($fp);
    
                        header("Cache-Control: public");
                        header("Content-Description: File Transfer");
                        header('Content-Disposition: attachment; filename="' . $csvName . '"');
                        header("Content-Type: text/csv");
                        header("Content-Transfer-Encoding: binary");

                    echo "<p>Exportación de " . $nameTable . " exitosa.</p>";
                }
            }
        }

        $db = new Libreria();
    ?>

    <main>
        <article>
            <h2>Gestión de la tienda de libros</h2>

            <section>
                <h3>Importar usuarios</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p><label for='importUsuarios'>Cargue el CSV de usuarios:</label> 
                        <input id='importUsuarios' type='file' name='usuarios'/></p>
                    <button type="submit" name='importUsuarios'>Enviar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["importUsuarios"])) $db->importUsuarios();
					}
				?>
            </section> 

            <section>
                <h3>Importar autores</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p><label for='importAutores'>Cargue el CSV de autores:</label> 
                        <input id='importAutores' type='file' name='autores'/></p>
                    <button type="submit" name='importAutores'>Enviar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["importAutores"])) $db->importAutores();
					}
				?>
            </section> 

            <section>
                <h3>Importar librerías</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p><label for='importLibrerias'>Cargue el CSV de librerías:</label> 
                        <input id='importLibrerias' type='file' name='librerias'/></p>
                    <button type="submit" name='importLibrerias'>Enviar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["importLibrerias"])) $db->importLibrerias();
					}
				?>
            </section> 

            <section>
                <h3>Importar libros</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p><label for='importLibros'>Cargue el CSV de libros:</label> 
                        <input id='importLibros' type='file' name='libros'/></p>
                    <button type="submit" name='importLibros'>Enviar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["importLibros"])) $db->importLibros();
					}
				?>
            </section> 

            <section>
                <h3>Importar los libros que contiene una librería</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p><label for='importContiene'>Cargue el CSV que contiene los libros:</label> 
                        <input id='importContiene' type='file' name='contiene'/></p>
                    <button type="submit" name='importContiene'>Enviar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["importContiene"])) $db->importContiene();
					}
				?>
            </section> 

            
            <section>
                <h3>Importar las compras de usuarios</h3>
                <form action='#' method='post' enctype='multipart/form-data'>
                    <p><label for='importCompra'>Cargue el CSV que contiene las compras:</label> 
                        <input id='importCompra' type='file' name='compra'/></p>
                    <button type="submit" name='importCompra'>Enviar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["importCompra"])) $db->importCompra();
					}
				?>
            </section> 

            <section>
                <h3>Exportar datos</h3>
                <form action="#" method="post">
                    <button type="submit" name='exportar'>Exportar</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["exportar"])) $db->export();
					}
				?>
            </section> 

            <section>
                <h3>Buscar información general</h3>
                <form action="#" method="get">
                    <button type="submit" name='verUsuarios'>Usuarios</button>
                    <button type="submit" name='verLibrerias'>Librerías</button>
                    <button type="submit" name='verAutores'>Autores</button>
                    <button type="submit" name='verLibros'>Libros</button>
                </form>
                <?php
					if (count($_GET)>0) {   
						if(isset($_GET["verUsuarios"])) $db->getUsuarios();
                        if(isset($_GET["verLibrerias"])) $db->getLibrerias();
                        if(isset($_GET["verAutores"])) $db->getAutores();
                        if(isset($_GET["verLibros"])) $db->getLibros();
					}
				?>
            </section>

            <section>
                <h3>Ver libros por autor</h3>
                <form action='#' method='get'>                          
                    <p><label for='idAutorLibro'>idAutor:</label>
                        <input id='idAutorLibro' type='text' name='idAutorLibro' required /></p>
                    <button type="submit" name='librosAutor'>Buscar</button>
                </form>

                <?php
					if (count($_GET)>0) {   
						if(isset($_GET["librosAutor"])) $db->getLibrosAutor();
					}
				?>
            </section> 

            <section>
                <h3>Ver compras de un usuario y el total de precio ellas</h3>
                <form action='#' method='get'>                          
                    <p><label for='idUsuarioCompra'>idUsuario:</label>
                        <input id='idUsuarioCompra' type='text' name='idUsuarioCompra' required /></p>
                    <button type="submit" name='usuarioCompras'>Buscar</button>
                </form>

                <?php
					if (count($_GET)>0) {   
						if(isset($_GET["usuarioCompras"])) $db->getLibrosUsuario();
					}
				?>
            </section> 

            <section>
                <h3>Añadir stock a una librería</h3>
                <form action='#' method='post'>                          
                    <p><label for='idLibreriaAdd'>idLibreria:</label>
                        <input id='idLibreriaAdd' type='text' name='idLibreriaAdd' required /></p>
                    <p><label for='idLibroAdd'>idLibro:</label>
                        <input id='idLibroAdd' type='text' name='idLibroAdd' required /></p>
                    <p><label for='cantidad'>Cantidad:</label>
                        <input id='cantidad' type='number' min="0" max="100" name='cantidad' required /></p>
                    <button type="submit" name='addStock'>Añadir</button>
                </form>

                <?php
					if (count($_POST)>0) {   
						if(isset($_POST["addStock"])) $db->reviseStock();
					}
				?>
            </section> 

            <section>
                <h3>Ver stock de una librería</h3>
                <form action='#' method='get'>                          
                    <p><label for='idLibreriaStock'>idLibreria:</label>
                        <input id='idLibreriaStock' type='text' name='idLibreriaStock' required /></p>
                    <p><label for='idLibroStock'>idLibro:</label>
                        <input id='idLibroStock' type='text' name='idLibroStock' required /></p>
                    <button type="submit" name='viewStock'>Ver</button>
                </form>

                <?php
					if (count($_GET)>0) {   
						if(isset($_GET["viewStock"])) $db->viewStock();
					}
				?>
            </section> 
        </article>
    </main>

    <footer>
        <p>Copyright @2023 Andrea Auñón (uo277876)</p>
        <p>SEW Curso 2023-2024</p>
    </footer>
</body>
</html>