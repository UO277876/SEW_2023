import xml.etree.ElementTree as ET

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

    # Escribir los 3 kml
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

        kml += "<Point>\n"
        kml += "<coordinates>"
        kml += ruta.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}longitud").text.strip('\n')
        kml += ","
        kml += ruta.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}latitud").text
        kml += "</coordinates>\n"
        kml += "</Point>\n"
        kml += "</Placemark>\n"

        for hito in ruta.findall('{http://www.uniovi.es}hitos/{http://www.uniovi.es}hito'):
            kml += "<Placemark>\n"
            kml += "<name>"
            kml += hito.find("{http://www.uniovi.es}hnombre").text
            kml += "</name>\n"

            kml += "<Point>\n"
            kml += "<coordinates>"
            kml += ruta.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}longitud").text.strip('\n')
            kml += ","
            kml += ruta.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}latitud").text
            kml += "</coordinates>\n"
            kml += "</Point>\n"
            kml += "</Placemark>\n"

        # Epilogo
        kml += "</Document>\n"
        kml += "</kml>"

        with open("ruta" + str(index) + ".kml", 'w', encoding='UTF-8') as file:
            file.write(kml)
            print("escrito kml " + str(index))
        index += 1

    print("Done")

if __name__ == "__main__":
    main()
