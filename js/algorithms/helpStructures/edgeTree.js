/**
 * Pomocnicze struktury algorytmów
 * --------------------
 * Klasa do zapamiętywania drzew w postaci grup krawędzi
 *
 * Wykorzystywane przez algorytmy: BFS, DFS
 */
function EdgeTrees() {
    this.clearAndInit();
}

/**
 * Inicjowanie
 */
EdgeTrees.prototype.clearAndInit = function () {
    // przechowuje drzewa - w każdym drzewie są krawędzie, po których przeszedł algorytm
    this.trees = [];
}

/**
 * Dodaje nowe drzewo (pusta tablica)
 */
EdgeTrees.prototype.addNew = function () {
    this.trees.push([]);
}

/**
 * Dodaje krawędź do drzewa
 * (ostatnio dodanego)
 *
 * @params integer startVertexNumber
 * @params integer endVertexNumber
 */
EdgeTrees.prototype.addEdge = function (startVertexNumber, endVertexNumber) {
    let edge = {
        start: startVertexNumber,
        end: endVertexNumber
    }

    this.trees[this.getAmount() - 1].push(edge);
}

/**
 * Informuje o ilości drzew
 *
 * @returns {integer}
 */
EdgeTrees.prototype.getAmount = function () {
    return this.trees.length;
}