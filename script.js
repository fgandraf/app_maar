document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const menuOverlay = document.getElementById("menuOverlay");
    const pageOverlay = document.getElementById("pageOverlay");
    const cards = document.querySelectorAll(".card");

    // Exibir Menu
    menuButton.addEventListener("click", () => {
        menuOverlay.classList.add("active");
    });

    // Fechar Menu
    closeButton.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
    });

    // Função para carregar e animar a nova página
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            event.preventDefault(); // Impede o carregamento normal da página
            const targetPage = card.getAttribute("href"); // Obtém o link do card

            // Primeiro, carregamos a nova página
            fetch(targetPage)
                .then(response => response.text())
                .then(html => {
                    pageOverlay.innerHTML = html; // Insere o conteúdo carregado
                    pageOverlay.style.display = "block"; // Torna a div visível imediatamente

                    // **Força um reflow para garantir que a transição funcione**
                    pageOverlay.offsetHeight;

                    // Agora iniciamos a animação
                    pageOverlay.classList.add("active");
                })
                .catch(error => console.error("Erro ao carregar a página:", error));
        });
    });
});
