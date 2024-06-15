function ComporValor(){
    $('#btnComporValor').removeClass('btn-primary')
    $('#btnComporValor').css('color', 'white')
    $('#btnComporValor').addClass('btn-warning')
}

function AdicionaInsumoLista(dadosInsumo) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedidaDescricao),
        $('<td style="text-align: right;">').html(trataExibicaoListaInsumoQuantidades(dadosInsumo.InsumoTipoMedida, dadosInsumo.InsumoQuantidadeEmbalagem)),
        $('<td style="text-align: right;">').html(trataExibicaoListaInsumoQuantidades(dadosInsumo.InsumoTipoMedida, dadosInsumo.InsumoPorcao)),
        $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo" class="ms-auto"> ' + formatarNumeroMonetario(dadosInsumo.InsumoValor.toFixed(2)) + '</span>'),
        $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    );
    novaLinha.appendTo('#tbListaInsumos');
}

function AdicionaModalInsumoLista(dadosInsumo) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedidaDescricao),
        $('<td style="text-align: right;">').html(trataExibicaoListaInsumoQuantidades(dadosInsumo.InsumoTipoMedida, dadosInsumo.InsumoQuantidadeEmbalagem.toFixed(3))),
        $('<td style="text-align: right;">').html(trataExibicaoListaInsumoQuantidades(dadosInsumo.InsumoTipoMedida, dadosInsumo.InsumoPorcao.toFixed(3))),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaramonetaria">' + formatarNumeroMonetario(dadosInsumo.InsumoValor.toFixed(2)) + '</span>')
    );
    novaLinha.appendTo('#tbModalListaInsumos');
}

function trataExibicaoListaInsumoQuantidades(tipoMedida, quantidade){
    var quantidadeTratada = null
    if(tipoMedida == 1){
       quantidadeTratada = adicionarPontosMilhares(quantidade)
    }else{
        quantidadeTratada = formatarNumeroMonetario(quantidade.toFixed(3))
    }

    return quantidadeTratada
}


