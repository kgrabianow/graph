/**
 * Klasa do przeszukiwania grafu wszerz - BFS
 * na podstawie reprezentacji:
 * "Lista wierzchołków sąsiednich"
 */
function BFS() {
    this.clearAndInit();
}

/**
 * Inicjowanie
 */
BFS.prototype.clearAndInit = function () {
    // przechowuje drzewa - w każdym drzewie są krawędzie, po których przeszedł algorytm
    this.trees = new EdgeTrees();

    // kolejka - przechowuje wierzchołki, które zamierzamy odwiedzić
    this.queue = [];

    // lista wierzchołków odwiedzonych
    this.visited = [];
}

/**
 * Uruchamiamy algorytm na grafie GRAPH.graph
 */
BFS.prototype.run = function () {
    this.runOnGraph(GRAPH.graph);
}

/**
 * Uruchamiamy algorytm na obiektcie grafu
 *
 * @param GRAPH.graph graphObject
 */
BFS.prototype.runOnGraph = function (graphObject) {
    // inicjalizuj
    this.clearAndInit();

    // buduj "Listę wierzchołków sąsiednich"
    GRAPH.structures.verticesList.buildFromGraph(graphObject);

    // sprawdź ilość wierzchołków
    let verticesAmount = GRAPH.structures.verticesList.verticesArray.length;

    // jeśli są wierzchołki
    if(verticesAmount > 0) {
        // uruchom BFS na pierwszym wierzchołku
        this.startBFSFromVertex(0);

        // przejście po tablicy wszystkich kolejnych wierzchołków
        for (let i = 1; i < verticesAmount; i++) {
            // uruchom BFS na nieodwiedzonych wierzchołkach
            if(this.notVisited(i)) {
                this.startBFSFromVertex(i);
            }
        }
    }
}

/**
 * Uruchom algorytm BFS na wierzchołku o numerze 'vertexNumber'
 *
 * @param integer vertexNumber
 */
BFS.prototype.startBFSFromVertex = function (vertexNumber) {
    // dodaj nowe drzewo
    this.trees.addNew();

    // wstaw wierzchołek do kolejki
    this.queue.push(vertexNumber);

    // obsłuż wierzchołki z kolejki (jeśli nie jest pusta)
    while(this.queueNotEmpty()) {
        this.handleVertexFromQueue();
    }
}

/**
 * Obsłuż pierwszy wierzchołek z kolejki
 */
BFS.prototype.handleVertexFromQueue = function () {
    // zdejmij element z kolejki
    let actualVertex = this.queue.shift();

    // dodaj go jako odwiedzony
    this.visited.push(actualVertex);

    // lista następników tego wierzchołka
    let nextVertices = GRAPH.structures.verticesList.verticesArray[actualVertex];

    // przejdź po liście następników
    for(let i=0; i<nextVertices.length; i++) {
        // obsłuż następnik
        this.handleNextVertex(actualVertex, nextVertices[i]);
    }
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
BFS.prototype.handleNextVertex = function (mainVertex, nextVertex) {
    // jeśli nie obsłużyliśmy jeszcze go
    if(this.notVisited(nextVertex) && this.notInQueue(nextVertex)){
        // dodaj krawędź do drzewa
        this.trees.addEdge(mainVertex, nextVertex);

        // dodaj następnik do kolejki
        this.queue.push(nextVertex);
    }
}

/**
 * Sprawdza czy wierzchołek nie jest odwiedzony
 *
 * @returns {boolean}
 */
BFS.prototype.notVisited = function (i) {
    return (!GRAPH.assets.inArray(i, this.visited));
}

/**
 * Sprawdza czy wierzchołek nie jest w kolejce
 *
 * @returns {boolean}
 */
BFS.prototype.notInQueue = function (i) {
    return (!GRAPH.assets.inArray(i, this.queue));
}

/**
 * Sprawdza czy wierzchołek nie jest w kolejce
 *
 * @returns {boolean}
 */
BFS.prototype.queueNotEmpty = function (i) {
    return (this.queue.length > 0);
}

/**
 * Zwraca ilość odwiedzonych wierzchołków
 *
 * @returns {integer}
 */
BFS.prototype.getVisitedAmount = function () {
    return this.visited.length;
}


// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.algorithms' to ją utwórz)
GRAPH.algorithms = GRAPH.algorithms || {};
GRAPH.algorithms.bfs = new BFS();

