$(() => {
var counter=0;


    $("#add").click(function () {  
        var autor = $( "#in .autor" ).val();
        $( "#in .autor" ).val("");
        var titulo = $( "#in .titulo" ).val();
        $( "#in .titulo" ).val("");
        var ano = $( "#in .ano" ).val();
        $( "#in .ano" ).val("");
        

        $('#books_list').append(
            `<li id=${counter}><input type="text" class="autor" value="${autor}"> <input type="text" class="titulo" value="${titulo}"> <input type="text" class="ano" value="${ano}"> <button class=remove>-</button></li>`
        );
        //console.log(`${autor}`);
    
        //books[counter] = {"autor": autor, "titulo": titulo, "ano": ano}
        //console.log(books);
        counter = counter+1;
    });
});