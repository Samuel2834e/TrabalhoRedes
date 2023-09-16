document.getElementById('material-form').addEventListener('submit', function (event) {
    event.preventDefault();
});

function ajustePavimento() {
    var backbonePrimario = document.getElementById('backbone-primario').checked;
    if (backbonePrimario == true) {
        var numPavimentos = document.getElementById('num-pavimentos');
        var numParesFibras = document.getElementById('num-pares-fibras');
        var numDistancia = document.getElementById('medida-lance-cabo');
        var qtdBackbonesAndarEl = document.getElementById('qtdBBAndar');
        var qtdBackbonesAndar = document.getElementById('qtd-backbones-andar');
        numParesFibras.placeholder = "Nº de Fibras Disponíveis na Ligação";
        numDistancia.placeholder = "Distância em metros da ligação";
        numPavimentos.value = 1;
        numPavimentos.disabled = true;
        qtdBackbonesAndarEl.style.display = "none";
        qtdBackbonesAndar.value = 1;
    }
}

function ajustePavimento2() {
    var backbonePrimario = document.getElementById('backbone-secundario').checked;
    if (backbonePrimario == true) {
        var numPavimentos = document.getElementById('num-pavimentos');
        var numParesFibras = document.getElementById('num-pares-fibras');
        numParesFibras.placeholder = "Nº de Fibras Disponíveis por Pavimento";
        var qtdBackbonesAndarEl = document.getElementById('qtdBBAndar');
        var qtdBackbonesAndar = document.getElementById('qtd-backbones-andar');
        numPavimentos.disabled = false;
        numPavimentos.value = "";
        qtdBackbonesAndarEl.style.display = "block";
        qtdBackbonesAndar.value = "";
    }
}



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
    let body = document.querySelector("body").style.backgroundColor = "white";


    var divCriada = document.getElementById('generatedDiv');//null inicialmente
    if (!divCriada) {
        divCriada = document.createElement("div");// Cria elemento que não existe e passa a existir
        divCriada.setAttribute("id", "generatedDiv");// Atribui valor para ser selecionado e testado
        var planilhaResultado = document.getElementById('planilhaResultado');
        planilhaResultado.appendChild(divCriada);
    }

    let i = 0;
    let medidaPavimentoBackbone = 0;
    let medidaTotalBackbone = 0;
    let medidaFibraRe;
    for (i = 1; i < numPavimentos; i++) {
        medidaPavimentoBackbone = medidaLanceCabo * 2 + (medidaLanceCabo * i);
        medidaTotalBackbone = medidaTotalBackbone + medidaPavimentoBackbone * qtdBackbonesAndar;
    }

    medidaFibraRe = Math.ceil(medidaTotalBackbone * 1.2);

    //Chassi
    let aux = (numParesFibras * numPavimentos * qtdBackbonesAndar) / 24;
    let chassiRe = Math.ceil(aux);

    // Acoplador optico
    let acopladorOpticoRe = Math.ceil(numParesFibras * numPavimentos * qtdBackbonesAndar);

    // Bandeja para emenda
    let aux2 = (numParesFibras * numPavimentos * qtdBackbonesAndar) / 12;
    let bandejaEmenda = Math.ceil(aux2);

    // Terminador optico
    let aux3;
    let terminadorOptico;
    if (backbonePrimario == true) {
        aux3 = (numParesFibras * (numPavimentos) * qtdBackbonesAndar * qtdBackbonesAndar) / 8;
        terminadorOptico = Math.ceil(aux3);
    } else {
        let aux3 = (numParesFibras * (numPavimentos - 1) * qtdBackbonesAndar * qtdBackbonesAndar) / 8;
        terminadorOptico = Math.ceil(aux3);
    }

    // Pigtail BB1
    let BB1pigtailDioPatchPanel;
    let BB1pigtailTO;
    if (backbonePrimario == true) {
        BB1pigtailDioPatchPanel = Math.ceil ((numParesFibras * (numPavimentos) * qtdBackbonesAndar) / 2);
        BB1pigtailTO = Math.ceil((numParesFibras * (numPavimentos)));
    } else {
        BB1pigtailDioPatchPanel = Math.ceil((numParesFibras * (numPavimentos - 1) * qtdBackbonesAndar) / 2);
        BB1pigtailTO = Math.ceil((numParesFibras * (numPavimentos - 1)));
    }

    //Cordão optico BB1
    let BB1cordaoOpticoTotal = Math.ceil((numParesFibras * numPavimentos * qtdBackbonesAndar) / 2);

    //Pigtail BB2
    let BB2pigtailDioPatchPanel;
    let BB2pigtailTO;
    let BB2pigtailSwBB2;
    if (backbonePrimario == true) {
        BB2pigtailDioPatchPanel = Math.ceil ((numParesFibras * (numPavimentos) * qtdBackbonesAndar) / 2);
        BB2pigtailTO = Math.ceil ((numParesFibras * (numPavimentos) * qtdBackbonesAndar));
        BB2pigtailSwBB2 = Math.ceil( numParesFibras * qtdBackbonesAndar);
    } else {
        BB2pigtailDioPatchPanel = Math.ceil((numParesFibras * (numPavimentos - 1) * qtdBackbonesAndar) / 2);
        BB2pigtailTO = Math.ceil((numParesFibras * (numPavimentos - 1) * qtdBackbonesAndar));
        BB2pigtailSwBB2 = Math.ceil(numParesFibras * qtdBackbonesAndar);
    }

    //Cordão optico BB2
    let BB2cordaoOpticoTotal = Math.ceil((numParesFibras * numPavimentos * qtdBackbonesAndar) / 2);
    let BB2cordaoOpticoSwBB2 = Math.ceil(((BB2pigtailSwBB2 * qtdBackbonesAndar) / 2));

    //Etiquetas DIO
    let etiquetasDio = Math.ceil (chassiRe * 24);

    //Etiqueta para os cordões ópticos e pigtail´s (TO)
    let etiquetasCoPt = Math.ceil((BB2pigtailDioPatchPanel * 2) + terminadorOptico);

    let caracteristicaFibraFinal;

    if (caracteristicaFibra == "9 x 125µm") {
        caracteristicaFibraFinal = "Monomodo";
    } else {
        caracteristicaFibraFinal = "Multimodo";
    }

    if (numPavimentos && numParesFibras && medidaLanceCabo && especificacaoCabo && caracteristicaFibra && qtdBackbonesAndar) {
        if (backboneSecundario == true) {
            divCriada.innerHTML = '<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">' +
                '<tr>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Descrição</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Unidade</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantidade</th>' +
                '</tr>' +
                '<tr>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Tabela de Especificações SEQ e SETs</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cabo de Fibra Óptica ' + especificacaoCabo + ' ' + caracteristicaFibra + ' - com ' + numParesFibras + ' fibras</td>' + // Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com 8 fibras
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">m</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + medidaFibraRe + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com 24 portas - 1U - 19"</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + chassiRe + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Acoplador óptico 9 x 125µm - ' + caracteristicaFibraFinal + ' - LC - duplo</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + acopladorOpticoRe / 2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + bandejaEmenda + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Terminador Óptico para 8 fibras</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + terminadorOptico + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm ' + caracteristicaFibraFinal + ' 3,0m - duplo - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB2pigtailDioPatchPanel + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm ' + caracteristicaFibraFinal + ' 1,5m - simples - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB2pigtailTO + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm ' + caracteristicaFibraFinal + ' 1,5m - simples - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB2pigtailSwBB2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cordão Óptico 9 x 125µm ' + caracteristicaFibraFinal + ' 3m - duplo - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB2cordaoOpticoTotal + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cordão Óptico 9 x 125µm ' + caracteristicaFibraFinal + ' 3m - simples - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB2cordaoOpticoSwBB2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Miscelânea</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Etiqueta para Portas do DIO' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + etiquetasDio + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Etiqueta para os cordões ópticos e pigtail´s (TO)' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + etiquetasCoPt + '</td>' +
                '</tr>' +
                '</table>';
        }
        if (backbonePrimario == true) {
            divCriada.innerHTML = '<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif">' +
                '<tr>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Descrição</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Unidade</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantidade</th>' +
                '</tr>' +
                '<tr>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Tabela de Especificações SEQ e SETs</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cabo de Fibra Óptica ' + especificacaoCabo + ' ' + caracteristicaFibra + ' - com ' + numParesFibras + ' fibras</td>' + // Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com 8 fibras
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">m</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + medidaLanceCabo + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com 24 portas - 1U - 19"</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + chassiRe + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Acoplador óptico 9 x 125µm ' + caracteristicaFibraFinal + ' LC - duplo</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + acopladorOpticoRe / 2 + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + bandejaEmenda + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Terminador Óptico para 8 fibras</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + terminadorOptico + '</td>' +
                '</tr>' +
                '<tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm ' + caracteristicaFibraFinal + ' 3,0m - duplo - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB1pigtailDioPatchPanel + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm  ' + caracteristicaFibraFinal + ' 1,5m - simples - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB1pigtailTO + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cordão Óptico 9 x 125µm ' + caracteristicaFibraFinal + ' 3m - duplo - conector LC</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + BB1cordaoOpticoTotal + '</td>' +
                '</tr>' +
                '</tr>' +
                '<tr>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Miscelânea</th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;"></th>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Etiqueta para Portas do DIO' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + etiquetasDio + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Etiqueta para os cordões ópticos e pigtail´s (TO)' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + etiquetasCoPt + '</td>' +
                '</tr>' +
                '</table>';
        }
    } else {
        divCriada.innerHTML = '<br><h1 onclick="Voltar()" style="text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Você não preencheu todos os campos, clique aqui para voltar</h1>';
        let voltar = document.getElementById("voltar");
        voltar.style.display = "none";
    }

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
