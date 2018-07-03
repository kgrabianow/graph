/**
 * Klasa obsługi GUI dla pola informacyjnego - alerta "Flash"-owego
 */
function GuiFlash() {
    // kontener
    this.flashContainer = $("#flash");

    // elementy tekstowe
    this.flashTitle = this.flashContainer.find('.flashTitle');
    this.flashText = this.flashContainer.find('.flashText');

    // przyciski
    this.closeButton = this.flashContainer.find('.close');

    // zmienne pomocnicze - nazwy klas css dla styli
    this.styles = {
        'info': 'alert-info',
        'danger': 'alert-danger',
        'warning': 'alert-warning',
        'success': 'alert-success'
    };
}

/**
 * Pokaż alert
 */
GuiFlash.prototype.show = function () {
    this.flashContainer.show();
}

/**
 * Ukryj alert
 */
GuiFlash.prototype.hide = function () {
    this.flashContainer.hide();
}

/**
 *  Zmiena stylu i budowa tekstu z tablicy
 *
 *  @param array
 */
GuiFlash.prototype.successMsg = function (msgArray) {
    this.makeSuccessStyle();
    this.setTextFromArray(msgArray);
}
GuiFlash.prototype.dangerMsg = function (msgArray) {
    this.makeDangerStyle();
    this.setTextFromArray(msgArray);
}

/**
 * Ustaw tekst
 */
GuiFlash.prototype.setText = function (text) {
    this.flashText.html(text);
}

/**
 * Budowa tekstu z tablicy
 *
 * @param array
 */
GuiFlash.prototype.setTextFromArray = function (msgArray) {
    let text = '';
    // Długość kolumny dla pojedynczej wiadomości (1-12), domyślnie 4
    let colLength = 6;

    // jeśli tylko jedna wiadomość - długość kolumny 100%
    if(msgArray.length === 1) {
        colLength = 12;
    }

    for(let i = 0; i<msgArray.length; i++) {
        text = text + '<div class="col-md-' + colLength + '">' + msgArray[i] + '</div>';
    }

    text = text + '<div class="clearfix"></div>';

    this.setText(text);
}

/**
 * Ustaw styl kolorystyczny - informacyjny
 */
GuiFlash.prototype.makeInfoStyle = function () {
    this.clearStyle();
    this.flashContainer.addClass(this.styles.info);
}

/**
 * Ustaw styl kolorystyczny - błąd
 */
GuiFlash.prototype.makeDangerStyle = function () {
    this.clearStyle();
    this.flashContainer.addClass(this.styles.danger);
}

/**
 * Ustaw styl kolorystyczny - ostrzeżenie
 */
GuiFlash.prototype.makeWarningStyle = function () {
    this.clearStyle();
    this.flashContainer.addClass(this.styles.warning);
}

/**
 * Ustaw styl kolorystyczny - sukces operacji
 */
GuiFlash.prototype.makeSuccessStyle = function () {
    this.clearStyle();
    this.flashContainer.addClass(this.styles.success);
}

/**
 * Usuwanie wszystkich styli z kontenera
 */
GuiFlash.prototype.clearStyle = function () {
    for(var key in this.styles) {
        var style = this.styles[key];

        this.flashContainer.removeClass(style);
    }
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.flash = new GuiFlash();