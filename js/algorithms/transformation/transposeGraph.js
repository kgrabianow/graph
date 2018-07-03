/**
 * Klasa do transponowania macierzy
 * na podstawie reprezentacji:
 * "Macierz sąsiedztwa"
 */
function TransposeGraph() {
}

/**
 * Uruchamiamy algorytm na grafie GRAPH.graph
 * - jak powiadomimy listener to wszystkie reprezentacje same się zbudują od nowa
 * i nie trzeba ich odracać osobno
 */
TransposeGraph.prototype.run = function () {
    // Wyołanie odwrócenia krawedzi na podstawie edgesArray GRAPH.graph
    GRAPH.graph.reverseEdgesDirection();
    GRAPH.graph.actualizeEdges();

    // powiadom listener o zmianach w Grafie
    GRAPH.listener.noticeChange();
}

/**
 * Uruchamiamy algorytm na obiektcie grafu - używane to będzie w trakcie jakiegoś algorytmu - nie pracujemy na oryginalnym grafie
 *
 * @param GRAPH.graph graphObject
 * @return NeighbourMatrixStructure
 */
TransposeGraph.prototype.runOnGraphGetNeightbourMatrixStructure = function (graphObject) {
    // osobny budowniczy - dlatego, żeby nie zaburzać stanu oryginalnego budowniczego - nie wolno tego mieszać
    // mamy tutaj jako argument obiekt graphObject - co oznacza, że może to być albo aktualny graf
    // albo jakiś krok algorytmu na innym grafie
    let builder = new NeighbourMatrixStructure();

    // buduj "Macierz sąsiedztwa"
    builder.buildFromGraph(graphObject);

    //builder.showMatrixInConsole();
    builder.transpose(); // transponuj macierz
    //builder.showMatrixInConsole();

    // zwróc obiekt macierzy sąsiedztwa
    return builder;
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.algorithms' to ją utwórz)
GRAPH.algorithms = GRAPH.algorithms || {};
GRAPH.algorithms.transposeGraph = new TransposeGraph();
