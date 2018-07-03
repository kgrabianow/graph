/**
 * Klasa obsługi GUI
 * dla rozproszenia Grafu
 *
 */
function DispelGraph() {
	// Rozpoczecie rozproszenia

	// Poprawnie działa dla Grafów nieskierowanych,
	// Można rozpraszać skierowane, ale najpierw
	// Trzeba zamienic Graf na nieskierowany
	// i po całej operacji wrócić do skierowanego
}

// Rozpoczenij rozporszenie
DispelGraph.prototype.startDispel = function (spaceBetweenVertex) {

	// Zmiana skierowania jeśli skierowany
	// if(  )
		// GRAPH.graph.switchDirectionMode();

	// Przygotuj Rozproszenie
	this.prepare(spaceBetweenVertex);

	// Określ poziomy zagłbienia wierzchołków
	this.setVerticesLevels();

	// Znajdź minimalne parametry Siatki - Obszaru rysowania
	this.findWebParameters(spaceBetweenVertex);

    // Rozproszenie
    this.dispel(spaceBetweenVertex);

    // Aktualizacja krawedzi
    this.actualizeEdges();

    // Dostosowanie Siatki - Obszaru rysowania
    this.modifyWeb(spaceBetweenVertex);

    // powiadom listener o zmianach w Grafie
    GRAPH.listener.noticeChange();

    console.log(queue);
    console.log(tabCheked);
    console.log(tabLevel);
    console.log(tabLevelItemCount);
}

// Przygotowanie Rozproszenia
DispelGraph.prototype.prepare = function (spaceBetweenVertex) {

    // Pobranie kolejności przejścia wierzchołków z BFS
    queue = GRAPH.algorithms.bfs.visited;

    // Ustawienie wielkości odstepów miedzy wierzchołkami
    spaceBetweenVertex = spaceBetweenVertex;

    // Określenie poziomu grafu
    level = 1;

    // Tablica do której dodajemy wierzchołki, które sprawdzono
    tabCheked = [];
    // Tablica przechowująca poziomy zagłebienia 
    tabLevel = [];
    // Tablica przechowująca ilość wierzchołków przerobionych dla danego poziomu zagłebienia
    tabLevelItemCount = [];

    // Zmienna określająca czy rozpatrywany jest kolejny poziom wierzchołków
    nextLevel = false;

    // Nadpisanie 0 poziomu dla początkowego wierzchołka - przyjeto że 0
    tabCheked[0] = 0;
    // "Pierwszy" poziom zagłebienia
    tabLevel[0] = 0;
    // "Pierwszy" poziom zagłebienia to wierzchołek,
    // od którego zaczeto BFS
    // przyjeto 0
    tabLevelItemCount[0] = 1;
    // Wartość startowa nastepnego poziomu zaglebienia
    tabLevelItemCount[1] = 0;

}

// Określenie poziomów zagłebienia wierzchołków
DispelGraph.prototype.setVerticesLevels = function () {

    // Przejście po liście wierzchołków sąsiednich
    for( var i=0; i<GRAPH.structures.verticesList.verticesArray.length; i++ ){
        // Przejście po wierzchołkach incydentnych danego wierzchołka
        for( var j=0; j<GRAPH.structures.verticesList.verticesArray[i].length; j++){
            // Jeżeli jeszcze wierzchołek incydentny nie odwiedzony to go dodaj
            // i określ poziom zagłebienia
            if( !tabCheked.includes( GRAPH.structures.verticesList.verticesArray[i][j] ) ){
                // informacja o kolejnym poziomie zaglebienia
                nextLevel = true;
                tabCheked.push( GRAPH.structures.verticesList.verticesArray[i][j] );
                tabLevel.push( level );
                tabLevelItemCount[level] += 1;
            }
        }
        // Zwieksz poziom zaglebienia, gdy wpisano nowe wierzchołki
        if( nextLevel == true ){
            level++;
            tabLevelItemCount[level] = tabLevelItemCount[level-1];
            nextLevel = false;
        }
    }

}

// Znalezienie minimalnej szerokości i wysokości siatki
DispelGraph.prototype.findWebParameters = function (spaceBetweenVertex) {
    // Określenie minimalnej szerokości obszaru rysowania
    minWebWidthBFS = spaceBetweenVertex + spaceBetweenVertex*queue.length;

    // Określenie minimalnej wysokości obszaru rysowania
    minWebHeightBFS = spaceBetweenVertex + spaceBetweenVertex * Math.max.apply(null, tabLevel);
}

// Rozproszenie
DispelGraph.prototype.dispel = function (spaceBetweenVertex) {

    // Przejście po wszystkich wierzchołkach w kolejności BFS
    for( var i=0; i<queue.length; i++ ){
        // Odstepy miedzy wierzchołkami na danym poziomie
        spaceBetweenVertexX = minWebWidthBFS/( tabLevelItemCount[ tabLevel[i] ] - tabLevelItemCount[ tabLevel[i]-1 ] );
        // "Rozstrzelenie" wierzchołków wzdłuż proste dla danego poziomu
        GRAPH.graph.verticesArray[ queue[i] ].x = spaceBetweenVertex*1.5 + spaceBetweenVertexX + spaceBetweenVertexX*(i) -spaceBetweenVertexX*1.5 - spaceBetweenVertexX*tabLevelItemCount[ tabLevel[i]-1 ];
        // Dla najgestszego poziomu
        if( GRAPH.graph.verticesArray[ queue[i] ].x < 0 ){ GRAPH.graph.verticesArray[ queue[i] ].x = spaceBetweenVertexX/2; }
        // Dla wierzchołków izolowanych
        if( tabLevel[i] == undefined ){ tabLevel[i] = 0; }
        // "Przesuń" w dół w zależności od poziomu zaglebienia
        GRAPH.graph.verticesArray[ queue[i] ].y = spaceBetweenVertex + spaceBetweenVertex * tabLevel[i];
        GRAPH.graph.verticesArray[ queue[i] ].actualize();       
    }

    // Nadpisanie pierwszego wierzchołka
    GRAPH.graph.verticesArray[ 0 ].x = minWebWidthBFS/2;
    GRAPH.graph.verticesArray[ 0 ].y = spaceBetweenVertex;
    GRAPH.graph.verticesArray[ 0 ].actualize();

}

// Aktualizacja krawedzi
DispelGraph.prototype.actualizeEdges = function () {
    // Przejście po wszystkich krawędziach
    for (var i = 0; i < GRAPH.graph.edgesArray.length; i++) {
        GRAPH.graph.edgesArray[i].actualize();
    }

    // powiadom listener o zmianach w Grafie
    // GRAPH.listener.noticeChange();
}

// Dopasowanie wielkości siatki - obszaru rysowania
DispelGraph.prototype.modifyWeb = function (spaceBetweenVertex) {
    // Zmiana szerokości obszaru rysowania
    if( GRAPH.web.width < minWebWidthBFS + spaceBetweenVertex ){
        GRAPH.web.setWidth( minWebWidthBFS + spaceBetweenVertex );
    }
    // Zmiana wysokości obszaru rysowania
    if( GRAPH.web.height < minWebHeightBFS + spaceBetweenVertex ){
        GRAPH.web.setHeight( minWebHeightBFS + spaceBetweenVertex );
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.algorithms = GRAPH.gui.algorithms || {};
GRAPH.gui.algorithms.dispelGraph = new DispelGraph();