// =====================================================
// AVALIAÇÕES
// =====================================================

function carregarAvaliacoes() {

    let avaliacoes =
        JSON.parse(
            localStorage.getItem("avaliacoes")
        ) || [];


    let area =
        document.getElementById(
            "listaAvaliacoes"
        );


    area.innerHTML = "";


    let total = 0;

    let soma = 0;

    let livros = {};


    if (avaliacoes.length === 0) {

        area.innerHTML =
            "<p>Nenhuma avaliação recebida.</p>";

        document.getElementById(
            "totalAvaliacoes"
        ).innerHTML = "0";

        document.getElementById(
            "mediaGeral"
        ).innerHTML = "0";

        document.getElementById(
            "totalLivros"
        ).innerHTML = "0";

        return;
    }



    avaliacoes.forEach(function(item) {


        total++;


        let estrelasNota =
            Number(item.estrelas) || 0;


        soma += estrelasNota;


        let nomeLivro =
            item.livro || "Livro não informado";


        if (!livros[nomeLivro]) {

            livros[nomeLivro] = 0;

        }


        livros[nomeLivro]++;



        // =================================================
        // ESTRELAS
        // =================================================

        let estrelas = "";


        for (
            let i = 0;
            i < estrelasNota;
            i++
        ) {

            estrelas += "⭐";

        }



        // =================================================
        // VERIFICAR SE JÁ FOI RECOMENDADO
        // =================================================

        let recomendado =
            livroEstaRecomendado(nomeLivro);



        let botaoRecomendacao = "";


        if (recomendado) {

            botaoRecomendacao = `

                <button
                    class="atualizar"
                    onclick="removerRecomendacao('${escaparTexto(nomeLivro)}')">

                    ❌ Remover Recomendação

                </button>

                <p>
                    ⭐ <strong>
                        Este livro está recomendado aos alunos.
                    </strong>
                </p>

            `;

        } else {

            botaoRecomendacao = `

                <button
                    class="atualizar"
                    onclick="recomendarLivro('${escaparTexto(nomeLivro)}')">

                    ⭐ Recomendar Livro aos Alunos

                </button>

            `;

        }



        // =================================================
        // MOSTRAR AVALIAÇÃO
        // =================================================

        area.innerHTML += `

            <div class="item">

                <h3>
                    📖 ${escaparHTML(nomeLivro)}
                </h3>


                <p>
                    👨‍🎓 Aluno:
                    ${escaparHTML(
                        item.aluno || "Aluno"
                    )}
                </p>


                <p>
                    ${estrelas}
                </p>


                <p>
                    💬
                    ${escaparHTML(
                        item.comentario || ""
                    )}
                </p>


                <hr>


                <p>
                    <strong>
                        📚 Ação do Bibliotecário
                    </strong>
                </p>


                ${botaoRecomendacao}

            </div>

        `;

    });



    // =====================================================
    // RESUMO
    // =====================================================

    document.getElementById(
        "totalAvaliacoes"
    ).innerHTML = total;


    document.getElementById(
        "mediaGeral"
    ).innerHTML =
        (soma / total).toFixed(1);


    document.getElementById(
        "totalLivros"
    ).innerHTML =
        Object.keys(livros).length;


    mostrarRanking(livros);

}



// =====================================================
// RECOMENDAR LIVRO
// =====================================================

function recomendarLivro(titulo) {

    if (!titulo) {

        return;

    }


    let livros =
        JSON.parse(
            localStorage.getItem(
                "livrosBiblioteca"
            )
        ) || [];


    // Procurar o livro pelo título

    let livroEncontrado =
        livros.find(function(livro) {

            return (
                String(livro.titulo || "")
                    .trim()
                    .toLowerCase() ===
                String(titulo)
                    .trim()
                    .toLowerCase()
            );

        });



    // =================================================
    // SE O LIVRO JÁ EXISTE
    // =================================================

    if (livroEncontrado) {

        livroEncontrado.recomendado = true;

    }


    // =================================================
    // SE O LIVRO AINDA NÃO EXISTE
    // =================================================

    else {

        livros.push({

            id: Date.now(),

            titulo: titulo,

            autor: "",

            categoria: "",

            motivo:
                "Recomendado pelo bibliotecário com base nas avaliações dos alunos.",

            recomendado: true

        });

    }



    localStorage.setItem(
        "livrosBiblioteca",
        JSON.stringify(livros)
    );


    alert(
        `⭐ "${titulo}" foi recomendado aos alunos!`
    );


    carregarAvaliacoes();

}



// =====================================================
// REMOVER RECOMENDAÇÃO
// =====================================================

function removerRecomendacao(titulo) {

    let livros =
        JSON.parse(
            localStorage.getItem(
                "livrosBiblioteca"
            )
        ) || [];


    let livroEncontrado =
        livros.find(function(livro) {

            return (
                String(livro.titulo || "")
                    .trim()
                    .toLowerCase() ===
                String(titulo)
                    .trim()
                    .toLowerCase()
            );

        });



    if (!livroEncontrado) {

        return;

    }


    livroEncontrado.recomendado = false;


    localStorage.setItem(
        "livrosBiblioteca",
        JSON.stringify(livros)
    );


    alert(
        `❌ "${titulo}" foi retirado das recomendações.`
    );


    carregarAvaliacoes();

}



// =====================================================
// VERIFICAR SE LIVRO JÁ FOI RECOMENDADO
// =====================================================

function livroEstaRecomendado(titulo) {

    let livros =
        JSON.parse(
            localStorage.getItem(
                "livrosBiblioteca"
            )
        ) || [];


    let livro =
        livros.find(function(item) {

            return (
                String(item.titulo || "")
                    .trim()
                    .toLowerCase() ===
                String(titulo || "")
                    .trim()
                    .toLowerCase()
            );

        });


    return (
        livro &&
        livro.recomendado === true
    );

}



// =====================================================
// RANKING
// =====================================================

function mostrarRanking(livros) {

    let area =
        document.getElementById(
            "rankingLivros"
        );


    area.innerHTML = "";


    let lista =
        Object.entries(livros)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );



    if (lista.length === 0) {

        area.innerHTML =
            "<p>Nenhum livro avaliado.</p>";

        return;

    }



    lista.forEach(
        function(item, index) {


            area.innerHTML += `

                <div class="item">

                    ${index + 1}º

                    📚
                    ${escaparHTML(item[0])}

                    -

                    ${item[1]}

                    ${
                        item[1] === 1
                        ? "avaliação"
                        : "avaliações"
                    }

                </div>

            `;

        }
    );

}



// =====================================================
// EMPRÉSTIMOS
// =====================================================

function carregarEmprestimos() {

    let emprestimos =
        JSON.parse(
            localStorage.getItem(
                "emprestimos"
            )
        ) || [];


    let area =
        document.getElementById(
            "listaEmprestimos"
        );


    area.innerHTML = "";


    if (emprestimos.length === 0) {

        area.innerHTML =
            "<p>Nenhum empréstimo registrado.</p>";

        return;

    }


    let livros = {};



    emprestimos.forEach(
        function(item) {


            let nomeLivro =
                item.livro ||
                "Livro não informado";


            if (!livros[nomeLivro]) {

                livros[nomeLivro] = 0;

            }


            livros[nomeLivro]++;

        }
    );



    Object.entries(livros)

        .sort(
            (a, b) =>
                b[1] - a[1]
        )

        .forEach(
            function(item) {


                area.innerHTML += `

                    <div class="item">

                        📖
                        ${escaparHTML(item[0])}

                        -

                        ${item[1]}

                        ${
                            item[1] === 1
                            ? "empréstimo"
                            : "empréstimos"
                        }

                    </div>

                `;

            }
        );

}



// =====================================================
// PROTEÇÃO CONTRA HTML
// =====================================================

function escaparHTML(texto) {

    let div =
        document.createElement("div");


    div.textContent =
        String(texto || "");


    return div.innerHTML;

}



// =====================================================
// PROTEÇÃO PARA USAR TÍTULO NO ONCLICK
// =====================================================

function escaparTexto(texto) {

    return String(texto || "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");

}



// =====================================================
// INICIAR
// =====================================================

window.onload = function() {

    carregarAvaliacoes();

    carregarEmprestimos();

};
