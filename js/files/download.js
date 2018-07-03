/**
 * Klasa do downloadu plików
 */
function Download() {
    // typ MIME
    this.mimeTypes = {
        text: 'text/plain',
        png: 'image/png',
        imageStream: 'image/octet-stream'
    };

    // przedrostek nazwy pliku
    this.fileNamePrefix = 'Graph_';

    // rozszerzenie pliku
    this.fileExtensions = {
        text: '.txt',
        png: '.png'
    };
}

/**
 * Graf do zdjecia
 *
 * @param GRAPH.canvas canvasObject
 * @param GRAPH.web webObject
 * @param GRAPH.graph graphObject
 */
Download.prototype.asPicture = function (canvasObject, webObject, graphObject) {
    // Przystosowanie obiektów canvas do zapisu
    this.prepareCanvasObject(canvasObject, webObject, graphObject);

    // Zapis do pliku
    this.imageSave(canvasObject);

    // Przywróć obiekty canvas do pierwotnej formy
    this.restoreCanvasObject(canvasObject);
}

/**
 * Przystosowanie obiektów canvas do zapisu
 *
 * @param GRAPH.canvas canvasObject
 * @param GRAPH.web webObject
 * @param GRAPH.graph graphObject
 */
Download.prototype.prepareCanvasObject = function (canvasObject, webObject, graphObject) {
    this.canvasOriginalWidth = canvasObject.containter.width;
    this.canvasOriginalHeight = canvasObject.containter.height;

    // Ustawienie wielkosci canvas na cały obszar roboczy
    canvasObject.containter.width = webObject.width;
    canvasObject.containter.height = webObject.height;

    // Wyrysowanie grafu po zmianie rozmiaru
    graphObject.draw(canvasObject.context);
}

/**
 * Zapis gotowego obiektu Canvas do pliku
 *
 * @param GRAPH.canvas canvasObject
 */
Download.prototype.imageSave = function (canvasObject) {
    // generuj parametry pliku
    this.generateFileAttributes('png');

    /**
     * Konwersja zdjęcia do BASE64
     * -------------------------------
     * Uwaga - przeglądarki mają co do tego organiczenia, więc przy 10000 x 10000 rozmiarze Canvas
     * zdjęcie sie nie pobierze - bo jego wielkość przekroczy limity
     * http://stackoverflow.com/questions/16156402/canvas-todataurl-for-large-canvas
     */
    let image = canvasObject.containter.toDataURL(this.mimeTypes.png);
    image = image.replace(this.mimeTypes.png, this.mimeTypes.imageStream);

    // Zapis zdjęcia do pliku
    let link = document.createElement('a');
    link.setAttribute('download', this.fileName);
    link.setAttribute('href', image);
    link.click();
}

/**
 * Przywróć obiekty canvas do pierwotnej formy
 *
 * @param GRAPH.canvas canvasObject
 */
Download.prototype.restoreCanvasObject = function (canvasObject) {
    canvasObject.containter.width = this.canvasOriginalWidth;
    canvasObject.containter.height = this.canvasOriginalHeight;
}

/**
 * Generowanie atrybutów pliku na podstawie typu
 *
 * @param string fileType
 * Rodzaj pliku (text | png)
 */
Download.prototype.generateFileAttributes = function (fileType) {
    // Aktualny czas
    this.actualDate = dateFormat(new Date(), 'Y_m_d_H_i_s');

    // Generowanie nazwy pliku jako "przedrostek" + "Aktualny czas" + "rozszerzenie"
    this.fileName = this.fileNamePrefix + this.actualDate + this.fileExtensions[fileType];
}

/**
 * Obiekt do pliku
 *
 * @param object obj
 */
Download.prototype.fromObject = function (obj) {
    let textData = JSON.stringify(obj);
    this.generateFileAttributes('text');
    this.textSave(textData);
}

/**
 * Zapisywanie tekstu do pliku
 * http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
 *
 * @param string textData
 * @returns boolean
 */
Download.prototype.textSave = function (textData) {
    var D = document,
        a = D.createElement("a"),
        d = textData,
        n = this.fileName,
        t = this.mimeTypes.text || "text/plain";

    // build download link:
    a.href = "data:" + this.mimeTypes.text + "charset=utf-8," + escape(textData);

    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(textData);

        return navigator.msSaveBlob(bb, this.fileName);
    }

    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);

        setTimeout(function () {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }

    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (this.mimeTypes.text ? this.mimeTypes.text : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(textData);
    setTimeout(function () {
        D.body.removeChild(f);
    }, 333);
    return true;
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.files' to ją utwórz)
GRAPH.files = GRAPH.files || {};
GRAPH.files.download = new Download();

