/**
 * Klasa główna tworząca Graf
 */
function Graph() {
    this.clearAndInit();
}

/**
 * Inicjalizacja grafu
 */
Graph.prototype.clearAndInit = function () {
    // Wierzchołki i Krawędzie
    this.verticesArray = [];
    this.edgesArray = [];

    // Przesunięcie
    this.dx = 0;
    this.dy = 0;

    // Tryb Edycji
    this.editType = false;

    // Graf skierowany / nieskierowany
    this.directionMode = false;

    // Tryb wyświetlania Algorytmów wyszukiwania
    this.searchAlgorithmsMode = false;
}

/**
 * Włączenie / Wyłączenie trybu edycji
 */
Graph.prototype.clearEdges = function () {
    while(this.edgesArray.length > 0) {
        this.removeEdge(0);
    }
}

/**
 * Włączenie / Wyłączenie trybu edycji
 */
Graph.prototype.switchEditMode = function () {
    this.editType = !this.editType;
}

/**
 * Zmiana wszystkich krawedzi na nieskierowane / skierowane
 */
Graph.prototype.switchDirectionMode = function () {
    this.directionMode = !this.directionMode;
}

/**
 * Pokaż typ grafu nieskierowany / skierowany
 *
 * @returns boolean
 */
Graph.prototype.getDirectionMode = function () {
    return this.directionMode;
}

/**
 * Aktualizuj wszystkie krawędzie
 */
Graph.prototype.actualizeEdges = function () {
    for (let i = 0; i < this.edgesArray.length; i++) {
        this.edgesArray[i].actualize();
    }
}

/**
 * Dodanie wierzchołka
 *
 * @param Vertex vertex
 */
Graph.prototype.addVertex = function (vertex) {
    this.verticesArray.push(vertex);
}

/**
 * Dodanie krawedzi
 *
 * @param Vertex vertex1
 * @param Vertex vertex2
 * @param integer number
 */
Graph.prototype.addEdge = function (vertex1, vertex2, number) {
    let edge = new Edge(vertex1, vertex2, number);
    this.edgesArray.push(edge);
}

/**
 * Usuniecie krawedzi
 *
 * @param integer edgeNumber
 */
Graph.prototype.removeEdge = function (edgeNumber) {
    // usunięcie krawędzi
    this.edgesArray.splice(edgeNumber, 1);

    this.resetEdgesNumbers();
}

/**
 * Zmiana zwrotu krawedzi
 */
Graph.prototype.reverseEdgesDirection = function () {
    for (let i = 0; i < this.edgesArray.length; i++) {
        let temporaryVariable = this.edgesArray[i].startVertex;
        this.edgesArray[i].startVertex = this.edgesArray[i].endVertex;
        this.edgesArray[i].endVertex = temporaryVariable;
    }
}

/**
 * Usunięcie wierzchołka
 *
 * @param integer vertexNumber
 */
Graph.prototype.removeVertex = function (vertexNumber) {
    // usuniecie krawędzi tablicy i zastąpienie jej undefined
    for (let i = 0; i < this.edgesArray.length; i++) {
        if (this.edgesArray[i].startVertex.number === vertexNumber || this.edgesArray[i].endVertex.number === vertexNumber) {
            delete this.edgesArray[i];
        }
    }

    // usunięcie z tablicy "pustych" elementów
    for (let i = this.edgesArray.length; i--;) {
        if ("undefined" === typeof this.edgesArray[i]) {
            this.edgesArray.splice(i, 1);
        }
    }

    // Usunięcie wierzchołka
    this.verticesArray.splice(vertexNumber, 1);

    this.resetVerticesNumbers();
    this.resetEdgesNumbers();
}

/**
 * Zmiana numeracji wierzchołków
 */
Graph.prototype.resetVerticesNumbers = function () {
    for (let i = 0; i < this.verticesArray.length; i++) {
        this.verticesArray[i].number = i;
    }
}

/**
 * Zmiana numeracji krawędzi
 */
Graph.prototype.resetEdgesNumbers = function () {
    for (let i = 0; i < this.edgesArray.length; i++) {
        this.edgesArray[i].number = i;
    }
}

/**
 * Zmiana koloru wszystkich wierzchołków
 *
 * @param string color
 */
Graph.prototype.setVerticesColor = function (color) {
    for (let i = 0; i < this.verticesArray.length; i++) {
        this.setVertexColor(i, color);
    }
}

/**
 * Zmiana koloru wierzchołka
 *
 * @param integer vertexIndex
 * @param string color
 */
Graph.prototype.setVertexColor = function (vertexIndex, color = "white") {
    if(vertexIndex < this.verticesArray.length) {
        this.verticesArray[vertexIndex].color = color;
    }
}

/**
 * Czy współrzędne znajdują się w wierzchołku?
 *
 * @param integer vertexIndex
 * @param object coords{x,y}
 *
 * @returns {boolean}
 */
Graph.prototype.coordsInsideVertex = function (vertexIndex, coords) {
    if(vertexIndex < this.verticesArray.length) {
        return GRAPH.assets.insideCircle(coords, this.verticesArray[vertexIndex]);
    }
    else {
        return false;
    }
}

/**
 * Czy współrzędne znajdują się w jednym ze wszystkich wierzchołków?
 *
 * @param object coords{x,y}
 *
 * @returns {integer} | null
 * Zwraca indeks wierzchołka lub null
 */
Graph.prototype.coordsInsideVertices = function (coords) {
    for (let i = 0; i < this.verticesArray.length; i++) {
        if(this.coordsInsideVertex(i,coords)) {
            return i;
        }
    }
    return null;
}

/**
 * Czy współrzędne znajdują się w jednym ze wszystkich wierzchołków
 * z wyjątkiem jednego podanego jako argument (tylko w trybie edycji)
 *
 * @param object coords{x,y}
 * @param integer ignoredVertexIndex
 *
 * @returns {integer} | null
 * Zwraca indeks wierzchołka lub null
 */
Graph.prototype.coordsInsideVerticesExcept = function (coords, ignoredVertexIndex) {
    for (let i = 0; i < this.verticesArray.length; i++) {
        if((ignoredVertexIndex === i) && this.editType) {
            continue;
        }
        else if(this.coordsInsideVertex(i,coords)) {
            return i;
        }
    }
    return null;
}

/**
 * Czy współrzędne znajdują się w przycisku Delete wierzchołka?
 *
 * @param integer vertexIndex
 * @param object coords{x,y}
 *
 * @returns {boolean}
 */
Graph.prototype.coordsInsideVertexDeleteButton = function (vertexIndex, coords) {
    if(vertexIndex < this.verticesArray.length) {
        return GRAPH.assets.insideCircle(coords, this.verticesArray[vertexIndex].deleteButton);
    }
    else {
        return false;
    }
}

/**
 * Czy współrzędne znajdują się w przycisku Delete jednego ze wszystkich wierzchołków?
 *
 * @param object coords{x,y}
 *
 * @returns {integer} | null
 * Zwraca indeks wierzchołka lub null
 */
Graph.prototype.coordsInsideVerticesDeleteButton = function (coords) {
    for (let i = 0; i < this.verticesArray.length; i++) {
        if(this.coordsInsideVertexDeleteButton(i,coords)) {
            return i;
        }
    }
    return null;
}

/**
 * Czy współrzędne znajdują się w przycisku Delete krawędzi?
 *
 * @param integer edgeIndex
 * @param object coords{x,y}
 *
 * @returns {boolean}
 */
Graph.prototype.coordsInsideEdgeDeleteButton = function (edgeIndex, coords) {
    if(edgeIndex < this.edgesArray.length) {
        return GRAPH.assets.insideCircle(coords, this.edgesArray[edgeIndex].deleteButton);
    }
    else {
        return false;
    }
}

/**
 * Czy współrzędne znajdują się w przycisku Delete jednej ze wszystkich krawędzi?
 *
 * @param object coords{x,y}
 *
 * @returns {integer} | null
 * Zwraca indeks krawędzi lub null
 */
Graph.prototype.coordsInsideEdgesDeleteButton = function (coords) {
    for (let i = 0; i < this.edgesArray.length; i++) {
        if(this.coordsInsideEdgeDeleteButton(i,coords)) {
            return i;
        }
    }
    return null;
}

/**
 * Sprawdź czy istnieje krawędź w grafie
 *
 * @param firstVertexNumber
 * @param secondVertexNumber
 *
 * @returns {boolean}
 */
Graph.prototype.checkEdgeExist = function (firstVertexNumber, secondVertexNumber) {
    for (let i = 0; i < this.edgesArray.length; i++) {
        if(
            (
                (firstVertexNumber === this.edgesArray[i].startVertex.number) &&
                (secondVertexNumber === this.edgesArray[i].endVertex.number)
            ) || (
                (firstVertexNumber === this.edgesArray[i].endVertex.number) &&
                (secondVertexNumber === this.edgesArray[i].startVertex.number)
            )
        ) {
            return true;
        }
    }

    return false;
}

/**
 * Funkcja rysująca
 */
Graph.prototype.draw = function (ctx) {
    // Petla po krawedziach grafu po kolei
    for (let i = 0; i < this.edgesArray.length; i++) {
        this.edgesArray[i].draw(ctx);
    }
    // Petla po wierzchołkach grafu po kolei
    for (let i = 0; i < this.verticesArray.length; i++) {
        this.verticesArray[i].draw(ctx);
    }
}

// Tworzenie nowego obiektu - grafu
// pod-przestrzeń nazw
GRAPH.graph = new Graph();