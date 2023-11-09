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
        distancia = 0.0
        altura = 0
        coordx = []
        coordy = []
        nombres = []

        # Prologo svg
        svg = '<?xml version="1.0" encoding="utf-8"?>\n'
        svg += '<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n'
        svg += '<polyline points=\n'

        # (distancia,altura)
        altura = ruta.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud").text
        coordx.append(str(distancia))
        coordy.append(str(altura))
        nombres.append(ruta.find("{http://www.uniovi.es}nombre").text)
        svg += '"' + str(distancia) + "," + str(altura) + '\n'

        for hito in ruta.findall('{http://www.uniovi.es}hitos/{http://www.uniovi.es}hito'):
            distancia += float(hito.find("{http://www.uniovi.es}distancia").text)
            altura = hito.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud").text
            coordx.append(str(distancia))
            coordy.append(str(altura))
            nombres.append(hito.find("{http://www.uniovi.es}hnombre").text)
            svg += str(distancia) + "," + str(altura) + '\n'

        svg += '"\n'
        # Fin coordenadas
        svg += 'style="fill:white;stroke:red;stroke-width:4" />\n'

        # Texts
        for i in range(len(coordx)):
            svg += '<text x="' + coordx[i] + '" y="' + coordy[i] + '" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n'
            svg += nombres[i] + "\n"
            svg += "</text>\n"

        # Epilogo svg
        svg += "</svg>"

        # Creacion del archivo de salida
        with open("perfil" + str(index) + ".svg", 'w', encoding='UTF-8') as file:
            file.write(svg)
        index += 1

    print("Done")

if __name__ == "__main__":
    main()
