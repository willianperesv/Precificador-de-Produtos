function ComporValor(){
    $('#btnComporValor').removeClass('btn-primary')
    $('#btnComporValor').css('color', 'white')
    $('#btnComporValor').addClass('btn-warning')
}

function AdicionaInsumoLista(dadosInsumo) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedidaDescricao),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoQuantidadeEmbalagem.toFixed(3)),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoPorcao.toFixed(3)),
        $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo"class="ms-auto"> ' + dadosInsumo.InsumoValor.toFixed(2) + '</span>'),
        $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    );
    novaLinha.appendTo('#tbListaInsumos');
}

function AdicionaModalInsumoLista(dadosInsumo) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedidaDescricao),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoQuantidadeEmbalagem.toFixed(3)),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoPorcao.toFixed(3)),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + dadosInsumo.InsumoValor.toFixed(2) + '</span>')
    );
    novaLinha.appendTo('#tbModalListaInsumos');
}


