<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio virtual - Viajes</title>

    <!-- Metadatos-->
    <meta name ="author" content ="Andrea Auñón" />
    <meta name ="description" content ="Obtén tu ubicación y procesa archivos XML, KML y SVG" />
    <meta name ="keywords" content ="Viajes,Geolocalizacion,MapaEstatico,MapaDinamico,XML,KML,SVG,rutas" />
    <!-- Para la adaptibilidad -->
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <!-- Hojas de estilo -->
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/viajes.css" />

    <!-- Hojas de estilo - Mapbox -->
    <link href='https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css' rel='stylesheet' />

    <!-- Icono para las pestañas del navegador -->
    <link rel="icon" href="../multimedia/imagenes/favicon_48.ico" />

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src='https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js'></script>
    <script src="../js/viajes.js"></script>

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

    <main>
        <section>
            <h2>Mapa estático</h2>
            <button onclick="viajes.getMapaEstaticoGoogle()">Obtener mapa estático</button>
            <p data-type="estatico"></p>
        </section>

        <section>
            <h2>Mapa dinámico</h2>
            <button onclick="viajes.initMap()">Obtener mapa dinámico</button>
            <p id="dinamico" data-type="mapa"></p>
        </section>

        <section>
            <h2>Carga de archivo XML</h2>
            <!-- El atributo multiple por defecto es false, por lo que solo permite la carga de 1 archivo -->
            <p><input type="file" accept=".xml" onchange="viajes.readInputXML(this.files);"></p>
        </section>

        <section>
            <h2>Carga de archivos KML</h2>
            <!-- Se cambia el atributo multiple a true, por lo que permite la carga de varios archivos -->
            <p><input type="file" accept=".kml" onchange="viajes.readInputKML(this.files);" multiple></p>
            <p id="kml" data-type="mapa"></p>
        </section>

        <section>
            <h2>Carga de archivos SVG</h2>
            <!-- Se cambia el atributo multiple a true, por lo que permite la carga de varios archivos -->
            <p><input type="file" accept=".svg" onchange="viajes.readInputSVG(this.files);" multiple></p>
        </section>

        <?php
            class Carrusel {

                protected $nombre;
                protected $capital;
                
                public function __construct($nombre, $capital) {
                    $this->nombre = $nombre;
                    $this->capital = $capital;
                }

                
            public function getFotos(){
                // 1. Crear la URL de la API que se va a llamar
                $params = array(
                    'api_key'	=> '0565634739c78dcdbf56368cb0991f0b',
                    'method'	=> 'flickr.photos.getInfo',
                    'photo_id'	=> '33289594495',
                    'format'	=> 'php_serial',
                );

                $encoded_params = array();

                foreach ($params as $k => $v) {
                    $encoded_params[] = urlencode($k).'='.urlencode($v);
                }

                // 2. Llamar a la API y decodificar la respuesta
                $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);

                $rsp = file_get_contents($url);

                $rsp_obj = unserialize($rsp);

                echo "<article>";
                echo "<h2>Objeto PHP recibido</h2>";
                print ("<pre>");
                print_r($rsp_obj);
                print ("</pre>");

                echo "<h2>Datos recibidos</h2>";

                // 3. Ver los datos de la imagen (o un error)
                if ($rsp_obj['stat'] == 'ok'){

                } else {
                    echo "<h3>¡Error al llamar al servicio Web!</h3>";
                }
            }   
                
            }

            $carrusel = new Carrusel("El Salvador","San Salvador"); 

            $carrusel->getFotos();
        ?>
    </main>

    <footer>
        <p>Copyright @2023 Andrea Auñón (uo277876)</p>
        <p>SEW Curso 2023-2024</p>
    </footer>
</body>
</html>