var abreCollapseInsumosAddCampos = false;

//=========Métodos Gerais ===============//
function FormatarCampoMonetario() {
    // Selecione o elemento de entrada pelo ID
    var campo = document.getElementById('maskValorInsumo');

    // Aplica a máscara monetária
    var mask = new IMask(campo, {
        mask: 'R$ num',
        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                radix: ','
            }
        }
    });
}

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
//---------Cancela Collapse -------------//

function NoCollapse(btnId, alteraCor, corBotao, NovaCor){
    if(alteraCor){
        $('#' + btnId).removeClass(corBotao)
        $('#' + btnId).addClass(NovaCor);
    }
    $('#' + btnId).removeAttr('data-bs-toggle');
}

function OpenCollapse(elemento) {
    console.log('OpenCollapse')
    $('#' + elemento).removeAttr('style');
}

function HideCollapseInsumosAddCampos(somenteIcones){
    if(somenteIcones){
        $('#btnCloseHeaderAddInsumosDown').show()
        $('#btnCloseHeaderAddInsumosUp').hide()
    }
    if(!abreCollapseInsumosAddCampos){
        $('#collapseInsumosAddCampos').slideUp();
        $('#btnCloseHeaderAddInsumosDown').show()
        $('#btnCloseHeaderAddInsumosUp').hide()
        abreCollapseInsumosAddCampos = true;
    }else{
        $('#collapseInsumosAddCampos').slideDown();
        $('#btnCloseHeaderAddInsumosDown').hide()
        $('#btnCloseHeaderAddInsumosUp').show()
        abreCollapseInsumosAddCampos = false;
    }
}

//---------Limpa Campos------------------//

function LimpaCamposDiv(divId) {
    $('#' + divId +' :input').val('');
  }

function LimpaCamposAdicionaInsumo(){
    $('#formAdicionaInsumo :input').val('');
}


