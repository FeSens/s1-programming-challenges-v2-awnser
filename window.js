$(() => {
var counter=0;


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
    
});