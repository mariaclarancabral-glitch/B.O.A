// =====================================================
// ESTATÍSTICAS
// =====================================================

function carregarEstatisticas(){

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];


    let emprestimos =
        JSON.parse(
            localStorage.getItem("emprestimos")
        ) || [];


    let atrasados =
        JSON.parse(
            localStorage.getItem("atrasados")
        ) || [];


    let avaliacoes =
        JSON.parse(
            localStorage.getItem("avaliacoes")
        ) || [];


    document.getElementById(
        "totalLivros"
    ).innerHTML = livros.length;


    document.getElementById(
        "totalEmprestimos"
    ).innerHTML = emprestimos.length;


    document.getElementById(
        "totalAtrasados"
    ).innerHTML = atrasados.length;


    document.getElementById(
        "totalAvaliacoes"
    ).innerHTML = avaliacoes.length;

}



// =====================================================
// LIVROS POR GÊNERO
// =====================================================

function carregarGeneros(){

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];


    let area =
        document.getElementById(
            "listaGeneros"
        );


    area.innerHTML = "";


    if(livros.length === 0){

        area.innerHTML =
            "Nenhum livro cadastrado.";

        return;

    }


    // Objeto para contar livros
    // de cada gênero

    let generos = {};


    livros.forEach(function(livro){

        let genero =
            livro.genero;


        // Caso o livro não tenha gênero

        if(
            !genero ||
            genero.trim() === ""
        ){

            genero =
                "Não informado";

        }


        genero =
            genero.trim();


        // Conta o gênero

        if(
            generos[genero]
        ){

            generos[genero]++;

        }
        else{

            generos[genero] = 1;

        }

    });


    // Ordena alfabeticamente

    Object.keys(generos)
        .sort()
        .forEach(function(genero){

            let quantidade =
                generos[genero];


            area.innerHTML += `

                <div class="item">

                    📖 <b>${genero}</b>

                    <br>

                    📚 ${quantidade}

                    ${
                        quantidade === 1
                        ? "livro"
                        : "livros"
                    }

                </div>

            `;

        });

}



// =====================================================
// RETIRADAS POR GÊNERO
// =====================================================

function carregarRetiradas(){

    /*
        Pega todos os livros cadastrados
    */

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];


    /*
        Pega todos os empréstimos
    */

    let emprestimos =
        JSON.parse(
            localStorage.getItem("emprestimos")
        ) || [];


    let area =
        document.getElementById(
            "listaRetiradas"
        );


    area.innerHTML = "";


    /*
        Se não houver empréstimos
    */

    if(
        emprestimos.length === 0
    ){

        area.innerHTML =
            "Nenhuma retirada encontrada.";

        return;

    }


    /*
        Aqui serão armazenadas
        as quantidades por gênero.

        Exemplo:

        {
            "Aventura": 5,
            "Fantasia": 3,
            "Romance": 2
        }
    */

    let retiradasPorGenero = {};



    // =================================================
    // ANALISAR CADA EMPRÉSTIMO
    // =================================================

    emprestimos.forEach(function(emprestimo){


        /*
            Tenta descobrir o título
            do livro retirado.
        */

        let nomeLivro =
            emprestimo.livro ||
            emprestimo.titulo ||
            emprestimo.nomeLivro ||
            "";



        /*
            Também tenta descobrir o ISBN.

            Se seu sistema de empréstimos
            salvar o ISBN, a busca fica ainda
            mais precisa.
        */

        let isbn =
            emprestimo.isbn ||
            "";



        /*
            Procura o livro dentro
            dos livros cadastrados.
        */

        let livroEncontrado =
            livros.find(function(livro){


                /*
                    Primeiro tenta pelo ISBN.
                */

                if(
                    isbn &&
                    livro.isbn
                ){

                    return (
                        String(livro.isbn) ===
                        String(isbn)
                    );

                }


                /*
                    Se não encontrar pelo ISBN,
                    procura pelo título.
                */

                if(
                    livro.titulo &&
                    nomeLivro
                ){

                    return (
                        livro.titulo
                            .trim()
                            .toLowerCase() ===

                        nomeLivro
                            .trim()
                            .toLowerCase()
                    );

                }


                return false;

            });



        /*
            Gênero padrão.
        */

        let genero =
            "Não informado";



        /*
            Se encontrou o livro,
            pega o gênero dele.
        */

        if(
            livroEncontrado &&
            livroEncontrado.genero
        ){

            genero =
                livroEncontrado.genero
                    .trim();

        }



        /*
            Soma uma retirada
            para aquele gênero.
        */

        if(
            retiradasPorGenero[genero]
        ){

            retiradasPorGenero[genero]++;

        }
        else{

            retiradasPorGenero[genero] = 1;

        }

    });



    /*
        Ordena os gêneros
        alfabeticamente.
    */

    Object.keys(
        retiradasPorGenero
    )
    .sort()
    .forEach(function(genero){


        let quantidade =
            retiradasPorGenero[genero];


        area.innerHTML += `

            <div class="item">

                📖 <b>${genero}</b>

                <br>

                📚 ${quantidade}

                ${
                    quantidade === 1
                    ? "retirada"
                    : "retiradas"
                }

            </div>

        `;

    });

}



// =====================================================
// ALUNOS ATRASADOS
// =====================================================

function carregarAtrasados(){

    let atrasados =
        JSON.parse(
            localStorage.getItem("atrasados")
        ) || [];


    let area =
        document.getElementById(
            "listaAtrasados"
        );


    area.innerHTML = "";


    if(
        atrasados.length === 0
    ){

        area.innerHTML =
            "Nenhum aluno atrasado.";

        return;

    }


    atrasados.forEach(function(item){

        area.innerHTML += `

            <div class="item">

                👨‍🎓 <b>
                    ${item.aluno || "Aluno"}
                </b>

                <br>

                📚 ${item.livro || "Livro"}

                <br>

                📅 Devolver até:

                ${formatarData(
                    item.devolucao
                )}

            </div>

        `;

    });

}



// =====================================================
// AVALIAÇÕES DOS ALUNOS
// =====================================================

function carregarAvaliacoes(){

    let avaliacoes =
        JSON.parse(
            localStorage.getItem("avaliacoes")
        ) || [];


    let area =
        document.getElementById(
            "listaAvaliacoes"
        );


    area.innerHTML = "";


    if(
        avaliacoes.length === 0
    ){

        area.innerHTML =
            "Nenhuma avaliação enviada.";

        return;

    }


    avaliacoes.forEach(function(item){

        let estrelas = "";


        for(
            let i = 0;
            i < (item.estrelas || 0);
            i++
        ){

            estrelas += "⭐";

        }


        area.innerHTML += `

            <div class="item">

                👤 <b>
                    ${item.aluno || "Aluno"}
                </b>

                <br>

                📖 ${item.livro || "Livro"}

                <br>

                ${estrelas}

                <br>
                <br>

                "${item.comentario || ""}"

            </div>

        `;

    });

}



// =====================================================
// SALVAR RASCUNHO
// =====================================================

function salvarRascunho(){

    let relatorio = {

        bibliotecario:
            document.getElementById(
                "bibliotecario"
            ).value,


        data:
            document.getElementById(
                "dataRelatorio"
            ).value,


        mes:
            document.getElementById(
                "mes"
            ).value,


        ano:
            document.getElementById(
                "ano"
            ).value,


        texto:
            document.getElementById(
                "relatorio"
            ).value

    };


    localStorage.setItem(

        "rascunhoRelatorio",

        JSON.stringify(
            relatorio
        )

    );


    alert(
        "Rascunho salvo com sucesso!"
    );

}



// =====================================================
// CARREGAR RASCUNHO
// =====================================================

function carregarRascunho(){

    let relatorio =
        JSON.parse(
            localStorage.getItem(
                "rascunhoRelatorio"
            )
        );


    if(
        !relatorio
    ){

        return;

    }


    document.getElementById(
        "bibliotecario"
    ).value =
        relatorio.bibliotecario || "";


    document.getElementById(
        "dataRelatorio"
    ).value =
        relatorio.data || "";


    document.getElementById(
        "mes"
    ).value =
        relatorio.mes || "Janeiro";


    document.getElementById(
        "ano"
    ).value =
        relatorio.ano || "2026";


    document.getElementById(
        "relatorio"
    ).value =
        relatorio.texto || "";

}



// =====================================================
// ENVIAR PARA GESTÃO
// =====================================================

function enviarGestao(){

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];


    let emprestimos =
        JSON.parse(
            localStorage.getItem("emprestimos")
        ) || [];


    let atrasados =
        JSON.parse(
            localStorage.getItem("atrasados")
        ) || [];


    let avaliacoes =
        JSON.parse(
            localStorage.getItem("avaliacoes")
        ) || [];


    /*
        Cria o relatório.
    */

    let relatorio = {

        bibliotecario:
            document.getElementById(
                "bibliotecario"
            ).value,


        data:
            document.getElementById(
                "dataRelatorio"
            ).value,


        mes:
            document.getElementById(
                "mes"
            ).value,


        ano:
            document.getElementById(
                "ano"
            ).value,


        texto:
            document.getElementById(
                "relatorio"
            ).value,


        livros:
            livros,


        emprestimos:
            emprestimos,


        atrasados:
            atrasados,


        avaliacoes:
            avaliacoes

    };



    /*
        Também cria o resumo
        das retiradas por gênero.
    */

    let retiradasPorGenero = {};



    emprestimos.forEach(
        function(emprestimo){

            let nomeLivro =
                emprestimo.livro ||
                emprestimo.titulo ||
                emprestimo.nomeLivro ||
                "";


            let isbn =
                emprestimo.isbn ||
                "";


            let livroEncontrado =
                livros.find(
                    function(livro){

                        if(
                            isbn &&
                            livro.isbn
                        ){

                            return (
                                String(
                                    livro.isbn
                                ) ===
                                String(isbn)
                            );

                        }


                        if(
                            livro.titulo &&
                            nomeLivro
                        ){

                            return (
                                livro.titulo
                                    .trim()
                                    .toLowerCase() ===

                                nomeLivro
                                    .trim()
                                    .toLowerCase()
                            );

                        }


                        return false;

                    }
                );


            let genero =
                "Não informado";


            if(
                livroEncontrado &&
                livroEncontrado.genero
            ){

                genero =
                    livroEncontrado.genero
                        .trim();

            }


            if(
                retiradasPorGenero[genero]
            ){

                retiradasPorGenero[genero]++;

            }
            else{

                retiradasPorGenero[genero] = 1;

            }

        }
    );



    /*
        Salva o resumo dentro do relatório.
    */

    relatorio.retiradasPorGenero =
        retiradasPorGenero;



    /*
        Recupera os relatórios existentes.
    */

    let relatorios =
        JSON.parse(
            localStorage.getItem(
                "relatorios"
            )
        ) || [];


    /*
        Adiciona o novo relatório.
    */

    relatorios.push(
        relatorio
    );


    /*
        Salva.
    */

    localStorage.setItem(

        "relatorios",

        JSON.stringify(
            relatorios
        )

    );


    /*
        Remove o rascunho.
    */

    localStorage.removeItem(
        "rascunhoRelatorio"
    );


    alert(
        "Relatório enviado para a Gestão!"
    );


    /*
        Limpa alguns campos.
    */

    document.getElementById(
        "bibliotecario"
    ).value = "";


    document.getElementById(
        "dataRelatorio"
    ).value = "";


    document.getElementById(
        "relatorio"
    ).value = "";

}



// =====================================================
// FORMATAR DATA
// =====================================================

function formatarData(data){

    if(
        !data
    ){

        return "";

    }


    let partes =
        data.split("-");


    if(
        partes.length !== 3
    ){

        return data;

    }


    return (

        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]

    );

}



// =====================================================
// INICIAR PÁGINA
// =====================================================

carregarEstatisticas();

carregarGeneros();

carregarRetiradas();

carregarAtrasados();

carregarAvaliacoes();

carregarRascunho();


