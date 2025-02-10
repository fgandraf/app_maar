
// ========================= LOAD MENU ========================= //
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu_button");
    const menuOverlay = document.getElementById("menu_overlay");
    menuButton.addEventListener("click", (event) => {
        event.preventDefault();
        fetch("/pages/menu.html")
            .then(response => response.text())
            .then(html => {
                menuOverlay.innerHTML = html;
                menuOverlay.style.display = "block";
                menuOverlay.offsetHeight;
                menuOverlay.classList.add("active");

                setTimeout(() => {
                    const closeButton = document.getElementById("close_menu_button");
                    if (closeButton) {
                        closeButton.addEventListener("click", () => {
                            menuOverlay.classList.remove("active");
                            setTimeout(() => {
                                menuOverlay.style.display = "none";
                                menuOverlay.innerHTML = "";
                            }, 500);
                        });
                    }
                }, 100);
            }
            )
            .catch(error => console.error("Erro ao carregar a página:", error));
        });
});


// ========================= LOAD MENU ITEM ========================= //
document.addEventListener("click", function (event) {

    const menuOverlay = document.getElementById("menu_overlay");
    const link = event.target.closest(".menu_footer_item");
    const pageOverlay = document.getElementById("page_overlay");

    if (link) {
        event.preventDefault();
        const targetPage = link.getAttribute("href")

        // Carrega a nova página ANTES da animação
        fetch(targetPage)
            .then(response => response.text())
            .then(html => {
                pageOverlay.innerHTML = html; // Insere o conteúdo carregado
                pageOverlay.style.display = "block"; // Torna a div visível imediatamente

                // Força um reflow para garantir que a transição funcione
                pageOverlay.offsetHeight;

                // Inicia a animação de entrada
                pageOverlay.classList.add("active");

                // Aguarda o fim da animação e muda a URL
                setTimeout(() => {
                    window.location.href = targetPage; // Define a URL para a página real
                }, 500); // Tempo igual ao da animação de entrada
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    }
});

// ========================= LOAD CASES ========================= //
document.addEventListener("DOMContentLoaded", () => {
    const pageOverlay = document.getElementById("page_overlay");
    const cards = document.querySelectorAll(".card");

    // Intercepta o clique nos cards para carregar a página com animação
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            event.preventDefault(); // Impede o carregamento normal da página
            const targetPage = card.getAttribute("href"); // Obtém o link do card

            // Carrega a nova página ANTES da animação
            fetch(targetPage)
                .then(response => response.text())
                .then(html => {
                    pageOverlay.innerHTML = html; // Insere o conteúdo carregado
                    pageOverlay.style.display = "block"; // Torna a div visível imediatamente

                    // Força um reflow para garantir que a transição funcione
                    pageOverlay.offsetHeight;

                    // Inicia a animação de entrada
                    pageOverlay.classList.add("active");

                    // Aguarda o carregamento do novo conteúdo e adiciona o evento ao botão "Voltar"
                    setTimeout(() => {
                        const backButton = document.getElementById("backToWork");
                        if (backButton) {
                            backButton.addEventListener("click", () => {
                                // Inicia a animação de saída
                                pageOverlay.classList.remove("active");

                                // Aguarda o fim da animação e oculta a div
                                setTimeout(() => {
                                    pageOverlay.style.display = "none";
                                    pageOverlay.innerHTML = ""; // Limpa o conteúdo para evitar sobrecarga no DOM
                                }, 500); // Tempo da animação (0.5s)
                            });
                        }
                    }, 100); // Pequeno delay para garantir que o DOM foi atualizado
                })
                .catch(error => console.error("Erro ao carregar a página:", error));
        });
    });

});
