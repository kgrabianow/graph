/**
 * Klasa assetów
 * (zawiera funkcje matematyczne oraz porównania pomiędzy elementami Grafu)
 */
function Assets() {
}

/**
 * Zwraca losową liczbę pomiędzy 'min' a 'max'
 *
 * @param integer min
 * @param integer max
 * @returns integer
 */
Assets.prototype.getRandomNumberBetween = function (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * obliczanie limitu maksymalnej liczby Krawędzi
 * w zależności od liczby Wierzchołków
 *
 * @param integer verticesNumber
 * @returns number
 */
Assets.prototype.getEdgesLimitByVertices = function (verticesNumber) {
    let sum = 0;
    for (let i = verticesNumber - 1; i >= 1; i--) {
        sum += i;
    }
    return sum;
}

/**
 * Sprawdza czy dwa wierzchołki są tym samym wierzchołkiem (po numerze)
 *
 * @param Vertex firstVertex
 * @param Vertex secondVertex
 * @returns boolean
 */
Assets.prototype.verticesEquals = function (firstVertex, secondVertex) {
    return (firstVertex.number === secondVertex.number);
}

/**
 * Sprawdzanie czy para wierzchołków A1-A2 jest tą samą parą co B1-B2
 * (w różnych kolejnościach)
 *
 * @param Vertex A1
 * @param Vertex A2
 * @param Vertex B1
 * @param Vertex B2
 *
 * @returns boolean
 */
Assets.prototype.verticesPairsEquals = function (A1, A2, B1, B2) {
    return (
        (this.verticesEquals(A1, B1) && this.verticesEquals(A2, B2)) ||
        (this.verticesEquals(A2, B1) && this.verticesEquals(A1, B2))
    );
}

/**
 * Sprawdzanie czy obiekt krawędzi z 'edgesList' jest tą samą krawędzią co Edge (z GRAPH.graph)
 *
 * @param object edgeObject
 * @param Edge edge
 * @returns boolean
 */
Assets.prototype.edgeObjectEqualToEdge = function (edgeObject, edge) {
    return (
        (edgeObject.start === edge.startVertex.number) &&
        (edgeObject.end === edge.endVertex.number)
    );
}

/**
 * Generuje współrzędne kliknięcia w obiekcie DOM
 *
 * @param event
 * @param DOMobject
 * Obiekt DOM na którym działa event
 */
Assets.prototype.generateCoords = function (event, DOMobject) {
    let offset = $(DOMobject).offset();

    return {
        x: ((event.pageX - offset.left) / GRAPH.web.sizeXmod),
        y: ((event.pageY - offset.top) / GRAPH.web.sizeYmod)
    };
}

/**
 * Sprawdzanie czy współrzędna znajduje się wewnątrz prostokąta
 *
 * @param object coords {x,y}
 * @param object rectangle {xLeft,xRight,yUp,yDown}
 *
 * @returns {boolean}
 */
Assets.prototype.insideRectangle = function (coords, rectangle) {
    return (
        rectangle.xLeft < coords.x &&
        rectangle.xRight > coords.x &&
        rectangle.yUp < coords.y &&
        rectangle.yDown > coords.y
    );
}

/**
 * Sprawdzanie czy współrzędna znajduje się wewnątrz koła
 * na podstawie twierdzenia Pitagorasa a²+b²=c²
 *
 * @param object coords {x,y}
 * @param object circle {x,y,r}
 *
 * @returns {boolean}
 */
Assets.prototype.insideCircle = function (coords, circle) {
    let xPowered = Math.pow(coords.x - circle.x, 2);
    let yPowered = Math.pow(coords.y - circle.y, 2);
    let radiusPowered = circle.r * circle.r;

    return (xPowered + yPowered <= radiusPowered);
}

/**
 * Resetowanie elementu formularza (np. input File)
 * @param e jQuery object
 *
 * http://stackoverflow.com/questions/1043957/clearing-input-type-file-using-jquery
 */
Assets.prototype.resetFormElement = function(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

/**
 * Porównuje czy tablice są takie same
 *
 * @param a1
 * @param a2
 * @returns {boolean}
 */
Assets.prototype.arrayCompare = function (a1, a2) {
    if (a1.length !== a2.length) return false;
    let length = a2.length;
    for (let i = 0; i < length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
}

/**
 * Sprawdza czy element znajduje się w tablicy
 *
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
Assets.prototype.inArray = function (needle, haystack) {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(typeof haystack[i] === 'object') {
            if(this.arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] === needle) return true;
        }
    }
    return false;
}

// pod-przestrzeń nazw
GRAPH.assets = new Assets();