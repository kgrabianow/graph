/**
 * Klasa obsługi GUI
 * dla algorytmów wyszukiwania - BFS oraz DFS
 *
 * z racji tego, że oba typy korzystają z jednego interfejsu,
 * nie ma powielonych GUI dla każdego osobno
 */
function GuiSearch() {
    this.modeSwitch = $('#triggerSearchMode');
    this.algorithmSwitch = $('#triggerSearchAlgorithm');
    this.displayOtherAlgorithm = false;

    // kolejka wierzchołków, które mają już wpisany czas odwiedzin
    this.textedAsVisited = [];
}

/**
 * Uruchamia/ukrywa tryb wyświetlania labeli informacyjnych
 */
GuiSearch.prototype.triggerMode = function () {
    GRAPH.graph.searchAlgorithmsMode = !GRAPH.graph.searchAlgorithmsMode;
}

/**
 * Zmienia typ wyświetlanego algorytmu
 */
GuiSearch.prototype.triggerAlgorithm = function () {
    this.displayOtherAlgorithm = !this.displayOtherAlgorithm;
    this.actualize();
}

/**
 * Aktualizowanie labeli na podstawie wybranego algorytmu
 */
GuiSearch.prototype.actualize = function () {
    if(this.displayOtherAlgorithm) {
        this.actualizeDFS(GRAPH.algorithms.dfs);
    }
    else {
        this.actualizeBFS(GRAPH.algorithms.bfs);
    }
}

/**
 * Aktualizowanie labeli na podstawie algorytmu BFS (wszerz)
 *
 * @param object BFSObject
 */
GuiSearch.prototype.actualizeBFS = function (BFSObject) {
    // pobierz ilość odwiedzonych wierzchołków
    let visitedAmount = BFSObject.getVisitedAmount();

    // inicjalizuj czas odwiedzenia
    let visitedTime = 1;

    // oznacz odwiedzone wierzchołki czasem odwiedzenia
    for(let i=0; i<visitedAmount; i++) {
        // pobierz wierzchołek
        let vertexNumber = BFSObject.visited[i];

        // ustaw jego labelom czas odwiedzin
        GRAPH.graph.verticesArray[vertexNumber].searchLabel.setVisitedTime(visitedTime);
        // wyzeruj label przetwarzania (aby się nie wyświetlał)
        GRAPH.graph.verticesArray[vertexNumber].searchLabel.setProcessedTime('');
        // aktualizuj labele
        GRAPH.graph.verticesArray[vertexNumber].actualizeControls();

        // zwiększ czas odwiedzin
        visitedTime++;
    }
}

/**
 * Aktualizowanie labeli na podstawie algorytmu DFS (wgłąb)
 *
 * Polega na tym że bierzemy po kolei wierzchołki "przetworzone" w kolejności od pierwszego do ostatniego
 * Natępnie wszystkim odwiedzonym wierzchołkom od początkowego "odwiedzonego" do aktualnego "przetworzonego" wierzchołka nadajemy etykiety
 * następnie nadajemy etykietę "przetworzonego" wierzchołka (tego aktualnego z pierwszej pętli) i zaczynamy wszystkie kroki od nowa na kolejnych
 *
 * Wierzchołki "odwiedzone" które dostały już etykietę czasu odwiedzin są dodawane do kolejki, tak aby je pominąć w późniejszych iteracjach
 *
 * @param object DFSObject
 */
GuiSearch.prototype.actualizeDFS = function (DFSObject) {
    // pobierz ilość odwiedzonych wierzchołków
    let visitedAmount = DFSObject.getVisitedAmount();
    // pobierz ilość przetworzonych wierzchołków
    let processedAmount = DFSObject.getProcessedAmount();

    // czas globalny do etykiet
    this.time = 1;
    this.textedAsVisited = [];

    for(let i=0; i<processedAmount; i++) {
        // pobierz wierzchołek przetworzony
        let processedVertex = DFSObject.processed[i];

        for(let j=0; j<visitedAmount; j++) {
            // pobierz wierzchołek odwiedzony
            let visitedVertex = DFSObject.visited[j];

            // jeśli nie był wpisywany czas odwiedzin
            if(this.isNotTexted(visitedVertex)) {
                // wpisz czas odwiedzin do wierzchołka
                this.addTextedVisitedTime(visitedVertex);
            }
            // jeśli wierzchołek odwiedzony jest tym samym co przetworzony to kończ pętlę odwiedzonych
            if(visitedVertex === processedVertex) {
                break;
            }
        }
        // ustaw czas przetworzenia dla przetworzonego wierzchołka
        this.addTextedProcessedTime(processedVertex);
    }

}

/**
 * Sprawdza czy podany wierzchołek nie ma jeszcze wpisanego czasu odwiedzin
 *
 * @param integer visitedVertex
 * @returns boolean
 */
GuiSearch.prototype.isNotTexted = function (visitedVertex) {
    return (!GRAPH.assets.inArray(visitedVertex, this.textedAsVisited));
}

/**
 * Ustawia czas odwiedzin w danym wierzchołku
 *
 * @param integer visitedVertex
 * numer wierzchołka odwiedzonego
 */
GuiSearch.prototype.addTextedVisitedTime = function (visitedVertex) {
    // ustaw czas odwiedzin
    GRAPH.graph.verticesArray[visitedVertex].searchLabel.setVisitedTime(this.time);
    // aktualizuj labele
    GRAPH.graph.verticesArray[visitedVertex].actualizeControls();
    // dodaj informację, że wierzchołek ma już wpisany czas odwiedzin
    this.textedAsVisited.push(visitedVertex);
    // zwiększ globalny licznik czasu
    this.time++;
}

/**
 * Ustawia czas przetworzenia w danym wierzchołku
 *
 * @param integer processedVertex
 * numer wierzchołka przetworzonego
 */
GuiSearch.prototype.addTextedProcessedTime = function (processedVertex) {
    // ustaw czas przetworzenia dla przetworzonego wierzchołka
    GRAPH.graph.verticesArray[processedVertex].searchLabel.setProcessedTime(this.time);
    // aktualizuj labele
    GRAPH.graph.verticesArray[processedVertex].actualizeControls();
    // zwiększ globalny licznik czasu
    this.time++;
}


// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.algorithms = GRAPH.gui.algorithms || {};
GRAPH.gui.algorithms.search = new GuiSearch();