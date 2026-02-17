//State
let currentIndex = 0;

//Elements
const images = document.querySelectorAll(".gallery img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

//Functions
function openModal(index) {
  modal.style.display = "flex";
  modalImg.src = images[index].src;
  currentIndex = index;
}

function closeModal() {
    modal.style.display = "none";
}

//Events
images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
});

closeBtn.addEventListener("click", () => closeModal());

modal.addEventListener("click", (e) => {
    if (e.target === modal){
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
        closeModal();
    }

    if (modal.style.display !== "flex"){
        return;
    }

    if (e.key === "ArrowRight"){
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
    }

    if (e.key === "ArrowLeft"){
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
    }
});

// Filter Code 
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        //Active button UI
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        images.forEach((img, index) => {
            const category = img.dataset.category;

            if (filter === "all" || category === filter){
                img.classList.remove("hide");
            } else {
                img.classList.add("hide");
            }
        })
    })
})