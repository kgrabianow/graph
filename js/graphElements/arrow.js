/**
 * Strzałka przy krawędziach skierowanych
 *
 * @param integer x_end
 * współrzędne osi X punktu końcowego
 *
 * @param integer y_end
 * współrzędne osi Y punktu końcowego
 *
 * @param integer x_begin
 * współrzędne osi X punktu początkowego
 *
 * @param integer y_begin
 * współrzędne osi Y punktu początkowego
 */
function Arrow(x_end, y_end, x_begin, y_begin) {
    // długość, grubość, kolor
    this.length = 30;
    this.width = 5;
    this.color = "black";

    // współrzedne początku i końca
    this.actualize(x_end, y_end, x_begin, y_begin);
}

/**
 * Aktualizacja strzałki na podstawie wierzchołków
 *
 * @param Vertex startVertex
 * @param Vertex endVertex
 */
Arrow.prototype.actualizeByVertices = function (startVertex, endVertex) {
    this.actualize(endVertex.x, endVertex.y, startVertex.x, startVertex.y);
}

/**
 * Aktualizacja współrzędnych strzałki
 *
 * @param integer x_end
 * @param integer y_end
 * @param integer x_begin
 * @param integer y_begin
 */
Arrow.prototype.actualize = function (x_end, y_end, x_begin, y_begin) {
    this.x_end = x_end;
    this.y_end = y_end;
    this.x_begin = x_begin;
    this.y_begin = y_begin;

    this.recalculateDrawParameters();
}

/**
 * Przeliczenie parametrów rysowania strzałki
 * (powinno być wywoływane tylko gdy się coś zmienia)
 */
Arrow.prototype.recalculateDrawParameters = function () {
    this.dx = Math.max(this.x_end, this.x_begin) - Math.min(this.x_end, this.x_begin);
    this.dy = Math.max(this.y_end, this.y_begin) - Math.min(this.y_end, this.y_begin);
    this.dc = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
    this.angle = Math.asin(this.dy / this.dc);

    /**
     * Uwaga: dla I ćwiartki nie potrzeba zmieniać kąta (angle)
     *
     * warunek:(this.x_end >= this.x_begin && this.y_end >= this.y_begin)
     */
    // II ćwiartka
    if (this.x_end <= this.x_begin && this.y_end >= this.y_begin) {
        this.angle = -this.angle + Math.PI;
    }
    // III ćwiartka
    else if (this.x_end <= this.x_begin && this.y_end <= this.y_begin) {
        this.angle = this.angle + Math.PI;
    }
    // IV ćwiartka
    else if (this.x_end >= this.x_begin && this.y_end <= this.y_begin) {
        this.angle = -this.angle;
    }

    // Określam odległość od okregu
    this.xp = Math.cos(this.angle) * 20;
    this.yp = Math.sin(this.angle) * 20;

    // Nadpisuje poczatek strzałki
    this.workX = this.x_end - this.xp;
    this.workY = this.y_end - this.yp;
}

/**
 * Funkcja rysująca
 */
Arrow.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();

    // kolor wypełnienia, kolor linii, grubość linii
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;

    // Przejście do punktu obrotu
    ctx.translate((this.workX ), this.workY);
    // Obrót
    ctx.rotate(this.angle);
    // Powrót do punktu obrotu
    ctx.translate(-(this.workX ), -this.workY);

    // Przejście do określonego punktu - poczatku rysowania
    ctx.moveTo(this.workX, this.workY);
    ctx.lineTo(this.workX - this.length, this.workY);
    ctx.lineTo(this.workX - this.length, this.workY - this.width);
    ctx.lineTo(this.workX, this.workY);
    ctx.lineTo(this.workX - this.length, this.workY);
    ctx.lineTo(this.workX - this.length, this.workY + this.width);
    ctx.lineTo(this.workX, this.workY);

    // Zamknij linie
    ctx.stroke();
    // Wypełnij
    ctx.fill();

    ctx.closePath();
    ctx.restore();
}