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
    <link rel="stylesheet" type="text/css" href="../estilo/carrusel.css" />

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
            <article id="dinamico" data-type="mapa">
                <h3> Mapa de tu ubicación </h3>
            </article>
        </section>

        <section>
            <h2>Carga de archivo XML</h2>
            <!-- El atributo multiple por defecto es false, por lo que solo permite la carga de 1 archivo -->
            <p><label for="archivoXML">Seleccione un archivo XML:</label>
                <input type="file" id="archivoXML" accept=".xml" onchange="viajes.readInputXML(this.files);"></p>
        </section>

        <section>
            <h2>Carga de archivos KML</h2>
            <!-- Se cambia el atributo multiple a true, por lo que permite la carga de varios archivos -->
            <p><label for="archivoKML">Seleccione un archivo KML:</label>
                <input type="file" id="archivoKML" accept=".kml" onchange="viajes.readInputKML(this.files);" multiple></p>
            <article id="kml" data-type="mapa">
                <h3> Planimetrías </h3>
            </article>
        </section>

        <section data-type="svg">
            <h2>Carga de archivos SVG</h2>
            <!-- Se cambia el atributo multiple a true, por lo que permite la carga de varios archivos -->
            <p><label for="archivoSVG">Seleccione un archivo SVG:</label>
                <input type="file" id="archivoSVG" accept=".svg" onchange="viajes.readInputSVG(this.files);" multiple></p>
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
                    $api_key = '9d61c740301a658bb4f4f8f7bd99076b';
                    $method = "flickr.photos.search";
                    $tag = $this->nombre . "," . $this->capital;
                    $perPage = 10;

                    $url = "https://api.flickr.com/services/rest/?";
                    $url .= '&method=' . $method;
                    $url .= '&api_key=' . $api_key;
                    $url .= '&tags=' . $tag;
                    $url .= '&per_page=' . $perPage;
                    $url .= '&format=json';
                    $url .= '&nojsoncallback=1';

                    $respuesta = file_get_contents($url);
                    $json = json_decode($respuesta);

                    /*
                    print ("<pre>");
                    print_r($json);
                    print ("</pre>");
                    */

                    $imgs = "";
                    if($json==null) {
                        $imgs = "<h3>Error en el archivo JSON recibido</h3>";
                    } else {
                        $imgs = "<h2>Carrusel de imágenes</h2>";
                        echo "<section data-type='carrusel'>";

                        for($i=0; $i < $perPage; $i++) {
                            $titulo = $json->photos->photo[$i]->title;
                            $server = $json->photos->photo[$i]->server;
                            $photo_id = $json->photos->photo[$i]->id;
                            $secret = $json->photos->photo[$i]->secret;

                            $URLfoto = "https://live.staticflickr.com/" . $server . "/" . $photo_id 
                                . "_" . $secret . "_w.jpg";  

                            $imgs .= "<img alt='" . $titulo . "' src='". $URLfoto . "' />";
                        }

                        echo $imgs;
                        echo "<button data-action='next' onclick='viajes.nextSlide()'> > </button>";
                        echo "<button data-action='prev'  onclick='viajes.prevSlide()'> < </button>";
                        echo "</section>";
                    }


                    return $imgs;
                }   
                
            }

            class Moneda {

                protected $monLocal;
                protected $monCambio;
                
                public function __construct($monLocal, $monCambio) {
                    $this->monLocal = $monLocal;
                    $this->monCambio = $monCambio;
                }

                
                public function getCambio(){
                    $api_key = '49db7223b908e0d7e99a2c163da83698334154e0';

                    // Tengo 100 usos diarios
                    $url = "https://api.getgeoapi.com/v2/currency/convert";
                    $url .= '?api_key=' . $api_key;
                    $url .= '&from=' . $this->monCambio;
                    $url .= '&to=' . $this->monLocal;
                    $url .= '&format=json';

                    $respuesta = file_get_contents($url);
                    $json = json_decode($respuesta);

                    $cambio = "";
                    if($json==null) {
                        $cambio = "<h3>Error en el archivo JSON de camnio de moneda recibido</h3>";
                    } else {
                        echo "<section>";
                        echo "<h2>Cambio de moneda</h2>";
                        $cambio = $json->rates->SVC->rate;
                        echo "<p>La moneda de San Salvador es el Colón y 1€ es equivalente a " . $cambio . "₡</p>";             
                        echo "</section>";
                    }
                }   
                
            }

            // Si no paso los strings juntos flickr da error en tags
            $carrusel = new Carrusel("elsalvador","sansalvador"); 
            $imgs = $carrusel->getFotos();

            // SVC - Colón El Slavador
            // Hay 100 usos diarios de la API
            $monedas = new Moneda("SVC","EUR"); 
            $monedas->getCambio();
        ?>
    </main>

    <footer>
        <p>Copyright @2023 Andrea Auñón (uo277876)</p>
        <p>SEW Curso 2023-2024</p>
    </footer>
</body>
</html>