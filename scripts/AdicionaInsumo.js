var TotalInsumosAdicionados = 0;

function ComporValor(){
    $('#btnComporValor').removeClass('btn-primary')
    $('#btnComporValor').css('color', 'white')
    $('#btnComporValor').addClass('btn-warning')
}

function AdicionaInsumo(){
    if(TotalInsumosAdicionados == 0){
        console.log('passou')
        $("#btnAdicionarInsumo").removeAttr('data-bs-toggle');
        TotalInsumosAdicionados++
    }
    AdicionaInsumoLista(MontaDadosInsumo());
    LimpaCamposAdicionaInsumo();
}

function MontaDadosInsumo(){
    var dadosInsumo = null;

    dadosInsumo = {
        NomeInsumo: document.getElementById('inpNomeInsumo').value,
        TipoMedidaInsumo: document.getElementById('slctTipoMedidaInsumo').value,
        QuantidadeEmbalagem: parseFloat($('#inpQuantidadeEmbalagem').value),
        MinimoProducao: parseFloat(document.getElementById('inpMinimoProducao').value),
        ValorInsumo: parseFloat(document.getElementById('inpValorInsumo').value)        
    }
    return dadosInsumo
}

function AdicionaInsumoLista(dadosInsumo){
        $('<tr>').append(
            $('<td>').html(dadosInsumo.NomeInsumo),
            $('<td>').html(dadosInsumo.TipoMedidaInsumo),
            $('<td style="text-align: right;">').html(dadosInsumo.QuantidadeEmbalagem),
            $('<td style="text-align: right;">').html(dadosInsumo.MinimoProducao),
            $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo"class="ms-auto"> '+ dadosInsumo.ValorInsumo + '</span>'),
            $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
        ).appendTo('#hdListaInsumos');
}



//-------------------Limpa Campos------------------------------------//

