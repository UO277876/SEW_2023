import xml.etree.ElementTree as ET

def obtener_coordenadas(kml: str, xml_node: ET.Element):
    kml += xml_node.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}longitud").text.strip('\n')
    kml += ","
    kml += xml_node.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}latitud").text.strip('\n')
    kml += ","
    kml += xml_node.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud").text.strip('\n')
    kml += "\n"
    return kml

def main():
    nombreXML = input('Introduzca un archivo XML = ')

    # Leer xml
    try:
        tree = ET.parse(nombreXML)
    except IOError :
        print ('No se encuentra el archivo ', nombreXML)
        exit()
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", nombreXML)
        exit()

    root = tree.getroot()

    # Para escribir el nombre de archivo de los kml uso index
    index = 1
    for ruta in root.findall('.//{http://www.uniovi.es}ruta'):
        # Prologo kml
        kml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n'
        kml += "<Document>\n"

        # Escritura de coordenadas
        kml += "<Placemark>\n"
        kml += "<name>"
        kml += ruta.find("{http://www.uniovi.es}nombre").text
        kml += "</name>\n"

        # Para poner la línea que une los puntos de los hitos
        kml += "<LineString>\n"
        kml += "<coordinates>\n"
        kml = obtener_coordenadas(kml,ruta)

        for hito in ruta.findall('{http://www.uniovi.es}hitos/{http://www.uniovi.es}hito'):
            kml = obtener_coordenadas(kml,hito)

        kml += "</coordinates>\n"
        kml += "</LineString>\n"

        # Para estilizar la línea de las rutas
        kml += "<Style> id='lineaAmarilla'>\n"
        kml += "<LineStyle>\n"
        kml += "<color>#ff2DE0ff</color>\n"
        kml += "<width>5</width>\n"
        kml += "</LineStyle>\n"
        kml += "</Style>\n"

        kml += "</Placemark>\n"

        # Epilogo
        kml += "</Document>\n"
        kml += "</kml>"

        # Creacion del archivo de salida
        with open("ruta" + str(index) + ".kml", 'w', encoding='UTF-8') as file:
            file.write(kml)
        index += 1

    print("Done")

if __name__ == "__main__":
    main()
