/**
 * Klasa do przeszukiwania grafu wgłąb - DFS
 * na podstawie reprezentacji:
 * "Lista wierzchołków sąsiednich"
 */
function DFS() {
    this.clearAndInit();
}

/**
 * Inicjowanie
 */
DFS.prototype.clearAndInit = function () {
    // przechowuje drzewa - w każdym drzewie są krawędzie, po których przeszedł algorytm
    this.trees = new EdgeTrees();

    // lista wierzchołków odwiedzonych
    this.visited = [];

    // lista wierzchołków przetworzonych (sortowanie topologiczne)
    this.processed = [];

    // lista kolejnosci przechodzenia wierzchołków (podwójne numerowanie)
    this.doubleDFS = [];
}

/**
 * Uruchamiamy algorytm na grafie GRAPH.graph
 */
DFS.prototype.run = function () {
    this.runOnGraph(GRAPH.graph);
}

/**
 * Uruchamiamy algorytm na obiektcie grafu
 *
 * @param GRAPH.graph graphObject
 */
DFS.prototype.runOnGraph = function (graphObject) {
    // inicjalizuj
    this.clearAndInit();

    // buduj "Listę wierzchołków sąsiednich"
    GRAPH.structures.verticesList.buildFromGraph(graphObject);

    // sprawdź ilość wierzchołków
    let verticesAmount = GRAPH.structures.verticesList.verticesArray.length;

    this.counter = 1;

    // jeśli są wierzchołki
    if(verticesAmount > 0) {
        // dodaj nowe drzewo
        this.trees.addNew();
        // uruchom DFS na pierwszym wierzchołku
        this.startDFSFromVertex(0);

        // przejście po tablicy wszystkich kolejnych wierzchołków
        for (let i = 1; i < verticesAmount; i++) {
            if(this.notVisited(i)) {
                // dodaj nowe drzewo
                this.trees.addNew();
                // uruchom DFS na nieodwiedzonym wierzchołku
                this.startDFSFromVertex(i);
            }
        }
    }
}

/**
 * Uruchom algorytm DFS na wierzchołku o numerze 'vertexNumber'
 *
 * @param integer vertexNumber
 */
DFS.prototype.startDFSFromVertex = function (vertexNumber) {
    // oznacz jako odwiedzony
    this.visited.push(vertexNumber);
    // zapisz pierwszy element podwójnej numeracji
    this.doubleDFS[vertexNumber] = [this.counter];

    this.counter++;

    // lista następników tego wierzchołka
    let nextVertices = GRAPH.structures.verticesList.verticesArray[vertexNumber];

    // przejdź po liście następników
    for(let i=0; i<nextVertices.length; i++) {
        // obsłuż następnik
        this.handleNextVertex(vertexNumber, nextVertices[i]);
    }

    // oznacz jako przetworzony
    this.processed.push(vertexNumber);
    // zapisz drugi element podwójnej numeracji
    this.doubleDFS[vertexNumber].push(this.counter);

    this.counter++;
}

/**
 * Obsłuż następnik vierzchołka
 *
 * @param integer mainVertex
 * numer wierzchołka z którym następnik jest połączony krawędzią
 *
 * @param integer nextVertex
 * numer następnika
 */
DFS.prototype.handleNextVertex = function (mainVertex, nextVertex) {
    // jeśli następnik nieodwiedzony
    if(this.notVisited(nextVertex)){
        // dodaj krawędź do drzewa
        this.trees.addEdge(mainVertex, nextVertex);

        // uruchom DFS na tym następniku
        this.startDFSFromVertex(nextVertex);
    }
}

/**
 * Sprawdza czy wierzchołek nie jest odwiedzony
 *
 * @returns {boolean}
 */
DFS.prototype.notVisited = function (i) {
    return (!GRAPH.assets.inArray(i, this.visited));
}

/**
 * Zwraca ilość odwiedzonych wierzchołków
 *
 * @returns {integer}
 */
DFS.prototype.getVisitedAmount = function () {
    return this.visited.length;
}

/**
 * Zwraca ilość przetworzonych wierzchołków
 *
 * @returns {integer}
 */
DFS.prototype.getProcessedAmount = function () {
    return this.processed.length;
}


// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.algorithms' to ją utwórz)
GRAPH.algorithms = GRAPH.algorithms || {};
GRAPH.algorithms.dfs = new DFS();

