function limpaString(str) {
    
    if(!str || typeof str !== 'string') {
        return str
    }

    return str
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_");
}