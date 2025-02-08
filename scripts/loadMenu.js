document.addEventListener("DOMContentLoaded", () => {
    const menuOverlay = document.getElementById("menu_overlay");
    const menuButton = document.getElementById("menu_button");

    menuButton.addEventListener("click", (event) => {
        event.preventDefault();
        const targetPage = "/maar/pages/menu.html";


        // Carrega o conteúdo do menu
        fetch(targetPage)
            .then(response => response.text())
            .then(html => {

                // Injeta o conteúdo do menu
                menuOverlay.innerHTML = html;

                // Torna a div visível imediatamente
                menuOverlay.style.display = "block"; 

                // Força um reflow para garantir que a transição funcione
                menuOverlay.offsetHeight;

                // Inicia a animação de entrada
                menuOverlay.classList.add("active");

                // Aguarda o carregamento do novo conteúdo e adiciona o evento ao botão "Fechar"
                setTimeout(() => {
                    const closeButton = document.getElementById("close_menu_button");
                    if (closeButton) {
                        closeButton.addEventListener("click", () => {
                            // Inicia a animação de saída
                            menuOverlay.classList.remove("active");

                            // Aguarda o fim da animação
                            setTimeout(() => {

                                // Oculta a div
                                menuOverlay.style.display = "none";

                                // Limpa o conteúdo da div
                                menuOverlay.innerHTML = ""; 
                            }, 500);
                        });
                    }
                }, 100); // Pequeno delay para garantir que o DOM foi atualizado
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    });
});