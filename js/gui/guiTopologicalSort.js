/**
 * Sortowanie topologiczne 
 * na podstawie algorytmu DFS:
 * "Lista wierzchołków sąsiednich"
 */
function GuiTopologicalSort() {
    // Chyba w momencie gdy numerujemy podwojnie w samym DFS
    // Ta Klasa powinna być chyba w gui...

    // Sprawdzenie czy można sortować topologicznie
    // (czy jest acykliczny?)
}

GuiTopologicalSort.prototype.prepareAndInit = function () {
    // Pobranie tablicy z podwójną numeracją
    let doubleDFS = GRAPH.algorithms.dfs.doubleDFS;

    // Ustawienie wielkości odstepów miedzy wierzchołkami
    let spaceBetweenVertex = 50;

    // Minimalna szerokość by zmieścić graf po "sortowaniu"
    this.minWebWidth = 0;

    // Uruchomienie Sortowania
    this.run(doubleDFS, spaceBetweenVertex);
}

GuiTopologicalSort.prototype.run = function (doubleDFS, spaceBetweenVertex) {
    this.doubleDFS = doubleDFS;
    this.spaceBetweenVertex = spaceBetweenVertex;

    // Przejście po wszystkich wierzchołkach
    for (var i = 0; i < GRAPH.graph.verticesArray.length; i++) {
        GRAPH.graph.verticesArray[i].x = spaceBetweenVertex + (GRAPH.graph.verticesArray.length*2*spaceBetweenVertex) - this.doubleDFS[i][1] * spaceBetweenVertex;
        GRAPH.graph.verticesArray[i].y = spaceBetweenVertex + spaceBetweenVertex*(i%2); //+ i*50;
        GRAPH.graph.verticesArray[i].actualize();

        // Pobranie x z bieżącego wierzchołka jeśli dotychczasowo najwiekszy
        if( this.minWebWidth < GRAPH.graph.verticesArray[i].x ){
            this.minWebWidth = GRAPH.graph.verticesArray[i].x;
        }
    }

    // Przejście po wszystkich krawędziach
    for (var i = 0; i < GRAPH.graph.edgesArray.length; i++) {
        GRAPH.graph.edgesArray[i].actualize();
    }

    // Zmiana szerokości obszaru rysowania
    if( GRAPH.web.width < this.minWebWidth ){
        GRAPH.web.setWidth( this.minWebWidth + this.spaceBetweenVertex);
    }

}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.topologicalSort = new GuiTopologicalSort();