document.addEventListener("DOMContentLoaded", function() {

    // Configurações comuns para os editores
    const editorConfig = {
        theme: "dracula",
        lineNumbers: true,
        tabSize: 2,
        extraKeys: {
            "Ctrl-Space": "autocomplete" // Ativa o autocomplete com Ctrl+Espaço
        }
    };

    // Inicializa o editor de HTML
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
        ...editorConfig,
        mode: "htmlmixed",
    });

    // Inicializa o editor de CSS
    const cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
        ...editorConfig,
        mode: "css",
    });
    
    // --- LÓGICA PARA ATIVAR O AUTOCOMPLETE AUTOMATICAMENTE ---

    // Ativa para o editor de HTML
    htmlEditor.on('inputRead', function(editor, change) {
        if (change.text[0] === '<') {
            setTimeout(() => { 
                editor.showHint({ 
                    // Força o uso do dicionário de sugestões de HTML
                    hint: CodeMirror.hint.html, 
                    completeSingle: false 
                }); 
            }, 50);
        }
    });

    // Ativa para o editor de CSS
    cssEditor.on('inputRead', function(editor, change) {
        if (/^[a-zA-Z]$/.test(change.text[0])) {
             setTimeout(() => { editor.showHint({ completeSingle: false }); }, 50);
        }
    });

    // --- FIM DA LÓGICA DO AUTOCOMPLETE ---

    const previewFrame = document.getElementById("preview-frame");
    const clearCodeBtn = document.getElementById("clear-code-btn");

    // Função para atualizar o painel de visualização
    function updatePreview() {
        const htmlCode = htmlEditor.getValue();
        const cssCode = `<style>${cssEditor.getValue()}</style>`;
        
        previewFrame.srcdoc = `${cssCode}${htmlCode}`;
    }

    // Adiciona listeners para atualizar em tempo real
    htmlEditor.on("change", updatePreview);
    cssEditor.on("change", updatePreview);

    // Adiciona funcionalidade ao botão de limpar
    clearCodeBtn.addEventListener("click", () => {
        htmlEditor.setValue("");
        cssEditor.setValue("");
    });

    // Atualiza o preview uma vez no início
    updatePreview();
});