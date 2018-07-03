/**
 * Klasa obsługi GUI dla zakładek
 */
function GuiTabs() {
    // kontener
    this.tabsContainer = $(".stats");

    // przyciski zakładek
    this.tabsButtons = this.tabsContainer.find('ul.nav li a');

    // kontenery z treścią (przełączaną zakładkami)
    this.tableContentContainers = this.tabsContainer.find(".panel-body table");
    this.spanContentContainers = this.tabsContainer.find(".panel-body span");

    // klasy używane w zakładkach
    this.tabsClassName = 'active';

    // klasy używane w treści
    this.contentClassName = 'active-data';
}

/**
 * Przełącza zakładki i ich treść do podanej w argumencie
 *
 * @param object tab
 * kliknięty przycisk 'zakładki'
 */
GuiTabs.prototype.switchTo = function (tab) {
    let tabObject = $(tab);
    let destination = tabObject.data("destination");

    // zamiana klas aktywności
    this.switchToTab(tabObject);

    // włączenie odpowiedniej struktury o id "destination"
    this.switchToTabContent(destination);
}

/**
 * Dezaktywuje wszystkie przyciski(tabs). Następnie aktywuje wybraną zakładkę(tab)
 *
 * @param object tabObject
 * jQuerowy obiekt - jako wybrany tab
 */
GuiTabs.prototype.switchToTab = function (tabObject) {
    this.tabsButtons.parent().removeClass(this.tabsClassName);
    tabObject.parent().addClass(this.tabsClassName);
}

/**
 * Ukrywa wszystkie treści, a pokazuje tylko jedną (z aktywnej wybranej zakładki)
 *
 * @param string destination
 * docelowy atrybut ID identyfikujący kontener z treścią do wyświetlenia
 */
GuiTabs.prototype.switchToTabContent = function (destination) {
    this.tableContentContainers.removeClass(this.contentClassName);
    this.spanContentContainers.removeClass(this.contentClassName);
    this.tabsContainer.find("#"+destination).addClass(this.contentClassName);
}

// pod-przestrzeń nazw (jeśli nie ma 'GRAPH.gui' to ją utwórz)
GRAPH.gui = GRAPH.gui || {};
GRAPH.gui.tabs = new GuiTabs();