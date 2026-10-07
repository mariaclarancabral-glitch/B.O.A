function mostrarCadastro(){


document
.getElementById("login")
.classList.add("oculto");


document
.getElementById("cadastro")
.classList.remove("oculto");


document
.getElementById("mensagem")
.innerHTML="";


}




function mostrarLogin(){


document
.getElementById("cadastro")
.classList.add("oculto");


document
.getElementById("login")
.classList.remove("oculto");


document
.getElementById("mensagem")
.innerHTML="";


}





function cadastrar(){


let nome =
document.getElementById("nomeCadastro").value.trim();


let email =
document.getElementById("emailCadastro").value.trim().toLowerCase();


let senha =
document.getElementById("senhaCadastro").value;


let confirmar =
document.getElementById("confirmarSenha").value;


let tipo =
document.getElementById("tipoCadastro").value;



let mensagem =
document.getElementById("mensagem");



if(nome=="" ||
email=="" ||
senha=="" ||
confirmar=="" ||
tipo==""){


mensagem.innerHTML="Preencha todos os campos.";

return;


}



if(senha!=confirmar){


mensagem.innerHTML="As senhas não são iguais.";

return;


}



let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];



let existe =
usuarios.find(function(item){


return item.email===email;


});



if(existe){


mensagem.innerHTML="Este e-mail já está cadastrado.";

return;


}



usuarios.push({

nome:nome,

email:email,

senha:senha,

funcao:tipo

});



localStorage.setItem(

"usuarios",

JSON.stringify(usuarios)

);



mensagem.style.color="green";

mensagem.innerHTML="Conta criada com sucesso!";



setTimeout(function(){


mensagem.style.color="red";

mostrarLogin();


},1500);



}





function entrar(){


let email =
document.getElementById("emailLogin").value.trim().toLowerCase();


let senha =
document.getElementById("senhaLogin").value;


let tipo =
document.getElementById("tipoLogin").value;



let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];



let usuario =
usuarios.find(function(item){


return item.email===email &&
item.senha===senha &&
item.funcao===tipo;


});



let mensagem =
document.getElementById("mensagem");



if(!usuario){


mensagem.innerHTML=
"E-mail, senha ou tipo de usuário incorretos.";

return;


}



localStorage.setItem(

"usuarioLogado",

JSON.stringify(usuario)

);





switch(usuario.funcao){


case "aluno":

window.location.href="aluno.html";

break;



case "professor":

window.location.href="professor.html";

break;



case "bibliotecario":

window.location.href="bibliotecario.html";

break;



case "gestao":

window.location.href="gestao.html";

break;


}



}
