export function setupModal() {
  const modal = document.getElementById("videoModal") as HTMLDivElement;
  const modalContent = document.querySelector(".modal__content");
  const openButton = document.querySelector(
    ".gallery__thumbnail-play"
  ) as HTMLButtonElement;

  const closeButton = document.getElementById(
    "modalClose"
  ) as HTMLButtonElement;
  const iframe = modal.querySelector("iframe") as HTMLIFrameElement;

  const originalSrc = iframe.src;
  let lastFocusedElement: HTMLElement | null = null;

  // Show modal
  function openModal(): void {
    lastFocusedElement = document.activeElement as HTMLElement;
    document.body.classList.add("no-scroll");

    modal.removeAttribute("hidden");
    iframe.src = originalSrc + "&autoplay=1";
    closeButton.focus();
  }

  //Close modal
  function closeModal(): void {
    modal.setAttribute("hidden", "true");
    document.body.classList.remove("no-scroll");
    iframe.src = "";

    //Restore focus to the play button
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Click event s
  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", closeModal);
  modalContent?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Keyboard (Escape)
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });
}
