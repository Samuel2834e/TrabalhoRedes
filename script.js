document.getElementById('material-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
});

function Gerar() {
    let entrada = document.getElementById("entrada");
    entrada.style.display = "none";
    let voltar = document.getElementById("voltar");
    voltar.style.display = "inline";
    var numPavimentos = parseInt(document.getElementById('num-pavimentos').value);
    var numParesFibras = parseInt(document.getElementById('num-pares-fibras').value);
    var medidaLanceCabo = document.getElementById('medida-lance-cabo').value;
    var especificacaoCabo = document.getElementById('especificacao-cabo').value;
    var caracteristicaFibra = document.getElementById('caracteristica-fibra').value;
    var qtdBackbonesAndar = parseInt(document.getElementById('qtd-backbones-andar').value);
    var backbonePrimario = document.getElementById('backbone-primario').checked;
    var backboneSecundario = document.getElementById('backbone-secundario').checked;

    var divCriada = document.getElementById('generatedDiv');//null inicialmente
    if (!divCriada) {
        divCriada = document.createElement("div");// Cria elemento que não existe e passa a existir
        divCriada.setAttribute("id", "generatedDiv");// Atribui valor para ser selecionado e testado
        var planilhaResultado = document.getElementById('planilhaResultado');
        planilhaResultado.appendChild(divCriada);
    }
    divCriada.innerHTML = '<table style="width: 100%; border-collapse: collapse;"> <tr> <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f2f2f2;">Dados de Entrada</th> <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f2f2f2;">Valores</th> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Número de Pavimentos da Edificação:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="num-pavimentos">' + numPavimentos + '</td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Número de Pares de Fibras Disponíveis:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="num-pares-fibras"> ' + numParesFibras + ' </td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Medida Básica para Cálculo dos Lances de Cabo do Backbone:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="medida-lance-cabo">' + medidaLanceCabo + '</td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Especificação do Cabo de Fibra Óptica:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="especificacao-cabo">'+ especificacaoCabo +'</td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Característica da Fibra Óptica:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="caracteristica-fibra">'+ caracteristicaFibra +'</td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantidade de Backbones por Andar:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="qtd-backbones-andar">'+ qtdBackbonesAndar+'</td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Existência de Backbone Primário:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="backbone-primario">'+ backbonePrimario +'</td> </tr> <tr> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Existência de Backbone Secundário:</td> <td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;" id="backbone-secundario">'+backboneSecundario+'</td> </tr> </table>';
    var planilhaResultado = document.getElementById('planilhaResultado');
    planilhaResultado.style.display = "inline";
}

function Voltar (){
    let entrada = document.getElementById("entrada");
    entrada.style.display = "inline";
    var planilhaResultado = document.getElementById('planilhaResultado');
    let voltar = document.getElementById("voltar");
    voltar.style.display = "none";
    planilhaResultado.style.display = "none";
    var divCriada = document.getElementById('generatedDiv');
    if (divCriada) {
        divCriada.innerHTML = '';
    }
}
