function ComporValor(){
    $('#btnComporValor').removeClass('btn-primary')
    $('#btnComporValor').css('color', 'white')
    $('#btnComporValor').addClass('btn-warning')
}

function AdicionaInsumoLista(dadosInsumo) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedida),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoQuantidadeEmbalagem),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoPorcao),
        $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo"class="ms-auto"> ' + dadosInsumo.InsumoValor + '</span>'),
        $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    );
    novaLinha.appendTo('#tbListaInsumos');

}

function AdicionaModalInsumoLista(dadosInsumo) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedida),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoQuantidadeEmbalagem),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoPorcao),
        $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo"class="ms-auto"> ' + dadosInsumo.InsumoValor + '</span>'),
    );
    novaLinha.appendTo('#tbModalListaInsumos');
}

//-------------------Limpa Campos------------------------------------//

