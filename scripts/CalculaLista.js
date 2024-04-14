function CalculaCustoComposto() {
    var minhaTabela = document.getElementById("hdListaInsumos");
    const linhas = minhaTabela.querySelectorAll("tbody tr");
    var valorMargemLucro=  parseFloat($('#inpMargemLucro').val());
    var valorMargemImposto= parseFloat($('#inpMargemImposto').val())
    var custoTotal = null;
    var custoCalculado = null;
   

    linhas.forEach(function (linha) {
        var qtdEmbalagem = parseFloat(linha.cells[2].textContent.trim().replace(",", "."));
        var qtdMinima = parseFloat(linha.cells[3].textContent.trim().replace(",", "."));
        var valorInsumo = parseFloat(linha.cells[4].textContent.trim().replace("R$", "").replace(",", "."));
        var custoProduto = CalculaInsumo(qtdEmbalagem, qtdMinima, valorInsumo, VerificaTipoMedida(linha.cells[1].textContent));
        custoTotal += custoProduto;
    });
    custoCalculado = {
        NomeProduto: $('#NomeProduto').val(),
        ValorProducao: custoTotal, 
        ValorComLucro: AdicionarPercentual(custoTotal, valorMargemLucro),
        ValorComImposto: AdicionarPercentual(custoTotal, valorMargemImposto),
        ValorSugerido: AdicionarPercentual(custoTotal, (valorMargemLucro + valorMargemImposto))
    }
    ListaValoresProduto(custoCalculado);
}

function CalculaInsumo(qtdEmbalagem, qtdMinima, valorInsumo, medida) {
    var custoInsumoPorProduto = null;
    if(medida == 5){
        custoInsumoPorProduto = 0
    }else{
        var quantidadeInsumoPorProduto = qtdMinima / qtdEmbalagem;
        var custoInsumoPorProduto = quantidadeInsumoPorProduto * valorInsumo;
        return custoInsumoPorProduto;
    }
}

function VerificaTipoMedida(tipoMedida) {
    var TipoMedidaEnum = null;
        switch (tipoMedida) {
            case "Unidade":
                TipoMedidaEnum = 1;
                break;
            case "Metro (m)":
                TipoMedidaEnum = 2;
                break;
    
            case "Quilograma (kg)":
                TipoMedidaEnum = 3;
                break;
            case "Litros":
                TipoMedidaEnum = 4;
                break;
            default:
                TipoMedidaEnum = 5
                console.log("Tipo de medida não reconhecido");
        }

    return TipoMedidaEnum 
}



function ListaValoresProduto(custoCalculado) {
    $('<tr>').append(
        $('<td>').html(custoCalculado.NomeProduto),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorProducao.toFixed(2) + '</span>'),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorComImposto.toFixed(2) + '</span>'),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorComLucro.toFixed(2) + '</span>'),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorSugerido.toFixed(2) + '</span>'),
        $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    ).appendTo('#tabListaValoresProduto');
}



