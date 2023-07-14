document.getElementById('material-form').addEventListener('submit', function (event) {
    event.preventDefault();
});

function Gerar() {
    
    var numPavimentos = parseInt(document.getElementById('num-pavimentos').value);
    var numParesFibras = parseInt(document.getElementById('num-pares-fibras').value);
    var medidaLanceCabo = parseInt(document.getElementById('medida-lance-cabo').value);
    var especificacaoCabo = document.getElementById('especificacao-cabo').value;
    var caracteristicaFibra = document.getElementById('caracteristica-fibra').value;
    var qtdBackbonesAndar = parseInt(document.getElementById('qtd-backbones-andar').value);
    var backbonePrimario = document.getElementById('backbone-primario').checked;
     
    /* tirar comentario na versao final
    if(!numPavimentos || !numParesFibras || !medidaLanceCabo || !qtdBackbonesAndar){
        alert("Informe todas as especificações antes de gerar a planilha.")
        return 0 
    }
    */

    let entrada = document.getElementById("entrada");
    entrada.style.display = "none";
    let voltar = document.getElementById("voltar");
    voltar.style.display = "inline";

    var divCriada = document.getElementById('generatedDiv');//null inicialmente
    if (!divCriada) {
        divCriada = document.createElement("div");// Cria elemento que não existe e passa a existir
        divCriada.setAttribute("id", "generatedDiv");// Atribui valor para ser selecionado e testado
        var planilhaResultado = document.getElementById('planilhaResultado');
        planilhaResultado.appendChild(divCriada);
    }

    let medidaFibraRe = medidaLanceCabo * qtdBackbonesAndar * numPavimentos;

    //Retorna quantidade total de acopladores
    var qntAcopladores = function quantidadeAcopladores(){
        if(backbonePrimario){
            let value = numPavimentos * numParesFibras * qtdBackbonesAndar * 2
            return value.toString();
        }else{
            let value = (numPavimentos-1) * numParesFibras * qtdBackbonesAndar *2
            return value.toString();
        }
    }

    //Mostrar acoplador multimodo ou singlemode
    var varAcoplador = function acopladorTipo(){
        if(caracteristicaFibra == "Monomodo"){
            return '9 x 125µm - SM';
        }else{
            return '50 x 125µm - MM';
        }
    }

    //Calcula a quantidade de DIOs e terminadores ópticos
    var DIO = function quantidadeDIOeTerminador(){
        if(backbonePrimario){
            let dioPrim = numPavimentos * numParesFibras * qtdBackbonesAndar;
            let qntDio = 0;
            let tipoDio = '';
            if(dioPrim <= 12){
                tipoDio = '12';
                qntDio = 1;
            }else if(dioPrim <= 24){
                tipoDio = '24';
                qntDio = 1;
            }else{
                tipoDio = '48';
                for(let i = dioPrim; i > 0; i = i - 48){
                    qntDio++;
                }
            }
            let fibraAndar = numParesFibras * qtdBackbonesAndar;
            let terminador = 0;
            let tipoDioAndar = '0';
            let qntDioAndar = 0;
            if(fibraAndar <= 8){
                terminador = 1;
            }else if(fibraAndar <= 12){
                tipoDioAndar = '12';
                qntDioAndar = 1;
            }else if(fibraAndar <= 24){
                tipoDioAndar = '24';
                qntDioAndar = 1;
            }else{
                tipoDioAndar = '48';
                for(let i = fibraAndar; i > 0; i = i - 48){
                    qntDio++;
                }
            }
            if(tipoDio == tipoDioAndar){
                let dioTotal = qntDio + (qntDioAndar * numPavimentos);
                return '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com '+ tipoDio+' portas</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + dioTotal.toString() + '</td>' +
                '</tr>' 
            }else if(terminador == 1){
                return '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com '+ tipoDio+' portas</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + qntDio.toString() + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Terminador Óptico para 8 fibras</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + numPavimentos.toString() + '</td>' +
                '</tr>'
            }else{
                let qntDioAndarTotal = qntDioAndar * numPavimentos;
                return '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com '+ tipoDio+' portas</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + qntDio.toString() + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Chassi DIO (Distribuído Interno Óptico) com '+ tipoDioAndar+' portas</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
                '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + qntDioAndarTotal.toString() + '</td>' +
                '</tr>'
            }
        }
    }
    
    divCriada.innerHTML = '<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">' +
        '<tr style="background-color: #f2f2f2;">' +
        '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Descrição</th>' +
        '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Unidade</th>' +
        '<th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantidade</th>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cabo de Fibra Óptica ' + especificacaoCabo + ' - com '+ numParesFibras + ' pares de fibra '+ caracteristicaFibra +'</td>' + // Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com 8 fibras
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">m</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + medidaFibraRe + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Acoplador óptico ' + varAcoplador()+' - LC - duplo</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + qntAcopladores() + '</td>' +
        '</tr>' +
        DIO() +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm - MM - 1,5m - simples - conector LC</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm - MM - 3,0m - duplo - conector LC</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cordão Óptico 50 x 125µm - MM - 3m - duplo - conector LC</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Pig tail 50 x 125µm - SM - 1,5m - simples - conector LC</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Cordão Óptico 9 x 125µm - SM - 3m - duplo - conector LC</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">unid.</td>' +
        '<td style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">' + + '</td>' +
        '</tr>' +
        '</table>';

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