let pictos = JSON.parse(localStorage.getItem("pictos"));

if(!pictos) {
    pictos = getPictos(PICTOS)
    localStorage.setItem("pictos", JSON.stringify(pictos))
}

const baseUrlYoutube = "https://www.youtube.com/watch?v=_Hw9tF3760o&t=";

const pictosElement = document.getElementById("pictos")
const todosElement = document.getElementById("todos")
const encontradoElement = document.getElementById("encontrado")
const naoEncontradoElement = document.getElementById("naoEncontrado")

function getId(textoOriginal) {
    return textoOriginal
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_");
}

function selecionar() {
    
    let picto = pictos.find(item =>  getId(item?.nome || "") == this.id);

    if(picto) {
        picto.encontrado = this.checked;        
        atualizar();
    }
}

function atualizar() {
    localStorage.setItem("pictos", JSON.stringify(pictos));

    todosElement.textContent = `Todos (${pictos.length})`
    encontradoElement.textContent = `Encontrados (${pictos.filter(picto => picto.encontrado).length})`
    naoEncontradoElement.textContent = `Não Encontrados (${pictos.filter(picto => !picto.encontrado).length})`
}

function getTodos() {

    pictosElement.innerHTML = "";

    pictos.forEach(picto => {
        setPicto(picto);
    });
}

function setPicto(picto) {
    const div = document.createElement("DIV");
    div.className = ["item"];

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = getId(picto.nome);
    checkbox.checked = picto.encontrado;
    checkbox.onclick = selecionar;
    div.append(checkbox);
    
    const span = document.createElement("SPAN");
    span.innerHTML = picto.nome;
    span.className = ["item-nome"];
    div.append(span);

    const a = document.createElement("a");
    a.href = `${baseUrlYoutube}${picto.tempo}s`;
    a.textContent = "Youtube";
    a.target = '_blank';
    div.append(a);
    
    pictosElement.append(div);
}

function getEncontrados() {

    pictosElement.innerHTML = "";

    pictos.forEach(picto => {
        if(picto.encontrado) {
            setPicto(picto);
        }
    });
}

function getNaoEncontrados() {

    pictosElement.innerHTML = "";

    pictos.forEach(picto => {
        if(!picto.encontrado) {
            setPicto(picto);
        }
    });
}

getTodos()
