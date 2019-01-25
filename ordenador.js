var firstBy = require('thenby');

function OrderingException(message) {
    this.message = message;
    this.name = "OrderingException";
};

function ordenar(lista, settings) {
    
    if (lista == null){
        throw new OrderingException("A lista entregue para ordenação não é valida");
    };
    lista.sort(
        firstBy(settings[0]["propriedade"],settings[0]["ordem"])
        .thenBy(settings[1]["propriedade"],settings[1]["ordem"])
        .thenBy(settings[2]["propriedade"],settings[2]["ordem"])
    );
    return lista
};
