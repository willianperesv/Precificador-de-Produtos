//=========Métodos Gerais ===============//

function AbreSessao(elementoId, formId, hideForm, tempo) {
    var Elemento = $("#" + elementoId);
    setTimeout(function () {
        Elemento.slideDown();
        if (hideForm) {
            $("#" + formId).show();
        }
    }, tempo);
}
function AbreSessaoComSlide(formId, sessaoId, btnDown, btnUp, tempo) {
    $("#" + formId).show();
    setTimeout(function () {
        ToggleHeader(sessaoId, btnDown, btnUp)
    }, tempo);
}
function FechaSessaoComSlide(formId, sessaoId, btnDown, btnUp, tempo) {
    ToggleHeader(sessaoId, btnDown, btnUp)
    setTimeout(function () {
        $("#" + formId).hide();
    }, tempo);
}

function FechaInsumos() {
    if ($('#btnCloseHeaderInsumoListaUp').is(':visible')) {
        ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp');
    }
    if ($('#btnCloseHeaderAddInsumosUp').is(':visible')) {
        setTimeout(function () {
            ToggleHeader('collapseInsumosAddCampos', 'btnCloseHeaderAddInsumosDown', 'btnCloseHeaderAddInsumosUp')
        }, 500);
    }
    setTimeout(function () {
        $("#collapseAddInsumos").hide();
    }, 1000);

}


function FechaSessao(elementoId, formId, hideForm, tempo) {
    var Elemento = $("#" + elementoId);
    setTimeout(function () {
        Elemento.slideUp();
        if (hideForm) {
            $("#" + formId).hide();
        }
    }, tempo);
}

function ToggleHeader(formId, btnDown, btnUp) {
    if ($('#' + btnDown).is(':visible')) {
        $('#' + formId).slideDown();
        $('#' + btnUp).removeAttr('display', 'none');
        $('#' + btnDown).attr('display', 'none');
    } else {
        $('#' + formId).slideUp();
        $('#' + btnDown).removeAttr('display', 'none');
        $('#' + btnUp).attr('display', 'none');
    }
}


//=========================Métodos=================================///
function RemoverLinha() {
    $(this).closest('tr').remove();
}

function retornaTipoMedidaDescricao(tipoMedida) {
    var tipoMedidaDescricao = null;
    switch (tipoMedida) {
        case '1':
            tipoMedidaDescricao = 'Un'
            break;
        case '2':
            tipoMedidaDescricao = 'Kg'
            break;
        case '3':
            tipoMedidaDescricao = 'l'

            break;
        case '4':
            tipoMedidaDescricao = 'm'
            break;
        default:
            tipoMedidaDescricao = 'Não reconhecido'
    }
    return tipoMedidaDescricao
}

function aplicaMascaraTipoMedida(tipoMedida) {
    if(tipoMedida == 1){
        $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraMedidaDecimal');
        $('#inputInsumoPorcao').removeClass('mascaraMedidaDecimal');
        $('#inputInsumoQuantidadeEmbalagem').addClass('mascaraUnidadeEmbalagem');
        $('#inputInsumoPorcao').addClass('mascaraUnidadePorcao');

        MascaraUnidadeUnidadeAtiva = true;

        $('.mascaraUnidadeEmbalagem').mask('000.000', {
            translation: {
                '0': { pattern: /[0-9]/ }
            },
            reverse: true
        });

        $('.mascaraUnidadePorcao').mask('999.999,999', {
    
            reverse: true
        });

    }else{
        $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraUnidadeEmbalagem');
        $('#inputInsumoPorcao').removeClass('mascaraUnidadePorcao');

        $('#inputInsumoQuantidadeEmbalagem').addClass('mascaraMedidaDecimal');
        $('#inputInsumoPorcao').addClass('mascaraMedidaDecimal');

        MascaraUnidadeUnidadeAtiva = false;

        $(".mascaraMedidaDecimal").mask("999,999", { reverse: true });
    }
}

function ajusteBotões(ListaInsumosMaiorQue5){
    if(ListaInsumosMaiorQue5){
        $('#divIdBotoesListaInsumo').addClass('col-xs-12')
        $('#divIdBotoesListaInsumo').addClass('col-sm-12')
        $('#divIdBotoesListaInsumo').addClass('col-md-6')
        $('#divIdBotoesListaInsumo').addClass('col-lg-6')
        $('#divIdBotoesListaInsumo').addClass('col-xg-6')

        $('#divIdBotoesListaInsumo').removeClass('col-xs-12')
        $('#divIdBotoesListaInsumo').removeClass('col-sm-12')
        $('#divIdBotoesListaInsumo').removeClass('col-md-12')
        $('#divIdBotoesListaInsumo').removeClass('col-lg-12')
        $('#divIdBotoesListaInsumo').removeClass('col-xg-12')
        $('#paginationListaInsumo').slideDown()
    }else{
        $('#divIdBotoesListaInsumo').removeClass('col-xs-12')
        $('#divIdBotoesListaInsumo').removeClass('col-sm-12')
        $('#divIdBotoesListaInsumo').removeClass('col-md-6')
        $('#divIdBotoesListaInsumo').removeClass('col-lg-6')
        $('#divIdBotoesListaInsumo').removeClass('col-xg-6')

        $('#divIdBotoesListaInsumo').addClass('col-xs-12')
        $('#divIdBotoesListaInsumo').addClass('col-sm-12')
        $('#divIdBotoesListaInsumo').addClass('col-md-12')
        $('#divIdBotoesListaInsumo').addClass('col-lg-12')
        $('#divIdBotoesListaInsumo').addClass('col-xg-12')
        $('#paginationListaInsumo').hide()
    }
}

function convertePontoPorVirgula(value) {
    let valorFormatado = value.replace('.', ',');
    return valorFormatado;
}

function formatarNumeroMonetario(num) {
    let [parteInteira, parteDecimal] = num.toString().split('.');
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (parteDecimal !== undefined) {
        return `${parteInteira},${parteDecimal}`;
    } else {
        return parteInteira;
    }
}

function formatarNumeroModal(valor) {
    let num = parseFloat(valor).toFixed(2);
    num = num.replace('.', ',');
    num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return num;
}

function adicionarPontosMilhares(num) {
    let [parteInteira, parteDecimal] = num.toString().split('.');
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (parteDecimal !== undefined) {
        return `${parteInteira},${parteDecimal}`;
    } else {
        return parteInteira;
    }
}

function converteStringPraFloat(value) {
    let valorSemPonto = value.replace(/\./g, '');
    let valorFormatado = valorSemPonto.replace(',', '.');
    let valorFloat = parseFloat(valorFormatado);
    return valorFloat;
}
function AdicionarPercentual(valor, percentual) {
    return valor + (valor * percentual / 100);
}

function verificarEIncrementarString(str, array) {
    function existeStringNoArray(s, arr) {
        return arr.some(function (obj) {
            return Object.values(obj).includes(s);
        });
    }
    var novaString = str;
    var contador = 0;
    while (existeStringNoArray(novaString, array)) {
        contador++;
        novaString = str + ' (' + contador + ')';
    }

    return novaString;
}


//================Limpa Campos===============//

function LimpaCamposDiv(divId) {
    $('#' + divId + ' :input').val('');
}

function LimpaCamposAdicionaInsumo() {
    $('#formAdicionaInsumo :input').val('');
}

//====================Paginação========================//



