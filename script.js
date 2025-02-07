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

    // Intercepta o clique nos cards para carregar a página com animação
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            event.preventDefault(); // Evita carregamento direto
            const targetPage = card.getAttribute("href"); // Obtém o link do card

            // Adiciona a classe de animação
            pageOverlay.classList.add("active");

            // Aguarda o efeito de transição antes de carregar o conteúdo
            setTimeout(() => {
                fetch(targetPage)
                    .then(response => response.text())
                    .then(html => {
                        pageOverlay.innerHTML = html; // Insere o conteúdo carregado
                    })
                    .catch(error => console.error("Erro ao carregar a página:", error));
            }, 500); // Tempo correspondente ao da animação (0.5s)
        });
    });
});
