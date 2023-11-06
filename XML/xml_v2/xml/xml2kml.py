import xml.etree.ElementTree as ET

def process_xml(xml_node: ET.Element):
    # Prologo kml
    kml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n'
    kml += "<Document>\n"

    # Escritura de coordenadas
    kml += "<Placemark>\n"
    kml += "<name>\n"
    kml += xml_node.find("nombre").text.strip('\n')
    kml += "</name>\n"

    kml += "<Point>\n"
    kml += "<coordinates>\n"
    kml += xml_node.find("longitud") + "," + xml_node.find("altitud") + "," + xml_node.find("latitud")
    kml += "</coordinates>\n"
    kml += "</Point>\n"
    kml += "</Placemark>\n"

    for hito in xml_node.findall('{http://www.uniovi.es}hito'):
        kml += "<Placemark>\n"
        kml += "<name>\n"
        kml += xml_node.find("hnombre").text.strip('\n')
        kml += "</name>\n"

        kml += "<Point>\n"
        kml += "<coordinates>\n"
        kml += xml_node.find("longitud") + "," + xml_node.find("altitud") + "," + xml_node.find("latitud")
        kml += "</coordinates>\n"
        kml += "</Point>\n"
        kml += "</Placemark>\n"

    # Epilogo
    kml += "</Document>\n"
    kml += "</kml>"

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
    for ruta in root.findall('.//'):
        kml = process_xml(ruta)
        with open("ruta" + index, 'w', encoding='UTF-8') as file:
            file.write(kml)
        index += 1

    print("done")

if __name__ == "__main__":
    main()
