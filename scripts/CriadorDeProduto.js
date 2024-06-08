var DadosProduto = { ListaInsumos: [], ProdutoCalculado:[] };
var ListaProdutosCalculados = [];

function CriarProduto() {
    var validCriadorDeProdutos = $("#collapseCriadorDeProdutos").valid();

    if (validCriadorDeProdutos) {
        IniciaValidateAddInsumos();
        MontaProduto();
        LimpaCamposDiv('collapseCriadorDeProdutos');
        $('#headerInsumosNomeProduto').html(DadosProduto.ProdutoNome);
        FechaSessaoComSlide('CriadorDeProdutos', 'collapseCriadorDeProdutos', 'btnCloseCriadorDeProdutosDown', 'btnCloseCriadorDeProdutosUp', 1000)
        AbreSessaoComSlide('collapseAddInsumos', 'collapseInsumosAddCampos', 'btnCloseHeaderAddInsumosDown', 'btnCloseHeaderAddInsumosUp', 2000)
    }
}

function AdicionaInsumo() {

    var validAddInsumos = $("#collapseInsumosAddCampos").valid();

    if (validAddInsumos) {
        $('#selectInsumoTipoMedida').addClass('remove-borda');
        MontaInsumos();
        AdicionaInsumoLista(DadosProduto.ListaInsumos[DadosProduto.ListaInsumos.length - 1]);

        if(DadosProduto.ListaInsumos.length == 1){
            ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp')
        }

        LimpaCamposDiv('collapseInsumosAddCampos');

    }else{
        $('#selectInsumoTipoMedida').removeClass('remove-borda');
        $('#selectInsumoTipoMedida').addClass('select:invalid');
    }
}

function ExcluiListaInsumos(){
    DadosProduto.ListaInsumos = []
    $("#tableListaInsumos tbody").empty();
    ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp')
}

function ToggleHeaderInsumos(){
    if(DadosProduto.ListaInsumos.length >= 1){
        ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp')
    }else{
        Swal.fire({
            title: `Ops!`,
            text: `Não há insumos adicionados a lista `,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
    }
}

function CancelaProduto(){
    Swal.fire({
        title: `Cancelar Produto ?`,
        text: `Deseja cancelar a criação do produto "${DadosProduto.ProdutoNome}" `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            `"${DadosProduto.ProdutoNome}"`,
            `Removido da Lista de Precificação`
          
          )
          FechaSessao('collapseInsumosLista','collapseListaAdicionados', false, 700);
          FechaSessao('collapseAddInsumos','collapseInsumosAddCampos', false, 500);
          AbreSessao('collapseCriadorDeProdutos','CriadorDeProdutos', true, 1500);
          DadosProduto = []
          LimpaCamposDiv('collapseInsumosAddCampos');
          $("#tableListaInsumos tbody").empty();
        }
      })
}

function CalcularProduto() {
   if(DadosProduto.ListaInsumos.length >= 1){
    produtoCalculado = ComporValorProduto(DadosProduto);
    DadosProduto.ProdutoCalculado.push(produtoCalculado);
    MontaTabelaProdutosCalculados(DadosProduto.ProdutoCalculado[DadosProduto.ProdutoCalculado.length - 1], DadosProduto.ProdutoNome, DadosProduto.ProdutoId);
    ListaProdutosCalculados.push(DadosProduto);
    DadosProduto = [];
    $("#tableListaInsumos tbody").empty();
    $('#TituloCriadorDeProdutos').html('Criar Novo Produto');
    console.log(ListaProdutosCalculados)
    FechaInsumos();
   
    AbreSessao('collapseListaProdutosPrecificados','collapseProdutosCalculadosLista', true, 1000);
    AbreSessao('collapseCriadorDeProdutos','CriadorDeProdutos', true, 1500);

   }else{
    Swal.fire({
        title: `Ops!`,
        text: `Para precificar o produto, adicione insumos a lista`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
   }

}
//==================== Modal Produto Calculado ===============================//

function PreencheModalProdutoCalculado(produtoId){
     const ProdutoSelecionado = ListaProdutosCalculados.find(item => item.ProdutoId === produtoId);

     $('#modalProdutoNomeHeader').text(ProdutoSelecionado.ProdutoNome)

    $('#modalMargemImposto').val(ProdutoSelecionado.ProdutoMargemImposto.toFixed(2))
    $('#modalMargemLucro').val(ProdutoSelecionado.ProdutoMargemLucro.toFixed(2))
    $('#modalCustoProducao').val(ProdutoSelecionado.ProdutoCalculado[0].CustoBruto.toFixed(2))
    $('#modalValorTotalImposto').val(ProdutoSelecionado.ProdutoCalculado[0].ValorComImposto.toFixed(2))
    $('#modalValorTotalLucro').val(ProdutoSelecionado.ProdutoCalculado[0].ValorComLucro.toFixed(2))
    $('#modalValorSugerido').val(ProdutoSelecionado.ProdutoCalculado[0].ValorSugerido.toFixed(2))

    ProdutoSelecionado.ListaInsumos.map((item) => {
        AdicionaModalInsumoLista(item)
    })
}

function FechaModalProdutoCalculado() {
    LimpaCamposDiv('modalCamposProdutoCalculado');
    $("#tableModalListaInsumos tbody").empty();
}

//==========================Métodos Validate =================================//

function IniciaValidateCriaProdutos(){
    $("#collapseCriadorDeProdutos").validate({
        errorPlacement: function(error, element) {
            error.insertAfter(element.parents('.form-group').find('.input-group').last());
        },
        success: function(label, element) {
            $(element).parents('.form-group').find('.error-message').remove();
        },
 
        rules: {
            inputProdutoNome: {
                required: true,
            },
            ProdutoMargemImposto: {
                required: true,
            },
          },
          messages: {
            inputProdutoNome:{
                required: "Campo obrigatório.",
             
            },
            ProdutoMargemImposto:{
                required: "Campo obrigatório.",
             
            }
          },
       });
} 

function IniciaValidateAddInsumos(){
    $("#collapseInsumosAddCampos").validate({
        errorPlacement: function(error, element) {
            error.insertAfter(element.parents('.form-group').find('.input-group').last());
        },
        success: function(label, element) {
            $(element).parents('.form-group').find('.error-message').remove();
        },

        rules: {
            inputInsumoNome: {
                required: true,
            },
            selectInsumoTipoMedida: {
                required: true,
            },
            inputInsumoValor: {
                required: true,
            },
            inputInsumoQuantidadeEmbalagem: {
                required: true,
            },
            inputInsumoPorcao: {
                required: true,
            },
          },
          messages: {
            inputInsumoNome:{
                required: "Campo obrigatório.",
            },
            selectInsumoTipoMedida:{
                required: "Campo obrigatório.",
             
            },
            inputInsumoQuantidadeEmbalagem:{
                required: "Campo obrigatório.",
             
            },
            inputInsumoValor:{
                required: "Campo obrigatório.",
             
            },
            inputInsumoPorcao:{
                required: "Campo obrigatório.",
             
            }
          },


       });
} 


//==============================Monta Objetos=================================///

function MontaProduto() {
    DadosProduto = {
        ProdutoNome: $('#inputProdutoNome').val(),
        ProdutoMargemImposto: converteStringPraFloat($('#inputProdutoMargemImposto').val()),
        ProdutoMargemLucro: converteStringPraFloat($('#inputProdutoMargemLucro').val()),
        ProdutoId: $('#inputProdutoNome').val() + (ListaProdutosCalculados.length + 1),
        ListaInsumos: [],
        ProdutoCalculado: []

    }
    return DadosProduto
}

function MontaInsumos() {
    DadosProduto.ListaInsumos.push({
        InsumoNome: $('#inputInsumoNome').val(),
        InsumoTipoMedida: $('#selectInsumoTipoMedida').val(),
        InsumoTipoMedidaDescricao: retornaTipoMedidaDescricao($('#selectInsumoTipoMedida').val()),
        InsumoQuantidadeEmbalagem: converteStringPraFloat($('#inputInsumoQuantidadeEmbalagem').val()),
        InsumoValor: converteStringPraFloat($('#inputInsumoValor').val()),
        InsumoPorcao: converteStringPraFloat($('#inputInsumoPorcao').val()),
    });
}


