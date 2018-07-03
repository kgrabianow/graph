/**
 * Klasa obsługi GUI dla :
 * Macierzy incydencji
 */
function GuiIncidenceMatrix() {
    // kontener przechowujący treść
    this.container = document.getElementById("incidenceMatrix");

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
GuiIncidenceMatrix.prototype.actualize = function () {
    // inicjalizacja
    this.contentString = "";

    // jeśli są jakieś krawędzie
    if(GRAPH.structures.incidenceMatrix.incidenceArray.length > 0) {
        // dodaj nagłówki do tabeli
        this.addHeaderRow();

        // dodaje informacje o krawędziach (kolejne wiersze)
        this.addDataRows();
    }

    // podmiana tekstu w kontenerze
    this.container.innerHTML = this.contentString;
}

/**
 * Dodaje nagłówkowy wiersz do tabeli
 */
GuiIncidenceMatrix.prototype.addHeaderRow = function () {
    // dodaj pustą kolumnę
    let textData = this.opaqueColumn('');

    // liczba wierzchołków
    let verticesNumber = GRAPH.structures.incidenceMatrix.incidenceArray[0].length;

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
 * Dodaje informacje o krawędziach (kolejne wiersze)
 */
GuiIncidenceMatrix.prototype.addDataRows = function () {
    // Przejście po tablicy wszystkich krawędzi
    for (let i = 0; i < GRAPH.structures.incidenceMatrix.incidenceArray.length; i++) {
        // pobierz krawędź
        let edgeArray = GRAPH.structures.incidenceMatrix.incidenceArray[i];

        // dodaj wiersz z krawędzią
        this.addDataRow(edgeArray, i);
    }
}

/**
 * Dodaje wiersz z krawędzią do tabeli
 *
 * @param Array edgeArray
 * @param integer edgeNumber
 */
GuiIncidenceMatrix.prototype.addDataRow = function (edgeArray, edgeNumber) {
    // dodaj kolumnę nagłówkową
    let textData = this.opaqueHeaderColumn('e', edgeNumber);

    // przejście po wszystkich wierzchołkach
    for (let i = 0; i < edgeArray.length; i++) {
        // opakowanie kolumny
        textData = textData + this.opaqueColumn(edgeArray[i]);
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
GuiIncidenceMatrix.prototype.opaqueHeaderColumn = function (text, subText) {
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
GuiIncidenceMatrix.prototype.opaqueColumn = function (text) {
    return this.opaque.body.column.start + text + this.opaque.body.column.end;
}

/**
 * opakowanie znacznikami html (wiersz tabeli)
 *
 * @param string text
 * @returns string
 */
GuiIncidenceMatrix.prototype.opaqueRow = function (text) {
    return this.opaque.row.start + text + this.opaque.row.end;
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.incidenceMatrix = new GuiIncidenceMatrix();



