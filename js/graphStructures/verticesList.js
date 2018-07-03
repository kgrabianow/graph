/**
 * Klasa do generowania, przechowywania, modyfikowania
 * Listy wierzchołków sąsiednich
 *
 * jako reprezentacji Grafu
 */
function VerticesListStructure() {
    this.clearAndInit();
}

/**
 * Czyszczenie starej listy i inicjowanie nowej
 */
VerticesListStructure.prototype.clearAndInit = function () {
    // przechowuje tablicę z numerami wierzchołków
    this.verticesArray = [];
}

/**
 * Budowanie listy krawędzi na podstawie GRAPH.graph
 */
VerticesListStructure.prototype.build = function () {
    // buduj listę na podstawie grafu
    this.buildFromGraph(GRAPH.graph);
}

/**
 * Buduj listę na podstawie grafu
 *
 * @param GRAPH.graph graphObject
 */
VerticesListStructure.prototype.buildFromGraph = function (graphObject) {
    // inicjalizuj listę
    this.clearAndInit();

    // przejście po tablicy wszystkich wierzchołków
    for (let i = 0; i < graphObject.verticesArray.length; i++) {
        // tworzę nowy wierzchołek
        this.verticesArray[i] = [];

        // dodaję do niego krawędzie (jeśli istnieją)
        this.addEdgesToVertex(graphObject, i);
    }
}

/**
 * Dodaj krawędzie należące do wierzchołka
 *
 * @param GRAPH.graph graphObject
 * @param integer vertexNumber
 * numer indeksu w tablicy listy wierzchołków
 */
VerticesListStructure.prototype.addEdgesToVertex = function (graphObject, vertexNumber) {
    // przejście po tablicy wszystkich krawędzi
    for (let i = 0; i < graphObject.edgesArray.length; i++) {
        // pobierz krawędź
        let edge = graphObject.edgesArray[i];

        // jeśli 'krawędź' należy do wierzchołka, dodaj ją
        if(this.directedEdgeBelongsToVertex(edge, vertexNumber, graphObject)) {
            this.addDirectedEdgeToVertex(edge, vertexNumber);
        }
        else if(this.notDirectedEdgeBelongsToVertex(edge, vertexNumber, graphObject)) {
            this.addNotDirectedEdgeToVertex(edge, vertexNumber);
        }
    }
}

/**
 * Sprawdza czy krawędź skierowana należy do wierzchołka
 * - gdy wierzchołek jest początkowym w krawędzi
 *
 * @param Edge edge
 * @param integer vertexNumber
 * @returns boolean
 */
VerticesListStructure.prototype.directedEdgeBelongsToVertex = function (edge, vertexNumber, graphObject) {
    return (edge.startVertex.number === vertexNumber && graphObject.getDirectionMode());
}

/**
 * Sprawdza czy krawędź nieskierowana należy do wierzchołka
 * - Gdy wierzchołek jest początkowym w krawędzi
 * - Gdy wierzchołek jest końcowym w krawędzi
 *
 * @param Edge edge
 * @param integer vertexNumber
 * @returns boolean
 */
VerticesListStructure.prototype.notDirectedEdgeBelongsToVertex = function (edge, vertexNumber, graphObject) {
    return (
        (!graphObject.getDirectionMode()) &&
        (
            (edge.startVertex.number === vertexNumber) ||
            (edge.endVertex.number === vertexNumber)
        )
    );
}

/**
 * Dodaje wierzchołki z krawędzi skierowanej do danego wierzchołka w liście
 *
 * @param Edge edge
 * @param integer vertexNumber
 */
VerticesListStructure.prototype.addDirectedEdgeToVertex = function (edge, vertexNumber) {
    this.verticesArray[vertexNumber].push(edge.endVertex.number);
}

/**
 * Dodaje wierzchołki z krawędzi nieskierowanej do danego wierzchołka w liście
 *
 * @param Edge edge
 * @param integer vertexNumber
 */
VerticesListStructure.prototype.addNotDirectedEdgeToVertex = function (edge, vertexNumber) {
    if(edge.startVertex.number === vertexNumber) {
        this.verticesArray[vertexNumber].push(edge.endVertex.number);
    }
    else if(edge.endVertex.number === vertexNumber) {
        this.verticesArray[vertexNumber].push(edge.startVertex.number);
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.structures' to ją utwórz)
GRAPH.structures = GRAPH.structures || {};
GRAPH.structures.verticesList = new VerticesListStructure();

