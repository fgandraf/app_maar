// ========================= LOAD MENU ========================= //
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu_button");
    const menuOverlay = document.getElementById("menu_overlay");
    const workPage = document.querySelector("main");

    menuButton.addEventListener("click", (event) => {
        event.preventDefault();
        fetch("/menu.html")
            .then(response => response.text())
            .then(htmlString => {

                //workPage.classList.add("dimmer");
                menuOverlay.innerHTML = htmlString;
                menuOverlay.style.display = "block";
                menuOverlay.offsetHeight;
                menuOverlay.classList.add("active");



                // Executa a função de carregamento dos vídeos
                const scriptsJs = menuOverlay.querySelector("script");
                if (scriptsJs) {
                    const scriptContent = scriptsJs.textContent;
                    eval(scriptContent);
                    menuItems();
                } else {
                    console.error("Script #lazy não encontrado");
                }





                setTimeout(() => {
                    const closeButton = document.getElementById("close_menu_button");
                    if (closeButton) {
                        closeButton.addEventListener("click", () => {
                            menuOverlay.classList.remove("active");
                            setTimeout(() => {
                                //workPage.classList.remove("dimmer");
                                menuOverlay.style.display = "none";
                                menuOverlay.innerHTML = "";
                            }, 500);
                        });
                    }
                }, 200);
            }
            )
            .catch(error => console.error("Erro ao carregar a página:", error));
        });
});