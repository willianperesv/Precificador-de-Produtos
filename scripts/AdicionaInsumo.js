var TotalInsumosAdicionados = 0;

function ComporValor(){
    $('#btnComporValor').removeClass('btn-primary')
    $('#btnComporValor').css('color', 'white')
    $('#btnComporValor').addClass('btn-warning')
}

// function AdicionaInsumo(){
//     if(TotalInsumosAdicionados == 0){
//         console.log('passou')
//         $("#btnAdicionarInsumo").removeAttr('data-bs-toggle');
//         TotalInsumosAdicionados++
//     }
//     AdicionaInsumoLista(MontaDadosInsumo());
//     LimpaCamposAdicionaInsumo();
// }

// function MontaDadosInsumo(){
//     var dadosInsumo = null;

//     dadosInsumo = {
//         NomeInsumo: document.getElementById('inpNomeInsumo').value,
//         TipoMedidaInsumo: document.getElementById('slctTipoMedidaInsumo').value,
//         QuantidadeEmbalagem: parseFloat($('#inpQuantidadeEmbalagem').value),
//         MinimoProducao: parseFloat(document.getElementById('inpMinimoProducao').value),
//         ValorInsumo: parseFloat(document.getElementById('inpValorInsumo').value)        
//     }
//     return dadosInsumo
// }

function AdicionaInsumoLista(dadosInsumo) {
    var novaLinha = $('<tr>').append(
        $('<td>').html(dadosInsumo.InsumoNome),
        $('<td>').html(dadosInsumo.InsumoTipoMedida),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoQuantidadeEmbalagem),
        $('<td style="text-align: right;">').html(dadosInsumo.InsumoPorcao),
        $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo"class="ms-auto"> ' + dadosInsumo.InsumoValor + '</span>'),
        $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    );
    ExibeListaDeInsumos(true);

    novaLinha.appendTo('#tbListaInsumos');

}
// function AdicionaInsumoLista(dadosInsumo) {
//     dadosInsumo.map(data => (
//         $('<tr>').append(
//             $('<td>').html(data.InsumoNome),
//             $('<td>').html(data.InsumoTipoMedida),
//             $('<td style="text-align: right;">').html(data.InsumoQuantidadeEmbalagem),
//             $('<td style="text-align: right;">').html(data.InsumoPorcao),
//             $('<td class="d-flex justify-content-between">').html('<span>R$</span><span id="maskValorInsumo"class="ms-auto"> ' + data.InsumoValor + '</span>'),
//             $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
//         ).appendTo('#tbListaInsumos')
//     ));
// }



//-------------------Limpa Campos------------------------------------//

