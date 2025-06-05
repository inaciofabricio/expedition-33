function getPictos(pictos) {
    return pictos.sort((a, b) => {
        const nameA = limpaString(a.nome);
        const nameB = limpaString(b.nome);
    
        return nameA.localeCompare(nameB);
    })
}

function getPictosPorNome(nome, pictos) {
    return pictos.filter(picto => 
        limpaString(picto.nome).toLowerCase().includes(limpaString(nome))
    );
}
