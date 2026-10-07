// ==============================
// CARREGAR AVALIAÇÕES
// ==============================

let avaliacoes = [];

function carregarAvaliacoes(){

    avaliacoes =
    JSON.parse(localStorage.getItem("avaliacoes")) || [];

    let tabela =
    document.getElementById("listaAvaliacoes");

    tabela.innerHTML = "";

    if(avaliacoes.length == 0){

        tabela.innerHTML = `
        <tr>
            <td colspan="4">
            Nenhuma avaliação encontrada.
            </td>
        </tr>
        `;

        document.getElementById("totalAvaliacoes").innerHTML = "0";
        document.getElementById("mediaEstrelas").innerHTML = "0";
        document.getElementById("melhorLivro").innerHTML = "Nenhum";

        return;

    }

    let soma = 0;

    let livros = {};

    avaliacoes.forEach(function(item){

        soma += Number(item.estrelas);

        if(!livros[item.livro]){

            livros[item.livro] = {
                soma:0,
                qtd:0
            };

        }

        livros[item.livro].soma += Number(item.estrelas);

        livros[item.livro].qtd++;

        let estrelas = "";

        for(let i=0;i<item.estrelas;i++){

            estrelas += "⭐";

        }

        tabela.innerHTML += `

        <tr>

        <td>${item.aluno}</td>

        <td>${item.livro}</td>

        <td class="estrelas">${estrelas}</td>

        <td>${item.comentario}</td>

        </tr>

        `;

    });

    document.getElementById("totalAvaliacoes").innerHTML =
    avaliacoes.length;

    let media =
    (soma/avaliacoes.length).toFixed(1);

    document.getElementById("mediaEstrelas").innerHTML =
    media + " ⭐";



    let melhor = "";
    let maior = 0;

    for(let livro in livros){

        let mediaLivro =
        livros[livro].soma / livros[livro].qtd;

        if(mediaLivro > maior){

            maior = mediaLivro;
            melhor = livro;

        }

    }

    document.getElementById("melhorLivro").innerHTML =
    melhor;

}



// ==============================
// PESQUISAR
// ==============================

function pesquisar(){

    let texto =
    document.getElementById("pesquisa")
    .value
    .toLowerCase();

    let tabela =
    document.getElementById("listaAvaliacoes");

    tabela.innerHTML = "";

    let encontrou = false;

    avaliacoes.forEach(function(item){

        if(

            item.aluno.toLowerCase().includes(texto)

            ||

            item.livro.toLowerCase().includes(texto)

        ){

            encontrou = true;

            let estrelas = "";

            for(let i=0;i<item.estrelas;i++){

                estrelas += "⭐";

            }

            tabela.innerHTML += `

            <tr>

            <td>${item.aluno}</td>

            <td>${item.livro}</td>

            <td class="estrelas">${estrelas}</td>

            <td>${item.comentario}</td>

            </tr>

            `;

        }

    });

    if(!encontrou){

        tabela.innerHTML = `

        <tr>

        <td colspan="4">

        Nenhuma avaliação encontrada.

        </td>

        </tr>

        `;

    }

}



// ==============================
// LIMPAR AVALIAÇÕES
// ==============================

function limparAvaliacoes(){

    let confirmar =
    confirm("Deseja apagar todas as avaliações?");

    if(confirmar){

        localStorage.removeItem("avaliacoes");

        carregarAvaliacoes();

        alert("Avaliações apagadas com sucesso!");

    }

}



// ==============================
// INICIAR
// ==============================

carregarAvaliacoes();

