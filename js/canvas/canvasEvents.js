/**
 * Klasa obsługi zdarzeń w Canvas
 */
function CanvasEvents() {
    // przechowanie zaznaczonego aktualnie wierzchołka na canvasie
    this.choosenVertex = {
        edit: null, // gdy zaznaczono w trybie EDYCJI
        normal: null // gdy zaznaczono w trybie NORMALNYM
    };
}

/**
 * Usuń krawędź - jeśli kliknęliśmy w jej DeleteButton
 *
 * @returns boolean
 */
CanvasEvents.prototype.clickedEdgeDelete = function (coords) {
    if(GRAPH.graph.editType && this.choosenVertex.edit === null) {
        let clickedIndex = GRAPH.graph.coordsInsideEdgesDeleteButton(coords);

        if(clickedIndex !== null) {
            GRAPH.graph.removeEdge(clickedIndex);
            GRAPH.listener.noticeChange(); // powiadom listener o zmianach w Grafie
            return true;
        }
    }

    return false;
}

/**
 * Usuń wierzchołek - jeśli kliknęliśmy w jego DeleteButton
 *
 * @returns boolean
 */
CanvasEvents.prototype.clickedVertexDelete = function (coords) {
    if(GRAPH.graph.editType && this.choosenVertex.edit === null) {
        let clickedIndex = GRAPH.graph.coordsInsideVerticesDeleteButton(coords);

        if (clickedIndex !== null) {
            GRAPH.graph.removeVertex(clickedIndex);
            GRAPH.listener.noticeChange(); // powiadom listener o zmianach w Grafie
            return true;
        }
    }

    return false;
}

/**
 * Jeśli kliknęliśmy w wierzchołek
 *
 * @returns boolean
 */
CanvasEvents.prototype.clickedVertex = function (coords) {
    let clickedIndex = GRAPH.graph.coordsInsideVerticesExcept(coords, this.choosenVertex.edit);

    if(clickedIndex !== null) {
        // ---- tryb edycji ----
        if(GRAPH.graph.editType)
        {
            // jeśli zaznaczony wierzchołek był w trybie normalnym - odznacz go
            if(this.choosenVertex.normal !== null) {
                GRAPH.graph.setVertexColor(this.choosenVertex.normal, "white"); // ustaw z powrotem białe tło
                this.choosenVertex.normal = null;
            }

            // jeśli wcześniej był już zaznaczony
            if(this.choosenVertex.edit !== null) {
                // skoro jest ignorowany (jeśli ten sam) to znaczy ze zaznaczyliśmy inny
                GRAPH.gui.flash.dangerMsg(GRAPH.static.msg.edit.BAD_VERTEX_PLACE);
            }
            else {
                // zaznacz go
                GRAPH.graph.setVertexColor(clickedIndex, "grey");
                this.choosenVertex.edit = clickedIndex;

                GRAPH.gui.flash.successMsg(GRAPH.static.msg.edit.CHOOSEN);
            }
        }
        else // ---- tryb normalny ----
        {
            // jeśli zaznaczony wierzchołek był w trybie edycji - odznacz go
            if(this.choosenVertex.edit !== null) {
                GRAPH.graph.setVertexColor(this.choosenVertex.edit, "white"); // ustaw z powrotem białe tło
                this.choosenVertex.edit = null;
            }

            // jeśli wcześniej był już zaznaczony
            if(this.choosenVertex.normal !== null) {
                // sprawdź czy to ten sam
                if(this.choosenVertex.normal === clickedIndex) {
                    // odznacz go
                    GRAPH.graph.setVertexColor(clickedIndex, "white");
                    this.choosenVertex.normal = null;

                    GRAPH.gui.flash.successMsg(GRAPH.static.msg.normal.START);
                }
                else { // to nie ten sam
                    // sprawdź czy istnieje krawędź pomiędzy nimi
                    if(GRAPH.graph.checkEdgeExist(this.choosenVertex.normal, clickedIndex)) {
                        GRAPH.gui.flash.dangerMsg(GRAPH.static.msg.normal.BAD_EDGE_EXIST);
                    }
                    else {
                        // dodaj krawędź
                        GRAPH.graph.addEdge(
                            GRAPH.graph.verticesArray[this.choosenVertex.normal],
                            GRAPH.graph.verticesArray[clickedIndex],
                            GRAPH.graph.edgesArray.length
                        );
                        // odznacz go
                        GRAPH.graph.setVertexColor(this.choosenVertex.normal, "white");
                        this.choosenVertex.normal = null;
                        // powiadom listener o zmianach w Grafie
                        GRAPH.listener.noticeChange();

                        GRAPH.gui.flash.successMsg(GRAPH.static.msg.normal.START);
                    }
                }
            }
            else // wcześniej NIE był zaznaczony
            {
                // zaznacz go
                GRAPH.graph.setVertexColor(clickedIndex, "grey");
                this.choosenVertex.normal = clickedIndex;

                GRAPH.gui.flash.successMsg(GRAPH.static.msg.normal.CHOOSEN);
            }
        }

        return true;
    }
    else {
        return false;
    }
}

/**
 * Jeśli nie zostały wykryte żadne inne elementy - to znaczy, że kliknęliśmy w puste pole
 *
 * @returns boolean
 */
CanvasEvents.prototype.clickedEmptySpace = function (coords) {
    // jakiś wierzchołek był edytowany w trybie edycji
    if(GRAPH.graph.editType && this.choosenVertex.edit !== null) {
        // zaktualizuj jego pozycję
        GRAPH.graph.verticesArray[this.choosenVertex.edit].actualize();

        // odznacz go
        GRAPH.graph.setVertexColor(this.choosenVertex.edit, "white");
        this.choosenVertex.edit = null;

        // powiadom listener o zmianach w Grafie
        GRAPH.listener.noticeChange();

        GRAPH.gui.flash.successMsg(GRAPH.static.msg.edit.START);

        return true;
    }
    // jeśli tryb NORMALNY
    else if(GRAPH.graph.editType === false) {

        // jeśli zaznaczony wierzchołek był w trybie edycji - odznacz go
        if(this.choosenVertex.edit !== null) {
            GRAPH.graph.setVertexColor(this.choosenVertex.edit, "white"); // ustaw z powrotem białe tło
            this.choosenVertex.edit = null;
        }

        // jeśli zaznaczony wierzchołek był w trybie normalnym - odznacz go
        if(this.choosenVertex.normal !== null) {
            GRAPH.graph.setVertexColor(this.choosenVertex.normal, "white"); // ustaw z powrotem białe tło
            this.choosenVertex.normal = null;

            GRAPH.gui.flash.successMsg(GRAPH.static.msg.normal.START);
        }
        else {
            // dodaj nowy wierzchołek w to miejsce
            let vertex = new Vertex(coords.x, coords.y, GRAPH.graph.verticesArray.length);
            GRAPH.graph.addVertex(vertex);

            // powiadom listener o zmianach w Grafie
            GRAPH.listener.noticeChange();

            GRAPH.gui.flash.successMsg(GRAPH.static.msg.normal.START);
        }

        return true;
    }

    return false;
}

/**
 * Obsługa zdarzeń kliknięcia w kontener Canvas
 *
 * @param coords
 */
CanvasEvents.prototype.clickHandler = function (coords) {
    // lista metod do odpalenia (ważna jest tu kolejność)
    let commands = [
        'clickedEdgeDelete',
        'clickedVertexDelete',
        'clickedVertex',
        'clickedEmptySpace'
    ];

    // odpala metody z listy
    while(commands.length > 0) {
        let commandToRun = commands.shift();
        let result = this[commandToRun].apply(this, [coords]);

        // jeśli któraś z nich się powiedzie to przerwij wszystko
        if(result) {
            break;
        }
    }
}

/**
 * Obsługa zdarzeń przesunięcia myszy w kontenerze Canvas
 *
 * @param coords
 */
CanvasEvents.prototype.moveHandler = function (coords) {
    if (GRAPH.canvasEvents.choosenVertex.edit !== null && GRAPH.graph.editType) {
        // aktualizuj po współrzędnych
        GRAPH.graph.verticesArray[GRAPH.canvasEvents.choosenVertex.edit].actualizeByCoords(coords);

        // aktualizuj wszystkie krawędzie
        GRAPH.graph.actualizeEdges();
    }
}

// pod-przestrzeń nazw
GRAPH.canvasEvents = new CanvasEvents();

// "CLICK"
GRAPH.canvas.containter.addEventListener('click', function(event) {
    // Obliczenie Współrzędnych (relatywnie do pozycji w kontenerze canvas)
    let coords = GRAPH.assets.generateCoords(event, this);

    // obsłużenie kliknięcia
    GRAPH.canvasEvents.clickHandler(coords);
}, false);

// "MOUSEMOVE"
GRAPH.canvas.containter.addEventListener('mousemove', function (event) {
    // Obliczenie Współrzędnych (relatywnie do pozycji w kontenerze canvas)
    let coords = GRAPH.assets.generateCoords(event, this);

    // obsłużenie przesunięcia
    GRAPH.canvasEvents.moveHandler(coords);
}, false);