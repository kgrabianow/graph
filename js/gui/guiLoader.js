/**
 * Klasa obsługi GUI dla loadera (przysłaniające okno podczas wczytywania np. pliku)
 */
function GuiLoader() {
    // kontener przysłaniający ekran (np. podczas ładowania grafu z pliku)
    this.loader = $(".loader");
}

/**
 * Pokaż loadera
 */
GuiLoader.prototype.show = function () {
    this.loader.css("display", "block");
}

/**
 * Ukryj loadera
 */
GuiLoader.prototype.hide = function () {
    this.loader.css("display", "");
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.loader = new GuiLoader();