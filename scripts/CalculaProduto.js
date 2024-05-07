function ComporValorProduto(dadosProduto) {
    console.log(dadosProduto)
    var custoBruto = 0;
    var ProdutoCalculado = null;
    var produtoMargemLucro = parseFloat(dadosProduto.ProdutoMargemLucro);
    var produtoMargemImposto = parseFloat(dadosProduto.ProdutoMargemImposto);

    var insumos = dadosProduto.ListaInsumos

    insumos.map(item => {
        switch (item.InsumoTipoMedida) {
            case '1':
                custoBruto += CalculaUnidade(parseFloat(item.InsumoPorcao), parseFloat(item.InsumoQuantidadeEmbalagem), parseFloat(item.InsumoValor))
                break;
            case '2':
                CalculaMetro();
                break;
    
            case '3':
                CalculaQuilo();
                break;
            case '4':
                CalculaLitro();
                break;
            default:
                TipoMedidaEnum = 5
                console.log("Tipo de medida não reconhecido");
        }

    })

    ProdutoCalculado = {
        CustoBruto: custoBruto,
        ValorComLucro: AdicionarPercentual(custoBruto, produtoMargemLucro),
        ValorComImposto: AdicionarPercentual(custoBruto, produtoMargemImposto),
        ValorSugerido: AdicionarPercentual(custoBruto, (produtoMargemLucro + produtoMargemImposto))
    }

    return ProdutoCalculado
}

function MontaTabelaProdutosCalculados(custoCalculado, nomeProduto) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(nomeProduto),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.CustoBruto.toFixed(2) + '</span>'),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorSugerido.toFixed(2) + '</span>'),
        $('<td class="text-center btn-remover">').html('<i class="" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm280-80q-82 0-146.5-44.5T240-440q29-71 93.5-115.5T480-600q82 0 146.5 44.5T720-440q-29 71-93.5 115.5T480-280Zm0-60q56 0 102-26.5t72-73.5q-26-47-72-73.5T480-540q-56 0-102 26.5T306-440q26 47 72 73.5T480-340Zm0-100Zm0 60q25 0 42.5-17.5T540-440q0-25-17.5-42.5T480-500q-25 0-42.5 17.5T420-440q0 25 17.5 42.5T480-380Z"/></svg></i>'), 
        $('<td class="text-center btn-remover">').html('<i  &#xF877 class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    );

    novaLinha.appendTo('#tbListaProdutosCalculados');
}

function CalculaUnidade(insumoPorcao, insumoQuantidadeEmbalagem, insumoValor){
    var porcaoPorProducao = parseFloat(insumoPorcao) / parseFloat(insumoQuantidadeEmbalagem);
    var custoInsumoPorProducao = porcaoPorProducao * parseFloat(insumoValor);
    return custoInsumoPorProducao;
}

function CalculaMetro(){
  console.log('calculaUnidade')
}
function CalculaQuilo(){
  console.log('calculaUnidade')
}

























// function CalculaCustoComposto() {
//     var minhaTabela = document.getElementById("hdListaInsumos");
//     const linhas = minhaTabela.querySelectorAll("tbody tr");
//     var valorMargemLucro=  parseFloat($('#inpMargemLucro').val());
//     var valorMargemImposto= parseFloat($('#inpMargemImposto').val())
//     var custoTotal = null;
//     var custoCalculado = null;
   

//     linhas.forEach(function (linha) {
//         var qtdEmbalagem = parseFloat(linha.cells[2].textContent.trim().replace(",", "."));
//         var qtdMinima = parseFloat(linha.cells[3].textContent.trim().replace(",", "."));
//         var valorInsumo = parseFloat(linha.cells[4].textContent.trim().replace("R$", "").replace(",", "."));
//         var custoProduto = CalculaInsumo(qtdEmbalagem, qtdMinima, valorInsumo, VerificaTipoMedida(linha.cells[1].textContent));
//         custoTotal += custoProduto;
//     });
//     custoCalculado = {
//         NomeProduto: $('#NomeProduto').val(),
//         ValorProducao: custoTotal, 
//         ValorComLucro: AdicionarPercentual(custoTotal, valorMargemLucro),
//         ValorComImposto: AdicionarPercentual(custoTotal, valorMargemImposto),
//         ValorSugerido: AdicionarPercentual(custoTotal, (valorMargemLucro + valorMargemImposto))
//     }
//     ListaValoresProduto(custoCalculado);
// }

// function CalculaInsumo(qtdEmbalagem, qtdMinima, valorInsumo, medida) {
//     var custoInsumoPorProduto = null;
//     if(medida == 5){
//         custoInsumoPorProduto = 0
//     }else{
//         var quantidadeInsumoPorProduto = qtdMinima / qtdEmbalagem;
//         var custoInsumoPorProduto = quantidadeInsumoPorProduto * valorInsumo;
//         return custoInsumoPorProduto;
//     }
// }

// function VerificaTipoMedida(tipoMedida) {
//     var TipoMedidaEnum = null;
//         switch (tipoMedida) {
//             case "Unidade":
//                 TipoMedidaEnum = 1;
//                 break;
//             case "Metro (m)":
//                 TipoMedidaEnum = 2;
//                 break;
    
//             case "Quilograma (kg)":
//                 TipoMedidaEnum = 3;
//                 break;
//             case "Litros":
//                 TipoMedidaEnum = 4;
//                 break;
//             default:
//                 TipoMedidaEnum = 5
//                 console.log("Tipo de medida não reconhecido");
//         }

//     return TipoMedidaEnum 
// }



// function ListaValoresProduto(custoCalculado) {
//     $('<tr>').append(
//         $('<td>').html(custoCalculado.NomeProduto),
//         $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorProducao.toFixed(2) + '</span>'),
//         $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorComImposto.toFixed(2) + '</span>'),
//         $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorComLucro.toFixed(2) + '</span>'),
//         $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor mascaraMonetaria">' + custoCalculado.ValorSugerido.toFixed(2) + '</span>'),
//         $('<td class="text-center btn-remover">').html('<i class="fas fa-trash-alt" style="cursor: pointer;"></i>')
//     ).appendTo('#tabListaValoresProduto');
// }



