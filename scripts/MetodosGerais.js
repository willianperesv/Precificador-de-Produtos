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

//---------Limpa Campos------------------//

function LimpaCamposAdicionaInsumo(){
    $('#formAdicionaInsumo :input').val('');
}
