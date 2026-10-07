// VOLTAR

function voltarPagina(){


    history.back();


}









// CARREGAR BIBLIOTECÁRIOS


function carregarBibliotecarios(){



let relatorios =

JSON.parse(localStorage.getItem("relatorios")) || [];




let lista =

document.getElementById("bibliotecario");




let nomes=[];






relatorios.forEach(function(item){



if(!nomes.includes(item.bibliotecario)){


nomes.push(item.bibliotecario);



}



});








nomes.forEach(function(nome){



lista.innerHTML += `



<option>

${nome}

</option>



`;



});



}











// BUSCAR RELATÓRIO


function buscarRelatorio(){



let escola =

document.getElementById("escola").value;




let bibliotecario =

document.getElementById("bibliotecario").value;




let data =

document.getElementById("data").value;








let relatorios =

JSON.parse(localStorage.getItem("relatorios")) || [];









let encontrados = relatorios.filter(function(item){



return (



item.bibliotecario == bibliotecario &&



item.escola == escola &&



item.mes == data



);



});









let caixa =

document.getElementById("resultado");









if(encontrados.length == 0){



caixa.innerHTML = `



<p class="sem">

❌ Nenhum relatório encontrado.

</p>



`;



return;



}









caixa.innerHTML="";








encontrados.forEach(function(item){



caixa.innerHTML += `





<h3>

📚 ${item.tipo}

</h3>







<p>

<strong>Bibliotecário:</strong>

${item.bibliotecario}

</p>







<p>

<strong>Escola:</strong>

${item.escola}

</p>







<p>

<strong>Data:</strong>

${item.data}

</p>







<p>

${item.descricao}

</p>







<hr>







`;



});



}









window.onload=function(){



carregarBibliotecarios();



};





