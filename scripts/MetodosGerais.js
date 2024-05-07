//=========Métodos Gerais ===============//

function AbreSessao(elementoId, formId, showForm, tempo) {
    var Elemento = $("#" + elementoId);
    if(showForm){
        $("#" + formId).show();
    }
    setInterval(function() {
        Elemento.slideDown();
    }, tempo);
}

function FechaSessao(elementoId, formId, hideForm, tempo) {
    var Elemento = $("#" + elementoId);
    var tempoSlideUp = tempo - 400;
    if(hideForm){
        setInterval(function() {

            $("#" + formId).hide();
        }, tempo);
        
    }

    setInterval(function() {

        Elemento.slideUp();
        
    }, tempoSlideUp);
}

//=========================Métodos=================================///
function RemoverLinha() {
    $(this).closest('tr').remove();
}

function MascaraMonetaria(valor){
    valorTratado = valor.maskMoney({
        thousands: '.',
        decimal: ',',
        prefix: 'R$ ',
        precision: 2,
        allowNegative: false
    });
    return valorTratado
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

