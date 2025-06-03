function getPictos(PICTOS) {
    return PICTOS.sort((a, b) => {
        
        const nameA = a.nome.toLowerCase();
        const nameB = b.nome.toLowerCase();
    
        return nameA.localeCompare(nameB);
    })
}

function PICTOSgetPictoByName(name, PICTOS) {
    return PICTOS.find(picto => 
        picto.nome.toLowerCase().includes(name.toLowerCase())
    );
}

function getPictoEncontrados(PICTOS) {
    return PICTOS.filter(picto => 
        picto.nome.toLowerCase().includes(name.toLowerCase())
    );
}