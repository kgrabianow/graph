/**
 * Klasa do generowania, przechowywania, modyfikowania
 * Listy krawędzi
 *
 * jako reprezentacji Grafu
 */
function EdgesListStructure() {
    this.clearAndInit();
}

/**
 * Czyszczenie starej listy i inicjowanie nowej
 */
EdgesListStructure.prototype.clearAndInit = function () {
    // przechowuje pary numerów wierzchołków (krawędzie)
    this.edgesArray = [];
}

/**
 * Budowanie listy krawędzi na podstawie GRAPH.graph
 */
EdgesListStructure.prototype.build = function () {
    // inicjalizuj listę
    this.clearAndInit();
    // buduj listę na podstawie grafu
    this.buildFromGraph(GRAPH.graph);
}

/**
 * Buduj listę na podstawie grafu
 *
 * @param GRAPH.graph graphObject
 */
EdgesListStructure.prototype.buildFromGraph = function (graphObject) {
    // przejście po tablicy wszystkich krawędzi
    for (let i = 0; i < graphObject.edgesArray.length; i++) {
        // dodaj krawędź do listy
        this.addEdgeToList(graphObject.edgesArray[i]);
    }
}

/**
 * Dodaj krawędz do listy na podstawie obiektu Edge
 *
 * @param Edge edge
 */
EdgesListStructure.prototype.addEdgeToList = function (edge) {
    let edgeObject = {
        start: edge.startVertex.number,
        end: edge.endVertex.number
    };

    this.edgesArray.push(edgeObject);
}

/**
 * Znajdź index krawędzi z listy na podstawie obiektu Edge
 *
 * @param Edge edge
 * @returns integer or undefined
 */
EdgesListStructure.prototype.findIndexByEdge = function (edge) {
    let index = undefined;

    for (let i = 0; i < this.edgesArray.length; i++) {
        let edgesObject = this.edgesArray[i];

        // porównaj dwie krawędzie ze sobą - czy są takie same
        if(GRAPH.assets.edgeObjectEqualToEdge(edgesObject, edge)) {
            index = i;
            break;
        }
    }

    return index;
}

/**
 * Usuń krawędź z listy na podstawie obiektu Edge
 *
 * @param Edge edge
 */
EdgesListStructure.prototype.removeByEdge = function (edge) {
    let index = this.findIndexByEdge(edge);

    if(index !== undefined) {
        this.removeByIndex(index);
    }

}

/**
 * Usuń krawędź z listy na podstawie indexu
 *
 * @param integer index
 */
EdgesListStructure.prototype.removeByIndex = function (index) {
    delete this.edgesArray[index];
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.structures' to ją utwórz)
GRAPH.structures = GRAPH.structures || {};
GRAPH.structures.edgesList = new EdgesListStructure();

