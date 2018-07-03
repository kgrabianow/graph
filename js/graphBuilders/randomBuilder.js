/**
 * Klasa do generowania obiektu Grafu
 */
function RandomBuilder() {
    // nowy graf
    this.newGraph = undefined;
}

/**
 * budowa nowego grafu i podmiana z aktualnie używanym
 *
 * @param integer verticesNumber
 * Liczba wierzchołków
 *
 * @param integer edgesNumber
 * Liczba krawędzi
 *
 * @param boolean graphDirected
 * graf skierowany/nieskierowany (true/false)
 */
RandomBuilder.prototype.build = function (verticesNumber, edgesNumber, graphDirected) {
    // inicjalizowanie nowego grafu
    this.newGraph = new Graph();

    // uzupełnienie parametrów
    this.newGraph.editType = GRAPH.graph.editType;
    this.newGraph.directionMode = graphDirected;
    this.verticesNumber = verticesNumber;
    this.edgesNumber = edgesNumber;

    // sprawdzenie poprawności liczby krawędzi
    if(this.checkEdgesLimit()) {
        // budowanie grafu
        this.buildGraph();

        // podmiana gotowego grafu
        GRAPH.graph = this.newGraph;
    }
    else {
        // Dodaj informację o błędzie
        GRAPH.gui.flash.makeDangerStyle();
        GRAPH.gui.flash.setTitleAndText(
            'Błąd losowania grafu',
            'Liczba krawędzi przekracza limit (dla danej ilości wierzchołków). Proszę zmienić tą liczbę na dopuszczalną.'
        );
        GRAPH.gui.flash.show();
    }
}

/**
 * Buduj Graf
 */
RandomBuilder.prototype.buildGraph = function () {
    // twórz losowe wierzchołki
    this.buildRandomVertices();

    // twórz losowe krawędzie na podstawie wierzchołków
    this.buildRandomEdges();
}

/**
 * Tworzy losowe wierzchołki
 */
RandomBuilder.prototype.buildRandomVertices = function () {
    for (let i = 0; i < this.verticesNumber; i++) {
        // Losowy Wierzchołek
        let newVertex = this.buildRandomVertex();

        // Dodaje wierzchołek
        this.newGraph.addVertex(newVertex);
    }
}

/**
 * Twórz losowy wierzchołek
 * o param x,y z przedziału wielkości canvas
 *
 * @returns Vertex
 */
RandomBuilder.prototype.buildRandomVertex = function () {
    let newVertex = new Vertex(
        GRAPH.canvas.getRandomCoordsInsideX(),
        GRAPH.canvas.getRandomCoordsInsideY(),
        this.newGraph.verticesArray.length
    );

    return newVertex;
}

/**
 * Tworzy losowe krawędzie
 */
RandomBuilder.prototype.buildRandomEdges = function () {
    for (let i = 0; i < this.edgesNumber; i++) {
        // Losowa Krawędź
        let newEdge = this.buildRandomEdge();

        // Dodaj krawędź
        this.newGraph.edgesArray[i] = newEdge;
    }
}

/**
 * Twórz krawędź na podstawie wierzchołków
 *
 * @returns Edge
 */
RandomBuilder.prototype.buildRandomEdge = function () {
    // Czy tworzona krawedz istnieje
    let edgeExist = true;
    // losowe wierzchołki
    let firstVertex = undefined;
    let secondVertex = undefined;

    // losuj parę wierzchołków (która nie tworzy Multigrafu)
    while (edgeExist) {
        firstVertex = this.getRandomVertex();
        secondVertex = this.getRandomVertex();

        // jeśli wylosuje ten sam wierzchołek -> powtórz losowanie
        if (GRAPH.assets.verticesEquals(firstVertex, secondVertex)) {
            continue;
        }

        // Sprawdzanie czy krawędź już istnieje w nowym grafie, jeśli tak -> powtórz losowanie
        edgeExist = this.checkEdgeExist(firstVertex, secondVertex);
    }

    // utwórz i zwróć krawędź
    return this.createEdge(firstVertex, secondVertex);
}

/**
 * Zwraca losowy wierzchołek z nowego Grafu
 *
 * @returns Vertex
 */
RandomBuilder.prototype.getRandomVertex = function () {
    let actualVerticesLength = this.newGraph.verticesArray.length;
    let randomVertexNumber = Math.floor(Math.random() * actualVerticesLength);

    return this.newGraph.verticesArray[randomVertexNumber];
}

/**
 * Sprawdzanie czy krawędź już istnieje w nowym grafie (zapobiegamy Multigrafowi)
 *
 * @param vertex firstVertex
 * @param vertex secondVertex
 * @returns boolean
 */
RandomBuilder.prototype.checkEdgeExist = function(firstVertex, secondVertex) {
    for (let i = 0; i < this.newGraph.edgesArray.length; i++) {
        // porównaj pary wierzchołków i sprawdź czy tworzą tą samą krawędź
        if(GRAPH.assets.verticesPairsEquals(
                firstVertex,
                secondVertex,
                this.newGraph.edgesArray[i].startVertex,
                this.newGraph.edgesArray[i].endVertex)
        ){
            // Krawedz istnieje
            return true;
        }
    }

    // Krawedz nie istnieje
    return false;
}

/**
 * Tworzenie krawędzi na podstawie dwóch wierzchołków
 *
 * @param vertex firstVertex
 * @param vertex secondVertex
 * @returns Edge
 */
RandomBuilder.prototype.createEdge = function (firstVertex, secondVertex) {
    // utwórz krawędź z tych wierzchołków
    let newEdge = new Edge(
        firstVertex,
        secondVertex,
        this.newGraph.edgesArray.length
    );

    return newEdge;
}


/**
 * Sprawdza czy wybrana liczba krawędzi w nowym grafie
 * nie przekracza limitu - obliczonego na podstawie liczby wierzchołków
 *
 * @returns boolean
 */
RandomBuilder.prototype.checkEdgesLimit = function () {
    let edgesLimit = GRAPH.assets.getEdgesLimitByVertices(this.verticesNumber);

    return (this.edgesNumber <= edgesLimit);
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.builders' to ją utwórz)
GRAPH.builders = GRAPH.builders || {};
GRAPH.builders.random = new RandomBuilder();

