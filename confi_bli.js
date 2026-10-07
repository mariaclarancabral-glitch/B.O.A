// ======================================
// PERFIL DO BIBLIOTECÁRIO
// ======================================

function salvarPerfil(){

    let perfil={

        nome:
        document.getElementById("nomeBibliotecario").value,

        cargo:
        document.getElementById("cargoBibliotecario").value,

        email:
        document.getElementById("emailBibliotecario").value

    };

    localStorage.setItem(

        "perfilBibliotecario",

        JSON.stringify(perfil)

    );

    alert("Perfil salvo com sucesso!");

}



// ======================================
// CARREGAR PERFIL
// ======================================

function carregarPerfil(){

    let perfil =
    JSON.parse(localStorage.getItem("perfilBibliotecario"));

    if(!perfil){

        return;

    }

    document.getElementById("nomeBibliotecario").value =
    perfil.nome || "";

    document.getElementById("cargoBibliotecario").value =
    perfil.cargo || "";

    document.getElementById("emailBibliotecario").value =
    perfil.email || "";

}



// ======================================
// BIBLIOTECA
// ======================================

function salvarBiblioteca(){

    let biblioteca={

        escola:
        document.getElementById("nomeEscola").value,

        biblioteca:
        document.getElementById("nomeBiblioteca").value,

        horario:
        document.getElementById("horario").value,

        telefone:
        document.getElementById("telefone").value,

        email:
        document.getElementById("emailBiblioteca").value

    };

    localStorage.setItem(

        "biblioteca",

        JSON.stringify(biblioteca)

    );

    alert("Informações salvas!");

}



function carregarBiblioteca(){

    let biblioteca =
    JSON.parse(localStorage.getItem("biblioteca"));

    if(!biblioteca){

        return;

    }

    document.getElementById("nomeEscola").value =
    biblioteca.escola || "";

    document.getElementById("nomeBiblioteca").value =
    biblioteca.biblioteca || "";

    document.getElementById("horario").value =
    biblioteca.horario || "";

    document.getElementById("telefone").value =
    biblioteca.telefone || "";

    document.getElementById("emailBiblioteca").value =
    biblioteca.email || "";

}



// ======================================
// CONFIGURAÇÕES DOS EMPRÉSTIMOS
// ======================================

function salvarEmprestimo(){

    let config={

        dias:
        document.getElementById("diasEmprestimo").value,

        maximo:
        document.getElementById("maxLivros").value,

        multa:
        document.getElementById("multa").value

    };

    localStorage.setItem(

        "configEmprestimo",

        JSON.stringify(config)

    );

    alert("Configurações salvas!");

}



function carregarEmprestimo(){

    let config =
    JSON.parse(localStorage.getItem("configEmprestimo"));

    if(!config){

        return;

    }

    document.getElementById("diasEmprestimo").value =
    config.dias || "";

    document.getElementById("maxLivros").value =
    config.maximo || "";

    document.getElementById("multa").value =
    config.multa || "";

}



// ======================================
// RECOMENDAÇÕES DOS PROFESSORES
// ======================================

function salvarRecomendacoes(){

    localStorage.setItem(

        "recomendacoes",

        document.getElementById("recomendacoes").value

    );

    alert("Recomendações salvas!");

}



function carregarRecomendacoes(){

    document.getElementById("recomendacoes").value =

    localStorage.getItem("recomendacoes") || "";

}



// ======================================
// TEMA
// ======================================

function salvarTema(){

    let tema =
    document.getElementById("tema").value;

    localStorage.setItem(

        "temaSistema",

        tema

    );

    alert("Tema salvo!");

}

// ======================================
// FAZER BACKUP
// ======================================

function fazerBackup(){

    let backup = {

        livros: JSON.parse(localStorage.getItem("livros")) || [],

        emprestimos: JSON.parse(localStorage.getItem("emprestimos")) || [],

        avaliacoes: JSON.parse(localStorage.getItem("avaliacoes")) || [],

        relatorios: JSON.parse(localStorage.getItem("relatorios")) || [],

        recomendacoes: localStorage.getItem("recomendacoes") || ""

    };

    localStorage.setItem(

        "backupBiblioteca",

        JSON.stringify(backup)

    );

    alert("Backup realizado com sucesso!");

}



// ======================================
// RESTAURAR BACKUP
// ======================================

function restaurarBackup(){

    let backup =
    JSON.parse(localStorage.getItem("backupBiblioteca"));

    if(!backup){

        alert("Nenhum backup encontrado!");

        return;

    }

    localStorage.setItem("livros",
    JSON.stringify(backup.livros));

    localStorage.setItem("emprestimos",
    JSON.stringify(backup.emprestimos));

    localStorage.setItem("avaliacoes",
    JSON.stringify(backup.avaliacoes));

    localStorage.setItem("relatorios",
    JSON.stringify(backup.relatorios));

    localStorage.setItem(
    "recomendacoes",
    backup.recomendacoes
    );

    alert("Backup restaurado!");

}



// ======================================
// APAGAR EMPRÉSTIMOS
// ======================================

function apagarEmprestimos(){

    if(confirm("Deseja apagar todos os empréstimos?")){

        localStorage.removeItem("emprestimos");

        alert("Empréstimos apagados!");

    }

}



// ======================================
// APAGAR AVALIAÇÕES
// ======================================

function apagarAvaliacoes(){

    if(confirm("Deseja apagar todas as avaliações?")){

        localStorage.removeItem("avaliacoes");

        alert("Avaliações apagadas!");

    }

}



// ======================================
// APAGAR RELATÓRIOS
// ======================================

function apagarRelatorios(){

    if(confirm("Deseja apagar todos os relatórios?")){

        localStorage.removeItem("relatorios");

        alert("Relatórios apagados!");

    }

}



// ======================================
// APAGAR TUDO
// ======================================

function apagarTudo(){

    if(confirm("ATENÇÃO!\nTodos os dados do sistema serão apagados.\nDeseja continuar?")){

        localStorage.clear();

        alert("Sistema limpo com sucesso!");

    }

}



// ======================================
// ALTERAR SENHA
// ======================================

function alterarSenha(){

    let senhaAtual =
    document.getElementById("senhaAtual").value;

    let novaSenha =
    document.getElementById("novaSenha").value;

    let confirmar =
    document.getElementById("confirmarSenha").value;



    let senhaSalva =
    localStorage.getItem("senhaBibliotecario") || "1234";



    if(senhaAtual != senhaSalva){

        alert("Senha atual incorreta!");

        return;

    }



    if(novaSenha != confirmar){

        alert("As senhas não conferem!");

        return;

    }



    localStorage.setItem(

        "senhaBibliotecario",

        novaSenha

    );



    alert("Senha alterada com sucesso!");



    document.getElementById("senhaAtual").value="";

    document.getElementById("novaSenha").value="";

    document.getElementById("confirmarSenha").value="";

}



// ======================================
// CARREGAR CONFIGURAÇÕES
// ======================================

carregarPerfil();

carregarBiblioteca();

carregarEmprestimo();

carregarRecomendacoes();

