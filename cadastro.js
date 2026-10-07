// ==========================================
// INICIAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    mostrarLivros();
});


// ==========================================
// SALVAR LIVRO MANUALMENTE
// ==========================================

function salvarLivro() {

    const livro = {
        isbn: document.getElementById("isbn").value.trim(),
        titulo: document.getElementById("titulo").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        ano: document.getElementById("ano").value.trim(),
        idioma: document.getElementById("idioma").value.trim(),
        editora: document.getElementById("editora").value.trim(),
        localizacao: document.getElementById("localizacao").value.trim()
    };


    // Verifica campos obrigatórios

    if (
        livro.isbn === "" ||
        livro.titulo === "" ||
        livro.autor === ""
    ) {
        alert("Preencha o ISBN, o título e o autor.");
        return;
    }


    // Recupera livros existentes

    let livros = JSON.parse(
        localStorage.getItem("livros")
    ) || [];


    // Verifica ISBN duplicado

    const existe = livros.some(
        item => item.isbn === livro.isbn
    );


    if (existe) {
        alert("Esse ISBN já está cadastrado.");
        return;
    }


    // Adiciona livro

    livros.push(livro);


    // Salva

    localStorage.setItem(
        "livros",
        JSON.stringify(livros)
    );


    alert("Livro cadastrado com sucesso! 📚");


    limparFormulario();

    mostrarLivros();
}



// ==========================================
// MOSTRAR LIVROS
// ==========================================

function mostrarLivros() {

    const lista = document.getElementById("listaLivros");

    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    const livros = JSON.parse(
        localStorage.getItem("livros")
    ) || [];


    livros.forEach(function (livro) {

        const linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${escaparHTML(livro.isbn)}</td>
            <td>${escaparHTML(livro.titulo)}</td>
            <td>${escaparHTML(livro.autor)}</td>
            <td>${escaparHTML(livro.ano)}</td>
        `;


        lista.appendChild(linha);

    });

}



// ==========================================
// IMPORTAR CSV DO EXCEL
// ==========================================

function importarLivros() {

    const arquivo = document.getElementById(
        "arquivoExcel"
    ).files[0];


    if (!arquivo) {

        alert(
            "Selecione o arquivo CSV da sua planilha."
        );

        return;
    }


    const leitor = new FileReader();


    leitor.onload = function (evento) {

        const texto = evento.target.result;


        // Separar linhas

        const linhas = texto
            .split(/\r?\n/)
            .filter(linha => linha.trim() !== "");


        if (linhas.length < 2) {

            alert(
                "O arquivo não possui livros."
            );

            return;
        }


        // ==========================================
        // DESCOBRIR O SEPARADOR
        // ==========================================

        const primeiraLinha = linhas[0];

        let separador = ";";


        if (
            primeiraLinha.split(";").length <
            primeiraLinha.split(",").length
        ) {
            separador = ",";
        }


        // ==========================================
        // LER CABEÇALHO
        // ==========================================

        const cabecalho = separarCSV(
            linhas[0],
            separador
        );


        console.log("Colunas encontradas:", cabecalho);


        // ==========================================
        // LOCALIZAR COLUNAS
        // ==========================================

        const colunaISBN =
            encontrarColuna(cabecalho, "ISBN");

        const colunaTitulo =
            encontrarColuna(cabecalho, "Nome do Livro");

        const colunaAutor =
            encontrarColuna(cabecalho, "AUTOR");

        const colunaIdioma =
            encontrarColuna(cabecalho, "IDIOMA");

        const colunaEditora =
            encontrarColuna(cabecalho, "EDITORA");

        const colunaAno =
            encontrarColuna(cabecalho, "ANO DE PUBLICAÇÃO");

        const colunaGenero =
            encontrarColuna(cabecalho, "Genero");

        const colunaLocalizacao =
            encontrarColuna(cabecalho, "localizacao");


        // ==========================================
        // VERIFICAR COLUNAS
        // ==========================================

        if (
            colunaISBN === -1 ||
            colunaTitulo === -1 ||
            colunaAutor === -1
        ) {

            alert(
                "Não foi possível encontrar as colunas ISBN, Nome do Livro e AUTOR."
            );

            return;
        }


        // ==========================================
        // LIVROS JÁ CADASTRADOS
        // ==========================================

        let livros = JSON.parse(
            localStorage.getItem("livros")
        ) || [];


        let importados = 0;

        let duplicados = 0;

        let erros = 0;


        // ==========================================
        // IMPORTAR CADA LIVRO
        // ==========================================

        for (let i = 1; i < linhas.length; i++) {

            try {

                const dados = separarCSV(
                    linhas[i],
                    separador
                );


                const livro = {

                    isbn: limparValor(
                        dados[colunaISBN]
                    ),

                    titulo: limparValor(
                        dados[colunaTitulo]
                    ),

                    autor: limparValor(
                        dados[colunaAutor]
                    ),

                    idioma: colunaIdioma !== -1
                        ? limparValor(dados[colunaIdioma])
                        : "",

                    editora: colunaEditora !== -1
                        ? limparValor(dados[colunaEditora])
                        : "",

                    ano: colunaAno !== -1
                        ? limparAno(dados[colunaAno])
                        : "",

                    genero: colunaGenero !== -1
                        ? limparValor(dados[colunaGenero])
                        : "",

                    localizacao: colunaLocalizacao !== -1
                        ? limparValor(dados[colunaLocalizacao])
                        : ""

                };


                // Ignorar livro sem título

                if (livro.titulo === "") {

                    erros++;

                    continue;
                }


                // ==========================================
                // VERIFICAR DUPLICADO
                // ==========================================

                const existe = livros.some(
                    item =>
                        item.isbn !== "" &&
                        item.isbn === livro.isbn
                );


                if (existe) {

                    duplicados++;

                    continue;
                }


                // ==========================================
                // ADICIONAR
                // ==========================================

                livros.push(livro);

                importados++;

            }

            catch (erro) {

                console.log(
                    "Erro na linha:",
                    i + 1,
                    erro
                );

                erros++;

            }

        }


        // ==========================================
        // SALVAR
        // ==========================================

        localStorage.setItem(
            "livros",
            JSON.stringify(livros)
        );


        // Atualizar tabela

        mostrarLivros();


        // ==========================================
        // RESULTADO
        // ==========================================

        alert(
            "IMPORTAÇÃO CONCLUÍDA!\n\n" +

            "📚 Livros importados: " +
            importados +

            "\n\n⚠️ Livros duplicados: " +
            duplicados +

            "\n\n❌ Linhas com erro: " +
            erros +

            "\n\n📖 Total no sistema: " +
            livros.length
        );


        // Limpar arquivo selecionado

        document.getElementById(
            "arquivoExcel"
        ).value = "";

    };


    // Ler arquivo

    leitor.readAsText(
        arquivo,
        "UTF-8"
    );
}



// ==========================================
// SEPARAR CSV
// ==========================================

function separarCSV(linha, separador) {

    const resultado = [];

    let atual = "";

    let dentroAspas = false;


    for (let i = 0; i < linha.length; i++) {

        const caractere = linha[i];


        if (caractere === '"') {

            dentroAspas = !dentroAspas;

            continue;
        }


        if (
            caractere === separador &&
            !dentroAspas
        ) {

            resultado.push(atual);

            atual = "";

        }

        else {

            atual += caractere;

        }

    }


    resultado.push(atual);


    return resultado;

}



// ==========================================
// ENCONTRAR COLUNA
// ==========================================

function encontrarColuna(
    cabecalho,
    nome
) {

    return cabecalho.findIndex(
        coluna =>
            coluna
                .trim()
                .toLowerCase() ===
            nome
                .trim()
                .toLowerCase()
    );

}



// ==========================================
// LIMPAR VALOR
// ==========================================

function limparValor(valor) {

    if (
        valor === undefined ||
        valor === null
    ) {

        return "";

    }


    return String(valor)
        .trim()
        .replace(/^"(.*)"$/, "$1");

}



// ==========================================
// CORRIGIR ANO
// ==========================================

function limparAno(valor) {

    valor = limparValor(valor);


    if (valor === "") {
        return "";
    }


    // Exemplo: 2005.0 → 2005

    if (
        !isNaN(valor)
    ) {

        return String(
            parseInt(valor)
        );

    }


    return valor;

}



// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    document.getElementById("isbn").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("autor").value = "";

    document.getElementById("genero").value = "";

    document.getElementById("ano").value = "";

    document.getElementById("editora").value = "";

    document.getElementById("localizacao").value = "";

}



// ==========================================
// PROTEGER HTML
// ==========================================

function escaparHTML(valor) {

    if (valor === undefined || valor === null) {
        return "";
    }


    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}