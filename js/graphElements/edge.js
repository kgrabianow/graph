/**
 * Krawędź
 *
 * @param Vertex startVertex
 * obiekt wierchołka początkowego
 *
 * @param Vertex endVertex
 * obiekt wierchołka końcowego
 *
 * @param integer number
 * numer krawędzi
 *
 */
function Edge(startVertex, endVertex, number) {
    // wierzchołki łączone krawędzią
    this.startVertex = startVertex;
    this.endVertex = endVertex;

    // Numer krawedzi
    this.number = number;

    // Strzałka
    this.arrow = new Arrow();
    this.arrow.actualizeByVertices(startVertex, endVertex);

    // Przycisk usuniecia
    this.deleteButton = new DeleteButton();
    this.deleteButton.setColor("orange");
    this.deleteButton.actualizeByVertices(startVertex, endVertex);
    this.deleteButton.setNumber(number);

    // Grubość krawędzi
    this.lineWidth = 1;
}

/**
 * Aktualizacja parametrów
 */
Edge.prototype.actualize = function () {
    // Przycisk usuniecia
    this.deleteButton.actualizeByVertices(this.startVertex, this.endVertex);

    // Strzałka
    this.arrow.actualizeByVertices(this.startVertex, this.endVertex);
}

/**
 * Funkcja rysująca
 */
Edge.prototype.draw = function (ctx) {
    this.drawLine(ctx);
    this.drawArrow(ctx);
    this.drawEdgeNumber(ctx);
    this.drawDeleteButton(ctx);
}

/**
 * Rysuj linię
 */
Edge.prototype.drawLine = function (ctx) {
    ctx.beginPath();

    // parametry
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "grey";
    ctx.lineWidth = this.lineWidth;

    // współrzędne początku i końca
    ctx.moveTo(this.startVertex.x, this.startVertex.y);
    ctx.lineTo(this.endVertex.x, this.endVertex.y);
    ctx.stroke();

    ctx.closePath();
}

/**
 * Rysuj strzałkę (tylko dla krawędzi Skierowanej)
 */
Edge.prototype.drawArrow = function (ctx) {
    if (GRAPH.graph.getDirectionMode()) {
        this.arrow.draw(ctx);
    }
}

/**
 * Rysuj numer krawędzi
 */
Edge.prototype.drawEdgeNumber = function (ctx) {
    ctx.beginPath();

    // parametry
    ctx.font = "10pt Times New Roman";
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;

    // ( tekst_do_napisania, x, y )
    ctx.fillText((this.number).toString(),
        (this.startVertex.x + this.endVertex.x) / 2,
        (this.startVertex.y + this.endVertex.y) / 2
    );

    ctx.closePath();
}

/**
 * Rysuj przycisk usuwania (tylko w trybie Edycji)
 */
Edge.prototype.drawDeleteButton = function (ctx) {
    if (GRAPH.graph.editType) {
        this.deleteButton.draw(ctx);
    }
}