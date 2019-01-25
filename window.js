$(() => {
var counter=0;
var mapa = { 0:"ASC", 1:"DES", 2:"OFF"};

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
        counter = counter+1;
    });

    $("#books").on("click", ".remove", function() {
        id = $(this).parent().attr('id');
        $( "#"+id ).remove();
    });

    $("#ordenar").click(function () { 
        //Grab the data from de <li> put in an array, order it, rewrite it to the screen..
        //Create a way to select the propertys of the ordering system
        //Save and load that from a file
        lista = [];
        $("#books_list li").each(function() {
            autor = $(this).find("input.autor").val();
            titulo = $(this).find("input.titulo").val();
            edicao = $(this).find("input.edicao").val();

            book = {"autor":autor, "titulo": titulo, "edicao": edicao};
            
            lista.push(book);
        });

        settings = [];
        $("#settings li").each(function() {
            var p = $(this).find(".ordem").attr("prop"); 
            //if off push last ORDEM 1
            if ($(this).find(".ordem").attr("prop") == 2){
                var filtro = "";
            } else{
                var filtro = $(this).attr("prop");
            };
            settings.push({"propriedade": filtro, "ordem": Math.pow(-1,p)});
        });
        lista = ordenar(lista,settings);
        
        $('#books_list').empty();
        counter = 0;
        $.each(lista, function( key, {autor, titulo, edicao}) {
            $('#books_list').append(
            `<li id=${counter}><input type="text" class="titulo" value="${titulo}"> <input type="text" class="autor" value="${autor}"> <input type="text" class="edicao" value="${edicao}"> <button class=remove>-</button></li>`
            );
            counter = counter +1;
        });
    });

    //Logica para mudar a prioridade dos filtros
    $('[id^="up_"]').on('click', function() {
        var li = $(this).closest('li');
        li.prev('li').before(li);
    });

    $('[id^="down_"]').on('click', function() {
        var li = $(this).closest('li');
        li.next('li').after(li);
    });

    //Cicla entre Ascendente descentende e Off
    //bloquear os 3 em off
    $('.ordem').on('click', function() {
        var i = $(this).attr("prop");
        i++;
        if(i > 2 - (($("[class=ordem][prop=2]").length < 2) ? 0 : 1) ){ //Rotaciona entre ASC,DES e OFF, permite apenas dois filtros em OFF
            i = 0
        };
        $(this).attr("prop", i);
        $(this).html(mapa[i]);
    });

});