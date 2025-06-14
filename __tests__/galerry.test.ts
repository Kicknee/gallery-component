import { describe, test, beforeEach, expect } from "vitest";
import fs from "fs";
import path from "path";
import { setupModal } from "../scripts/main";

describe("Modal (unit test)", () => {
  beforeEach(async () => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../index.html"),
      "utf8"
    );

    document.body.innerHTML = html;
    setupModal();
  });

  test("opens modal on button click", () => {
    const openBtn = document.querySelector(
      ".gallery__thumbnail-play"
    )! as HTMLButtonElement;
    const modal = document.getElementById("videoModal")!;
    openBtn.click();
    expect(modal.hasAttribute("hidden")).toBe(false);
  });

  test("closes modal on close button click", () => {
    const openBtn = document.querySelector(
      ".gallery__thumbnail-play"
    )! as HTMLButtonElement;
    const modal = document.getElementById("videoModal")!;
    const closeBtn = document.getElementById("modalClose")!;
    openBtn.click();
    closeBtn.click();
    expect(modal.hasAttribute("hidden")).toBe(true);
  });

  test("does not close modal on modal content click", () => {
    const openBtn = document.querySelector(
      ".gallery__thumbnail-play"
    )! as HTMLButtonElement;
    const modal = document.getElementById("videoModal")!;
    const modalContent = document.querySelector(".modal__content")!;
    openBtn.click();
    modalContent.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(modal.hasAttribute("hidden")).toBe(false);
  });

  test("closes modal on Escape key", () => {
    const openBtn = document.querySelector(
      ".gallery__thumbnail-play"
    )! as HTMLButtonElement;
    const modal = document.getElementById("videoModal")!;
    openBtn.click();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(modal.hasAttribute("hidden")).toBe(true);
  });

  test("focus is set to close button when modal opens", () => {
    const openButton = document.querySelector(
      ".gallery__thumbnail-play"
    ) as HTMLButtonElement;
    const closeButton = document.getElementById(
      "modalClose"
    ) as HTMLButtonElement;

    openButton.focus();
    openButton.click();

    expect(document.activeElement).toBe(closeButton);
  });

  test("modal is initially hidden after setup", async () => {
    const modal = document.getElementById("videoModal");
    expect(modal?.hasAttribute("hidden")).toBe(true);
  });

  test("adds .no-scroll to body when modal opens", async () => {
    const playButton = document.querySelector(
      ".gallery__thumbnail-play"
    )! as HTMLButtonElement;
    playButton.click();

    expect(document.body.classList.contains("no-scroll")).toBe(true);
  });
});
