
function carregarAtrasados(){

    let atrasados =
    JSON.parse(localStorage.getItem("atrasados")) || [];

    let tabela =
    document.getElementById("listaAtrasados");

    tabela.innerHTML = "";

    if(atrasados.length == 0){

        tabela.innerHTML = `

        <tr>

        <td colspan="6">

        Nenhum aluno com devolução atrasada.

        </td>

        </tr>

        `;

        return;

    }

    atrasados.forEach(function(item,index){

        tabela.innerHTML += `

        <tr>

        <td class="atrasado">

        ${item.aluno}

        </td>

        <td>

        ${item.livro}

        </td>

        <td>

        ${formatarData(item.emprestimo)}

        </td>

        <td>

        ${formatarData(item.devolucao)}

        </td>

        <td class="bloqueio">

        🔒

        </td>

        <td>

        <button onclick="enviarAviso(${index})">

        📢 Avisar aluno

        </button>

        </td>

        </tr>

        `;

    });

}



function enviarAviso(index){

    let atrasados =
    JSON.parse(localStorage.getItem("atrasados")) || [];

    if(index < 0 || index >= atrasados.length){

        alert("Aluno não encontrado.");

        return;

    }

    let aluno = atrasados[index];

    // Salva o aluno que receberá o aviso

    localStorage.setItem(

        "alunoAviso",

        JSON.stringify(aluno)

    );

    alert("Aviso preparado para: " + aluno.aluno);

    // Abre a página do aviso

    window.location.href = "aviso_devolucao.html";

}



function formatarData(data){

    if(!data){

        return "";

    }

    let partes = data.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}



carregarAtrasados();

