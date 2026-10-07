


function carregarAlunosAtrasados(){



let atrasados =

JSON.parse(localStorage.getItem("atrasados")) || [];




let tabela =

document.getElementById("listaAlunosAtrasados");




tabela.innerHTML="";






if(atrasados.length == 0){



tabela.innerHTML=`

<tr>

<td colspan="5">

Nenhum aluno com livros atrasados.

</td>

</tr>

`;

return;


}







atrasados.forEach(function(item){



tabela.innerHTML += `



<tr>



<td>

👤 ${item.aluno}

</td>





<td class="atrasado">

📚 ${item.livro}

</td>





<td>

${formatarData(item.emprestimo)}

</td>





<td>

${formatarData(item.devolucao)}

</td>





<td class="bloqueio">

🔒 Atrasado

</td>





</tr>



`;



});



}









function formatarData(data){



if(!data){


return "";


}





let partes=data.split("-");





return partes[2]+"/"+partes[1]+"/"+partes[0];



}







carregarAlunosAtrasados();



