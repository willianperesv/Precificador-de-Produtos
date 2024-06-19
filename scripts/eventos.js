var MascaraUnidadeUnidadeAtiva = false;

$(document).ready(function () {
    IniciaMascaras();
    IniciaValidateCriaProdutos();
    IniciaEventos();
});


function IniciaEventos() {
    $(function () {
        $(document).on('click', '.btn-remover', RemoverLinha);
    });

    $('#inputInsumoValor').change(function () {
        if ($('#inputInsumoValor-error').is(':visible') || $('#inputInsumoPorcao-error').is(':visible')) {
            console.log('alou')
            $('#divBotaoAdicionaInsumo').addClass('align-items-center')
        } else {
            console.log('eita')
            $('#divBotaoAdicionaInsumo').addClass('align-items-end')
        }

    })
    $('#inputInsumoPorcao').change(function () {
        if ($('#inputInsumoValor-error').is(':visible') || $('#inputInsumoPorcao-error').is(':visible')) {
            console.log('alou')
            $('#divBotaoAdicionaInsumo').addClass('align-items-center')
        } else {
            $('#divBotaoAdicionaInsumo').addClass('align-items-end')
        }

    })

    $('#selectInsumoTipoMedida').change(function () {
        var tipoMedida = $(this).val();

        $('#inputInsumoQuantidadeEmbalagem').val('');
        $('#inputInsumoValor').val('');
        $('#inputInsumoPorcao').val('');

        aplicaMascaraTipoMedida(tipoMedida)
        $('#selectInsumoTipoMedida').removeClass('validateBorda');
    });


}

function IniciaMascaras() {


    $("#inputInsumoValor").maskMoney()

    //===============Inputs Criação de Produtos==================//

    $("#inputProdutoMargemLucro").on("blur", function () {
        var value = $(this).val();
        if (value && !value.includes(',')) {
            $(this).val(value + ',00');
        }
        if (value && value.includes(',')) {
            if (value.split(',')[1].length === 0) {
                $(this).val(value + '00');
            }
            if (value.split(',')[1].length === 1) {
                $(this).val(value + '0');
            }
        }

    });

    $("#inputProdutoMargemImposto").on("blur", function () {
        var value = $(this).val();
        if (value && !value.includes(',')) {
            $(this).val(value + ',00');
        }
        if (value && value.includes(',')) {
            if (value.split(',')[1].length === 0) {
                $(this).val(value + '00');
            }
            if (value.split(',')[1].length === 1) {
                $(this).val(value + '0');
            }
        }

    });

    //===============Inputs add Insumos==================//

    $("#inputInsumoQuantidadeEmbalagem").on("blur", function () {
        if (!MascaraUnidadeUnidadeAtiva) {
            var value = $(this).val();
            if (value && !value.includes(',')) {
                $(this).val(value + ',0');
            }
            if (value && value.includes(',')) {
                if (value.split(',')[1].length === 0) {
                    $(this).val(value + '0');
                }
                if (value.split(',')[1].length === 1) {
                    $(this).val(value + '00');
                }
            }
        }
    });

    $("#inputInsumoPorcao").on("blur", function () {
        if (!MascaraUnidadeUnidadeAtiva) {
            var value = $(this).val();
            if (value && !value.includes(',')) {
                $(this).val(value + ',0');
            }
            if (value && value.includes(',')) {
                if (value.split(',')[1].length === 0) {
                    $(this).val(value + '0');
                }
                if (value.split(',')[1].length === 1) {
                    $(this).val(value + '00');
                }
            }
        }
    });
}

//==================Paginação================================//



