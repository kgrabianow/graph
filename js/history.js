/**
 * Klasa przechowująca obiekty grafu w postaci kolejnych kroków i pozwalająca na przywracanie danego stanu
 */
function History() {
    // ogranicznik maksymalnej liczby obiektów Grafu przechowywanej w sesji przeglądarki
    this.maxSteps = 25;

    // inicjowanie/czyszczenie kolejki
    this.clear();
}

/**
 *  Akcja 'wstecz'
 *
 *  niewykonana jest gdy lista zapisanych kroków jest pusta
 */
History.prototype.goPrevious = function () {
    if(this.actualStep > 1 && this.savedSteps > 1) {
        this.actualStep--;
        this.replaceGraphFromQueue();
    }
}

/**
 *  Akcja 'dalej'
 *
 *  niewykonana jest gdy this.actualStep == this.savedSteps, czyli nie można przejść już dalej
 */
History.prototype.goNext = function () {
    if(this.savedSteps > this.actualStep) {
        this.actualStep++;
        this.replaceGraphFromQueue();
    }
}

/**
 *  przywracanie(podmiana) grafu z ustawionego punktu kolejki
 */
History.prototype.replaceGraphFromQueue = function () {
    // podmiana grafu
    let graphToRestore = this.getQueueStep(this.actualStep-1);

    // propaguj zmiany także w gui
    GRAPH.builders.object.build(graphToRestore, true, true);

    // aktualizuj GUI po zmianie
    this.actualizeGui();
}

/**
 *  dodanie kolejnego kroku (np. wywołane przez dodanie wierzchołka do grafu)
 */
History.prototype.addStep = function () {
    var graphQueue = this.getQueue();

    // modifikuj kolejkę ze względu na limity (jeśli wystąpią)
    graphQueue = this.modifyQueueByLimits(graphQueue);

    // dodaj nowy krok na koniec kolejki
    graphQueue = this.addQueueStep(graphQueue);

    // zapisz kolejkę
    this.setQueue(graphQueue);

    // aktualizuj GUI
    this.actualizeGui();
}

/**
 *  modifikuj kolejkę ze względu na limity (jeśli wystąpią)
 *
 *  @param array graphQueue
 *  @returns array
 */
History.prototype.modifyQueueByLimits = function (graphQueue) {
    graphQueue = this.deleteLastStepOfFullQueue(graphQueue);
    graphQueue = this.deleteStepsAfterActualStep(graphQueue);

    return graphQueue;
}

/**
 *  usuń najstarszy krok, aby nie przepełnić kolejki, jeśli jest pełna
 *
 *  @param array graphQueue
 *  @returns array
 */
History.prototype.deleteLastStepOfFullQueue = function (graphQueue) {
    if(this.isQueueFull()) {
        graphQueue.shift();
        this.actualStep--;
        this.savedSteps--;
    }

    return graphQueue;
}

/**
 *  usuń wszystkie kroki za aktualnym krokiem w Historii
 *  - używane w przypadku gdy chcemy dodać coś nowego, a zrobiliśmy kilka razy 'wstecz' w historii
 *
 *  @param array graphQueue
 *  @returns array
 */
History.prototype.deleteStepsAfterActualStep = function (graphQueue) {
    if(this.isNotActualStepLast()) {
        // UWAGA - długość kolejki musi być zapisana w zmiennej
        // ponieważ po zmniejszaniu kolejki - przy kazdym kroku pętla może pobrać inną długość
        var queueLength = graphQueue.length;

        for(var i = this.actualStep ; i<queueLength ; i++) {
            graphQueue.pop();
            this.savedSteps--;
        }
    }

    return graphQueue;
}

/**
 *  sprawdza czy kolejka jest pełna (osiągnęła limit elementów)
 *
 *  @returns boolean
 */
History.prototype.isQueueFull = function () {
    return ((this.savedSteps === this.maxSteps) && (this.savedSteps === this.actualStep));
}

/**
 *  sprawdza czy aktualnie ustawiony krok w historii nie jest krokiem końcowym (ostatnim w kolejce)
 *
 *  @returns boolean
 */
History.prototype.isNotActualStepLast = function () {
    return (this.savedSteps > this.actualStep);
}

/**
 *  wczytywanie elementu/kroku kolejki z sessionStorage
 *
 *  @param integer index
 *  numer w kolejce
 *
 *  @returns GRAPH.graph
 */
History.prototype.getQueueStep = function (index) {
    var graphQueue = this.getQueue();
    return graphQueue[index];
}

/**
 *  dodane aktualnego grafu/kroku do kolejki (na koniec)
 *
 *  @param array graphQueue
 *  @returns array
 */
History.prototype.addQueueStep = function (graphQueue) {
    graphQueue[this.savedSteps] = GRAPH.graph;
    this.savedSteps++;
    this.actualStep++;

    return graphQueue;
}

/**
 *  wczytywanie kolejki z sessionStorage
 *
 *  @returns array
 */
History.prototype.getQueue = function () {
    var jsonData = sessionStorage.getItem('historyQueue');
    return JSON.parse(jsonData);
}

/**
 *  zapisywanie kolejki do sessionStorage
 *
 *  @param array graphQueue
 */
History.prototype.setQueue = function (graphQueue) {
    var jsonData = JSON.stringify(graphQueue);
    sessionStorage.setItem('historyQueue', jsonData);
}

/**
 *  czyszczenie/inicjowanie kolejki (historii)
 */
History.prototype.clear = function () {
    // ilość zapisanych kroków
    this.savedSteps = 1;

    // aktualny krok - przydatne jak robimy wstecz/dalej
    this.actualStep = 1;

    // czyść kolejkę i wrzuć aktualny graf jako 1-wszy krok
    this.setQueue([GRAPH.graph]);

    // aktualizuj GUI
    this.actualizeGui();
}

/**
 *  aktualizowanie GUI dla historii
 */
History.prototype.actualizeGui = function () {
    this.actualizeGuiButtons();
    this.actualizeGuiLabels();
}

/**
 *  aktualizowanie GUI dla historii - zmiana przycisku 'wstecz' / 'dalej'
 */
History.prototype.actualizeGuiButtons = function () {
    // zmiana przycisku 'wstecz'
    if(this.actualStep <= 1) {
        GRAPH.gui.history.disablePreviousButton();
    }
    else {
        GRAPH.gui.history.enablePreviousButton();
    }

    // zmiana przycisku 'dalej'
    if(this.actualStep >= this.savedSteps) {
        GRAPH.gui.history.disableNextButton();
    }
    else {
        GRAPH.gui.history.enableNextButton();
    }
}

/**
 *  aktualizowanie GUI dla historii - zmiana informacji (Labele)
 */
History.prototype.actualizeGuiLabels = function () {
    GRAPH.gui.history.changeActualStepLabel(this.actualStep);
    GRAPH.gui.history.changeSavedStepsLabel(this.savedSteps);
}

GRAPH.history = new History();
