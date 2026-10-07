// =====================================================
// CARREGAR LIVROS CADASTRADOS
// =====================================================

function carregarLivros(){

    /*
        Pega os livros cadastrados
        na página de Cadastro de Livros.
    */

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];


    /*
        Campo de sugestões.
    */

    let lista =
        document.getElementById(
            "listaLivros"
        );


    lista.innerHTML = "";


    /*
        Cria uma sugestão para cada livro.
    */

    livros.forEach(function(livro){

        if(
            livro.titulo &&
            livro.titulo.trim() !== ""
        ){

            lista.innerHTML += `

                <option value="${escaparHTML(livro.titulo)}">

            `;

        }

    });

}



// =====================================================
// ESCAPAR TEXTO
// =====================================================

function escaparHTML(texto){

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}



// =====================================================
// REGISTRAR EMPRÉSTIMO
// =====================================================

function registrarEmprestimo(){


    let aluno =
        document.getElementById(
            "aluno"
        ).value.trim();


    let livro =
        document.getElementById(
            "livro"
        ).value.trim();


    let emprestimo =
        document.getElementById(
            "emprestimo"
        ).value;


    let devolucao =
        document.getElementById(
            "devolucao"
        ).value;



    // ===============================================
    // VERIFICAR CAMPOS
    // ===============================================

    if(
        aluno === "" ||
        livro === "" ||
        emprestimo === "" ||
        devolucao === ""
    ){

        alert(
            "Preencha todos os campos."
        );

        return;

    }



    // ===============================================
    // VERIFICAR SE O LIVRO EXISTE
    // ===============================================

    let livros =
        JSON.parse(
            localStorage.getItem("livros")
        ) || [];


    let livroEncontrado =
        livros.find(function(item){

            return (
                item.titulo &&
                item.titulo.trim().toLowerCase() ===
                livro.trim().toLowerCase()
            );

        });



    /*
        Se o livro digitado não estiver
        cadastrado, não permite o empréstimo.
    */

    if(!livroEncontrado){

        alert(
            "Esse livro não está cadastrado na biblioteca."
        );

        return;

    }



    /*
        Usa o título exatamente como
        está cadastrado.
    */

    livro =
        livroEncontrado.titulo;



    // ===============================================
    // PEGAR EMPRÉSTIMOS EXISTENTES
    // ===============================================

    let emprestimos =
        JSON.parse(
            localStorage.getItem("emprestimos")
        ) || [];



    // ===============================================
    // REGISTRAR
    // ===============================================

    emprestimos.push({

        aluno: aluno,

        livro: livro,

        /*
            Também salvamos o ISBN.
            Isso ajuda o relatório a identificar
            o livro corretamente.
        */

        isbn:
            livroEncontrado.isbn || "",

        emprestimo:
            emprestimo,

        devolucao:
            devolucao

    });



    // ===============================================
    // SALVAR
    // ===============================================

    localStorage.setItem(

        "emprestimos",

        JSON.stringify(
            emprestimos
        )

    );



    alert(
        "Empréstimo registrado com sucesso!"
    );



    // ===============================================
    // LIMPAR CAMPOS
    // ===============================================

    document.getElementById(
        "aluno"
    ).value = "";


    document.getElementById(
        "livro"
    ).value = "";


    document.getElementById(
        "emprestimo"
    ).value = "";


    document.getElementById(
        "devolucao"
    ).value = "";



    // ===============================================
    // ATUALIZAR TABELA
    // ===============================================

    mostrarEmprestimos();

}



// =====================================================
// MOSTRAR EMPRÉSTIMOS
// =====================================================

function mostrarEmprestimos(){

    let emprestimos =
        JSON.parse(
            localStorage.getItem("emprestimos")
        ) || [];


    let tabela =
        document.getElementById(
            "listaEmprestimos"
        );


    tabela.innerHTML = "";



    if(
        emprestimos.length === 0
    ){

        tabela.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    style="text-align:center;"
                >

                    Nenhum empréstimo registrado.

                </td>

            </tr>

        `;

        return;

    }



    emprestimos.forEach(function(item){

        tabela.innerHTML += `

            <tr>

                <td>
                    ${escaparHTML(
                        item.aluno || ""
                    )}
                </td>


                <td>
                    ${escaparHTML(
                        item.livro || ""
                    )}
                </td>


                <td>
                    ${formatarData(
                        item.emprestimo
                    )}
                </td>


                <td>
                    ${formatarData(
                        item.devolucao
                    )}
                </td>

            </tr>

        `;

    });

}



// =====================================================
// FORMATAR DATA
// =====================================================

function formatarData(data){

    if(!data){

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

carregarLivros();

mostrarEmprestimos();


