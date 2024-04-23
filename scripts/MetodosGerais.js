var AbreCollapseInsumosAddCampos = false;
var AbreCollapseListaDeInsumo = false;
var AbreCollapseCriadorDeProdutos = false;
var AbreCollapseProdutosCalculados = false;

//=========Métodos Gerais ===============//
function FormatarCampoMonetario() {
    // Selecione o elemento de entrada pelo ID
    var campo = document.getElementById('maskValorInsumo');

    // Aplica a máscara monetária
    var mask = new IMask(campo, {
        mask: 'R$ num',
        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                radix: ','
            }
        }
    });
}

function RemoverLinha() {
    $(this).closest('tr').remove();
}

function MascaraMonetaria(valor){
    valorTratado = valor.maskMoney({
        thousands: '.',
        decimal: ',',
        prefix: 'R$ ',
        precision: 2,
        allowNegative: false
    });
    return valorTratado
}

function AdicionarPercentual(valor, percentual) {
    return valor + (valor * percentual / 100);
}
//---------Cancela Collapse -------------//

function NoCollapse(btnId, alteraCor, corBotao, NovaCor){
    if(alteraCor){
        $('#' + btnId).removeClass(corBotao)
        $('#' + btnId).addClass(NovaCor);
    }
    $('#' + btnId).removeAttr('data-bs-toggle');
}

function OpenCollapse(elemento) {
    console.log('OpenCollapse')
    $('#collapseInsumosLista').slideDown();
    $('#' + elemento).removeAttr('style');
}

function CloseCollapse(elemento) {
    $(elemento).slideUp();
        switch (elemento) {
            case "#collapseCriadorDeProdutos":
                CollapseCriadorDeProdutos();
                break;
            case "#collapseInsumosAddCampo":
                AbreCollapseInsumosAddCampos = true;
                break;
    
            case "#collapseListaAdicionados":
                CollapseInsumosLista()
               
                break;
            case "#collapseProdutosCalculadosLista":
                AbreCollapseProdutosCalculados = true;
                break;
            default:
        }
}

function HideCollapseInsumosAddCampos(){
    if(!AbreCollapseInsumosAddCampos){
        $('#collapseInsumosAddCampos').slideUp();
        $('#btnCloseHeaderAddInsumosDown').show()
        $('#btnCloseHeaderAddInsumosUp').hide()
        AbreCollapseInsumosAddCampos = true;
    }else{
        $('#collapseInsumosAddCampos').slideDown();
        $('#btnCloseHeaderAddInsumosDown').hide()
        $('#btnCloseHeaderAddInsumosUp').show()
        AbreCollapseInsumosAddCampos = false;
    }
}

function CollapseInsumosLista() {
    if(!AbreCollapseListaDeInsumo){
        $('#collapseInsumosLista').slideUp();
        $('#btnCloseHeaderInsumoListaDown').show();
        $('#btnCloseHeaderInsumoListaUp').hide();
        AbreCollapseListaDeInsumo = true;
    }else{
        $('#collapseInsumosLista').slideDown();
        $('#btnCloseHeaderInsumoListaDown').hide();
        $('#btnCloseHeaderInsumoListaUp').show();
        AbreCollapseListaDeInsumo = false;
    }
}

function CollapseCriadorDeProdutos() {
    if(!AbreCollapseCriadorDeProdutos){
        $('#collapseCriadorDeProdutos').slideUp();
        $('#btnCloseCriadorDeProdutosDown').show();
        $('#btnCloseCriadorDeProdutosUp').hide();
        AbreCollapseCriadorDeProdutos = true;
    }else{
        $('#collapseCriadorDeProdutos').slideDown();
        $('#btnCloseCriadorDeProdutosDown').hide();
        $('#btnCloseCriadorDeProdutosUp').show();
        AbreCollapseCriadorDeProdutos = false;
    }
}

function CollapseProdutosCalculados() {
    console.log('precificados')
    if(!AbreCollapseProdutosCalculados){
        $('#collapseListaProdutosPrecificados').slideUp();
        $('#btnCloseHeaderCalculadosDown').show();
        $('#btnCloseHeaderCalculadosUp').hide();
        AbreCollapseProdutosCalculados = true;
    }else{
        $('#collapseListaProdutosPrecificados').slideDown();
        $('#btnCloseHeaderCalculadosDown').hide();
        $('#btnCloseHeaderCalculadosUp').show();
        AbreCollapseProdutosCalculados = false;
    }
}

//---------Limpa Campos------------------//

function LimpaCamposDiv(divId) {
    $('#' + divId +' :input').val('');
  }

function LimpaCamposAdicionaInsumo(){
    $('#formAdicionaInsumo :input').val('');
}


