/**
 * Klasa obsługi GUI
 * dla przełącznika Trybu Edycji
 */
function GuiEdit() {
    // przełącznik
    this.switchButton = $('#triggerEditMode');
}

/**
 * Włącz tryb edycji
 */
GuiEdit.prototype.enable = function () {
    this.switchButton.bootstrapToggle('on');
}

/**
 * Wyłącz tryb edycji
 */
GuiEdit.prototype.disable = function () {
    this.switchButton.bootstrapToggle('off');
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.edit = new GuiEdit();