var data = localStorage.getItem('userArray')
var ListaCalculadosStorage = JSON.parse(data) || [];
var DadosProduto = { ListaInsumos: [], ProdutoCalculado:[] };
var ListaProdutosCalculados = ListaCalculadosStorage;
var ProdutoEmAberto = false;
var CriacaoEtapa1 = true;

function CriarProduto() {
    
    var validCriadorDeProdutos = $("#collapseCriadorDeProdutos").valid();

    if (validCriadorDeProdutos) {
        IniciaValidateAddInsumos();
        MontaProduto();
        LimpaCamposDiv('collapseCriadorDeProdutos');
        $('#headerInsumosNomeProduto').html('Adicione Insumos a "'+ DadosProduto.ProdutoNome+'"');
        FechaSessaoComSlide('CriadorDeProdutos', 'collapseCriadorDeProdutos', 'btnCloseCriadorDeProdutosDown', 'btnCloseCriadorDeProdutosUp', 500)
        AbreSessaoComSlide('collapseAddInsumos', 'collapseInsumosAddCampos', 'btnCloseHeaderAddInsumosDown', 'btnCloseHeaderAddInsumosUp', 500)
        ProdutoEmAberto = true;
        CriacaoEtapa1 = false;
    }
    
}

function AdicionaInsumo() {
    var validAddInsumos = $("#collapseInsumosAddCampos").valid();
    if (validAddInsumos) {
        MontaInsumos();
        CriaListagem(DadosProduto.ListaInsumos.reverse(), 'paginationListaInsumo', '#tbListaInsumos');
        ajusteBotões(DadosProduto.ListaInsumos.length > 5)
        if(DadosProduto.ListaInsumos.length == 1){
            ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp')

        }
        LimpaCamposDiv('collapseInsumosAddCampos');
        $('#selectInsumoTipoMedida').removeClass('remove-borda');

    }else{
        $('#selectInsumoTipoMedida').addClass('validateBorda');
        if($('#inputInsumoValor-error').is(':visible') || $('#inputInsumoPorcao-error').is(':visible')){
            $('#divBotaoAdicionaInsumo').addClass('align-items-center')
        }else{
            $('#divBotaoAdicionaInsumo').addClass('align-items-end')
        }
        $('#selectInsumoTipoMedida').removeClass('remove-borda');
        $('#selectInsumoTipoMedida').addClass('select:invalid');
    }
}

function ExcluiInsumo(insumoId){
    console.log(DadosProduto.ListaInsumos)
    var indice = DadosProduto.ListaInsumos.findIndex(function(objeto) {
        return objeto.InsumoId === insumoId;
    });

    if (indice !== -1) {
        DadosProduto.ListaInsumos.splice(indice, 1);
    } else {
        console.log('Objeto com id ' + insumoId + ' não encontrado.');
    }

    if(DadosProduto.ListaInsumos.length > 5){
        $('#divIdBotoesListaInsumo').addClass('col-md-6')
        $('#divIdBotoesListaInsumo').removeClass('col-md-12')
        $('#paginationListaInsumo').slideDown()
    }else{
        $('#divIdBotoesListaInsumo').removeClass('col-md-6')
        $('#divIdBotoesListaInsumo').addClass('col-md-12')
        $('#paginationListaInsumo').hide()
    }

    if(DadosProduto.ListaInsumos.length == 0){
        ToggleHeader('collapseInsumosLista', 'btnCloseHeaderInsumoListaDown', 'btnCloseHeaderInsumoListaUp')
    }

    CriaListagem(DadosProduto.ListaInsumos.reverse(), 'paginationListaInsumo', '#tbListaInsumos');
}

function VoltarInsumos(){
    FechaInsumos();
    CarregaTelaCriaProdutos();
    AbreSessaoComSlide('CriadorDeProdutos', 'collapseCriadorDeProdutos', 'btnCloseCriadorDeProdutosDown', 'btnCloseCriadorDeProdutosUp', 500)
    CriacaoEtapa1 = true;
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
          FechaInsumos();
          AbreSessaoComSlide('CriadorDeProdutos', 'collapseCriadorDeProdutos', 'btnCloseCriadorDeProdutosDown', 'btnCloseCriadorDeProdutosUp', 500)
          DadosProduto = []
          LimpaCamposDiv('collapseInsumosAddCampos');
          $("#tableListaInsumos tbody").empty();
          $("#collapseInsumosAddCampos").validate().resetForm();
          $('#selectInsumoTipoMedida').removeClass('validateBorda');
          ProdutoEmAberto = false;
          CriacaoEtapa1 = true;
        }
      })
}

function CalcularProduto() {
   if(DadosProduto.ListaInsumos.length >= 1){
    produtoCalculado = ComporValorProduto(DadosProduto);
    DadosProduto.ProdutoCalculado.push(produtoCalculado);
    ListaProdutosCalculados.push(DadosProduto);
    localStorage.setItem('userArray', JSON.stringify(ListaProdutosCalculados))
    CriaListagem(ListaProdutosCalculados.reverse(), 'paginationListaProdutosCalculados', '#tbListaProdutosCalculados');
    Swal.fire({
        title:  DadosProduto.ProdutoNome +'<br> Precificado Com Sucesso!',
        text: 'Você consultar o produto na sessão de Produtos Precificados',
        icon: 'success',
        confirmButtonText: 'OK',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });

    DadosProduto = [];
    $("#tableListaInsumos tbody").empty();
    $('#TituloCriadorDeProdutos').html('Criar Novo Produto');
    FechaInsumos();
    CarregaProdutosCalculados();
    $('#toggle-h3').removeClass('inactive')
    $('#toggle-h3').addClass('active')
    $('#btnIniciarCriacaoProduto').removeClass('active');
    $('#btnIniciarCriacaoProduto').addClass('inactive');
    ProdutoEmAberto = false;
    CriacaoEtapa1 = true;
    
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

function ExcluiProdutoCalculado(idProduto) {
    var indice = ListaProdutosCalculados.findIndex(function(objeto) {
        return objeto.ProdutoId === idProduto;
    });

    if (indice !== -1) {
        ListaProdutosCalculados.splice(indice, 1);
        localStorage.setItem('userArray', JSON.stringify(ListaProdutosCalculados));
    } else {
        console.log('Objeto com id ' + idProduto + ' não encontrado.');
    }

    if (ListaProdutosCalculados.length > 5) {
        $('#paginationListParodutosCalculados').slideDown();
    } else {
        $('#paginationListaProdutosCalculados').hide();
    }

    if (ListaProdutosCalculados.length == 0) {
        CarregaProdutosCalculados();
        localStorage.setItem('userArray', chave, JSON.stringify([]))

    }else{
        CriaListagem(ListaProdutosCalculados.Reverse(), 'paginationListaProdutosCalculados', '#tbListaProdutosCalculados');
    } 

}

//==================== Modal Produto Calculado ===============================//

function PreencheModalProdutoCalculado(produtoId){
    let data = localStorage.getItem('userArray')
    var ListaCalculados = JSON.parse(data)

     const ProdutoSelecionado = ListaCalculados.find(item => item.ProdutoId === produtoId);
     
     if(ProdutoSelecionado.ListaInsumos.length > 5){
        $('#paginationModalInsumos').slideDown()
    }else{
        $('#paginationModalInsumos').hide()
    }

    $('#modalProdutoNomeHeader').text(ProdutoSelecionado.ProdutoNome);

    $('#modalMargemImposto').val(formatarNumeroModal(ProdutoSelecionado.ProdutoMargemImposto));
    $('#modalMargemLucro').val(formatarNumeroModal(ProdutoSelecionado.ProdutoMargemLucro));
    $('#modalCustoProducao').val(formatarNumeroModal(ProdutoSelecionado.ProdutoCalculado[0].CustoBruto));
    $('#modalValorTotalImposto').val(formatarNumeroModal(ProdutoSelecionado.ProdutoCalculado[0].ValorComImposto));
    $('#modalValorTotalLucro').val(formatarNumeroModal(ProdutoSelecionado.ProdutoCalculado[0].ValorComLucro));
    $('#modalValorSugerido').val(formatarNumeroModal(ProdutoSelecionado.ProdutoCalculado[0].ValorSugerido));


    CriaListagem(ProdutoSelecionado.ListaInsumos.reverse(), 'paginationModalInsumos', '#tbModalListaInsumos')
    
}

function FechaModalProdutoCalculado() {
    LimpaCamposDiv('modalCamposProdutoCalculado');
    $("#tableModalListaInsumos tbody").empty();
}

function CarregaTelaCriaProdutos(){
    $('#inputProdutoNome').val(DadosProduto.ProdutoNome)
    $('#inputProdutoMargemImposto').val(DadosProduto.ProdutoMargemImposto ? formatarNumeroDecimal(DadosProduto.ProdutoMargemImposto) : '')
    $('#inputProdutoMargemLucro').val(formatarNumeroDecimal(DadosProduto.ProdutoMargemLucro))
    ProdutoEmAberto = true;
}

function CarregaProdutosCalculados(){
    
    let data = localStorage.getItem('userArray')
    var ListaCalculados = JSON.parse(data)
    console.log(ListaCalculados)
    if(ListaCalculados.length > 0){
        CriaListagem(ListaCalculados.reverse(), 'paginationListaProdutosCalculados', '#tbListaProdutosCalculados');
        //IniciaTooltip();
        AbreSessaoComSlide('collapseProdutosCalculadosLista', 'collapseListaProdutosPrecificados', 'btnCloseHeaderCalculadosDown', 'btnCloseHeaderCalculadosUp', 2000)
        if (ListaCalculados.length > 5) {
            $('#paginationListParodutosCalculados').show();
        } else {
            $('#paginationListaProdutosCalculados').hide();
        }
    }else{
        FechaSessaoComSlide('collapseProdutosCalculadosLista', 'collapseListaProdutosPrecificados', 'btnCloseHeaderCalculadosDown', 'btnCloseHeaderCalculadosUp', 500)
        AbreFechaSessaoListaVazia(true)
    }
}

function FechaCalculados(){
    let data = localStorage.getItem('userArray')
    var ListaCalculados = JSON.parse(data)
    if(ListaCalculados.length > 0 ){
        FechaSessaoComSlide('collapseProdutosCalculadosLista', 'collapseListaProdutosPrecificados', 'btnCloseHeaderCalculadosDown', 'btnCloseHeaderCalculadosUp', 500)
    }else{
        AbreFechaSessaoListaVazia(false)
    }
}
//==========================Métodos Validate =================================//

function IniciaValidateCriaProdutos(){
    $("#collapseCriadorDeProdutos").validate({
        errorPlacement: function(error, element) {
            error.insertAfter(element.parents('.form-group').find('.error-message').last());
        },

        rules: {
            inputProdutoNome: {
                required: true,
            },
            ProdutoMargemLucro: {
                required: true,
            },
          },
          messages: {
            inputProdutoNome:{
                required: "Campo obrigatório.",
             
            },
            ProdutoMargemLucro:{
                required: "Campo obrigatório.",
             
            }
          },
       });
} 

function IniciaValidateAddInsumos(){
    $("#collapseInsumosAddCampos").validate({
        errorPlacement: function(error, element) {
            error.insertAfter(element.parents('.form-group').find('.error-message').last());
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
        ProdutoNome: verificarEIncrementarString($('#inputProdutoNome').val(), ListaProdutosCalculados),
        ProdutoMargemImposto: $('#inputProdutoMargemImposto').val().trim() === '' ? 0 : converteStringPraFloat($('#inputProdutoMargemImposto').val()),
        ProdutoMargemLucro: converteStringPraFloat($('#inputProdutoMargemLucro').val()),
        ProdutoId: $('#inputProdutoNome').val() + (ListaProdutosCalculados.length + 1),
        ListaInsumos: [],
        ProdutoCalculado: []

    }
    return DadosProduto
}

function MontaInsumos() {
    DadosProduto.ListaInsumos.push({
        InsumoNome: verificarEIncrementarString($('#inputInsumoNome').val(), DadosProduto.ListaInsumos),
        InsumoTipoMedida: $('#selectInsumoTipoMedida').val(),
        InsumoTipoMedidaDescricao: retornaTipoMedidaDescricao($('#selectInsumoTipoMedida').val()),
        InsumoQuantidadeEmbalagem: converteStringPraFloat($('#inputInsumoQuantidadeEmbalagem').val()),
        InsumoValor: converteStringPraFloat($('#inputInsumoValor').val()),
        InsumoPorcao: converteStringPraFloat($('#inputInsumoPorcao').val()),
        InsumoId: $('#inputInsumoNome').val() + (DadosProduto.ListaInsumos.length + 27)
    });
}


