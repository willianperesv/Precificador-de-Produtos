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

function convertToFloat(value) {
    // Substitui a vírgula por ponto
    let formattedValue = value.replace(',', '.');
    
    // Converte a string para float
    let floatValue = parseFloat(formattedValue);
    
    // Retorna o valor float
    return floatValue;
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

//============================================//

