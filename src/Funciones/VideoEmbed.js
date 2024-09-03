function convertirUrlYoutube(url) {
    // Expresión regular para capturar el videoId en diferentes formatos de URL
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
        // Extrae el videoId y forma la URL en formato embed
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        // Si no es una URL válida de YouTube, devuelve la URL original
        return url;
    }
}

module.exports = convertirUrlYoutube