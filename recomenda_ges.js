



function enviarRecomendacao(){



let livro =

document.getElementById("livro").value.trim();



let autor =

document.getElementById("autor").value.trim();



let destino =

document.getElementById("destino").value;



let categoria =

document.getElementById("categoria").value;



let motivo =

document.getElementById("motivo").value.trim();







if(livro=="" || motivo==""){


alert("Preencha o livro e o motivo.");

return;


}







let recomendacao={


livro:livro,

autor:autor,

destino:destino,

categoria:categoria,

motivo:motivo,

data:new Date().toLocaleDateString("pt-BR")


};







// SALVAR HISTÓRICO DA GESTÃO


let gestao =

JSON.parse(localStorage.getItem("recomendacoesGestao")) || [];


gestao.push(recomendacao);


localStorage.setItem(

"recomendacoesGestao",

JSON.stringify(gestao)

);









// ENVIAR PARA PROFESSORES


if(destino=="professores" || destino=="todos"){



let professores =

JSON.parse(localStorage.getItem("recomendacoesProfessores")) || [];



professores.push(recomendacao);



localStorage.setItem(

"recomendacoesProfessores",

JSON.stringify(professores)

);



}









// ENVIAR PARA ALUNOS


if(destino=="alunos" || destino=="todos"){



let alunos =

JSON.parse(localStorage.getItem("recomendacoesAlunos")) || [];



alunos.push(recomendacao);



localStorage.setItem(

"recomendacoesAlunos",

JSON.stringify(alunos)

);



}







alert("Recomendação enviada com sucesso!");






mostrarRecomendacoes();







document.getElementById("livro").value="";

document.getElementById("autor").value="";

document.getElementById("motivo").value="";



}









function mostrarRecomendacoes(){



let area=

document.getElementById("lista");



let lista =

JSON.parse(localStorage.getItem("recomendacoesGestao")) || [];







area.innerHTML="";







if(lista.length==0){


area.innerHTML=

"<p>Nenhuma recomendação cadastrada.</p>";


return;


}









lista.forEach(function(item,index){



area.innerHTML += `


<div class="item">


<h3>

📖 ${item.livro}

</h3>


<p>

Autor: ${item.autor}

</p>


<p>

Categoria: ${item.categoria}

</p>


<p>

Enviar para: ${item.destino}

</p>


<p>

${item.motivo}

</p>


<p>

📅 ${item.data}

</p>




<button

class="excluir"

onclick="excluir(${index})">


🗑 Excluir


</button>




</div>


`;



});



}









function excluir(index){



let lista=

JSON.parse(localStorage.getItem("recomendacoesGestao")) || [];



lista.splice(index,1);



localStorage.setItem(

"recomendacoesGestao",

JSON.stringify(lista)

);



mostrarRecomendacoes();



}









window.onload=function(){


mostrarRecomendacoes();


}



