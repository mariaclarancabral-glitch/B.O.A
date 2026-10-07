// Abrir páginas da Gestão


function abrirPagina(pagina){


    window.location=pagina;


}






// sair do sistema


function sair(){


    window.location="index.html";


}







// atualizar números do painel


function atualizarPainel(){



let alunos =

JSON.parse(

localStorage.getItem("alunos")

) || [];



let livros =

JSON.parse(

localStorage.getItem("livros")

) || [];



let relatorios =

JSON.parse(

localStorage.getItem("relatorios")

) || [];






document.getElementById("qtdAlunos").innerHTML=

alunos.length;





document.getElementById("qtdLivros").innerHTML=

livros.length;





document.getElementById("qtdRelatorios").innerHTML=

relatorios.length;



}







window.onload=function(){


atualizarPainel();


}


