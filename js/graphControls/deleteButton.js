/**
 * Przycisk do usuwania
 */
function DeleteButton(x, y, number) {
    // Numer
    this.number = number;

    // Promień okregu w prezentacji graficznej
    this.r = 5;

    // Wypełnienie kolorem tła
    this.color = "red";

    // Domyślne odległości (offsety) od współrzędnych aktualizujących przycisk
    this.defaultOffsetX = 10;
    this.defaultOffsetY = 5;

    this.actualize(x, y);
}

/**
 * Aktualizacja parametrów
 */
DeleteButton.prototype.actualize = function (x, y) {
    // Współrzędne
    this.x = x;
    this.y = y;
    // Granice obszaru X-owe
    this.xLeft = this.x - this.r;
    this.xRight = this.x + this.r;
    // Granice obszaru  Y-owe
    this.yUp = this.y - this.r;
    this.yDown = this.y + this.r;
}

/**
 * Aktualizacja parametrów na podstawie wierzchołków (łączących krawędź)
 *
 * @param vertex startVertex
 * @param vertex endVertex
 */
DeleteButton.prototype.actualizeByVertices = function (startVertex, endVertex) {
    var offsetX = (startVertex.x + endVertex.x) / 2 + this.defaultOffsetX;
    var offsetY = (startVertex.y + endVertex.y) / 2 + this.defaultOffsetY;

    this.actualize(offsetX, offsetY);
}

/**
 * Aktualizacja parametrów na podstawie pojedynczego wierzchołka (Vertex)
 *
 * @param vertex singleVertex
 */
DeleteButton.prototype.actualizeBySingleVertex = function (singleVertex) {
    var offsetX = (singleVertex.x + 2 * singleVertex.r + singleVertex.x) / 2;
    var offsetY = (singleVertex.y - 2 * singleVertex.r + singleVertex.y) / 2;

    this.actualize(offsetX, offsetY);
}

/**
 * Zmiana numeru
 *
 * @param integer newNumber
 */
DeleteButton.prototype.setNumber = function (newNumber) {
    this.number = newNumber;
}

/**
 * Zmiana koloru tła
 *
 * @param string color
 */
DeleteButton.prototype.setColor = function (color) {
    this.color = color;
}

/**
 * Metoda rysująca
 */
DeleteButton.prototype.draw = function (ctx) {
    // rysuj zamalowany okrąg
    this.drawFilledCircle(ctx);

    // rysuj tekst '-'
    this.drawText(ctx);
}

/**
 * Metoda rysująca zamalowany okrąg
 */
DeleteButton.prototype.drawFilledCircle = function (ctx) {
    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.closePath();
}

/**
 * Metoda rysująca tekst '-'
 */
DeleteButton.prototype.drawText = function (ctx) {
    ctx.beginPath();

    ctx.font = "10pt Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText("-", this.x - 2, this.y + 2.5);

    ctx.closePath();
}
	