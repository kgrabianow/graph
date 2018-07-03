/**
 * Zarządzanie strukturami grafu (zlecanie aktualizacji, budowania)
 */
function StructuresManager() {
    this.build();
    this.actualizeGui();
}

/**
 *  Budowanie wszystkich reprezentacji grafu na podstawie GRAPH.graph
 */
StructuresManager.prototype.build = function () {
    // Macierz sąsiedztwa (przyległości)
    GRAPH.structures.neighbourMatrix.build();

    // Macierz incydencji
    GRAPH.structures.incidenceMatrix.build();

    // Lista wierzchołków sąsiednich
    GRAPH.structures.verticesList.build();

    // Lista krawędzi
    GRAPH.structures.edgesList.build();
}

/**
 *  Aktualizowanie GUI dla wszystkich reprezentacji grafu
 */
StructuresManager.prototype.actualizeGui = function () {
    GRAPH.gui.neighbourMatrix.actualize();
    GRAPH.gui.incidenceMatrix.actualize();
    GRAPH.gui.verticesList.actualize();
    GRAPH.gui.edgesList.actualize();
}

GRAPH.structuresManager = new StructuresManager();