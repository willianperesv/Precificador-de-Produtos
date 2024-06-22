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

function MontaTabelaProdutosCalculados(custoCalculado, nomeProduto, produtoId) {
    let novaLinha = $('<tr>').append(
        $('<td>').html(nomeProduto),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor ">' + formatarNumeroMonetario(custoCalculado.CustoBruto.toFixed(2)) + '</span>'),
        $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor ">' + formatarNumeroMonetario(custoCalculado.ValorSugerido.toFixed(2)) + '</span>'),
        $('<td class="text-center">').html(`<button type="button" class="btn btn-primary buttonVisualizaProduto" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onclick="PreencheModalProdutoCalculado('${produtoId}')"><img id="visualizaIcon" src="/styles/eyeIcon.png" alt="Visualizar Detalhes do Produto"></button>`), 
        $('<td class="text-center btn-remover">').html('<i  &#xF877 class="fas fa-trash-alt" style="cursor: pointer;"></i>')
    );

    novaLinha.appendTo('#tbListaProdutosCalculados');
}

function CalculaCustoBruto(insumoPorcao, insumoQuantidadeEmbalagem, insumoValor){
    var porcaoPorProducao = parseFloat(insumoPorcao) / parseFloat(insumoQuantidadeEmbalagem);
    var custoInsumoPorProducao = porcaoPorProducao * parseFloat(insumoValor);
    return custoInsumoPorProducao;
}
