var firstBy = require('thenby');

function ordenar(lista, settings) {
     
    lista.sort(
        firstBy(settings[0]["propriedade"],settings[0]["ordem"])
        .thenBy(settings[1]["propriedade"],settings[1]["ordem"])
        .thenBy(settings[2]["propriedade"],settings[2]["ordem"])
    );
    return lista
};