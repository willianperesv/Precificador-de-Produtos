var DadosProduto = { ListaInsumos: [], ProdutoCalculado:[] };
var ListaProdutosCalculados = []
var validCriadorDeProdutos = null;
var validAddInsumos = true;

function CriarProduto() {
    validCriadorDeProdutos = $("#collapseCriadorDeProdutos").valid();
    if (validCriadorDeProdutos == true) {
        console.log('entrou na criaProduto')
        MontaProduto();
        NoCollapse('btnCriarProduto', false);
        LimpaCamposDiv('divCriadorDeProdutos');
        $('#headerInsumosNomeProduto').html(DadosProduto.ProdutoNome);
        CloseCollapse('#collapseCriadorDeProdutos', false);
        CloseCollapse('#collapseListaAdicionados', false);
        ExibeListaDeInsumos(false);
        if(ListaProdutosCalculados.length > 0){
        CloseCollapse('#collapseAddInsumos', false);
        }
    }else{
        console.log('false')
        CloseCollapse('#collapseAddInsumos', false);
    }
}

function AdicionaInsumo() {
    if (validAddInsumos) {
        MontaInsumos();
        AdicionaInsumoLista(DadosProduto.ListaInsumos[DadosProduto.ListaInsumos.length - 1]);
        if(DadosProduto.ListaInsumos.length > 1){
            CloseCollapse('#collapseListaAdicionados', true)
        }else{
            CloseCollapse('#collapseListaAdicionados', false);
        }
        LimpaCamposDiv('collapseInsumosAddCampos');
    }
}

function CalcularProduto() {
    NoCollapse('btnCalcularProduto', false);
    produtoCalculado = ComporValorProduto(DadosProduto);
    DadosProduto.ProdutoCalculado.push(produtoCalculado);
    MontaTabelaProdutosCalculados(DadosProduto.ProdutoCalculado[DadosProduto.ProdutoCalculado.length - 1], DadosProduto.ProdutoNome)
    ListaProdutosCalculados.push(DadosProduto);
    CloseCollapse('#collapseAddInsumos', false);
    CloseCollapse('#collapseCriadorDeProdutos', false);
    $('#TituloCriadorDeProdutos').html('Criar Novo Produto');

}


//==========================Métodos Validate =================================//

function IniciaValidateCriaProdutos(){
    $("#collapseCriadorDeProdutos").validate({
        rules: {
            inputProdutoNome: {
                required: true,
            },
            inputProdutoNome: {
                required: true,
            },
          },
          messages: {
            inputProdutoNome:{
                required: "Campo obrigatório.",
             
            },
            inputProdutoMargemLucro:{
                required: "Campo obrigatório.",
             
            }
          },
       });
} 


//==============================Monta Objetos=================================///

function MontaProduto() {
    DadosProduto = {
        ProdutoNome: $('#inputProdutoNome').val(),
        ProdutoMargemImposto: parseFloat($('#inputProdutoMargemImposto').val()),
        ProdutoMargemLucro: parseFloat($('#inputProdutoMargemLucro').val()),
        ListaInsumos: [],
        ProdutoCalculado: []
    }
    return DadosProduto
}

function MontaInsumos() {
    DadosProduto.ListaInsumos.push({
        InsumoNome: $('#inputInsumoNome').val(),
        InsumoTipoMedida: $('#selectInsumoTipoMedida').val(),
        InsumoQuantidadeEmbalagem: parseFloat($('#inputInsumoQuantidadeEmbalagem').val()),
        InsumoValor: parseFloat($('#inputInsumoValor').val()),
        InsumoPorcao: parseFloat($('#inputInsumoPorcao').val()),
    });
}


