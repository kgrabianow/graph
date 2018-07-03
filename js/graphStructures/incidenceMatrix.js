/**
 * Klasa do generowania, przechowywania, modyfikowania
 * Macierzy incydencji
 *
 * jako reprezentacji Grafu
 */
function IncidenceMatrixStructure() {
    this.clearAndInit();
}

/**
 * Czyszczenie starej listy i inicjowanie nowej
 */
IncidenceMatrixStructure.prototype.clearAndInit = function () {
    // przechowuje tablicę dwuwymiarową z krawędziami jako wiersze o ilości kolumn (jako ilości wierzchołków)
    this.incidenceArray = [];
}

/**
 * Budowanie listy na podstawie GRAPH.graph
 */
IncidenceMatrixStructure.prototype.build = function () {
    // inicjalizuj
    this.clearAndInit();
    // buduj listę na podstawie grafu
    this.buildFromGraph(GRAPH.graph);
}

/**
 * Buduj na podstawie grafu
 *
 * @param GRAPH.graph graphObject
 */
IncidenceMatrixStructure.prototype.buildFromGraph = function (graphObject) {
    // przejście po tablicy wszystkich krawędzi
    for (let i = 0; i < graphObject.edgesArray.length; i++) {
        // tworzę nową krawędź
        this.incidenceArray[i] = [];

        // dodaję do niej wierzchołki
        this.addVerticesToEdge(graphObject, i);
    }
}

/**
 * Dodaj do krawędzi informacje o wierzchołkach
 *
 * @param GRAPH.graph graphObject
 * @param integer edgeNumber
 */
IncidenceMatrixStructure.prototype.addVerticesToEdge = function (graphObject, edgeNumber) {
    // informacje na temat krawędzi
    let edgeInfo = {
        startVertexNumber: graphObject.edgesArray[edgeNumber].startVertex.number,
        endVertexNumber: graphObject.edgesArray[edgeNumber].endVertex.number,
        direction: graphObject.getDirectionMode(),
        edgeNumber: edgeNumber
    }

    // przejście po tablicy wszystkich wierzchołków
    for (let i = 0; i < graphObject.verticesArray.length; i++) {
        // dodajemy informację o wierzchołku do krawędzi (wiersza)
        this.addVertexToEdge(i, edgeInfo);
    }
}

/**
 * Dodaje informację o wierzchołku do krawędzi
 *
 * Początek i koniec w krawędziach skierowanych {-1, 1}
 * zgodnie z https://pl.wikipedia.org/wiki/Macierz_incydencji
 *
 * @param integer vertexNumber
 * @param object edgeInfo
 */
IncidenceMatrixStructure.prototype.addVertexToEdge = function (vertexNumber, edgeInfo) {
    // na początek ustawiamy zero - krawędź nie ma połączeń z przetwarzanym wierzchołkiem
    this.incidenceArray[edgeInfo.edgeNumber][vertexNumber] = 0;

    if(edgeInfo.direction) { // skierowana
        if(edgeInfo.startVertexNumber === vertexNumber) {
            this.incidenceArray[edgeInfo.edgeNumber][vertexNumber] = 1; // początek
        }
        else if(edgeInfo.endVertexNumber === vertexNumber) {
            this.incidenceArray[edgeInfo.edgeNumber][vertexNumber] = -1; // koniec
        }
    }
    else { // nieskierowana
        if(edgeInfo.startVertexNumber === vertexNumber || edgeInfo.endVertexNumber === vertexNumber) {
            this.incidenceArray[edgeInfo.edgeNumber][vertexNumber] = 1; // połączenie
        }
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.structures' to ją utwórz)
GRAPH.structures = GRAPH.structures || {};
GRAPH.structures.incidenceMatrix = new IncidenceMatrixStructure();