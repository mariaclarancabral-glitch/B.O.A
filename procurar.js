

window.onload = function () {
    pesquisarLivro();
}

function pesquisarLivro(){

    let nome = document.getElementById("nome").value.toLowerCase();

    let autor = document.getElementById("autor").value.toLowerCase();

    let genero = document.getElementById("genero").value.toLowerCase();

    let ano = document.getElementById("ano").value;

    let isbn = document.getElementById("isbn").value.toLowerCase();

    let idioma = document.getElementById("idioma").value.toLowerCase();

    let editora = document.getElementById("editora").value.toLowerCase();

    let localizacao = document.getElementById("localizacao").value.toLowerCase();

    let livros =
        JSON.parse(localStorage.getItem("livros")) || [];

    let tabela = document.getElementById("resultado");

    tabela.innerHTML = "";

    livros.forEach(function(livro){

        if(

            (nome=="" || livro.titulo.toLowerCase().includes(nome)) &&

            (autor=="" || livro.autor.toLowerCase().includes(autor)) &&

            (genero=="" || livro.genero.toLowerCase().includes(genero)) &&

            (ano=="" || livro.ano==ano) &&

            (isbn=="" || livro.isbn.toLowerCase().includes(isbn)) &&

            (idioma=="" || livro.idioma.toLowerCase()==idioma) &&

            (editora=="" || livro.editora.toLowerCase().includes(editora)) &&

            (localizacao=="" || livro.localizacao.toLowerCase().includes(localizacao))

        ){

            tabela.innerHTML += `
            <tr>

                <td>${livro.isbn}</td>

                <td>${livro.titulo}</td>

                <td>${livro.autor}</td>

                <td>${livro.genero}</td>

                <td>${livro.ano}</td>

                <td>${livro.idioma}</td>

                <td>${livro.editora}</td>

                <td>${livro.localizacao}</td>

            </tr>
            `;

        }

    });

    if(tabela.innerHTML==""){

        tabela.innerHTML = `
        <tr>
            <td colspan="8">
                Nenhum livro encontrado.
            </td>
        </tr>
        `;
    }

}


