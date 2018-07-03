/**
 * Klasa do modyfikowania obiektu Grafu na podstawie
 * "Macierzy sąsiedztwa"
 */
function Modifier() {
}

Modifier.prototype.modify = function (graph, neighbourMatrix) {
    // czyść krawędzie
    graph.clearEdges();

    // buduj krawędzie z macierzy sąsiedztwa
    graph = this.buildEdgesFrom(graph, neighbourMatrix.neighbourArray);

    return graph;
}

/**
 * Tworzy losowe krawędzie
 */
Modifier.prototype.buildEdgesFrom = function (graph, neighbourArray) {
    let k = 0;

    for (let i = 0; i < neighbourArray.length; i++) {
        for (let j = 0; j < neighbourArray.length; j++) {
            if(neighbourArray[i][j] === 1) {
                // Krawędź
                graph.addEdge(graph.verticesArray[i], graph.verticesArray[i], k++);
            }
        }
    }

    graph.resetEdgesNumbers();

    return graph;
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.builders' to ją utwórz)
GRAPH.modifiers = GRAPH.modifiers || {};
GRAPH.modifiers.neighbourMatrix = new Modifier();

