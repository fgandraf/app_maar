
// ========================= LOAD MENU ========================= //
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu_button");
    const menuOverlay = document.getElementById("__menu_overlay");
    const workPage = document.querySelector("main");

    menuButton.addEventListener("click", (event) => {
        event.preventDefault();
        fetch("/pages/menu.html")
            .then(response => response.text())
            .then(html => {
                workPage.classList.add("dimmer");
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
                                workPage.classList.remove("dimmer");
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






// ========================= LOAD MENU ITEMS ========================= //
document.addEventListener("click", function (event) {

    const link = event.target.closest(".__menu_item");
    const menuBackground = document.getElementById("menu_background");
    const menuMain = document.getElementById("menu_main");

    if (link) {
        event.preventDefault();
        menuBackground.classList.add("dimmer");
        const targetPage = link.getAttribute("href")
        

        fetch(targetPage)
            .then(response => response.text())
            .then(html => {
                menuBackground.innerHTML = html;
                menuBackground.style.display = "block";
                menuBackground.offsetHeight;
                menuBackground.classList.add("active");

                setTimeout(() => {
                    menuMain.classList.add("hide");
                    menuBackground.classList.remove("dimmer");

                    setTimeout(() => {
                        window.location.href = targetPage;
                    }, 700);

                    
                }, 50);
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    }
});






// ========================= LOAD CASES ========================= //
document.addEventListener("DOMContentLoaded", () => {
    const pageOverlay = document.getElementById("__page_overlay");
    const workPage = document.querySelector("main");
    const cards = document.querySelectorAll(".__card");

    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            event.preventDefault();
            const targetPage = card.getAttribute("href");

            workPage.classList.add("dimmer");

            fetch(targetPage)
                .then(response => response.text())
                .then(html => {
                    pageOverlay.innerHTML = html;
                    pageOverlay.style.display = "block";
                    pageOverlay.offsetHeight;
                    pageOverlay.classList.add("active");

                    setTimeout(() => {
                        const backButton = document.getElementById("backToWork");
                        if (backButton) {
                            backButton.addEventListener("click", () => {
                                pageOverlay.classList.remove("active");
                                workPage.classList.remove("dimmer");

                                setTimeout(() => {
                                    pageOverlay.style.display = "none";
                                    pageOverlay.innerHTML = "";
                                    
                                }, 500);
                            });
                        }
                    }, 100);
                })
                .catch(error => console.error("Erro ao carregar a página:", error));
        });
    });
    
});
