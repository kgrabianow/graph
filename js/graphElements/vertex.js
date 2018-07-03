/**
 * Wierzchołek
 *
 * @param Vertex x
 * współrzędne na osi X
 *
 * @param Vertex y
 * współrzędne na osi Y
 *
 * @param integer number
 * numer wierzchołka
 */
function Vertex(x, y, number) {
    // Współrzędne
    this.x = x;
    this.y = y;

    // Numer wierzchołka
    this.number = number;

    // Promień okregu w prezentacji graficznej
    this.r = 20;

    // Przycisk usuniecia
    this.deleteButton = new DeleteButton();
    this.deleteButton.setNumber(number);

    // Labele informacyne dla algorytmów przeszukiwania
    this.searchLabel = new SearchLabel();

    // Wypełnienie wierzchołka
    this.color = "white";

    // aktualiacja granic obszaru i przycisków
    this.actualize();
}

/**
 * Aktualizacja współrzędnych na bazie coords
 *
 * @param object coords
 */
Vertex.prototype.actualizeByCoords = function (coords) {
    this.x = coords.x;
    this.y = coords.y;

    this.actualize();
}

/**
 * Aktualizacja parametrów
 */
Vertex.prototype.actualize = function () {
    // Granice obszaru X-owe
    this.xLeft = this.x - this.r;
    this.xRight = this.x + this.r;

    // Granice obszaru  Y-owe
    this.yUp = this.y - this.r;
    this.yDown = this.y + this.r;

    this.actualizeControls();
}

/**
 * Aktualizacja dodatkowych elementów graficznych
 */
Vertex.prototype.actualizeControls = function () {
    // Aktualizacja przycisku usuniecia
    this.deleteButton.actualizeBySingleVertex(this);

    // Aktualizacja labeli informacyjnych (dla DFS,BFS)
    this.searchLabel.actualizeBySingleVertex(this);
}

/**
 * Funkcja rysująca
 */
Vertex.prototype.draw = function (ctx) {
    this.drawVertexCircle(ctx);
    this.drawVertexNumber(ctx);
    this.drawDeleteButton(ctx);
    this.drawSearchLabel(ctx);
}

/**
 * Rysuj okręg wierzchołka
 */
Vertex.prototype.drawVertexCircle = function (ctx) {
    ctx.beginPath();

    // Kolor wypełnienia
    ctx.fillStyle = this.color;
    // Kolor linii
    ctx.strokeStyle = "black";
    // Rysowanie okregu (x,y,r,kąt początkowy, kąt końcowy)
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    // Zamknij linie
    ctx.stroke();
    // Wypełnij bieżącym kolorem obszar
    ctx.fill();

    ctx.closePath();
}

/**
 * Rysuj numer wierzchołka
 */
Vertex.prototype.drawVertexNumber = function (ctx) {
    ctx.beginPath();

    // parametry
    ctx.font = "10pt Times New Roman";
    ctx.fillStyle = "black";

    // ( tekst_do_napisania, x, y )
    ctx.fillText((this.number).toString(), this.x - 2.5, this.y + 2.5);

    ctx.closePath();
}

/**
 * Rysuj przycisk usuwania (tylko w trybie Edycji)
 */
Vertex.prototype.drawDeleteButton = function (ctx) {
    if (GRAPH.graph.editType) {
        this.deleteButton.draw(ctx);
    }
}

/**
 * Rysuj Labele informacyne dla algorytmów przeszukiwania (w trybie wyświetlania ich)
 */
Vertex.prototype.drawSearchLabel = function (ctx) {
    if(GRAPH.graph.searchAlgorithmsMode) {
        this.searchLabel.draw(ctx);
    }
}