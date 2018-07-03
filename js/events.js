/**
 * Zdarzenia ogólne interfejsu
 */
$(function() {
    /**
     * kliknięcie w zakładki (przełączanie)
     */
    GRAPH.gui.tabs.tabsButtons.click(function(){
        GRAPH.gui.tabs.switchTo(this);
    });

    /**
     * przełączanie TRYBU EDYCJI
     */
    GRAPH.gui.edit.switchButton.on('change', function() {
        if($(this).parent().hasClass('clickedByHuman')) {
            GRAPH.graph.switchEditMode();

            switchHelpInitMessage();
        }
    });

    /**
     * przełączanie RODZAJU GRAFU
     */
    GRAPH.gui.direction.switchButton.change(function() {
        if($(this).parent().hasClass('clickedByHuman')) {
            GRAPH.graph.switchDirectionMode();

            // powiadom listener o zmianach w Grafie
            GRAPH.listener.noticeChange();
        }
    });

    /**
     * przełączanie Siatki
     */
    $('#triggerWeb').change(function() {
        if($(this).parent().hasClass('clickedByHuman')) {
            GRAPH.web.switchVisibility();
        }
    });

    /**
     * Transponowanie Grafu
     */
    $('#transposeGraph').click(function() {
        GRAPH.algorithms.transposeGraph.run();
    });

    /**
     * Sortowanie Topologiczne
     */
    $('#topologicalSort').click(function() {
        GRAPH.gui.topologicalSort.prepareAndInit();
    });

    /**
     * Scalanie wierzchołka
     */
    $('#test').click(function() {
        // scalanie
        //GRAPH.structures.neighbourMatrix.showMatrixInConsole();
        GRAPH.structures.neighbourMatrix.mergeComponent(1);
        //GRAPH.structures.neighbourMatrix.showMatrixInConsole();

        //console.log(GRAPH.graph);
        // modyfikowanie grafu ze scalonej macierzy
        GRAPH.graph = GRAPH.modifiers.neighbourMatrix.modify(GRAPH.graph, GRAPH.structures.neighbourMatrix);
        // powiadom listener o zmianach w Grafie
        GRAPH.listener.noticeChange();
    });

    /**
     * Losowanie Grafu
     */
    GRAPH.gui.random.randomButton.click(function() {
        let verticesNumber = GRAPH.gui.random.getVerticesInputNumber();
        let edgesNumber = GRAPH.gui.random.getEdgesInputNumber();

        GRAPH.builders.random.build(verticesNumber, edgesNumber, GRAPH.graph.getDirectionMode());

        // powiadom listener o zmianach w Grafie
        GRAPH.listener.noticeChange();
    });

    /**
     * Losowanie Grafu - zmiana limitów liczby krawędzi przy zmianie ilości wierzchołków
     */
    $('#randomVertices').change(function() {
        GRAPH.gui.random.adjustToLimits();
    });

    /**
     * Szerokość Siatki - zmiana szerokości przestrzeni do rysowania
     */
    $('#webWidth').change(function() {
        let webWidthInput = $(this);
        let newWebWidth = parseInt(webWidthInput.val());

        GRAPH.web.setWidth(newWebWidth);
    });

    /**
     * Wysokość Siatki - zmiana szerokości przestrzeni do rysowania
     */
    $('#webHeight').change(function() {
        let webHeightInput = $(this);
        let newWebHeight = parseInt(webHeightInput.val());

        GRAPH.web.setHeight(newWebHeight);
    });

    /**
     * Interwał Siatki - zmiana odstepow na siatce
     */
    $('#webInterval').change(function() {
        let webIntervalInput = $(this);
        let newWebInterval = parseInt(webIntervalInput.val());

        GRAPH.web.setInterval(newWebInterval);
    });

    /**
     * Wyłączanie / Włączanie - wyświetlania wyszukiwania BFS/DFS
     */
    GRAPH.gui.algorithms.search.modeSwitch.change(function() {
        if($(this).parent().hasClass('clickedByHuman')) {
            GRAPH.gui.algorithms.search.triggerMode();
        }
    });

    /**
     * Przełączanie pomiędzy wyświetlanymi typami algorytmu Wyszukiwania
     * DFS / BFS
     */
    GRAPH.gui.algorithms.search.algorithmSwitch.change(function() {
        if($(this).parent().hasClass('clickedByHuman')) {
            GRAPH.gui.algorithms.search.triggerAlgorithm();
        }
    });

    /**
     * Zapis Grafu
     */
    $('#saveGraph').click(function() {
        GRAPH.files.download.fromObject(GRAPH.graph);
    });

    /**
     * Zdjecie Grafu
     */
    $('#saveImageGraph').click(function() {
        GRAPH.gui.loader.show();
        GRAPH.files.download.asPicture(GRAPH.canvas, GRAPH.web, GRAPH.graph);
        GRAPH.gui.loader.hide();
    });

    /**
     * Wczytanie Grafu
     */
    $('#loadGraph').change(function(event) {
        GRAPH.files.upload.uploadFromEventFile(event);
    });

    /**
     * Historia przejście wstecz
     */
    GRAPH.gui.history.previousButton.click(function() {
        GRAPH.history.goPrevious();

        // wyłącz dodanie nowego kroku Historii
        GRAPH.listener.preventHistoryAdding();
        // powiadom listener o zmianach w Grafie
        GRAPH.listener.noticeChange();
    });

    /**
     * Historia przejście dalej
     */
    GRAPH.gui.history.nextButton.click(function() {
        GRAPH.history.goNext();

        // wyłącz dodanie nowego kroku Historii
        GRAPH.listener.preventHistoryAdding();
        // powiadom listener o zmianach w Grafie
        GRAPH.listener.noticeChange();
    });

    /**
     * wciśnięcie przycisku zamknięcia alerta
     */
    $("#closeInfo").click(function() {
        $(this).parent().parent().parent().css("display", "none");
    });

    /**
     * Zwijanie zakładek
     */
    $("#collapse-all").click(function() {
        $('.panels-collapsed .panel-collapse').collapse('hide');
    });

    /**
     * Rozwijanie zakładek
     */
    $("#expand-all").click(function() {
        $('.panels-collapsed .panel-collapse').collapse('show');
    });

    /**
     * Przełącznik wiadomości startowej Pomocy Interaktywnej
     */
    function switchHelpInitMessage() {
        let message = GRAPH.static.msg.normal.START;

        if(GRAPH.graph.editType) {
            message = GRAPH.static.msg.edit.START;
        }

        GRAPH.gui.flash.successMsg(message);
    }

    switchHelpInitMessage();
});