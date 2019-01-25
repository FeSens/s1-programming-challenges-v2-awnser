# Arquitetura 
Este documento tem o objetivo de justificar e explicar as escolhas tomadas neste projeto.

Várias dúvidas surgiram quando a proposta do desafio foi lida: Fazer uma interface web? O que exatamente eu devo retornar para o usuário? Os livros ordenados ou os índices ordenados? Serviço de ordenação e Cliente do serviço de ordenação querem dizer back e frontend ou apenas o programa e o usuário do programa? As configurações de ordenação devem ser somente acessíveis através de um arquivo?
Para sanar estas duvidas foi escolhida uma direção. Este programa não e direcionado a equipe do processo seletivo da SumOne ou para quem estiver avaliando o código, este programa e direcionado ao usuário. Este projeto foi pensado em satisfazer as necessidades de uma biblioteca que precisa ordenar os seus livros.
Dito isto, gostaria de explicar o parâmetro `{'lock': false}` disponível no arquivo de configuração settings.json. Esta configuração serve para consistência na ordenação dos livros. Caso assim deseje, o responsável pela organização da biblioteca pode travar as configurações, garantindo que qualquer funcionário sem conhecimento ou treinamento prévio possa organizar a biblioteca de maneira coerente aos seus antecessores. Porem caso não deseje, as configurações podem ser facilmente ajustadas na interface gráfica.
Foi com esta mentalidade que este programa foi desenvolvido.

## Framework
Foi escolhido para a execução do projeto o framework [Electron](https://electronjs.org/), que permite desenvolver um app desktop utilizando ferramentas web como Java Script e HTML. Isto e] torna o código portátil, podendo ser executado em diversos sistemas operacionais ou ser facilmente portado para uma aplicação web.

## Arquivos

[Main.js](#Mainjs)

[Main.html](#Mainhtml)

[Window.js](#Windowjs)

[Ordenador.js](#Ordenadorjs)

[Settings.json](#Settingsjson)


### Main.js
Neste arquivo encontramos o início do código. Em suas primeiras linhas temos a funções para criar a janela do programa e criar ou carregar, caso já exista, o arquivo de configura ‘ao [settings.js](#Settingsjs). 
Em suas últimas linhas temos três funções de IPC (inter process communication) para transmitir dados entre a UI (janela principal) e o backend. Estas funções realizam três operações: 

1.  Comunicam com a interface se o arquivo de configuração permite alteração ou não.
2.  Salvam as preferências de ordenação septadas pela interface no arquivo de configuração.
3.  Comunicam com a interface, quando o programa e iniciado, as preferencias septadas no arquivo de configuração.

### Main.html
Esta e a interface do programa com o cliente, nela e definido o esqueleto que será dinamicamente modificado pelo arquivo [window.js](#Windowjs)

### Window.js
Este e o principal arquivo do programa, ele comanda toda a interface grafia, dando vida ao projeto.
Primeiro o programa recebe do backend duas informações cruciais, se as configurações estão travadas e quais são estas configurações. Então ele prossegue para atualizar as configurações de ordenação na interface, caso estas não possam ser modificadas pelo usuário (estejam travadas) o programa omitira a secessão necessária para fazer quaisquer alterações.
A ordenação dos livros ocorre através de um click no botão ORDENAR, isto desencadeia a execução de uma função jQuery que realiza os seguintes passos:

1.  Busca na interface do usuário(HTML) todos os livros imputados pelo usuário e os coloca em uma lista.
2.  Chama a função getSettings, que busca no HTML todas as configurações setadas pelo usuário.
3.  Chama a função ordenar, definida em [ordenador.js](#Ordenadorjs), para ordenar a lista de livros.
4.  Atualiza a interface do usuário para mostrar a lista ordenada.

Várias outras funções também estão contidas neste arquivo, elas são necessárias para realizar funções como: adicionar novos livros, remover livros previamente adicionados e mudar a prioridade/direção dos filtros.

### Ordenador.js
Nesta parte do programa e definida a função `ordenar()`, ela e responsável por receber a lista de livros, suas preferências de ordenação e retornar a lista ordenada. Ela toma vantagem de uma biblioteca chamada *thenBy* que serve a somente um proposito, organizar arrays em javascript por um ou mais atributos. Esta biblioteca se mostrou perfeita para a ocasião pois, além de possibilitar a ordenação dos livros, ela pode ignorar atributos não existentes no arras. Isto torna possível desativar a ordenação de qualquer um dos atributos com a utilização de um simples prefixo, neste caso "off-, ao invés de qualquer outra logica mais complicada.

### Settings.json
Aqui são definidas as configurações para a ordenação dos livros, elas podem ser setadas manualmente ou através da interface gráfica pelo botão "Salvar Config".
Neste arquivo encontramos o seguinte array:
```
[{"ordem":1,"propriedade":"titulo"},
 {"ordem":1,"propriedade":"autor"},
 {"ordem":1,"propriedade":"edicao"},
 {"lock":"false"}]
```
Onde a ordem indica a direção (1: Ascendente, -1 Descendente), a propriedade define qual o parâmetro que irá ser ordenado (podendo ser desconsiderado através do prefixo "off-" ex:"off-título"), a sequência determina qual será a prioridade de ordenação e por último o parâmetro lock que indica se modificações nesse arquivo são permitidas pelo usuário ou não.
