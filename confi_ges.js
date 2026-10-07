// =============================
// SALVAR ESCOLA
// =============================


function salvarEscola(){



let dados={


nome:

document.getElementById(

"nomeEscola"

).value,



ano:

document.getElementById(

"anoLetivo"

).value



};





localStorage.setItem(

"dadosEscola",

JSON.stringify(dados)

);





alert(

"Dados da escola salvos!"

);



}









// =============================
// CRIAR USUARIO
// =============================


function criarUsuario(){



let usuario={



nome:

document.getElementById(

"nomeUsuario"

).value,



funcao:

document.getElementById(

"funcaoUsuario"

).value,



login:

document.getElementById(

"loginUsuario"

).value,



senha:

document.getElementById(

"senhaUsuario"

).value



};






if(

usuario.nome=="" ||

usuario.login=="" ||

usuario.senha==""

){


alert(

"Preencha todos os campos."

);


return;


}







let usuarios=

JSON.parse(

localStorage.getItem(

"usuarios"

)

)||[];






usuarios.push(usuario);






localStorage.setItem(

"usuarios",

JSON.stringify(usuarios)

);





alert(

"Usuário criado!"

);




mostrarUsuarios();





}









// =============================
// MOSTRAR USUARIOS
// =============================


function mostrarUsuarios(){



let area=

document.getElementById(

"listaUsuarios"

);




let usuarios=

JSON.parse(

localStorage.getItem(

"usuarios"

)

)||[];




area.innerHTML="";






if(usuarios.length==0){


area.innerHTML=

"<p>Nenhum usuário cadastrado.</p>";

return;


}






usuarios.forEach(function(item,index){



area.innerHTML+=`



<div class="usuario">


<h3>

${item.nome}

</h3>



<p>

Função:

${item.funcao}

</p>



<p>

Login:

${item.login}

</p>




<button

class="excluir"

onclick="excluirUsuario(${index})">


🗑 Excluir


</button>



</div>



`;



});



}









// =============================
// EXCLUIR USUARIO
// =============================


function excluirUsuario(index){



let usuarios=

JSON.parse(

localStorage.getItem(

"usuarios"

)

)||[];





usuarios.splice(index,1);





localStorage.setItem(

"usuarios",

JSON.stringify(usuarios)

);





mostrarUsuarios();



}









window.onload=function(){


mostrarUsuarios();



let escola=

JSON.parse(

localStorage.getItem(

"dadosEscola"

)

);



if(escola){


document.getElementById(

"nomeEscola"

).value=

escola.nome;



document.getElementById(

"anoLetivo"

).value=

escola.ano;


}



}



