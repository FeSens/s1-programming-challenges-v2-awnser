$(() => {
var counter=0;
var firstBy = require('thenby');

    $("#add").click(function () {  
        var autor = $( "#in .autor" ).val();
        $( "#in .autor" ).val("");
        var titulo = $( "#in .titulo" ).val();
        $( "#in .titulo" ).val("");
        var edicao = $( "#in .edicao" ).val();
        $( "#in .edicao" ).val("");
        

        $('#books_list').append(
            `<li id=${counter}><input type="text" class="autor" value="${autor}"> <input type="text" class="titulo" value="${titulo}"> <input type="text" class="edicao" value="${edicao}"> <button class=remove>-</button></li>`
        );
        //console.log(`${autor}`);
    
        //books[counter] = {"autor": autor, "titulo": titulo, "edicao": edicao}
        //console.log(books);
        counter = counter+1;
    });

    $("#books").on("click", ".remove", function() {
        id = $(this).parent().attr('id');
        $( "#"+id ).remove();
        //delete books[id];
        //console.log(books);
    });

    $("#ordenar").click(function () { 
        //var ul = document.getElementById("books_list");
        //var items = ul.getElementsByTagName("li");
        //for (var i = 0; i < items.length; ++i) {
        // do something with items[i], which is a <li> element
        //}
        //Grab the data from de <li> put in an array, order it, rewrite it to the screen..
        //Create a way to select the propertys of the ordering system
        //Save and load that from a file
        lista = [];
        $("#books_list li").each(function() {
            autor = $(this).find("input.autor").val();
            titulo = $(this).find("input.titulo").val();
            ano = $(this).find("input.ano").val();

            book = {"autor":autor, "titulo": titulo, "ano": ano};
            
            lista.push(book);
        });

        
        lista.sort(
            firstBy("autor")
        );
        console.log(lista);

        
        $('#books_list').empty();
        counter = 0;
        $.each(lista, function( key, {autor, titulo, ano}) {
            $('#books_list').append(
            `<li id=${counter}><input type="text" class="titulo" value="${titulo}"> <input type="text" class="autor" value="${autor}"> <input type="text" class="ano" value="${ano}"> <button class=remove>-</button></li>`
            );
            counter = counter +1;
        });
    });

});