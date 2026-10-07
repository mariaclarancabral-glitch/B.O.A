// =====================================================
// ÁREA DO ALUNO
// =====================================================


// =====================================================
// CARREGAR LIVROS RECOMENDADOS PELO BIBLIOTECÁRIO
// =====================================================

function carregarLivrosRecomendados() {

    const lista = document.getElementById("listaLivros");

    if (!lista) {
        return;
    }

    const dados = localStorage.getItem("livrosBiblioteca");

    let livros = [];

    try {

        livros = dados ? JSON.parse(dados) : [];

    } catch (erro) {

        console.error("Erro ao ler livros:", erro);

        livros = [];
    }


    // SOMENTE livros que o bibliotecário recomendou
    const recomendados = livros.filter(
        livro => livro.recomendado === true
    );


    lista.innerHTML = "";


    // Nenhum livro recomendado
    if (recomendados.length === 0) {

        lista.innerHTML = `
            <div class="livro-recomendado">
                <p>
                    📚 Nenhum livro foi recomendado pelo bibliotecário no momento.
                </p>
            </div>
        `;

        return;
    }


    // Mostrar somente os recomendados
    recomendados.forEach(livro => {

        const div = document.createElement("div");

        div.className = "livro-recomendado";


        div.innerHTML = `
            <h3>📖 ${escapeHTML(livro.titulo)}</h3>

            ${
                livro.autor
                    ? `<p><strong>Autor:</strong> ${escapeHTML(livro.autor)}</p>`
                    : ""
            }

            ${
                livro.categoria
                    ? `<p><strong>Categoria:</strong> ${escapeHTML(livro.categoria)}</p>`
                    : ""
            }

            ${
                livro.motivo
                    ? `
                        <p>
                            <strong>💡 Por que recomendamos:</strong><br>
                            ${escapeHTML(livro.motivo)}
                        </p>
                    `
                    : ""
            }

            <p>
                ⭐ Recomendado pela biblioteca
            </p>
        `;


        lista.appendChild(div);

    });

}


// =====================================================
// SISTEMA DE ESTRELAS
// =====================================================

let notaSelecionada = 0;


function avaliar(nota) {

    notaSelecionada = nota;


    const estrelas = document.querySelectorAll(".estrela");


    estrelas.forEach((estrela, index) => {

        if (index < nota) {

            estrela.classList.add("selecionada");

        } else {

            estrela.classList.remove("selecionada");

        }

    });


    const textoNota = document.getElementById("notaSelecionada");


    if (textoNota) {

        textoNota.textContent =
            `Você selecionou ${nota} estrela${nota > 1 ? "s" : ""}.`;

    }

}


// =====================================================
// ENVIAR AVALIAÇÃO
// =====================================================

function enviarAvaliacao() {

    const nome =
        document.getElementById("nomeAluno").value.trim();

    const livro =
        document.getElementById("livroAvaliado").value.trim();

    const comentario =
        document.getElementById("comentario").value.trim();


    if (!nome) {

        alert("Digite seu nome.");

        return;
    }


    if (!livro) {

        alert("Digite o nome do livro.");

        return;
    }


    if (!comentario) {

        alert("Digite um comentário.");

        return;
    }


    if (notaSelecionada === 0) {

        alert("Selecione uma quantidade de estrelas.");

        return;
    }


    const avaliacoesSalvas =
        localStorage.getItem("avaliacoesBiblioteca");


    let avaliacoes = [];


    try {

        avaliacoes = avaliacoesSalvas
            ? JSON.parse(avaliacoesSalvas)
            : [];

    } catch (erro) {

        avaliacoes = [];
    }


    const novaAvaliacao = {

        nome: nome,

        livro: livro,

        comentario: comentario,

        nota: notaSelecionada,

        data: new Date().toLocaleString("pt-BR")

    };


    avaliacoes.push(novaAvaliacao);


    localStorage.setItem(
        "avaliacoesBiblioteca",
        JSON.stringify(avaliacoes)
    );


    alert("⭐ Avaliação enviada com sucesso!");


    // Limpar campos

    document.getElementById("nomeAluno").value = "";

    document.getElementById("livroAvaliado").value = "";

    document.getElementById("comentario").value = "";


    notaSelecionada = 0;


    document
        .querySelectorAll(".estrela")
        .forEach(estrela => {

            estrela.classList.remove("selecionada");

        });


    const textoNota =
        document.getElementById("notaSelecionada");


    if (textoNota) {

        textoNota.textContent =
            "Nenhuma estrela selecionada.";

    }

}


// =====================================================
// RECOMENDAÇÕES DOS PROFESSORES
// =====================================================

function carregarRecomendacoes() {

    const lista =
        document.getElementById("listaRecomendacoes");


    if (!lista) {
        return;
    }


    const dados =
        localStorage.getItem("recomendacoesProfessores");


    let recomendacoes = [];


    try {

        recomendacoes =
            dados ? JSON.parse(dados) : [];

    } catch (erro) {

        recomendacoes = [];

    }


    lista.innerHTML = "";


    if (recomendacoes.length === 0) {

        lista.innerHTML = `
            <p>
                Nenhuma recomendação cadastrada.
            </p>
        `;

        return;
    }


    recomendacoes.forEach(recomendacao => {

        const div =
            document.createElement("div");


        div.className =
            "recomendacao-professor";


        div.innerHTML = `

            <h3>
                🎓 ${escapeHTML(recomendacao.titulo || "Livro")}
            </h3>

            ${
                recomendacao.professor
                    ? `
                        <p>
                            <strong>Professor:</strong>
                            ${escapeHTML(recomendacao.professor)}
                        </p>
                    `
                    : ""
            }

            ${
                recomendacao.mensagem
                    ? `
                        <p>
                            ${escapeHTML(recomendacao.mensagem)}
                        </p>
                    `
                    : ""
            }

        `;


        lista.appendChild(div);

    });

}


// =====================================================
// PROTEÇÃO CONTRA HTML
// =====================================================

function escapeHTML(texto) {

    if (texto === undefined || texto === null) {

        return "";

    }


    const div =
        document.createElement("div");


    div.textContent =
        String(texto);


    return div.innerHTML;

}


// =====================================================
// CARREGAR AUTOMATICAMENTE AO ABRIR A PÁGINA
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    carregarLivrosRecomendados();

    carregarRecomendacoes();

});