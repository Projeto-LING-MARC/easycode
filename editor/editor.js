document.addEventListener("DOMContentLoaded", function() {

    // --- VARIÁVEIS DE CONTROLE ---
    const autocompleteToggleBtn = document.getElementById("autocomplete-toggle");
    let isAutocompleteActive = true; // Começa ativado por padrão

    // --- CONFIGURAÇÃO DO EDITOR ---
    const editorConfig = {
        theme: "dracula",
        lineNumbers: true,
        tabSize: 2,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        }
    };

    const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
        ...editorConfig,
        mode: "htmlmixed",
    });

    const cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
        ...editorConfig,
        mode: "css",
    });

    // --- LÓGICA DO AUTOCOMPLETE ---
    htmlEditor.on('inputRead', function(editor, change) {
        if (isAutocompleteActive && change.text[0] === '<') {
            setTimeout(() => { 
                editor.showHint({ hint: CodeMirror.hint.html, completeSingle: false }); 
            }, 50);
        }
    });

    cssEditor.on('inputRead', function(editor, change) {
        if (isAutocompleteActive && /^[a-zA-Z]$/.test(change.text[0])) {
             setTimeout(() => { editor.showHint({ completeSingle: false }); }, 50);
        }
    });

    // --- LÓGICA DOS BOTÕES DE CONTROLE ---
    const previewFrame = document.getElementById("preview-frame");
    const clearCodeBtn = document.getElementById("clear-code-btn");
    
    // Botão de Ligar/Desligar
    autocompleteToggleBtn.addEventListener("click", () => {
        isAutocompleteActive = !isAutocompleteActive; // Inverte o estado
        autocompleteToggleBtn.classList.toggle("active", isAutocompleteActive);
        const textSpan = autocompleteToggleBtn.querySelector("span");
        if (isAutocompleteActive) {
            textSpan.textContent = "Autocompletar Ativado";
        } else {
            textSpan.textContent = "Autocompletar Desativado";
        }
    });

    // Botão de Limpar
    clearCodeBtn.addEventListener("click", () => {
        htmlEditor.setValue("");
        cssEditor.setValue("");
    });

    // --- FUNÇÃO DE ATUALIZAÇÃO DO PREVIEW ---
    function updatePreview() {
        const htmlCode = htmlEditor.getValue();
        const cssCode = `<style>${cssEditor.getValue()}</style>`;
        previewFrame.srcdoc = `${cssCode}${htmlCode}`;
    }

    htmlEditor.on("change", updatePreview);
    cssEditor.on("change", updatePreview);

    updatePreview(); // Chamada inicial
});