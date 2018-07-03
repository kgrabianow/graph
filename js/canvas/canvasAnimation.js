/**
 * Klasa obsługi animacji w Canvas
 */
function CanvasAnimation() {
    // Ustawienie częstotliwości odświeżania animacji
    this.fps = 5;

    // pomocniczy czas odniesienia
    this.lastTime = 0;
}

/**
 * Warunek sprawdza czy od poprzedniej klatki minął odpowiedni czas, aby rysować
 * Zależne od ilości FPS
 *
 * @param time
 * @returns {boolean}
 */
CanvasAnimation.prototype.itsTimeToDraw = function (time) {
    return (time - this.lastTime) >= (1000 / this.fps);
}

CanvasAnimation.prototype.drawGraph = function () {
    // rysowanie tła
    GRAPH.canvas.drawBackground();

    // Zapis kontekstu i przeskalowanie
    GRAPH.canvas.context.save();
    GRAPH.canvas.context.scale( GRAPH.web.sizeXmod, GRAPH.web.sizeYmod);

    // Rysuj siatkę i graf
    GRAPH.web.draw(GRAPH.canvas.context);
    GRAPH.graph.draw(GRAPH.canvas.context);

    // Przywróć kontekst
    GRAPH.canvas.context.restore();
}

CanvasAnimation.prototype.drawMap = function () {
    // rysowanie tła
    GRAPH.canvasMap.drawBackground();

    // Zapis kontekstu i przeskalowanie
    GRAPH.canvasMap.context.save();
    let scaleX = GRAPH.canvasMap.containter.width /  GRAPH.web.width;
    let scaleY = GRAPH.canvasMap.containter.height /  GRAPH.web.height;
    GRAPH.canvasMap.context.scale(scaleX, scaleY);

    // Rysuj siatkę i mapę
    GRAPH.web.drawMap(GRAPH.canvasMap.context);
    GRAPH.canvasMap.context.translate( -GRAPH.graph.dx, -GRAPH.graph.dy );
    GRAPH.graph.draw(GRAPH.canvasMap.context);
    GRAPH.canvasMap.context.translate( GRAPH.graph.dx, GRAPH.graph.dy );

    // Rysowanie obserwowanego obszaru (Tło)
    let rect = {
        x: -GRAPH.graph.dx,
        y: -GRAPH.graph.dy,
        width: 700/GRAPH.web.sizeXmod,
        height: 400/GRAPH.web.sizeYmod
    }
    GRAPH.canvasMap.drawObservedBackground(rect);

    // Przywróć kontekst
    GRAPH.canvasMap.context.restore();
}


// pod-przestrzeń nazw
GRAPH.canvasAnimation = new CanvasAnimation();

animationLoop();

/**
 * Odpalenie głównej animacji
 * w oparciu o FPS(frame per second)
 */
function animationLoop(time) {
    // "Aby zrozumieć rekurencję, trzeba najpierw zrozumieć rekurencję"
    requestAnimationFrame(animationLoop);

    if (GRAPH.canvasAnimation.itsTimeToDraw(time)) {
        // rysuj Graf z siatką
        GRAPH.canvasAnimation.drawGraph();

        // rysuj Mapę z siatką i zaznaczeniem
        GRAPH.canvasAnimation.drawMap();
    }
}