/**
 * Klasa tworząca canvas i przechowująca context
 *
 * @param integer width
 * szerokość okna
 *
 * @param integer height
 * wysokość okna
 *
 * @param string appendToId
 * ID elementu DOM, do którego wrzucimy canvas
 */
function Canvas(width, height, appendToId) {
    /**
     * Pola
     */
    // kontener przechowujący obiekt canvas
    this.containter = document.createElement('canvas');

    // uchwyt kontekstu graficznego
    this.context = null;

    // ogranicznik przestrzenii z każdej strony okna Canvas
    // użyty przy losowaniu współrzędnych - aby promień koła wierzchołków (graficznie) się zmieścił
    this.randomPadding = 20;

    /**
     * Konstruktor
     */
    this.containter.width = width;
    this.containter.height = height;
    document.getElementById(appendToId).appendChild(this.containter);
    this.context = this.containter.getContext('2d');
}

/**
 * Rysuje tło
 *
 * @param string color
 * Ustawiamy kolor w jakim rysowane jest tło - jeśli go nie podamy to mamy domyślnie białe
 */
Canvas.prototype.drawBackground = function (color = 'rgba(255,255,255,0.5)') {
    // Ustawienie koloru tła kontekstu
    this.context.fillStyle = color;
    // wypełnienie nim całego obszaru
    this.context.fillRect(0, 0, this.containter.width, this.containter.height);
}

/**
 * Rysuje tło obszaru obecnie obserwowanego
 *
 * @param object rect {
 *  x, y, width, height
 * }
 * @param string color
 */
Canvas.prototype.drawObservedBackground = function (rect, color = 'rgba(0,0,255,0.25)') {
    this.context.fillStyle = color;
    this.context.rect( rect.x, rect.y, rect.width, rect.height);
    this.context.fill();
}

/**
 * Zwraca losową liczbę mieszczącą się w oknie Canvas na osi X (wraz z randomPadding)
 *
 * @returns integer
 */
Canvas.prototype.getRandomCoordsInsideX = function () {
    return GRAPH.assets.getRandomNumberBetween(this.randomPadding, this.containter.width - this.randomPadding);
}

/**
 * Zwraca losową liczbę mieszczącą się w oknie Canvas na osi Y (wraz z randomPadding)
 *
 * @returns integer
 */
Canvas.prototype.getRandomCoordsInsideY = function () {
    return GRAPH.assets.getRandomNumberBetween(this.randomPadding, this.containter.height - this.randomPadding);
}

// Przesuwanie widoku
Canvas.prototype.moveCanvas = function (dx,dy) {
    // Współrzedne przesuniecia
    this.dx = dx;
    this.dy = dy;

    // Dla wierzchołków
    for (let i = 0; i < GRAPH.graph.verticesArray.length; i++) {
        GRAPH.graph.verticesArray[i].x += this.dx;
        GRAPH.graph.verticesArray[i].y += this.dy;
        GRAPH.graph.verticesArray[i].actualize();
    }
    // Dla krawędzi
    for (let i = 0; i < GRAPH.graph.edgesArray.length; i++) {
        GRAPH.graph.edgesArray[i].actualize();
    }

    GRAPH.web.startX += this.dx;
    GRAPH.web.startY += this.dy;

    GRAPH.graph.dx += this.dx;
    GRAPH.graph.dy += this.dy;
}

// pod-przestrzeń nazw
GRAPH.canvas = new Canvas(700, 400, "canvas");
GRAPH.canvasMap = new Canvas(262.5, 150, "canvasMap");