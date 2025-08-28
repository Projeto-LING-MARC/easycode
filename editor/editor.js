document.addEventListener("DOMContentLoaded", () => {

  // --- ELEMENTOS DOM ---
  const htmlEditorArea = document.getElementById("html-editor");
  const cssEditorArea = document.getElementById("css-editor");
  const previewFrame = document.getElementById("preview-frame");
  const clearCodeBtn = document.getElementById("clear-code-btn");

  // --- CONFIGURAÇÃO BASE DO CODEMIRROR ---
  const editorConfig = {
    theme: "dracula", // Tema dark
    lineNumbers: true,
    tabSize: 2
  };

  const htmlEditor = CodeMirror.fromTextArea(htmlEditorArea, {
    ...editorConfig,
    mode: "htmlmixed"
  });

  const cssEditor = CodeMirror.fromTextArea(cssEditorArea, {
    ...editorConfig,
    mode: "css"
  });

  // --- FUNÇÃO DE ATUALIZAÇÃO DO PREVIEW ---
  function updatePreview() {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    previewFrame.srcdoc = css + html;
  }

  htmlEditor.on("change", updatePreview);
  cssEditor.on("change", updatePreview);

  // --- BOTÃO LIMPAR ---
  clearCodeBtn.addEventListener("click", () => {
    htmlEditor.setValue("");
    cssEditor.setValue("");
  });

  // --- CHAMADA INICIAL DO PREVIEW ---
  updatePreview();
});
