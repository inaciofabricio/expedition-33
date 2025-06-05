function getMusicas(musicas) {
    return musicas.sort((a, b) => {
        
        const nameA = limpaString(a.nome);
        const nameB = limpaString(b.nome);
    
        return nameA.localeCompare(nameB);
    })
}

function getMusicasPorNome(nome, musicas) {
    return musicas.filter(musica => 
        limpaString(musica.nome).toLowerCase().includes(limpaString(nome))
    );
}