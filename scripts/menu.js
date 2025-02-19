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