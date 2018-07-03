/**
 * Klasa obsługi GUI
 * dla statystyk dot. Grafu
 */
function GuiStats() {
    // licznik wierzchołków
    this.verticesAmountLabel = document.getElementById("counterVertex");
    // licznik krawędzi
    this.edgesAmountLabel = document.getElementById("counterEdge");
    // ilość drzew
    this.treesAmountLabel = document.getElementById("counterTrees");
    // graf słabo spójny / tak-nie
    this.lowCohesionLabel = $("#lowCohesion > span");
    // graf silnie spójny

    // BFS
    let containerBFS = $("#visitedListBFS");
    this.statsBFS = {
        visited : containerBFS.find('.visitedCase'),
        trees : containerBFS.find('.treesCase')
    }

    // DFS
    let containerDFS = $("#visitedListDFS");
    this.statsDFS = {
        visited : containerDFS.find('.visitedCase'),
        processed : containerDFS.find('.processedCase'),
        trees : containerDFS.find('.treesCase')
    }
}

/**
 * Aktualizuje kontrolki na podstawie GRAPH.graph
 */
GuiStats.prototype.actualize = function () {
    this.actualizeFromGraph(GRAPH.graph);
    this.actualizeFromBFS(GRAPH.algorithms.bfs);
    this.actualizeFromDFS(GRAPH.algorithms.dfs);

    // ustaw słąbą spójność
    this.setLowCohesion(GRAPH.algorithms.bfs, GRAPH.graph);
}

/**
 * Aktualizuje kontrolki na podstawie obiektu grafu (może być przed/po wczytaniu z pliku, itd.)
 */
GuiStats.prototype.actualizeFromGraph = function (graphObject) {
    this.setVerticesAmount(graphObject.verticesArray.length);
    this.setEdgesAmount(graphObject.edgesArray.length);
}

/**
 * Aktualizuje kontrolki na podstawie algorytmu BFS - wszerz
 */
GuiStats.prototype.actualizeFromBFS = function (BFS) {
    this.setTreesAmount(BFS.trees.getAmount());
    this.setList(BFS.visited, this.statsBFS.visited);
    this.statsBFS.trees.html(this.generateTrees(BFS.trees));
}

/**
 * Aktualizuje kontrolki na podstawie algorytmu DFS - wgłąb
 */
GuiStats.prototype.actualizeFromDFS = function (DFS) {
    this.setList(DFS.visited, this.statsDFS.visited);
    this.setList(DFS.processed, this.statsDFS.processed);
    this.statsDFS.trees.html(this.generateTrees(DFS.trees));
}

/**
 * Ustawia ilość wierzchołków
 */
GuiStats.prototype.setVerticesAmount = function (number) {
    this.verticesAmountLabel.innerHTML = number;
}

/**
 * Ustawia ilość krawędzi
 */
GuiStats.prototype.setEdgesAmount = function (number) {
    this.edgesAmountLabel.innerHTML = number;
}

/**
 * Ustawia ilość drzew
 */
GuiStats.prototype.setTreesAmount = function (number) {
    this.treesAmountLabel.innerHTML = number;
}

/**
 * Ustawia listę wierzchołków
 */
GuiStats.prototype.setList = function (visitedArray, statsObject) {
    let html = '';

    for(let i=0; i<visitedArray.length; i++) {
        html = html + '<li><span class="label label-primary sidebar-badge">' + visitedArray[i] + '</span></li>';
    }

    statsObject.html(html);
}

/**
 * Zwraca listę drzew w HTML
 *
 * @param edgeTree edgeTrees
 */
GuiStats.prototype.generateTrees = function (edgeTrees) {
    let html = '';

    for(let i=0; i<edgeTrees.getAmount(); i++) {
        if(edgeTrees.trees[i].length >= 1) {
            html = html + '<li><ul class="list-inline">';
            html = html + this.generateTree(edgeTrees.trees[i]);
            html = html + '</ul></li>';
        }
    }

    return html;
}

/**
 * Zwraca listę krawędzi drzewa w HTML
 *
 * @param Array<edge> edgeTree
 */
GuiStats.prototype.generateTree = function (edgeTree) {
    let html = '';

    for(let i=0; i<edgeTree.length; i++) {
        html = html + '<li><span class="label label-success sidebar-badge">';
        html = html + edgeTree[i].start + '-' + edgeTree[i].end;
        html = html + '</span></li>';
    }

    return html;
}

/**
 * Ustawia informację o 'słabej spójności'
 * w zależności od ilości drzew
 *
 * @param GRAPH.algorithms.search.bfs
 * Ilość drzew
 * @param GRAPH.graph
 */
GuiStats.prototype.setLowCohesion = function (searchAlgorithm, graphObject) {
    let direction = graphObject.getDirectionMode();

    // jeśli graf skierowany to przekształć go na nieskierowany i sprawdź ilość drzew
    if(direction) {
        graphObject.switchDirectionMode();
        // buduj na nowo reprezentacje grafu
        GRAPH.structuresManager.build();
        // uruchom algorytm wyszukiwania
        searchAlgorithm.run();
    }

    let treesAmount = searchAlgorithm.trees.getAmount();

    if(treesAmount === 0) {
        this.lowCohesionLabel.removeClass("label-success");
        this.lowCohesionLabel.removeClass("label-danger");
        this.lowCohesionLabel.addClass("label-default");
        this.lowCohesionLabel.html("&nbsp;");
    }
    if(treesAmount === 1) {
        this.lowCohesionLabel.removeClass("label-default");
        this.lowCohesionLabel.removeClass("label-danger");
        this.lowCohesionLabel.addClass("label-success");
        this.lowCohesionLabel.html("tak");
    }
    else {
        this.lowCohesionLabel.removeClass("label-default");
        this.lowCohesionLabel.removeClass("label-success");
        this.lowCohesionLabel.addClass("label-danger");
        this.lowCohesionLabel.html("nie");
    }

    // przywróc stan grafu jeśli był skierowany na początku
    if(direction) {
        graphObject.switchDirectionMode();
        // buduj na nowo reprezentacje grafu
        GRAPH.structuresManager.build();
        // uruchom algorytm wyszukiwania
        searchAlgorithm.run();
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.stats = new GuiStats();