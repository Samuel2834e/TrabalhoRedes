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
    var medidaLanceCabo = parseInt(document.getElementById('medida-lance-cabo').value);
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

    //Medida de fibra
    let medidaFibraRe = parseInt(medidaLanceCabo * ((numPavimentos * (medidaLanceCabo - 2)) * 1.2));//!

    //Caracteristica
    let palavrasChave1 = ["SM", "Single Mode", "Monomodo", "Mono Modo", "Mono  Modo", "Single Mode", "Monomodo", "Monomode"];
    let palavrasChave2 = [
        "MM",
        "Multimodo",
        "Multimode",
        "Fibra Multimodo",
        "Fibra Multimode"
    ];

    let contemPalavraChave1 = false;

    let contemPalavraChave2 = false;


    for (let i = 0; i < palavrasChave1.length; i++) {
        if (caracteristicaFibra.includes(palavrasChave1[i])) {
            contemPalavraChave1 = true;
        }
    }

    for (let i = 0; i < palavrasChave2.length; i++) {
        if (caracteristicaFibra.includes(palavrasChave2[i])) {
            contemPalavraChave2 = true;
        }
    }

    //Chassi
    let aux = (numParesFibras * numPavimentos) / 24;
    let chassiRe = Math.ceil(aux);

    // Acoplador optico
    let acopladorOpticoRe = numParesFibras * numPavimentos;

    // Bandeja para emenda
    let aux2 = (numParesFibras * numPavimentos) / 12;
    let bandejaEmenda = Math.ceil(aux2);


  ///if (numPavimentos && numParesFibras && medidaLanceCabo && especificacaoCabo && caracteristicaFibra && qtdBackbonesAndar) {
    if (contemPalavraChave1) {
        divCriada.innerHTML = '<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">' +
            '<tr style="background-color: #f2f2f2;">' +
            '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Descrição</th>' +
            '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Unidade</th>' +
            '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantidade</th>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cabo de Fibra Óptica ' + especificacaoCabo + ' - com ' + numParesFibras + ' fibras</td>' + // Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com 8 fibras
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">m</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + medidaFibraRe + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com 24 portas - 1U - 19"</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + chassiRe + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Acoplador óptico 9 x 125µm - SM - LC - duplo</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + acopladorOpticoRe / 2  + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + bandejaEmenda + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Terminador Óptico para 8 fibras</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm - SM - 3,0m - duplo - conector LC</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cordão Óptico 9 x 125µm - SM - 3m - duplo - conector LC</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
            '</tr>' +
            '</table>';

    } else {
        if(contemPalavraChave2){
            divCriada.innerHTML = '<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">' +
            '<tr style="background-color: #f2f2f2;">' +
            '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Descrição</th>' +
            '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Unidade</th>' +
            '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantidade</th>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cabo de Fibra Óptica ' + especificacaoCabo + ' - com ' + numParesFibras + ' fibras</td>' + // Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com 8 fibras
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">m</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + medidaFibraRe + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com 24 portas - 1U - 19"</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + chassiRe + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Acoplador óptico 50 x 125µm - MM - LC - duplo  </td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + acopladorOpticoRe /2 + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + bandejaEmenda + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Terminador Óptico para 8 fibras</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm - MM - 3,0m - duplo - conector LC</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
            '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
            '</tr>' +
            '</table>';
        }
    }
//}else {
//    divCriada.innerHTML = '<h1>Você não preencheu todos os campos</h1>'
//}

    var planilhaResultado = document.getElementById('planilhaResultado');
    planilhaResultado.style.display = "inline";
}

function Voltar() {
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
