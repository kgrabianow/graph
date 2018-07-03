/**
 * Klasa obsługi GUI dla generowania grafu
 */
function GuiRandom() {
    // pola formularza (ilość wierzchołków i krawędzi)
    this.verticesInput = $("#randomVertices");
    this.edgesInput = $("#randomEdges");

    // przycisk 'losuj'
    this.randomButton = $('#randomGraph');

    // przyciski "-" i "+" do zmiany pola krawędzi
    this.minusEdgesButton = this.edgesInput.prev().find('button');
    this.plusEdgesButton = this.edgesInput.next().find('button');

    // label informacyjny na temat maksymalnego limitu krawędzi
    this.edgesMaxLimitLabel = $("#randomEdgesMax");

    // minimalny limit krawędzi
    this.edgesMinLimit = parseInt(this.edgesInput.attr("min"));

    // nazwa atrybutu do wyłączenia
    this.disableAttributeName = 'disabled';
}

/**
 * Dostosowuje zmienione elementy formularzy krawędzi do limitów krawędzi
 */
GuiRandom.prototype.adjustToLimits = function () {
    // aktualne wartości pól
    let verticesNumber = this.getVerticesInputNumber();
    let edgesNumber = this.getEdgesInputNumber();

    // obliczenie MAX możliwej ilości krawędzi w zależności od wierzchołków
    let edgesMaxLimit = GRAPH.assets.getEdgesLimitByVertices(verticesNumber);

    // ustaw nowy limit
    this.setEdgesMaxLimit(edgesMaxLimit);

    // jeśli aktualna wartość krawędzi przekracza nowy limit - ustaw ją jako limit
    this.changeEdgesNumberIfExceedsMaxLimit(edgesNumber, edgesMaxLimit);

    // dostosuj pola i przyciski +/- regulujące liczby krawędzi
    this.adjustEdgesFormElements(edgesNumber, edgesMaxLimit);
}

/**
 * Zwraca aktualnie wpisaną liczbę wierzchołków
 *
 * @returns integer
 */
GuiRandom.prototype.getVerticesInputNumber = function () {
    return parseInt(this.verticesInput.val());
}

/**
 * Zwraca aktualnie wpisaną liczbę krawędzi
 *
 * @returns integer
 */
GuiRandom.prototype.getEdgesInputNumber = function () {
    return parseInt(this.edgesInput.val());
}

/**
 * Ustawia maksymalny limit w atrybutach pola formularza Krawędzi,
 * nadpisuje też liczbę w polu tekstowym (label)
 *
 * @param integer edgesMaxLimit
 */
GuiRandom.prototype.setEdgesMaxLimit = function (edgesMaxLimit) {
    this.edgesInput.attr("max", edgesMaxLimit);
    this.edgesMaxLimitLabel.html(edgesMaxLimit);
}

/**
 * Ustawia wartość pola formularza Krawędzi na maksymalny limit, jeśli poprzednia wartość przekracza ten limit
 *
 * @param integer edgesNumber
 * @param integer edgesMaxLimit
 */
GuiRandom.prototype.changeEdgesNumberIfExceedsMaxLimit = function (edgesNumber, edgesMaxLimit) {
    if(edgesNumber > edgesMaxLimit) {
        this.edgesInput.val(edgesMaxLimit);
    }
}

/**
 * Dostosuj pola i przyciski +/- regulujące liczby krawędzi
 * W zależności od limitów
 *
 * @param integer edgesNumber
 * @param integer edgesMaxLimit
 */
GuiRandom.prototype.adjustEdgesFormElements = function (edgesNumber, edgesMaxLimit) {
    // odblokuj pole formularza
    this.enableFormElement(this.edgesInput);

    // jeśli ilość krawędzi przekracza/osiąga MAX limit
    if(edgesNumber >= edgesMaxLimit) {
        this.disableFormElement(this.plusEdgesButton); // wył +

        // jeśli limity się pokrywają - to nie można zmniejszać/zwiększać
        if(edgesMaxLimit === this.edgesMinLimit){
            this.disableFormElement(this.minusEdgesButton); // wył -
            this.disableFormElement(this.edgesInput); // blokuj pole formularza
        }
        else {
            this.enableFormElement(this.minusEdgesButton); // wł -
        }
    }
    else {
        this.enableFormElement(this.plusEdgesButton); // wł +

        // jeśli ilość krawędzi osiągnęła minimum - to nie można zmniejszać
        if(edgesNumber === this.edgesMinLimit){
            this.disableFormElement(this.minusEdgesButton); // wył -
        }
        else {
            this.enableFormElement(this.minusEdgesButton); // wł -
        }
    }
}

/**
 * Wyłącza podany element formularza
 *
 * @param object formElement
 */
GuiRandom.prototype.disableFormElement = function (formElement) {
    formElement.attr(this.disableAttributeName, this.disableAttributeName);
}

/**
 * Włącza podany element formularza
 *
 * @param object formElement
 */
GuiRandom.prototype.enableFormElement = function (formElement) {
    formElement.removeAttr(this.disableAttributeName)
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.random = new GuiRandom();