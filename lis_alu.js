


function carregarListaAlunos(){


    let emprestimos = 
    JSON.parse(localStorage.getItem("emprestimos")) || [];



    let tabela = document.getElementById("lista");



    tabela.innerHTML = "";




    if(emprestimos.length == 0){


        tabela.innerHTML = `

        <tr>

        <td colspan="5">

        Nenhum empréstimo registrado.

        </td>

        </tr>

        `;


        return;

    }





    emprestimos.forEach(function(item,index){



        let status = item.status || "pendente";



        tabela.innerHTML += `


        <tr>


        <td>${item.aluno}</td>


        <td>${item.livro}</td>


        <td>${formatarData(item.emprestimo)}</td>


        <td>${formatarData(item.devolucao)}</td>



        <td>


        <div 

        class="status ${status}"

        onclick="alterarStatus(${index})">

        </div>


        </td>


        </tr>


        `;


    });



}






function alterarStatus(index){


    let emprestimos = 
    JSON.parse(localStorage.getItem("emprestimos")) || [];



    if(emprestimos[index].status == undefined || emprestimos[index].status=="pendente"){


        emprestimos[index].status="devolvido";


    }


    else if(emprestimos[index].status=="devolvido"){


        emprestimos[index].status="atrasado";


    }


    else{


        emprestimos[index].status="pendente";


    }




    localStorage.setItem(

        "emprestimos",

        JSON.stringify(emprestimos)

    );



    atualizarAtrasados();


    carregarListaAlunos();


}







function atualizarAtrasados(){


    let emprestimos = 
    JSON.parse(localStorage.getItem("emprestimos")) || [];



    let atrasados = emprestimos.filter(function(item){


        return item.status=="atrasado";


    });



    localStorage.setItem(

        "atrasados",

        JSON.stringify(atrasados)

    );


}







function formatarData(data){


    if(!data){

        return "";

    }



    let partes = data.split("-");



    return partes[2] + "/" + partes[1] + "/" + partes[0];


}







carregarListaAlunos();




