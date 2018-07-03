/**
 * Obiekt 'nasłuchujący' wszelkie zmiany w grafie
 * i reagujący na nie zbiorem akcji (dodanie kroku do Historii, aktualizowanie reprezentacji grafu, GUI, itd)
 */
function GraphListener() {
    // blokuje dodanie kroku do Historii (potrzebne gdy chodzimy wstecz/dalej)
    this.blockHistoryAdding = false;
}

/**
 * Metoda wyłącza możliwość dodania kroku do Historii
 */
GraphListener.prototype.preventHistoryAdding = function () {
    this.blockHistoryAdding = true;
}

/**
 * Powiadom obiekt o tym, że nastąpiła zmiana w Grafie
 */
GraphListener.prototype.noticeChange = function () {
    // dodaj krok historii
    this.addHistoryStep();
    // buduj struktury Grafu
    this.buildGraphStructures();
    // uruchom algorytmy wyszukiwania DFS, BFS
    this.runSearchAlgorithms();
    // aktualizuj Statystyki
    this.actualizeGraphStats();
}

/**
 * Dodanie kroku do historii
 */
GraphListener.prototype.addHistoryStep = function () {
    if(!this.blockHistoryAdding) {
        GRAPH.history.addStep();
    }
    else {
        // odblokuj możliwość dodania kroku przy zanotowaniu następnych zmian
        this.blockHistoryAdding = false;
    }
}

/**
 * Reprezentacje grafu - budowanie + GUI
 */
GraphListener.prototype.buildGraphStructures = function () {
    // buduj na nowo reprezentacje grafu
    GRAPH.structuresManager.build();
    // aktualizuj GUI dla struktur danych
    GRAPH.structuresManager.actualizeGui();
}

/**
 * Algorytmy przeszukiwania DFS,BFS
 * uruchomienie ich + GUI
 */
GraphListener.prototype.runSearchAlgorithms = function () {
    // uruchom wyszukiwanie wszerz (BFS)
    GRAPH.algorithms.bfs.run();
    // uruchom wyszukiwanie wgłąb (DFS)
    GRAPH.algorithms.dfs.run();
    // aktualizuj GUI dla algorytmów wyszukiwania
    GRAPH.gui.algorithms.search.actualize();
}

/**
 * Aktualizuje statystyki grafu
 */
GraphListener.prototype.actualizeGraphStats = function () {
    // aktualizuj GUI dla statystyk grafu
    GRAPH.gui.stats.actualize();
}


GRAPH.listener = new GraphListener();