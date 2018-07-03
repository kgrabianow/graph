/**
 * Klasa obsługi GUI dla :
 * Listy wierzchołków sąsiednich (następników)
 */
function GuiVerticesList() {
    // kontener przechowujący treść
    this.container = document.getElementById("verticesList");

    // znaki tekstowe zamykające/otwierające wiersz
    this.opaque = {
        start: '<tr><td>',
        end: '</td></tr>',
    };

    // separator następników
    this.separator = ' => ';
}

/**
 * Aktualizowanie treści
 */
GuiVerticesList.prototype.actualize = function () {
    this.verticesListString = "";

    // Przejście po tablicy wszystkich wierzchołków
    for (let i = 0; i < GRAPH.structures.verticesList.verticesArray.length; i++) {
        // wierzchołek
        let vertexArray = GRAPH.structures.verticesList.verticesArray[i];
        // wierchołek z następnikami -> na string
        let vertexString = this.concatenateVertexNumbers(i, vertexArray);
        // opakowanie
        this.verticesListString = this.verticesListString + this.opaqueRow(vertexString)
    }

    // podmiana tekstu w kontenerze
    this.container.innerHTML = this.verticesListString;
}

/**
 * łączy ze sobą numery wierzchołka i jego następników
 * zwraca je w postaci tekstu
 *
 * @param integer vertexNumber
 * @param Array vertexArray
 * @returns string
 */
GuiVerticesList.prototype.concatenateVertexNumbers = function (vertexNumber, vertexArray) {
    // inicjalizuj od numeru wierzchołka
    let concatenated = vertexNumber + this.separator;

    // scal wszystkie następniki w jeden tekst
    for (let i = 0; i < vertexArray.length; i++) {
        concatenated = concatenated + vertexArray[i] + this.separator;
    }

    // dodaj informację o pustym końcu
    return concatenated + 'null';
}

/**
 * opakowanie znacznikami html (wiersz tabeli - pojedynczy wierzchołek)
 *
 * @param string text
 * @returns string
 */
GuiVerticesList.prototype.opaqueRow = function (text) {
    return this.opaque.start + text + this.opaque.end;
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.verticesList = new GuiVerticesList();



