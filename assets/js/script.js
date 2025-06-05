const baseUrlYoutube = "https://www.youtube.com/watch?v=";
const youtubePictos = "_Hw9tF3760o";
const youtubeMusicas = "QUWNNePEZgs";

const menuPictosElement = document.getElementById("menu-pictos");
const menuMusicasElement = document.getElementById("menu-musicas");
const dadosElement = document.getElementById("dados");
const todosElement = document.getElementById("todos");
const encontradoElement = document.getElementById("encontrado");
const naoEncontradoElement = document.getElementById("naoEncontrado");
const quantidadeTotalElement = document.getElementById("quantidade-total");
const quantidadeAtualElement = document.getElementById("quantidade-atual");

let categoria = "pictos";
let view = "todos";
let canal = "";

let pictos = [];
let musicas = [];

function iniciar() {

    pictos = JSON.parse(localStorage.getItem("pictos"));
    musicas = JSON.parse(localStorage.getItem("musicas"));

    if(!pictos) {
        pictos = getPictos(PICTOS)
        localStorage.setItem("pictos", JSON.stringify(pictos))
    }
    
    if(!musicas) {
        musicas = getMusicas(MUSICAS)
        localStorage.setItem("musicas", JSON.stringify(musicas))
    }

    if(categoria === "pictos") {
        setPictos();
    } else if(categoria === "musicas") {
        setMusicas();
    }

    atualizar();
}


function limpar() {

    localStorage.removeItem("pictos");
    localStorage.removeItem("musicas");
    pictos = [];
    musicas = [];

    iniciar();
}

function setPictos() {

    menuPictosElement.classList = ["menu-item ativo"];
    menuMusicasElement.classList = ["menu-item inativo"];
    categoria = "pictos";
    canal = youtubePictos;
    quantidadeTotalElement.innerHTML = pictos.length;
    setTodos();
}

function setMusicas() {

    menuPictosElement.classList = ["menu-item inativo"];
    menuMusicasElement.classList = ["menu-item ativo"];
    categoria = "musicas";
    canal = youtubeMusicas;
    quantidadeTotalElement.innerHTML = musicas.length;

    setTodos();    
}

function getId(textoOriginal) {
    return limpaString(textoOriginal);
}

function selecionar() {
    
    if(categoria === "pictos") {
        
        let picto = pictos.find(item =>  getId(item?.nome || "") == this.id);

        if(picto) {
            picto.encontrado = this.checked;        
            localStorage.setItem("pictos", JSON.stringify(pictos));
            atualizar();
        }

    } else if(categoria === "musicas") {

        let musica = musicas.find(item =>  getId(item?.nome || "") == this.id);

        if(musica) {
            musica.encontrado = this.checked;        
            localStorage.setItem("musicas", JSON.stringify(musicas));
            atualizar();
        }

    }
}

function atualizar() {

    if(view === "todos") {
        setTodos();
    } else if(view === "encontrados") {
        setEncontrados();
    } else if(view === "naoEncontrados") {
        setNaoEncontrados();
    }
}

function setTodos() {

    todosElement.classList = ["menu-item ativo"];
    encontradoElement.classList = ["menu-item inativo"];
    naoEncontradoElement.classList = ["menu-item inativo"];
       
    dadosElement.innerHTML = "";

    if(categoria == "pictos") {
        pictos.forEach(picto => {
            setLinha(picto);
        });
        quantidadeAtualElement.innerHTML = pictos.length;
    } else if(categoria == "musicas") {
        musicas.forEach(musica => {
            setLinha(musica);
        });
        quantidadeAtualElement.innerHTML = musicas.length;
    }
}

function setEncontrados() {

    todosElement.classList = ["menu-item inativo"];
    encontradoElement.classList = ["menu-item ativo"];
    naoEncontradoElement.classList = ["menu-item inativo"];

    view = "encontrados";
    dadosElement.innerHTML = "";

    if(categoria == "pictos") {
        let encontrados = pictos.filter(picto => picto.encontrado);
        encontrados.forEach(picto => {
            setLinha(picto);
        });
        quantidadeAtualElement.innerHTML = encontrados.length;
    } else if(categoria == "musicas") {
        let encontrados = musicas.filter(musica => musica.encontrado);
        encontrados.forEach(musica => {
            setLinha(musica);
        });
        quantidadeAtualElement.innerHTML = encontrados.length;
    }
}

function setNaoEncontrados() {

    todosElement.classList = ["menu-item inativo"];
    encontradoElement.classList = ["menu-item inativo"];
    naoEncontradoElement.classList = ["menu-item ativo"];

    view = "naoEncontrados";
    dadosElement.innerHTML = "";

    if(categoria == "pictos") {
        let naoEncontrados = pictos.filter(picto => !picto.encontrado);
        naoEncontrados.forEach(picto => {
            setLinha(picto);
        });
        quantidadeAtualElement.innerHTML = naoEncontrados.length;
    }

    if(categoria == "musicas") {
        let naoEncontrados = musicas.filter(musica => !musica.encontrado);
        naoEncontrados.forEach(musica => {
            setLinha(musica);
        });
        quantidadeAtualElement.innerHTML = naoEncontrados.length;
    }
}

function setLinha(item) {
    const div = document.createElement("DIV");
    div.className = ["item"];

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = getId(item.nome);
    checkbox.checked = item.encontrado;
    checkbox.onclick = selecionar;
    div.append(checkbox);
    
    const span = document.createElement("SPAN");
    span.innerHTML = item.nome;
    span.className = ["item-nome"];
    div.append(span);

    const a = document.createElement("a");
    a.href = `${baseUrlYoutube}${canal}&t=${item.tempo}s`;
    a.textContent = "Youtube";
    a.target = '_blank';
    div.append(a);
    
    dadosElement.append(div);
}

iniciar();
