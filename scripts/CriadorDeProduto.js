var DadosProduto = { ListaInsumos: [] };
var validCriadorDeProdutos = true;
var validAddInsumos = true;

function CriarProduto() {
    if (validCriadorDeProdutos) {
        MontaProduto();
        NoCollapse('btnCriarProduto', false);
        LimpaCamposDiv('divCriadorDeProdutos');
        $('#headerInsumosNomeProduto').html(DadosProduto.ProdutoNome);
        CloseCollapse('#collapseCriadorDeProdutos')
        CloseCollapse('#collapseListaAdicionados');
    }
}

function AdicionaInsumo() {
    if (validAddInsumos) {
        AddInsumos();
        AdicionaInsumoLista(DadosProduto.ListaInsumos[DadosProduto.ListaInsumos.length - 1]);
        CloseCollapse('#collapseListaAdicionados');
    }

}

function CalcularProduto() {
    NoCollapse('btnCalcularProduto', false);
}

function MontaProduto() {
    DadosProduto = {
        ProdutoNome: $('#inputProdutoNome').val(),
        ProdutoMargemImposto: $('#inputProdutoMargemImposto').val(),
        ProdutoMargemLucro: $('#inputProdutoMargemLucro').val(),
        ListaInsumos: []
    }
    return DadosProduto
}

function AddInsumos() {
    DadosProduto.ListaInsumos.push({
        InsumoNome: $('#inputInsumoNome').val(),
        InsumoTipoMedida: $('#selectInsumoTipoMedida').val(),
        InsumoQuantidadeEmbalagem: $('#inputInsumoQuantidadeEmbalagem').val(),
        InsumoValor: $('#inputInsumoValor').val(),
        InsumoPorcao: $('#inputInsumoPorcao').val(),
    });
    console.log(DadosProduto);
}




// function AdicionaInsumo(){
//     NoCollapse('btnCriarProduto', false)
//     OpenCollapse('collapseListaAdicionados');

//     if(TotalInsumosAdicionados == 0){
//         console.log('passou')
//         $("#btnAdicionarInsumo").removeAttr('data-bs-toggle');
//         TotalInsumosAdicionados++
//     }
//     CollapseInsumosLista()
//     AdicionaInsumoLista(MontaDadosInsumo());
//     LimpaCamposAdicionaInsumo();
// }

// [
//     DadosProduto = {
//         ProdutoNome: $('#inputProdutoNome').val(),
//         ProdutoMargemImposto: $('#inputProdutoMargemImposto').val(),
//         ProdutoMargemLucro: $('#inputProdutoMargemLucro').val(),
//         ListaDeInsumos: [{
//             InsumoNome: String,
//             InsumoTipoMedida: String,
//             InsumoQuantidadeEmbalagem: Number,
//             InsumoValor: Number,
//             InsumoPorcao: Number,
//         }]
//     }

// ]

