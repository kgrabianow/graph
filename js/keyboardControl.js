// Obsługa klawiatury
let keys = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,

    W: 87,
    S: 83,
    A: 65,
    D: 68,

    Z: 90,
    C: 67,

    R: 82,
    I: 73
};

window.addEventListener('keydown', function (event) {
    let vector = 50;

    switch (event.keyCode) {
        // W lewo
        case keys.LEFT:
        case keys.A:
            if (GRAPH.web.startX < 0) {
                GRAPH.canvas.moveCanvas(vector, 0);
            }
        break;

        // W górę
        case keys.UP:
        case keys.W:
            if (GRAPH.web.startY < 0) {
                GRAPH.canvas.moveCanvas(0, vector);
            }
        break;

        // W prawo
        case keys.RIGHT:
        case keys.D:
            // 700 --> szerokość canvasa
            if (GRAPH.web.startX * GRAPH.web.sizeXmod > -GRAPH.web.width * GRAPH.web.sizeXmod + (GRAPH.canvas.containter.width)) {
                GRAPH.canvas.moveCanvas(-vector, 0);
            }
        break;

        // W dół
        case keys.DOWN:
        case keys.S:
            // 400 --> wysokość canvasa
            if (GRAPH.web.startY * GRAPH.web.sizeYmod > -GRAPH.web.height * GRAPH.web.sizeYmod + (GRAPH.canvas.containter.height)) {
                GRAPH.canvas.moveCanvas(0, -vector);
            }
        break;

        // Przybliżanie
        case keys.Z:
            GRAPH.web.sizeXmod = GRAPH.web.sizeXmod + 0.1;
            GRAPH.web.sizeYmod = GRAPH.web.sizeYmod + 0.1;
            console.log(GRAPH.web.sizeXmod);

            // powiadom listener o zmianach w Grafie
            GRAPH.listener.noticeChange();
        break;

        // Oddalanie
        case keys.C:
            if ((GRAPH.web.width * GRAPH.web.sizeXmod).toFixed(1) > (GRAPH.canvas.containter.width)) {
                GRAPH.web.sizeXmod = GRAPH.web.sizeXmod - 0.1;
                GRAPH.web.sizeYmod = GRAPH.web.sizeYmod - 0.1;
                console.log(GRAPH.web.sizeXmod);

                // powiadom listener o zmianach w Grafie
                GRAPH.listener.noticeChange();
            }
        break;

        // Losowanie grafu
        case keys.R:
            let verticesNumber = GRAPH.gui.random.getVerticesInputNumber();
            let edgesNumber = GRAPH.gui.random.getEdgesInputNumber();

            GRAPH.builders.random.build(verticesNumber, edgesNumber, GRAPH.graph.getDirectionMode());

            // powiadom listener o zmianach w Grafie
            GRAPH.listener.noticeChange();
        break;

        // ?
        case keys.I:
        break;
    }
}, false);