//=========Métodos Gerais ===============//

 function AbreSessao(elementoId, formId, hideForm, tempo) {
     var Elemento = $("#" + elementoId);
     setTimeout(function() {
         Elemento.slideDown();
         if (hideForm) {
             $("#" + formId).show();
         }
     }, tempo);
 }
 function AbreSessaoComSlide(formId, sessaoId, btnDown, btnUp, tempo) {
    $("#" + formId).show();
     setTimeout(function() {
        ToggleHeader(sessaoId, btnDown, btnUp)
     }, tempo);
 }
 function FechaSessaoComSlide(formId, sessaoId, btnDown, btnUp, tempo) {
     ToggleHeader(sessaoId, btnDown, btnUp)
     setTimeout(function() {
        $("#" + formId).hide();
     }, tempo);
 }

  function FechaInsumos(){
     if($('#btnCloseHeaderInsumoListaUp').is(':visible')){
        ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp');
     }
     if($('#btnCloseHeaderAddInsumosUp').is(':visible')){
        setTimeout(function() {
            ToggleHeader('collapseInsumosAddCampos','btnCloseHeaderAddInsumosDown', 'btnCloseHeaderAddInsumosUp')
         }, 500);
     }
     setTimeout(function() {
        $("#collapseAddInsumos").hide();
     }, 1000);

  }
 

 function FechaSessao(elementoId, formId, hideForm, tempo) {
     var Elemento = $("#" + elementoId);
     setTimeout(function() {
         Elemento.slideUp();
         if (hideForm) {
             $("#" + formId).hide();
         }
     }, tempo);
 }

 function ToggleHeader(formId, btnDown, btnUp){
    if($('#' + btnDown).is(':visible')){
        $('#' + formId).slideDown();
        $('#' + btnUp).removeAttr('display', 'none');
        $('#' + btnDown).attr('display', 'none');
    }else{
        $('#' + formId).slideUp();
        $('#' + btnDown).removeAttr('display', 'none');
        $('#' + btnUp).attr('display', 'none');
    }
 }


//=========================Métodos=================================///
function RemoverLinha() {
    $(this).closest('tr').remove();
}

function retornaTipoMedidaDescricao(tipoMedida){
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

function aplicaMascaraTipoMedida(tipoMedida){
    var tipoMedidaDescricao = null;
    switch (tipoMedida) {
        case '1':
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraMetroKgLitro');
            $('#inputInsumoPorcao').removeClass('mascaraMetroKgLitro');
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraMetros');
            $('#inputInsumoPorcao').removeClass('mascaraMetros');

            $('#inputInsumoQuantidadeEmbalagem').addClass('mascaraUnidade');
            $('#inputInsumoPorcao').addClass('mascaraUnidade');

            MascaraUnidadeUnidadeAtiva = true;

            $('.mascaraUnidade').mask('000.000', {
                translation: {
                    '0': {pattern: /[0-9]/}
                },
                reverse: true
            });
            break;
        case '2':
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraUnidade');
            $('#inputInsumoPorcao').removeClass('mascaraUnidade');
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraMetros');
            $('#inputInsumoPorcao').removeClass('mascaraMetros');

            $('#inputInsumoQuantidadeEmbalagem').addClass('mascaraMetroKgLitro');
            $('#inputInsumoPorcao').addClass('mascaraMetroKgLitro');
            
            MascaraUnidadeUnidadeAtiva = false;

            $(".mascaraMetroKgLitro").mask("999.999,99", {reverse: true});
            break;
        case '3':
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraUnidade');
            $('#inputInsumoPorcao').removeClass('mascaraUnidade');
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraMetroKgLitro');
            $('#inputInsumoPorcao').removeClass('mascaraMetroKgLitro');

            $('#inputInsumoQuantidadeEmbalagem').addClass('mascaraMetros');
            $('#inputInsumoPorcao').addClass('mascaraMetros');
           
            MascaraUnidadeUnidadeAtiva = false;
            
            $('.mascaraMetros').mask("999.999,99", {reverse: true});
            break;
        case '4':
            $('#inputInsumoQuantidadeEmbalagem').removeClass('mascaraUnidade');
            $('#inputInsumoPorcao').removeClass('mascaraUnidade');
            $('#inputInsumoQuantidadeEmbalagem').addClass('mascaraMetroKgLitro');
            $('#inputInsumoPorcao').addClass('mascaraMetroKgLitro');
            $(".mascaraMetroKgLitro").mask("999,999", {reverse: true});
            break;
        default:
            tipoMedidaDescricao = 'Não reconhecido'
    }
    return tipoMedidaDescricao
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
        // Converter para float e garantir duas casas decimais
        let num = parseFloat(valor).toFixed(2);

        // Substituir o ponto decimal por uma vírgula temporariamente
        num = num.replace('.', ',');

        // Adicionar pontos como separadores de milhar
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

//================Limpa Campos===============//

function LimpaCamposDiv(divId) {
    $('#' + divId +' :input').val('');
  }

function LimpaCamposAdicionaInsumo(){
    $('#formAdicionaInsumo :input').val('');
}

//====================Paginação========================//



