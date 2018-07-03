/**
 * Klasa obsługi GUI
 * dla wczytywania plików
 */
function GuiFileUpload() {
    // element formularza do uploadu plików
    this.uploadFormElement = $('#loadGraph');
}

/**
 * Resetowanie/Czyszczenie zawartości formularza (pliku)
 */
GuiFileUpload.prototype.clearFile = function () {
    GRAPH.assets.resetFormElement(this.uploadFormElement);
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.fileUpload = new GuiFileUpload();
