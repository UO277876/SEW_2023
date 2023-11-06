import xml.etree.ElementTree as ET

def process_element(kml: str, xml_node: ET.Element):
    kml += "<Placemark>\n"
    kml += "<name>\n"
    kml += xml_node.find("nombre").text.strip() + "\n"
    kml += "</name>\n"

    kml += "<Point>\n"
    kml += "<coordinates>\n"
    kml += xml_node.find("longitud") + "," + xml_node.find("altitud") + "," + xml_node.find("latitud")
    kml += "</coordinates>\n"
    kml += "</Point>\n"
    kml += "</Placemark>\n"

    return kml

def process_hito(kml: str, xml_node: ET.Element):
    kml += "<Placemark>\n"
    kml += "<name>\n"
    kml += xml_node.find("hnombre").text.strip() + "\n"
    kml += "</name>\n"

    kml += "<Point>\n"
    kml += "<coordinates>\n"
    kml += xml_node.find("longitud") + "," + xml_node.find("altitud") + "," + xml_node.find("latitud")
    kml += "</coordinates>\n"
    kml += "</Point>\n"
    kml += "</Placemark>\n"

    return kml

def writeProAndEnd(kml: str, xml_node: ET.Element):
    # Prologo kml
    kml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n'
    kml += "<Document>\n"

    # Escritura de coordenadas
    kml += process_element(kml, xml_node)
    for hito in xml_node.findAll('./hito'):
        kml += process_hito(kml, hito)

    # Epilogo
    kml += "</Document>\n"
    kml += "</kml>"

def main():
    nombreXML = input('Introduzca un archivo XML = ')

    # Leer xml
    try:
        tree = ET.parse(nombreXML)
    except IOError:
        print ('No se encuentra el archivo ', nombreXML)
        exit()
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", nombreXML)
        exit()

    root = tree.getroot()

    index = 1
    # Escribir el kml
    for ruta in root.findAll('./rutas/ruta'):
        kml = writeProAndEnd(kml, ruta)
        with open("ruta" + index, 'w', encoding='UTF-8') as file:
            file.write(kml)
        index += 1

if __name__ == "__main__":
    main()