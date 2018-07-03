/**
 * Klasa obsługi GUI dla :
 * Listy krawędzi
 */
function GuiEdgesList() {
    // kontener przechowujący treść
    this.container = document.getElementById("edgesList");

    // znaki tekstowe otwierające/zamykające parę
    this.opaqueDirected = {
        start: ' ( ',
        end: ' ) ',
    };
    this.opaqueNotDirected = {
        start: ' { ',
        end: ' } ',
    };
}

/**
 * Aktualizowanie treści
 */
GuiEdgesList.prototype.actualize = function () {
    this.edgeListString = "";

    // Przejście po tablicy wszystkich krawędzi
    for (let i = 0; i < GRAPH.structures.edgesList.edgesArray.length; i++) {
        // krawędź
        let edge = GRAPH.structures.edgesList.edgesArray[i];
        // krawędź na string
        let edgeString = this.concatenateEdgeNumbers(edge);
        // opakowanie nawiasami w zależności od skierowania/nieskierowania
        this.edgeListString = this.edgeListString + this.opaqueByDirection(edge, edgeString)
    }

    // podmiana tekstu w kontenerze
    this.container.innerHTML = this.edgeListString;
}

/**
 * łączy ze sobą numery wierzchołków (z krawędzi) i zwraca w postaci tekstu
 *
 * @param Edge edge
 * @returns string
 */
GuiEdgesList.prototype.concatenateEdgeNumbers = function (edge) {
    return edge.start + "," + edge.end;
}

/**
 * opakowanie tekst odpowiednimi nawiasami - () - dla skierowanego, {} - dla nieskierowanego
 *
 * @param Edge edge
 * @param string text
 * @returns string
 */
GuiEdgesList.prototype.opaqueByDirection = function (edge, text) {
    if(GRAPH.graph.getDirectionMode()) {
        return this.opaqueDirected.start + text + this.opaqueDirected.end;
    }
    else {
        return this.opaqueNotDirected.start + text + this.opaqueNotDirected.end;
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.edgesList = new GuiEdgesList();



