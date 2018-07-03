/**
 * Labele(informacyjne) dla algorytmów DFS, BFS
 * dla danego wierzchołka
 */
function SearchLabel(x, y) {
    // czasy odwiedzenia i przetworzenia
    this.visitedTime = '';
    this.processedTime = '';

    // domyślna czcionka
    this.font = "8pt Times New Roman";

    this.actualize(x, y);
}

/**
 * Aktualizacja parametrów
 */
SearchLabel.prototype.actualize = function (x, y) {
    // Współrzędne
    this.x = x;
    this.y = y;
    // Współrzędne z offsetami dla tekstów
    this.visitedOffset = {
        x: this.x - 16,
        y: this.y + 19
    };
    this.processedOffset = {
        x: this.x + 7,
        y: this.y + 19
    };
}

/**
 * Aktualizacja parametrów na podstawie pojedynczego wierzchołka (Vertex)
 *
 * @param vertex singleVertex
 */
SearchLabel.prototype.actualizeBySingleVertex = function (singleVertex) {
    this.actualize(singleVertex.x, singleVertex.y);
}

/**
 * Ustawienie czasu odwiedzenia
 * z konwersją na string
 *
 * @param integer visitedTime
 */
SearchLabel.prototype.setVisitedTime = function (visitedTime) {
    this.visitedTime = (visitedTime).toString();
}

/**
 * Ustawienie czasu przetworzenia
 * z konwersją na string
 *
 * @param integer processedTime
 */
SearchLabel.prototype.setProcessedTime = function (processedTime) {
    this.processedTime = (processedTime).toString();
}

/**
 * Sprawdza czy mamy ustawione dane dot. czasu odwiedzenia (nie puste stringi)
 *
 * @returns {boolean}
 */
SearchLabel.prototype.visitedTimeExists = function () {
    return (this.visitedTime !== '');
}

/**
 * Sprawdza czy mamy ustawione dane dot. czasu przetworzenia (nie puste stringi)
 *
 * @returns {boolean}
 */
SearchLabel.prototype.processedTimeExists = function () {
    return (this.processedTime !== '');
}

/**
 * Metoda rysująca
 */
SearchLabel.prototype.draw = function (ctx) {
    ctx.beginPath();

    if(this.visitedTimeExists()) {
        this.drawVisitedTimeBackground(ctx);
        this.drawVisitedTime(ctx);
    }

    if(this.processedTimeExists()) {
        this.drawProcessedTimeBackground(ctx);
        this.drawProcessedTime(ctx);
    }

    ctx.closePath();
}

/**
 * Rysuj tło pod czas odwiedzenia
 */
SearchLabel.prototype.drawVisitedTimeBackground = function (ctx) {
    // rysuj tło
    ctx.fillStyle = "#286090";
    ctx.fillRect(this.visitedOffset.x - 3, this.visitedOffset.y - 12, 16, 16);

    // rysuj obramowanie
    ctx.strokeStyle="black";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.visitedOffset.x - 3, this.visitedOffset.y - 12, 16, 16);
}

/**
 * Rysuj czas odwiedzenia
 */
SearchLabel.prototype.drawVisitedTime = function (ctx) {
    // parametry tekstu
    ctx.font = this.font;
    ctx.fillStyle = "white";

    // rysuj tekst
    ctx.fillText(this.visitedTime, this.visitedOffset.x, this.visitedOffset.y);
}

/**
 * Rysuj tło pod czas przetworzenia
 */
SearchLabel.prototype.drawProcessedTimeBackground = function (ctx) {
    // rysuj tło
    ctx.fillStyle = "green";
    ctx.fillRect(this.processedOffset.x - 3, this.processedOffset.y - 12, 17, 16);

    // rysuj obramowanie
    ctx.strokeStyle="black";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.processedOffset.x - 3, this.processedOffset.y - 12, 17, 16);
}

/**
 * Rysuj czas przetworzenia
 */
SearchLabel.prototype.drawProcessedTime = function (ctx) {
    // parametry tekstu
    ctx.font = this.font;
    ctx.fillStyle = "white";

    // rysuj tekst
    ctx.fillText(this.processedTime, this.processedOffset.x, this.processedOffset.y);
}