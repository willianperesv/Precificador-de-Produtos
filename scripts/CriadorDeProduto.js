var DadosProduto = { ListaInsumos: [], ProdutoCalculado:[] };
var ListaProdutosCalculados = [];

function CriarProduto() {
    var validCriadorDeProdutos = $("#collapseCriadorDeProdutos").valid();

    if (validCriadorDeProdutos) {
        MontaProduto();
        LimpaCamposDiv('divCriadorDeProdutos');
        $('#headerInsumosNomeProduto').html(DadosProduto.ProdutoNome);
        AbreSessao('collapseInsumosAddCampos','collapseAddInsumos', true, 1000);
        FechaSessao('collapseCriadorDeProdutos','divCriadorDeProdutos', true, 500);
    }
}

function AdicionaInsumo() {

    var validAddInsumos = $("#collapseCriadorDeProdutos").valid();
    if (validAddInsumos) {
        MontaInsumos();
        AdicionaInsumoLista(DadosProduto.ListaInsumos[DadosProduto.ListaInsumos.length - 1]);

        if(DadosProduto.ListaInsumos.length == 1){
            AbreSessao('collapseInsumosLista','collapseListaAdicionados', true, 700)
        }

        LimpaCamposDiv('collapseInsumosAddCampos');
    }
}

function CalcularProduto() {

    produtoCalculado = ComporValorProduto(DadosProduto);
    DadosProduto.ProdutoCalculado.push(produtoCalculado);
    MontaTabelaProdutosCalculados(DadosProduto.ProdutoCalculado[DadosProduto.ProdutoCalculado.length - 1], DadosProduto.ProdutoNome)
    ListaProdutosCalculados.push(DadosProduto);
    $('#TituloCriadorDeProdutos').html('Criar Novo Produto');

    FechaSessao('collapseInsumosLista','collapseListaAdicionados', true, 700);
    FechaSessao('collapseInsumosAddCampos','collapseAddInsumos', true, 1500);
   
    AbreSessao('collapseListaProdutosPrecificados','collapseProdutosCalculadosLista', true, 3000);
    AbreSessao('collapseCriadorDeProdutos','divCriadorDeProdutos', true, 3000);
}


//==========================Métodos Validate =================================//

function IniciaValidateCriaProdutos(){
    $("#collapseCriadorDeProdutos").validate({
        rules: {
            inputProdutoNome: {
                required: true,
            },
            inputProdutoMargemLucro: {
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

function IniciaValidateCriaProdutos(){
    $("#collapseInsumosAddCampos").validate({
        rules: {
            inputProdutoNome: {
                required: true,
            },
            inputProdutoMargemLucro: {
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


