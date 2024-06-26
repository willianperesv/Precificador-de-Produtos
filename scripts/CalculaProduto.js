function ComporValorProduto(dadosProduto) {
    var custoBruto = 0;
    var ProdutoCalculado = null;
    var produtoMargemLucro = parseFloat(dadosProduto.ProdutoMargemLucro);
    var produtoMargemImposto = parseFloat(dadosProduto.ProdutoMargemImposto);

    var insumos = dadosProduto.ListaInsumos

    insumos.map(item => {
        custoBruto += CalculaCustoBruto(item.InsumoPorcao, item.InsumoQuantidadeEmbalagem, item.InsumoValor);
    })

    ProdutoCalculado = {
        CustoBruto: custoBruto,
        ValorComLucro: AdicionarPercentual(custoBruto, produtoMargemLucro),
        ValorComImposto: AdicionarPercentual(custoBruto, produtoMargemImposto),
        ValorSugerido: AdicionarPercentual(custoBruto, (produtoMargemLucro + produtoMargemImposto))
    }

    return ProdutoCalculado
}


function CalculaCustoBruto(insumoPorcao, insumoQuantidadeEmbalagem, insumoValor){
    var porcaoPorProducao = parseFloat(insumoPorcao) / parseFloat(insumoQuantidadeEmbalagem);
    var custoInsumoPorProducao = porcaoPorProducao * parseFloat(insumoValor);
    return custoInsumoPorProducao;
}
