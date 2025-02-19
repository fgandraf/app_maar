document.addEventListener("DOMContentLoaded", () => {

    // Cria o elemento dimmer
    var dimmer = document.createElement('div');
    dimmer.setAttribute('id', 'dimmer');
    dimmer.style.width = "100vw";
    dimmer.style.height = "100vh";
    dimmer.style.position = "fixed";
    dimmer.style.top = 0;
    dimmer.style.left = 0;
    dimmer.style.zIndex = 2;
    dimmer.style.backgroundColor = "rgba(0, 0, 0, 0)";
    dimmer.style.display = "none";
    dimmer.style.transition = "background-color 1.2s ease";
    dimmer.style.willChange = "background-color";
    document.body.appendChild(dimmer);

    // Cria o elemento page_overlay
    var pageOverlay = document.createElement('div');
    pageOverlay.setAttribute('id', 'page_overlay');
    pageOverlay.style.width = "100vw";
    pageOverlay.style.height = "100vh";
    pageOverlay.style.display = "none";
    pageOverlay.style.overflow = "auto";
    pageOverlay.style.position = "fixed";
    pageOverlay.style.top = 0;
    pageOverlay.style.left = 0;
    pageOverlay.style.zIndex = 500;
    pageOverlay.style.backgroundColor = "white";
    pageOverlay.style.transform = "translate3d(0, 100vh, 0)";
    pageOverlay.style.transition = "transform 0.7s ease";
    pageOverlay.style.willChange = "transform";
    document.body.appendChild(pageOverlay);

    // Captura os cards da página
    const cards = document.querySelectorAll(".card_link_01");

    // Para cada card, atribui um evento clique
    cards.forEach(card => {
        card.addEventListener("click", (event) => {

            // Previne o carreamento padrão
            event.preventDefault();

            // Obtém o endereço alvo do card
            const targetPage = card.getAttribute("link");

            // Carrega a página alvo
            fetch(targetPage)
                .then(response => response.text())
                .then(htmlString => {
                    // Cria um manipulador
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlString, "text/html");

                    // Remove elementos indesejados
                    doc.querySelectorAll("script#load_videos, script#initial_state, script#close_case, #page_behind").forEach(el => el.remove());

                    // Adiciona o novo conteúdo
                    pageOverlay.innerHTML = doc.body.innerHTML;

                    // Exibe a div dimmer
                    dimmer.style.display = "block";

                    // Exibe a div page_overlay
                    pageOverlay.style.display = "block";

                    // Executa a animação das divs page_overlay e dimmer simultaneamente
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            pageOverlay.style.transform = "translate3d(0, 0, 0)";
                            dimmer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                        });
                    }, 50);

                    // Após a animação
                    pageOverlay.addEventListener("transitionend", function handler() {
                        pageOverlay.removeEventListener("transitionend", handler);

                        // Atualiza a barra de endereço e oculta a rolagem de trás
                        history.pushState({}, '', targetPage);

                        // Oculta a rolagem de trás
                        document.body.style.overflow = "hidden";
                    });

                    // Executa a função de carregamento dos vídeos
                    const lazy = pageOverlay.querySelector("script#lazy");
                    if (lazy) {
                        const scriptContent = lazy.textContent;
                        eval(scriptContent);
                        loadLazyVideos();
                    } else {
                        console.error("Script #lazy não encontrado");
                    }



                    // Configuração do botão de fechar
                    const closeButton = pageOverlay.querySelector("#close_button");
                    if (closeButton) {

                        // Adiciona o evento de clique do botão fechar
                        closeButton.addEventListener("click", (event) => {

                            // Previne o carreamento padrão
                            event.preventDefault();

                            // Retorna a barra de rolagem da página de baixo
                            document.body.style.overflow = "auto";

                            // Faz animação de saída
                            requestAnimationFrame(() => {
                                pageOverlay.style.transform = "translate3d(0, 100vh, 0)";
                                dimmer.style.backgroundColor = "rgba(0, 0, 0, 0)";
                            });

                            // Após a animação, limpa todo o conteúdo carregado
                            pageOverlay.addEventListener("transitionend", function handler() {
                                pageOverlay.removeEventListener("transitionend", handler);

                                // Retorna os videos ao estado inicial
                                pageOverlay.querySelectorAll("video").forEach(video => {
                                    video.pause();
                                    video.setAttribute("data-src", video.getAttribute("src"));
                                    video.removeAttribute("src");
                                });

                                // Limpa e oculta as divs
                                pageOverlay.style.display = "none";
                                pageOverlay.innerHTML = "";
                                dimmer.style.display = "none";

                                // Atualiza a barra de endereço
                                history.pushState({}, '', '/work');
                            });


                        });
                    }
                })
                .catch(error => console.error("Erro ao carregar a página:", error));
        });
    });
});