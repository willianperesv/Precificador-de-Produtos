var DadosProduto = {}

function CriarProduto() {
    MontaProduto();
    NoCollapse('btnCriarProduto', false);
    LimpaCamposDiv('divCriadorDeProdutos');
    
}

// function AdicionaInsumo(){
//     OpenCollapse('collapseListaAdicionados');
// }

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

function MontaProduto(){
    DadosProduto = {
        ProdutoNome: $('#inputProdutoNome').val(),
        ProdutoMargemImposto: $('#inputProdutoMargemImposto').val(),
        ProdutoMargemLucro: $('#inputProdutoMargemLucro').val()     
    }

    return DadosProduto
}

