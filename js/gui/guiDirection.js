/**
 * Klasa obsługi GUI
 * dla modyfikacji Skierowania/Nieskierowania grafu
 */
function GuiDirection() {
    // przełącznik
    this.switchButton = $('#triggerGraphType');
}

/**
 * Zmień na tryb skierowany
 */
GuiDirection.prototype.makeDirected = function () {
    this.switchButton.bootstrapToggle('on');
}

/**
 * Zmień na tryb nieskierowany
 */
GuiDirection.prototype.makeNotDirected = function () {
    this.switchButton.bootstrapToggle('off');
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.direction = new GuiDirection();