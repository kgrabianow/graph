/**
 * Klasa obsługi GUI dla Historii - przyciski prev,next itd.
 */
function GuiHistory() {
    // przycisk 'wstecz'
    this.previousButton = $('#goPrevious');

    // przycisk 'dalej'
    this.nextButton = $('#goNext');

    // infomacja o aktualnym kroku i ilości wszystkich kroków
    this.actualStepLabel = $(".actualStepHistory");
    this.savedStepsLabel = $(".savedStepsHistory");
}

/**
 * Wyłącz przycisk 'wstecz'
 */
GuiHistory.prototype.disablePreviousButton = function () {
    this.previousButton.attr('disabled', 'disabled');
    this.previousButton.disabled = true;
}

/**
 * Włącz przycisk 'wstecz'
 */
GuiHistory.prototype.enablePreviousButton = function () {
    this.previousButton.removeAttr('disabled');
    this.previousButton.disabled = false;
}

/**
 * Wyłącz przycisk 'dalej'
 */
GuiHistory.prototype.disableNextButton = function () {
    this.nextButton.attr('disabled', 'disabled');
    this.nextButton.disabled = true;
}

/**
 * Włącz przycisk 'dalej'
 */
GuiHistory.prototype.enableNextButton = function () {
    this.nextButton.removeAttr('disabled');
    this.nextButton.disabled = false;
}

/**
 * Zmień informację a aktualnym kroku
 *
 * @param integer number
 * aktualny numer kroku
 */
GuiHistory.prototype.changeActualStepLabel = function (number) {
    this.actualStepLabel.html(number);
}

/**
 * Zmień informację o ilości kroków
 *
 * @param integer number
 * całkowita ilość kroków
 */
GuiHistory.prototype.changeSavedStepsLabel = function (number) {
    this.savedStepsLabel.html(number);
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.history = new GuiHistory();