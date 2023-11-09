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

    # Para escribir el nombre de archivo de los kml uso index
    index = 1
    for ruta in root.findall('.//{http://www.uniovi.es}ruta'):
        # Prologo svg
        svg = '<?xml version="1.0" encoding="utf-8"?>\n'
        svg += '<svg width="4000" height="auto" style="overflow:visible " version="1.1" xmlns="http://www.w3.org/2000/svg">\n'

       

        # Epilogo
        svg += "</svg>"

        # Creacion del archivo de salida
        with open("perfil" + str(index) + ".svg", 'w', encoding='UTF-8') as file:
            file.write(svg)
        index += 1

    print("Done")

if __name__ == "__main__":
    main()
