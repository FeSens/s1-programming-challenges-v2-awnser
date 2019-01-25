# Arquitetura 
Este documento tem o objetivo de justificar e explicar as escolhas tomadas neste projeto.

Varias duvidas surgiram quando a proposta do desafio foi lida: Fazer uma interface web? O que exatamente eu devo retornar para o usuario? Os livros ordenados ou os indices ordenados? Servico de ordenacao e Cliente do servico de ordenacao querem dizer back e frontend ou apenas o programa e o usuario do programa? As configuracoes de ordenacao devem ser somente acessiveis atraves de um arquivo?
Para sanar estas duvidas foi escolhida uma direcao. Este programa nao e direcionado a equipe do processo seletivo da SumOne ou para quem estiver avaliando o codigo, este programa e direcionado ao usuario. Este projeto foi pensado em satifazer as necessidades de uma bliblioteca que precisa ordenar os seus livros.
Dito isto, gostaria de explicar o parametro `{'lock': false}` disponivel no arquivo de configuracao settings.json. Esta configuracao serve para consistencia na ordenacao dos livros. Caso assim deseje, o responsavel pela organizacao da bliblioteca pode travar as configuracoes, grantindo que qualquer funcionario sem conhecimento ou treinamento previo possa organizar a bliblioteca de maneira coerente aos seus antecessores. Porem caso nao deseje, as configuracoes podem ser facilmente ajustadas na interface grafica.
Foi com esta mentalidade que este programa foi desenvolvido.

## Framework
Foi escolhido para a execucao do projeto o framework [Electron](https://electronjs.org/), que permite desenvolver um app desktop utilizando ferramentas web como JavaScript e HTML. Isto e] torna o codigo portatil, podendo ser executado em diversos sistemas operacionais ou ser facilmente portado para uma aplicacao web.

## Arquivos

[Main.js](#Mainjs)

[Main.html](#Mainhtml)

[Window.js](#Windowjs)

[Ordenador.js](#Ordenadorjs)

[Settings.json](#Settingsjson)


### Main.js
Neste arquivo encontramos o inicio do co'digo. Em suas primeiras linhas temos a funcoes para criar a janela do programa e criar ou carregar, caso ja exista, o arquivo de configura'ao [settings.js](#Settingsjs). 
Em suas ultimas linhas temos tr'es func'oes de IPC (inter process communication) para transmitir dados entre a UI (janela principal) e o backend. Estas funcoes realizam tres operacoes: 

1.  Comunicam com a interface se o arquivo de configuracao permite alteracao ou nao.
2.  Salvam as preferencias de ordenacao setadas pela interface no arquivo de configuracao.
3.  Comunicam com a interface, quando o programa e iniciado, as preferencias setadas no arquivo de configuracao.

### Main.html
Esta e a interface do programa com o cliente, nela e definido o esqueleto que sera dinamicamente modificado pelo arquivo [window.js](#Windowjs)

### Window.js
Este e o principal arquivo do programa, ele comanda toda a interface grafica, dando vida ao projeto.
Primeiro o programa recebe do backend duas informacoes cruciais, se as configuracoes estao travadas e quais sao estas configuracoes. Entao ele prossegue para atualizar as configuracoes de ordenacao na interface, caso estas nao possam ser modificadas pelo usuario (estejam travadas) o programa omitira a secessão necessaria para fazer quaisquer alteracoes.
A ordenacao dos livros ocorre atraves de um click no botao ORDENAR, isto desencadeia a execucao de uma funcao jQuery que realiza os seguintes passos:

1.  Busca na interface do usuario(HTML) todos os livros inpudados pelo usuario e os coloca em uma lista.
2.  Chama a funcao getSettings, que busca no HTML todas as configuracoes setadas pelo usuario.
3.  Chama a funcao ordenar, definida em [ordenador.js](#Ordenadorjs), para ordenar a lista de livros.
4.  Atualiza a interface do usuario para mostrar a lista ordenada.

Varias outras funcoes tambem estao contidas neste arquivo, elas sao necessarias para realizar funcoes como: adicionar novos livros, remover livros previamente adcionados e mudar a prioridade/direcao dos filtros.

### Ordenador.js
Nesta parte do programa e definida a funcao `ordenar()`, ela e responsavel por receber a lista de livros, suas preferencias de ordenacao e retornar a lista ordenada. Ela toma vantagem de uma bliblioteca chamada *thenBy* que serve a somente um proposito, organizar arrays em javascript por um ou mais atributos. Esta bliblioteca se mostrou perfeita para a ocasiao pois, alem de possibilitar a ordenacao dos livros, ela pode ignorar atributos nao existentes no array. Isto torna possivel desativar a ordenacao de qualquer um dos atributos com a utilizacao de um simples prefixo, neste caso "off-, ao invez de qualquer outra logica mais complicada.

### Settings.json
Aqui sao definidas as configuracoes para a ordenacao dos livros, elas podem ser setadas manualmente ou atraves da iterface grafica pelo botao "Salvar Config".
Neste arquivo encontramos o seguinte array:
```
[{"ordem":1,"propriedade":"titulo"},
 {"ordem":1,"propriedade":"autor"},
 {"ordem":1,"propriedade":"edicao"},
 {"lock":"false"}]
```
Onde a ordem indica a direcao (1: Ascendente, -1 Descendente), a propriedade define qual o parametro que ira ser ordenado (podendo ser desconsiderado atraves do prefixo "off-" ex:"off-titulo"), a sequencia determina qual sera a prioridade de ordenacao e por ultimo o paramentro lock que indica se modificacoes nesse arquivo sao permitidas pelo usuario ou nao.
