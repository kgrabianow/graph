/**
 * Created by Mateusz on 2017-04-21.
 */

/**
 * Globalne stałe statyczne - komunikaty, itp
 */
function Static() {
    // Wiadomości dla "interaktywnej pomocy"
    this.msg = {
        edit: {
            START: [
                "<b>Edycja wierzchołka</b> - kliknij w wierzchołek",
                "<b>Usunięcie wierzchołka/krawędzi</b> - kliknij w czerwony przycisk"
            ],
            CHOOSEN: [
                "<b>Edytujesz</b> zaznaczony wierzchołek.",
                "<b>Przemieszczenie w inne miejsce</b> - kliknij w puste pole grafu"
            ],
            BAD_VERTEX_PLACE: [
                "Nie można <b>umieścić</b> wierzchołka na innym. Dopuszczalne jest jedynie puste pole."
            ]
        },
        normal: {
            START: [
                "<b>Nowy wierzchołek</b> - kliknij w puste pole grafu",
                "<b>Zaznaczenie wierzchołka</b> - kliknij w wierzchołek"
            ],
            CHOOSEN: [
                "<b>Nowa krawędź</b> - kliknij w inny wierzchołek, aby utworzyć z nim krawędź",
                "<b>Odznaczenie wierzchołka</b> - kliknij w puste pole grafu <b>lub</b> ten sam wierzchołek"
            ],
            BAD_EDGE_EXIST: [
                "Nie można tutaj <b>dodać</b> krawędzi, ponieważ pomiędzy tymi wierzchołkami istnieje już krawędź."
            ]
        }
    };
}

GRAPH.static = GRAPH.static || {};
GRAPH.static = new Static();