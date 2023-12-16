import xml.etree.ElementTree as ET

def comprobacion_distancia(distancia: float):
    # Conversión de la distancia
    return distancia/100

def main():
    # nombreXML = input('Introduzca un archivo XML = ')
    nombreXML = "rutasEsquema.xml"

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
        alturaMax = 0.0
        distancia = 0.0
        altura = alturaMax
        coordx = []
        coordy = []
        nombres = []

        # Conversion: (distancia/100,alturaMax - altura)
        alturaMax = float(ruta.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud").text)
        # Sumo 10 para que quede un poco mas centrado
        coordx.append(str(distancia + 10))
        coordy.append(alturaMax)
        nombres.append(ruta.find("{http://www.uniovi.es}nombre").text)

        for hito in ruta.findall('{http://www.uniovi.es}hitos/{http://www.uniovi.es}hito'):
            distancia += float(hito.find("{http://www.uniovi.es}distancia").text)
            altura = float(hito.find("{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud").text)
            if(altura > alturaMax):
               alturaMax =  altura       
            coordx.append(str(comprobacion_distancia(distancia) + 10))
            coordy.append(altura)
            nombres.append(hito.find("{http://www.uniovi.es}hnombre").text)

        # Prologo svg
        svg = '<?xml version="1.0" encoding="utf-8"?>\n'
        svg += '<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n'

        # Conversion
        altura = 0.0
        for i in range(len(coordx)):
            coordy[i] = alturaMax - coordy[i]
            if coordy[i] > altura:
                altura = coordy[i]

        # Punto final, para cerrar. Sumo 10 para que quede un poco mas centrado
        coordx.append("10")
        coordy.append(altura)
        nombres.append("")

        # Points 
        svg += '<polyline points=\n'
        svg += '"'
        for j in range(len(coordx)):
            if j == len(coordx) - 1:
                svg += coordx[j] + "," + str(coordy[j])
                svg += '"\n'
            else:
                svg += coordx[j] + "," + str(coordy[j]) + '\n'
        svg += 'style="fill:white;stroke:blue;stroke-width:4" />\n'

        # Texts
        for k in range(len(coordx)):
            # Se suma 5 a la altura para que los textos tengan un espaciado respecto a la linea
            svg += '<text x="' + coordx[k] + '" y="' + str(altura + 5) + '" style="writing-mode: tb; glyph-orientation-horizontal: 0;">\n'
            svg += "\t" + nombres[k] + "\n"
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
