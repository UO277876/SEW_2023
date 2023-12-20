 ERRORES DE VALIDACIÓN
 INSPECTOR
- El inspector me da un aviso respecto a los mapas debido a que para que me pase  el validador HTML
 tuve que ponerle un h3 a los contenedores (el mapa se visualiza correctamente de igual forma). El aviso es:
 * The map container element should be empty, otherwise the map's interactivity will 
   be negatively impacted. If you want to display a message when WebGL is not supported, use the Mapbox GL Supported plugin instead

- Otros avisos que me da el inspector respecto a los mapas son:
* WebGL warning: texImage: Alpha-premult and y-flip are deprecated for non-DOM-Element uploads.
* WEBGL_debug_renderer_info is deprecated in Firefox and will be removed. Please use RENDERER. (en firefox)

 LIGHTHOUSE
- También en todos los lugares donde uso imágenes me sale el siguiente error, pero las imágenes se redimensionan
correctamente:
* Los elementos de la imagen no tienen elementos explícitos width y height

 CSS
- Tengo varios avisos de color de fondo y de color de texto en todos mis css (todos documentados en el código)

- Tengo dos avisos del validador css de redefinición de propiedad (también documentados en el código):
	* En sudoku.css la propiedad display (section[data-type:"botonera"]) y width (main) al redimensionar en móviles
	* En crucigrama.css la propiedad display (section[data-type:"botonera"]) al redimensionar en móviles