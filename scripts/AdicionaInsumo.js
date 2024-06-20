function ComporValor(){
    $('#btnComporValor').removeClass('btn-primary')
    $('#btnComporValor').css('color', 'white')
    $('#btnComporValor').addClass('btn-warning')
}

function CriaListagem(dadosInsumo, idPagination, tbodyId) {
   
    const linhasPorPagina = 5;
    const totalLinhas = dadosInsumo.length;
    const totalPaginas = Math.ceil(totalLinhas / linhasPorPagina);

    function exibirTabela(pagina) {
        const inicio = (pagina - 1) * linhasPorPagina;
        const final = inicio + linhasPorPagina;
        const dadosPaginados = dadosInsumo.slice(inicio, final);
        
        $(tbodyId).empty();
        dadosPaginados.forEach(data => {
            if(tbodyId == '#tbListaInsumos' ){
                var custoInsumo = CalculaCustoBruto(data.InsumoPorcao, data.InsumoQuantidadeEmbalagem, data.InsumoValor);
                let novaLinha = $('<tr>').append(
                    $('<td>').html(data.InsumoNome),
                    $('<td>').html('<span>' + data.InsumoTipoMedidaDescricao + '</span><span class="AjusteValor"> ' + trataExibicaoListaInsumoQuantidades(data.InsumoTipoMedida, data.InsumoQuantidadeEmbalagem) + '</span>'),
                    $('<td>').html('<span>R$</span><span class="AjusteValor"> ' + formatarNumeroMonetario(data.InsumoValor) + '</span>'),
                    $('<td>').html('<span>' + data.InsumoTipoMedidaDescricao + '</span><span class="AjusteValor"> ' + trataExibicaoListaInsumoQuantidades(data.InsumoTipoMedida, data.InsumoPorcao) + '</span>'),
                    $('<td>').html('<span>R$</span><span class="AjusteValor"> ' + formatarNumeroMonetario(custoInsumo.toFixed(2)) + '</span>'),
                    $('<td class="text-center">').html(`<button type="button" class="btn text-center btn-danger btn-remover buttonVisualizaProduto" onclick="ExcluiInsumo('${data.InsumoId}')"><img id="visualizaIcon" src="/styles/trashIcon.png" alt="Excluir Produto"></button>`)
                );
                novaLinha.appendTo(tbodyId);

            }else if(tbodyId == '#tbListaProdutosCalculados'){
                let novaLinha = $('<tr>').append(
                    $('<td>').html(data.ProdutoNome),
                    $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor ">' + formatarNumeroMonetario(data.ProdutoCalculado[0].CustoBruto.toFixed(2)) + '</span>'),
                    $('<td>').html('<span class="AjusteMoeda">R$</span><span class="AjusteValor ">' + formatarNumeroMonetario(data.ProdutoCalculado[0].ValorSugerido.toFixed(2)) + '</span>'),
                    $('<td class="text-center">').html(`<button type="button" class="btn btn-primary buttonVisualizaProduto" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onclick="PreencheModalProdutoCalculado('${data.ProdutoId}')"><img id="visualizaIcon" src="/styles/eyeIcon.png" alt="Visualizar Detalhes do Produto"></button>`), 
                    $('<td class="text-center">').html(`<button type="button" class="btn text-center btn-danger btn-remover buttonVisualizaProduto" onclick="ExcluiProdutoCalculado('${data.ProdutoId}')"><img id="visualizaIcon" src="/styles/trashIcon.png" alt="Excluir Produto"></button>`)
                );
                novaLinha.appendTo(tbodyId);
            }else{
                var custoInsumo = CalculaCustoBruto(data.InsumoPorcao, data.InsumoQuantidadeEmbalagem, data.InsumoValor)
                let novaLinha = $('<tr>').append(
                    $('<td>').html(data.InsumoNome),
                    $('<td>').html('<span>'+ data.InsumoTipoMedidaDescricao+'</span><span class="AjusteValor"> ' + trataExibicaoListaInsumoQuantidades(data.InsumoTipoMedida, data.InsumoQuantidadeEmbalagem) + '</span>'),
                    $('<td>').html('<span>R$</span><span class="AjusteValor"> ' + formatarNumeroMonetario(data.InsumoValor.toFixed(2)) + '</span>'),
                    $('<td>').html('<span>'+ data.InsumoTipoMedidaDescricao +'</span><span class="AjusteValor"> ' + trataExibicaoListaInsumoQuantidades(data.InsumoTipoMedida, data.InsumoPorcao) + '</span>'),
                    $('<td>').html('<span>R$</span><span class="AjusteValor"> ' + formatarNumeroMonetario(custoInsumo.toFixed(2)) + '</span>'),
                );
                novaLinha.appendTo(tbodyId);
            }

        });
    }

    function configurarPaginacao(idPagination) {
        $('#' + idPagination + ' .pagination').empty();

        let itemAnterior = $('<li class="page-item disabled"><a class="page-link" href="#"><<</a></li>');
        $('#' + idPagination + ' .pagination').append(itemAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            let itemPagina = $(`<li class="page-item ${i === 1 ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`);
            $('#' + idPagination + ' .pagination').append(itemPagina);
        }

        let itemProximo = $('<li class="page-item"><a class="page-link" href="#">>></a></li>');
        if (totalPaginas <= 1) {
            itemProximo.addClass('disabled');
        }
        $('#' + idPagination + ' .pagination').append(itemProximo);

        $('#' + idPagination + ' .page-link').click(function(e) {
            e.preventDefault();
            const itemPagina = $(this).parent();

            if (itemPagina.hasClass('active')) {
                return;
            }

            const pagina = parseInt($(this).text());
            $('#' + idPagination + ' .page-item').removeClass('active');
            itemPagina.addClass('active');

            exibirTabela(pagina);

            if (pagina > 1) {
                $('#' + idPagination + ' .page-item:first').removeClass('disabled');
            } else {
                $('#' + idPagination + ' .page-item:first').addClass('disabled');
            }

            if (pagina === totalPaginas) {
                $('#' + idPagination + ' .page-item:last').addClass('disabled');
            } else {
                $('#' + idPagination + ' .page-item:last').removeClass('disabled');
            }
        });

        $('#' + idPagination + ' .page-item:first').click(function(e) {
            e.preventDefault();
            const paginaAtual = parseInt($('#' + idPagination + ' .pagination .active .page-link').text());

            if (paginaAtual !== 1) {
                const novaPagina = 1;
                $('#' + idPagination + ' .pagination .active').removeClass('active');
                $('#' + idPagination + ' .pagination .page-item:first').addClass('active');
                exibirTabela(novaPagina);

                $(this).addClass('disabled');
                $('#' + idPagination + ' .page-item:last').removeClass('disabled');
            }
        });

        $('#' + idPagination + ' .page-item:last').click(function(e) {
            e.preventDefault();
            const paginaAtual = parseInt($('#' + idPagination + ' .pagination .active .page-link').text());

            if (paginaAtual !== totalPaginas) {
                const novaPagina = totalPaginas;
                $('#' + idPagination + ' .pagination .active').removeClass('active');
                $('#' + idPagination + ' .pagination .page-item:last').addClass('active');
                exibirTabela(novaPagina);

                $(this).addClass('disabled');
                $('#' + idPagination + ' .page-item:first').removeClass('disabled');
            }
        });
        if (totalPaginas <= 1) {
            $('#' + idPagination + ' .page-item:last').addClass('disabled');
        }
    }

    exibirTabela(1);
    configurarPaginacao(idPagination);
}


function trataExibicaoListaInsumoQuantidades(tipoMedida, quantidade){
    var quantidadeTratada = null
    if(tipoMedida == 1){
       quantidadeTratada = adicionarPontosMilhares(quantidade)
    }else{
        quantidadeTratada = formatarNumeroMonetario(quantidade.toFixed(2))
    }

    return quantidadeTratada
}


