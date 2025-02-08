



document.addEventListener("DOMContentLoaded", () => {
    const menuOverlay = document.getElementById("menu_overlay");
    const menuButton = document.getElementById("menu_button");

    // Exibir Menu
    menuButton.addEventListener("click", (event) => {
        event.preventDefault();
        const targetPage = "/pages/menu.html"

        // Carrega o menu ANTES da animação
        fetch(targetPage)
            .then(response => response.text())
            .then(html => {
                menuOverlay.innerHTML = html; // Insere o conteúdo carregado
                menuOverlay.style.display = "block"; // Torna a div visível imediatamente

                // **Força um reflow para garantir que a transição funcione**
                menuOverlay.offsetHeight;

                // Inicia a animação de entrada
                menuOverlay.classList.add("active");

                // Aguarda o carregamento do novo conteúdo e adiciona o evento ao botão "Voltar"
                setTimeout(() => {
                    const closeButton = document.getElementById("close_menu_button");
                    if (closeButton) {
                        closeButton.addEventListener("click", () => {
                            // Inicia a animação de saída
                            menuOverlay.classList.remove("active");

                            // Aguarda o fim da animação e oculta a div
                            setTimeout(() => {
                                menuOverlay.style.display = "none";
                                menuOverlay.innerHTML = ""; // Limpa o conteúdo para evitar sobrecarga no DOM
                            }, 500); // Tempo da animação (0.5s)
                        });
                    }
                }, 100); // Pequeno delay para garantir que o DOM foi atualizado
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    });

});









// Fechar Menu
// closeButton.addEventListener("click", () => {
//     menuOverlay.classList.remove("active");
// });
