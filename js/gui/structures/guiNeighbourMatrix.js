/**
 * Klasa obsługi GUI dla :
 * Macierzy sąsiedztwa (przyległości)
 */
function GuiNeighbourMatrix() {
    // kontener przechowujący treść
    this.container = document.getElementById("neighbourMatrix");

    // znaki tekstowe zamykające/otwierające wiersze/kolumny
    this.opaque = {
        // wiersze
        row: {
            start: '<tr align="center">',
            end: '</tr>',
        },
        // kolumny dla nagłówków
        header: {
            column: {
                start: '<td bgcolor="#ddd">',
                end: '</td>',
            },
            sub: {
                start: '<sub>',
                end: '</sub>',
            }
        },
        // kolumny dla treści
        body: {
            column: {
                start: '<td>',
                end: '</td>',
            }
        }
    };
}

/**
 * Aktualizowanie treści
 */
GuiNeighbourMatrix.prototype.actualize = function () {
    // inicjalizacja
    this.contentString = "";

    // ilość wierzchołków
    let verticesNumber = GRAPH.structures.neighbourMatrix.neighbourArray.length;

    // jeśli są jakieś wierzchołki
    if(verticesNumber > 0) {
        // dodaj nagłówki do tabeli
        this.addHeaderRow(verticesNumber);

        // dodaje informacje o wierzchołkach (kolejne wiersze)
        this.addDataRows(verticesNumber);
    }

    // podmiana tekstu w kontenerze
    this.container.innerHTML = this.contentString;
}

/**
 * Dodaje nagłówkowy wiersz do tabeli
 *
 * @param integer verticesNumber
 * ilość wierzchołków
 */
GuiNeighbourMatrix.prototype.addHeaderRow = function (verticesNumber) {
    // dodaj pustą kolumnę
    let textData = this.opaqueColumn('');

    // przejście po wszystkich wierzchołkach (nagłówki)
    for (let i = 0; i < verticesNumber; i++) {
        // dodaj kolumnę nagłówkową
        textData = textData + this.opaqueHeaderColumn('v', i);
    }

    // opakuj w wiersz
    textData = this.opaqueRow(textData);

    // dodaj całość
    this.contentString = this.contentString + textData;
}

/**
 * Dodaje informacje o wierzchołkach (kolejne wiersze)
 *
 * @param integer verticesNumber
 * ilość wierzchołków
 */
GuiNeighbourMatrix.prototype.addDataRows = function (verticesNumber) {
    // Przejście po tablicy wszystkich wierzchołków
    for (let i = 0; i < verticesNumber; i++) {
        // pobierz wierzchołki do wiersza
        let verticesArray = GRAPH.structures.neighbourMatrix.neighbourArray[i];

        // dodaj wiersz z wierzchołkiem
        this.addDataRow(verticesArray, i);
    }
}

/**
 * Dodaje wiersz z wierzchołkiem do tabeli
 *
 * @param Array verticesArray
 * @param integer vertexIndex
 */
GuiNeighbourMatrix.prototype.addDataRow = function (verticesArray, vertexIndex) {
    // dodaj kolumnę nagłówkową
    let textData = this.opaqueHeaderColumn('v', vertexIndex);

    // przejście po wszystkich wierzchołkach
    for (let i = 0; i < verticesArray.length; i++) {
        // opakowanie kolumny
        textData = textData + this.opaqueColumn(verticesArray[i]);
    }

    // opakuj w wiersz
    textData = this.opaqueRow(textData);

    // dodaj całość
    this.contentString = this.contentString + textData;
}

/**
 * opakowanie znacznikami html (kolumny-nagłówka)
 *
 * @param string text
 * @param string subText - tekst jako indeks typograficzny
 * @returns string
 */
GuiNeighbourMatrix.prototype.opaqueHeaderColumn = function (text, subText) {
    // połączenie tekstów
    let concatenatedTexts = text + this.opaque.header.sub.start + subText + this.opaque.header.sub.end;

    return this.opaque.header.column.start + concatenatedTexts + this.opaque.header.column.end;
}

/**
 * opakowanie znacznikami html (kolumny)
 *
 * @param string text
 * @returns string
 */
GuiNeighbourMatrix.prototype.opaqueColumn = function (text) {
    return this.opaque.body.column.start + text + this.opaque.body.column.end;
}

/**
 * opakowanie znacznikami html (wiersz tabeli)
 *
 * @param string text
 * @returns string
 */
GuiNeighbourMatrix.prototype.opaqueRow = function (text) {
    return this.opaque.row.start + text + this.opaque.row.end;
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.neighbourMatrix = new GuiNeighbourMatrix();



