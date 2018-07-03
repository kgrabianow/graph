/**
 * Klasa do generowania, przechowywania, modyfikowania
 * Macierzy sąsiedztwa (przyległości)
 *
 * jako reprezentacji Grafu
 */
function NeighbourMatrixStructure() {
    this.clearAndInit(0);
}

/**
 * Czyszczenie starej listy i inicjowanie nowej
 *
 * @param integer verticesNumber
 * ilość wierzchołków do zbudowania
 */
NeighbourMatrixStructure.prototype.clearAndInit = function (verticesNumber) {
    // przechowuje tablicę dwuwymiarową z wierzchołkami jako wiersze i kolumny
    this.neighbourArray = [];

    // dodaj wierzchołki
    for (let i = 0; i < verticesNumber; i++) {
        // nowy wierzchołek (wiersz)
        this.neighbourArray.push([]);

        // wypełnij zerami (kolumny)
        for (let j = 0; j < verticesNumber; j++) {
            this.neighbourArray[i].push(0);
        }
    }
}

/**
 * Budowanie listy na podstawie GRAPH.graph
 */
NeighbourMatrixStructure.prototype.build = function () {
    // buduj listę na podstawie grafu
    this.buildFromGraph(GRAPH.graph);
}

/**
 * Buduj na podstawie grafu
 *
 * @param GRAPH.graph graphObject
 */
NeighbourMatrixStructure.prototype.buildFromGraph = function (graphObject) {
    // ilość wierzchołków
    let verticesNumber = graphObject.verticesArray.length;

    // inicjalizuj - wypełnij zerami
    this.clearAndInit(verticesNumber);

    // przejście po tablicy wszystkich krawędzi
    for (let i = 0; i < graphObject.edgesArray.length; i++) {
        // pobierz informacje o krawędzi
        let edgeInfo = this.convertEdgeToEdgeInfo(graphObject, i);

        if(graphObject.getDirectionMode()) {
            // dodaj krawędź skierowaną
            this.addDirectedEdge(edgeInfo);
        }
        else {
            // dodaj krawędź nieskierowaną
            this.addNotDirectedEdge(edgeInfo);
        }
    }
}

/**
 * Zwraca informacje na temat krawędzi
 *
 * @param GRAPH.graph graphObject
 * @param integer edgeNumber
 * @returns object 'edgeInfo'
 */
NeighbourMatrixStructure.prototype.convertEdgeToEdgeInfo = function (graphObject, edgeNumber) {
    return {
        startVertexNumber: graphObject.edgesArray[edgeNumber].startVertex.number,
        endVertexNumber: graphObject.edgesArray[edgeNumber].endVertex.number
    }
}

/**
 * Dodaj krawędź skierowaną do macierzy
 * (zwiększ licznik krawędzi)
 *
 * @param object edgeInfo
 */
NeighbourMatrixStructure.prototype.addDirectedEdge = function (edgeInfo) {
    // dodaj infomację o połączeniu (jedynie dla wierzchołka startowego)
    this.neighbourArray[edgeInfo.startVertexNumber][edgeInfo.endVertexNumber]++;
}

/**
 * Dodaj krawędź nieskierowaną do macierzy
 * (zwiększ licznik krawędzi)
 *
 * @param object edgeInfo
 */
NeighbourMatrixStructure.prototype.addNotDirectedEdge = function (edgeInfo) {
    // dodaj infomację o połączeniu (na obydwu końcach)
    this.neighbourArray[edgeInfo.startVertexNumber][edgeInfo.endVertexNumber]++;
    this.neighbourArray[edgeInfo.endVertexNumber][edgeInfo.startVertexNumber]++;
}

/**
 * Transponuj całą macierz
 */
NeighbourMatrixStructure.prototype.transpose = function () {
    // Przejście po tablicy wszystkich kolejnych wierzchołków
    // tylko po elementach oznaczonych niżej jako 'X'
    // zamieniam elementy [i][j] na [j][i] i odwrotnie
    //
    // ----- PRZED --------------- PO -----
    //
    //   j j j j j j j        j j j j j j j
    // i 0 X X X X X X      i 0
    // i   0 X X X X X      i X 0
    // i     0 X X X X      i X X 0
    // i       0 X X X      i X X X 0
    // i         0 X X      i X X X X 0
    // i           0 X      i X X X X X 0
    // i             0      i X X X X X X 0
    //
    for (let i = 0; i < this.neighbourArray.length; i++) {
        for (let j = i+1; j < this.neighbourArray.length; j++){
            let tempValue = this.neighbourArray[i][j];
            this.neighbourArray[i][j] = this.neighbourArray[j][i];
            this.neighbourArray[j][i] = tempValue;
        }
    }
}

/**
 * Scalaj składową
 */
NeighbourMatrixStructure.prototype.mergeComponent = function (vertexNumber) {
    let verticesCount = this.neighbourArray.length;

    // numeracja wierzchołków 0=>0, 1=>1, itd.
    let perm = [];

    for (let k = 0; k < verticesCount; k++) {
        // uzupełniamy numerację
        perm.push(k);

        // zamiana miejscami
        let temp = this.neighbourArray[0][k];
        this.neighbourArray[0][k] = this.neighbourArray[vertexNumber][k];
        this.neighbourArray[vertexNumber][k] = temp;

        temp = this.neighbourArray[k][0];
        this.neighbourArray[k][0] = this.neighbourArray[k][vertexNumber];
        this.neighbourArray[k][vertexNumber] = temp;
    }

    // bierzemy pierwszy
    perm[vertexNumber] = perm[0];
    let z = [];
    z.push(vertexNumber);

    this.showMatrixInConsole();
    // let x=0;
    let i;
    do {
        // zaczynamy od drugiego
        i = 1;

        // zwiększamy do przedostatniego jeśli ma 0
        while((i<verticesCount-1) && (this.neighbourArray[0][i] == 0)) {
            i++;
        }

        // jeśli aktualny (max ostatni) też jest 0 to kończ
        if(this.neighbourArray[0][i] === 0 || verticesCount < 2) {
            break;
        }
        else {
            // console.log(verticesCount);
            console.log('i: ' + i + ' v:' + this.neighbourArray[0][i]);
            // scalaj wierzchołek
            z.push(perm[i]);
            verticesCount = this.mergeVertex(verticesCount, i);
            //this.mergeVertex(verticesCount, i);
            // dajemy numerację na koniec (pomniejszoną)
            perm[i] = perm[verticesCount];
            this.showMatrixInConsole();
            // x++;
            // if(x>2) break;
        }

    } while (true);
}

/**
 * Scalaj wierzchołki
 */
NeighbourMatrixStructure.prototype.mergeVertex = function (verticesCount, vertexNumber) {
    // scalanie
    for (let k = 0; k < verticesCount; k++) {
        this.neighbourArray[0][k] = Math.max(this.neighbourArray[0][k], this.neighbourArray[vertexNumber][k]);
        this.neighbourArray[k][0] = Math.max(this.neighbourArray[k][0], this.neighbourArray[k][vertexNumber]);
        // przepiswanie ostatniej kolumny/wiersza na miejsce scalanego wierzchołka
        this.neighbourArray[vertexNumber][k] = this.neighbourArray[verticesCount-1][k];
        this.neighbourArray[k][vertexNumber] = this.neighbourArray[k][verticesCount-1];
    }

    // usuwanie ostatniej kolumny
    for (let i = 0; i < verticesCount; i++) {
        this.neighbourArray[i].pop();
    }

    // usuwanie ostatniego wiersza
    this.neighbourArray.pop();

    // // usuwanie ostatniej kolumny
    // for (let i = 0; i < verticesCount; i++) {
    //     this.neighbourArray[i].splice(this.neighbourArray.length-1,1);
    // }

    // // usuwanie ostatniego wiersza
    // this.neighbourArray.splice(this.neighbourArray.length-1,1);

    return verticesCount-1;
}

// Pokaż macierz sąsiedztwa
NeighbourMatrixStructure.prototype.showMatrixInConsole = function () {
    console.log("Macierz sąsiedztwa: ");

    for( let i=0; i<this.neighbourArray.length; i++ ){
        console.log( this.neighbourArray[i].toString() );
    }

    console.log("--------------------");
}


// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.structures' to ją utwórz)
GRAPH.structures = GRAPH.structures || {};
GRAPH.structures.neighbourMatrix = new NeighbourMatrixStructure();