// PESQUISAR LIVRO

function pesquisarLivro(){


let nome =
document.getElementById("nome").value.trim().toLowerCase();


let autor =
document.getElementById("autor").value.trim().toLowerCase();


let isbn =
document.getElementById("isbn").value.trim();



let livros =
JSON.parse(localStorage.getItem("livros")) || [];



let resultados = livros.filter(function(item){


let titulo =
(item.titulo || "").toLowerCase();


let autorLivro =
(item.autor || "").toLowerCase();


let isbnLivro =
item.isbn || "";



return (

(nome=="" || titulo.includes(nome)) &&

(autor=="" || autorLivro.includes(autor)) &&

(isbn=="" || isbnLivro.includes(isbn))

);


});



if(resultados.length==0){

alert("Nenhum livro encontrado.");

return;

}



let mensagem="📚 Livros encontrados:\n\n";



resultados.forEach(function(item){


mensagem += "📖 "+item.titulo+"\n";


if(item.autor){

mensagem += "Autor: "+item.autor+"\n";

}


if(item.isbn){

mensagem += "ISBN: "+item.isbn+"\n";

}


mensagem+="\n";


});



alert(mensagem);


}







// SOLICITAR EMPRÉSTIMO

function emprestimo(){


let livro =
document.getElementById("livroEmprestimo").value.trim();



if(livro==""){

alert("Digite o nome do livro.");

return;

}



let pedidos =
JSON.parse(localStorage.getItem("solicitacoes")) || [];



pedidos.push({

livro:livro,

professor:"Professor",

data:new Date().toLocaleDateString("pt-BR")

});



localStorage.setItem(

"solicitacoes",

JSON.stringify(pedidos)

);



alert("Solicitação enviada ao bibliotecário!");



document.getElementById("livroEmprestimo").value="";


}







// ENVIAR RECOMENDAÇÃO

function enviarRecomendacao(){


let livro =
document.getElementById("livroProfessor").value.trim();



let motivo =
document.getElementById("motivoProfessor").value.trim();



if(livro=="" || motivo==""){

alert("Preencha todos os campos.");

return;

}



let recomendacoes =
JSON.parse(localStorage.getItem("recomendacoes")) || [];



recomendacoes.push({

livro:livro,

motivo:motivo,

professor:"Professor",

data:new Date().toLocaleDateString("pt-BR")

});



localStorage.setItem(

"recomendacoes",

JSON.stringify(recomendacoes)

);



alert("Recomendação enviada para todos os alunos!");



document.getElementById("livroProfessor").value="";

document.getElementById("motivoProfessor").value="";


}







// CARREGAR LIVROS DA GESTÃO

function carregarLivrosGestao(){



let livrosGestao =
JSON.parse(localStorage.getItem("livrosGestao")) || [];



let area =
document.getElementById("listaGestao");



area.innerHTML="";



if(livrosGestao.length==0){


area.innerHTML=
"<p>Nenhum livro enviado pela Gestão.</p>";


return;


}



livrosGestao.forEach(function(item){



area.innerHTML += `


<div class="livro">


<h3>📖 ${item.livro}</h3>


<p>
<strong>Categoria:</strong>
${item.categoria}
</p>


<p>${item.descricao}</p>


<small>
📅 ${item.data}
</small>


</div>


`;



});


}






// INICIAR A PÁGINA

window.onload=function(){


carregarLivrosGestao();


console.log("Área do Professor carregada com sucesso.");


};




