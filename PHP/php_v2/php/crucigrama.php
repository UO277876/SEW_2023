<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <!-- Icono para las pestañas del navegador -->
    <link rel="icon" href="multimedia/imagenes/favicon_48.ico" />
    <title>Escritorio virtual - Crucigrama</title>

    <meta name ="author" content ="Andrea Auñón" />
    <meta name ="description" content ="Crucigrama con top 10 de jugadores" />
    <meta name ="keywords" content ="Juego,Crucigrama,Matematicas,Top,Jugadores" />
    <!-- Para la adaptibilidad -->
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <!-- Hojas de estilo -->
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/crucigrama.css" />

    <!-- Icono para las pestañas del navegador -->
    <link rel="icon" href="../multimedia/imagenes/favicon_48.ico" />

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="../js/crucigrama.js"></script>
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

    <section>
        <h2> Juegos </h2>
        <!-- Barra de navegación hacia todos los juegos + api + libreria (php) -->
        <nav>
            <a accesskey="i" tabindex="1" href="../memoria.html">Memoria</a>
            <a accesskey="k" tabindex="2" href="../sudoku.html">Sudoku</a>
            <a accesskey="m" tabindex="3" href="crucigrama.php">Crucigrama</a>
            <!-- Considere poner el acceskey en relación con e texto, no con el .html -->
            <a accesskey="u" tabindex="4" href="../api.html">Música</a>
            <a accesskey="b" tabindex="5" href="libreria.php">Librería</a>
        </nav>
    </section>

    <section data-type="botonera">
        <h2>Botonera</h2>
        <p>Para usar en dispositivos móviles se debe usar la botonera</p>
        <button onclick="crucigrama.introduceElement(1)">1</button>
        <button onclick="crucigrama.introduceElement(2)">2</button>
        <button onclick="crucigrama.introduceElement(3)">3</button>
        <button onclick="crucigrama.introduceElement(4)">4</button>
        <button onclick="crucigrama.introduceElement(5)">5</button>
        <button onclick="crucigrama.introduceElement(6)">6</button>
        <button onclick="crucigrama.introduceElement(7)">7</button>
        <button onclick="crucigrama.introduceElement(8)">8</button>
        <button onclick="crucigrama.introduceElement(9)">9</button>
        <button onclick="crucigrama.introduceElement('*')">*</button>
        <button onclick="crucigrama.introduceElement('+')">+</button>
        <button onclick="crucigrama.introduceElement('-')">-</button>
        <button onclick="crucigrama.introduceElement('/')">/</button>
    </section>

    <main>
        <script>
            var crucigrama = new Crucigrama();
            crucigrama.paintMathword();
    
            document.addEventListener('keydown', function(e) {
                if(!(crucigrama.isFinished)){
                    var cellClicked = document.querySelector("p[data-state='clicked']");
    
                    // Comprueba si hay alguna casilla seleccionada
                    if(cellClicked == null){
                        alert("Debe pulsar una casilla antes de continuar")
                    } else {
                        // Comprueba si la casilla seleccionada esta en estado clicked (por si acaso)
                        if(cellClicked.dataset.state == "clicked"){
                            if((e.key >= "1" && e.key) <= "9" || 
                                (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/")){
                                    crucigrama.introduceElement(e.key);
                            } else {
                                alert("La tecla seleccionada no es correcta")
                            }
                        }
                    }
                }
            });
        </script>
    </main>

    <?php
        class Record {

            protected $server;
            protected $user;
            protected $pass;
            protected $dbname;

            public function __construct() {
                $this->server = "localhost";
                $this->user = "DBUSER2023";
                $this->pass = "DBPSWD2023";
                $this->dbname = "records";
            }

            protected function connectionBD() {
                // Conexión al SGBD local con XAMPP con el usuario creado 
                $db = new mysqli($this->server,$this->user,$this->pass,$this->dbname);

                //comprobamos conexión
                if($db->connect_error) {
                    exit ("<p>ERROR de conexión:".$db->connect_error."</p>");  
                }

                return $db;
            }

            /**
            * Añade un nuevo record a la base de datos
            */
            public function addRecord() {
                $db = $this->connectionBD();

                $consultaPre = $db->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?,?,?,?)");
                $consultaPre->bind_param('sssi',$_POST['nombre'],$_POST['apellidos'],$_POST['nivel'],$_POST['tiempo']); 
                $consultaPre->execute();

                $consultaPre->close();

                // Cierra la base de datos
                $db->close();  
                
                // Llamada para obtener los 10 mejores records
                $this->getRecords();
            }

            /**
            * Añade un nuevo record a la base de datos
            */
            public function getRecords() {
                $db = $this->connectionBD();

                $consultaPre = $db->prepare("SELECT nombre, apellidos, nivel, tiempo FROM registro 
                    WHERE nivel = ? ORDER BY tiempo LIMIT 10");
                $consultaPre->bind_param('s',$_POST['nivel']); 
                $consultaPre->execute();

                $result = $consultaPre->get_result();

                if ($result->num_rows > 0) {
                    echo "<article><h3>Top 10 mejores jugadores para el nivel actual</h3>";
                    $result->data_seek(0); // Se posiciona al inicio del resultado de búsqueda
                    echo "<ol>";
                    while($fila = $result->fetch_assoc()) {
                         // Formatear el tiempo en horas:minutos:segundos
                        $tiempo_formateado = gmdate("H:i:s", $fila["tiempo"]);
                        echo "<li>" . $fila["nombre"] . " " . $fila["apellidos"] . " con tiempo " . $tiempo_formateado . "</li>"; 
                    }            
                    
                    echo "</ol>";
                    echo "</article>";
                } else {
                    echo "<p>Búsqueda sin resultados</p>";
                }

                $consultaPre->close();

                // Cierra la base de datos
                $db->close();   
            }
        }

        $record = new Record();

        if(count($_POST) > 0){
            $record->addRecord();
        }
    ?>

    <footer>
        <p>Copyright @2023 Andrea Auñón (uo277876)</p>
        <p>SEW Curso 2023-2024</p>
    </footer>

</body>
</html>