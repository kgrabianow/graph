/**
 * Klasa do ładowania obiektu Grafu
 */
function ObjectBuilder() {
    this.newGraph = undefined;
}

/**
 * budowa nowego grafu i podmiana z aktualnie używanym
 *
 * @param object(GRAPH.graph) obj
 * @param boolean guiChangeDirectionMode
 * @param boolean guiChangeEditMode
 * mówi o tym czy dodatkowo mamy dostosować kontrolki GUI do grafu
 * domyślnie jest wyłączona opcja
 */
ObjectBuilder.prototype.build = function (obj, guiChangeDirectionMode = false, guiChangeEditMode = false) {
    // inicjalizowanie nowego grafu
    this.newGraph = new Graph();

    // budowanie grafu
    this.buildGraph(obj);

    // zmień kontrolki GUI - tak aby skierowanie/nieskierowanie się zgadzało
    if(guiChangeDirectionMode) {
        this.changeGuiDirectionMode();
    }

    if(guiChangeEditMode) {
        // wyłącz tryb edycji w GUI
        GRAPH.gui.edit.disable();

        // wyłącz tryb edycji w nowym grafie
        if(this.newGraph.editType) {
            this.newGraph.switchEditMode();
        }
    }

    // podmiana gotowego grafu
    GRAPH.graph = this.newGraph;
}

/**
 * Buduj Graf z obiektu
 *
 * @param object(GRAPH.graph) obj
 */
ObjectBuilder.prototype.buildGraph = function (obj) {
    // Uzupełniam parametry
    this.newGraph.editType = obj.editType;
    this.newGraph.directionMode = obj.directionMode;

    // Uzupełniam tabelę wierzchołków
    for (let i = 0; i < obj.verticesArray.length; i++) {
        this.newGraph.verticesArray[i] = this.buildVertex(obj.verticesArray[i]);
    }

    // Uzupełniam tabelę krawędzi
    for (let i = 0; i < obj.edgesArray.length; i++) {
        this.newGraph.edgesArray[i] = this.buildEdge(obj.edgesArray[i]);
    }
}

/**
 * Buduj Wierzchołek z obiektu
 *
 * @param object(Vertex) obj
 * @returns Vertex
 */
ObjectBuilder.prototype.buildVertex = function (obj) {
    let newVertex = new Vertex(obj.x, obj.y, obj.number);
    return newVertex;
}

/**
 * Buduj Krawędź z obiektu
 *
 * @param object(Edge) obj
 * @returns Edge
 */
ObjectBuilder.prototype.buildEdge = function (obj) {
    /**
     * ważna uwaga:
     *    jeśli wrzucimy wierzchołki bezpośrednio z obj.startVertex, obj.endVertex
     *    to eventy będą odwoływać się do 'OBJ', a powinny do newGraph.verticesArray[...]
     *    przy OBJ przy evencie Mousemove nie będą nam się aktualizować elementy graficzne
     *    dlatego użyłem tutaj getVertexByNumber() - aby odwołać się do newGraph
     */
    let startVertex = this.getVertexByNumber(obj.startVertex.number);
    let endVertex = this.getVertexByNumber(obj.endVertex.number);

    let newEdge = new Edge(startVertex, endVertex, obj.number);

    newEdge.actualize();

    return newEdge;
}

/**
 * Zwróć wierzchołek z listy, podając jego numer
 *
 * @param integer searchNumber
 * @returns Vertex or null
 */
ObjectBuilder.prototype.getVertexByNumber = function (searchNumber) {
    for (let i = 0; i < this.newGraph.verticesArray.length; i++) {
        if(this.newGraph.verticesArray[i].number === searchNumber) {
            return this.newGraph.verticesArray[i];
        }
    }
    return null;
}

/**
 * zmień kontrolki GUI - tak aby skierowanie/nieskierowanie się zgadzało
 */
ObjectBuilder.prototype.changeGuiDirectionMode = function () {
    let newGraphDirection = this.newGraph.getDirectionMode();

    if(newGraphDirection !== GRAPH.graph.getDirectionMode()) {
        if(newGraphDirection === true) {
            GRAPH.gui.direction.makeDirected();
        }
        else if(newGraphDirection === false){
            GRAPH.gui.direction.makeNotDirected();
        }
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.builders' to ją utwórz)
GRAPH.builders = GRAPH.builders || {};
GRAPH.builders.object = new ObjectBuilder();

