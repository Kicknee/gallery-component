export function setupModal() {
    const modal = document.getElementById("videoModal");
    const modalContent = document.querySelector(".modal__content");
    const openButton = document.querySelector(".gallery__thumbnail-play");
    const closeButton = document.getElementById("modalClose");
    const iframe = modal.querySelector("iframe");
    const originalSrc = iframe.src;
    let lastFocusedElement = null;
    // Show modal
    function openModal() {
        lastFocusedElement = document.activeElement;
        document.body.classList.add("no-scroll");
        modal.removeAttribute("hidden");
        iframe.src = originalSrc + "&autoplay=1";
        closeButton.focus();
    }
    //Close modal
    function closeModal() {
        modal.setAttribute("hidden", "true");
        document.body.classList.remove("no-scroll");
        iframe.src = "";
        //Restore focus to the play button
        if (lastFocusedElement)
            lastFocusedElement.focus();
    }
    // Click event s
    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", closeModal);
    modalContent === null || modalContent === void 0 ? void 0 : modalContent.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    // Keyboard (Escape)
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
            closeModal();
        }
    });
}
