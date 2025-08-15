// Atualizar preview
function atualizarPreview() {
    const htmlCode = document.getElementById('html').value;
    const cssCode = "<style>" + document.getElementById('css').value + "</style>";
    document.getElementById('preview').srcdoc = htmlCode + cssCode;
}

// Escutar alterações nos textareas
document.getElementById('html').addEventListener('input', atualizarPreview);
document.getElementById('css').addEventListener('input', atualizarPreview);
