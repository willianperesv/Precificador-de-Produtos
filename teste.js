//  function CalculaCustoComposto() {
//     var minhaTabela = document.getElementById("hdListaInsumos");
//      const linhas = minhaTabela.querySelectorAll("tbody tr");
//      var valorMargemLucro=  parseFloat($('#inpMargemLucro').val());
//      var valorMargemImposto= parseFloat($('#inpMargemImposto').val())
//      var custoTotal = null;
//     var custoCalculado = null;
   

//      linhas.forEach(function (linha) {
//       var qtdEmbalagem = parseFloat(linha.cells[2].textContent.trim().replace(",", "."));
//        var qtdMinima = parseFloat(linha.cells[3].textContent.trim().replace(",", "."));
//         var valorInsumo = parseFloat(linha.cells[4].textContent.trim().replace("R$", "").replace(",", "."));
//         var custoProduto = CalculaInsumo(qtdEmbalagem, qtdMinima, valorInsumo, VerificaTipoMedida(linha.cells[1].textContent));
//       custoTotal += custoProduto;
//    });
//      custoCalculado = {
//          NomeProduto: $('#NomeProduto').val(),
//          ValorProducao: custoTotal, 
//          ValorComLucro: AdicionarPercentual(custoTotal, valorMargemLucro),
//          ValorComImposto: AdicionarPercentual(custoTotal, valorMargemImposto),
//          ValorSugerido: AdicionarPercentual(custoTotal, (valorMargemLucro + valorMargemImposto))
//      }
//      ListaValoresProduto(custoCalculado);
//  }

//  function CalculaInsumo(qtdEmbalagem, qtdMinima, valorInsumo, medida) {
//     var custoInsumoPorProduto = null;
//      if(medida == 5){
//          custoInsumoPorProduto = 0
//      }else{
//          var quantidadeInsumoPorProduto = qtdMinima / qtdEmbalagem;
//          var custoInsumoPorProduto = quantidadeInsumoPorProduto * valorInsumo;
//          return custoInsumoPorProduto;
//      }
//  }
