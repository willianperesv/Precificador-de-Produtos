var MascaraUnidadeUnidadeAtiva = false;

$(document).ready(function () {
    IniciaMascaras();
    IniciaValidateCriaProdutos();
    IniciaEventos();
    CarregaProdutosCalculados();

});

function IniciaEventos() {
    $(function () {
        $(document).on('click', '.btn-remover', RemoverLinha);

    });

    $('#toggle-h3').on('click', function () {
        if ($('#btnIniciarCriacaoProduto').hasClass('active')) {
            if (CriacaoEtapa1) {
                FechaSessaoComSlide('CriadorDeProdutos', 'collapseCriadorDeProdutos', 'btnCloseCriadorDeProdutosDown', 'btnCloseCriadorDeProdutosUp', 500);
            } else {
                FechaInsumos();
            }
            CarregaProdutosCalculados();
        }
        $(this).removeClass('inactive');
        $(this).addClass('active');
        $('#btnIniciarCriacaoProduto').removeClass('active');
        $('#btnIniciarCriacaoProduto').addClass('inactive');
    });

    $('#btnIniciarCriacaoProduto').on('click', function () {
        if ($(this).hasClass('inactive')) {
            if (CriacaoEtapa1) {
                AbreSessaoComSlide('CriadorDeProdutos', 'collapseCriadorDeProdutos', 'btnCloseCriadorDeProdutosDown', 'btnCloseCriadorDeProdutosUp', 500)
            } else {
                AbreSessaoComSlide('collapseAddInsumos', 'collapseInsumosAddCampos', 'btnCloseHeaderAddInsumosDown', 'btnCloseHeaderAddInsumosUp', 500);
                if (DadosProduto.ListaInsumos.length > 0) {
                    ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp');
                }
            }
            FechaCalculados();
        }
        $(this).removeClass('inactive');
        $(this).addClass('active');
        $('#toggle-h3').removeClass('active');
        $('#toggle-h3').addClass('inactive');
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
    //$('#inputInsumoValor').mask('#.###,00', {reverse: true});
    $('#inputInsumoValor').mask('###.###,#0', {reverse: true});
    $('#inputProdutoMargemLucro').mask('###.###,#0', {reverse: true});
    $('#inputProdutoMargemImposto').mask('###.###,#0', {reverse: true});

    //===============Inputs Criação de Produtos==================//

    $("#inputInsumoValor").on("blur", function () {
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
                    $(this).val(value + '0');
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
                    $(this).val(value + '0');
                }
            }
        }
    });
}




