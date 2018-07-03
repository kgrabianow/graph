/**
 * Klasa do uploadu plików
 */
function Upload() {
    // moduł wczytujący pliki
    this.fileReader = new FileReader();
}

/**
 * Wczytywanie z pliku znajdującego się w Evencie
 *
 * @param Event event
 */
Upload.prototype.uploadFromEventFile = function (event) {
    // załadowanie pliku z Eventu
    var file = event.target.files[0];

    this.uploadFromFile(file);
}

/**
 * Wczytywanie z pliku
 *
 * @param File file
 */
Upload.prototype.uploadFromFile = function (file) {
    // pokaż Loader z GUI
    GRAPH.gui.loader.show();

    // aktualizacja zdarzenia 'onload'
    this.fileReader.onload = function () {
        // deserializacja
        let loadedObject = JSON.parse(this.result);

        // buduj nowy graf + propaguj także zmiany w GUI
        GRAPH.builders.object.build(loadedObject, true, true);

        // ukrycie Loadera z GUI
        GRAPH.gui.loader.hide();

        // wyczyść formularz ze starych plików
        GRAPH.gui.fileUpload.clearFile();

        // powiadom listener o zmianach w Grafie
        GRAPH.listener.noticeChange();
    };

    // wywołaj akcję wczytywania
    this.fileReader.readAsText(file);
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.files' to ją utwórz)
GRAPH.files = GRAPH.files || {};
GRAPH.files.upload = new Upload();

