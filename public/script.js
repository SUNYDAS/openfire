const faqButtons = document.querySelectorAll(".faq-btn");

    faqButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        content.classList.toggle("hidden");

        // Toggle + / - icon
        const icon = btn.querySelector("span:last-child");
        icon.textContent = content.classList.contains("hidden") ? "+" : "-";
      });
    });

//Get current year
document.getElementById("year").textContent = new Date().getFullYear();