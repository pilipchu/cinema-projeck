// Отримуємо елементи з DOM для подальшої роботи
const sessionMounth = document.querySelectorAll(".sesion-mounth");
const sessionDay = document.querySelectorAll(".session-day");
const sessionWeekDay = document.querySelectorAll(".session-week-day");
const btn = document.querySelector(".select-btn");
const options = document.querySelector(".options");
const selected = document.querySelector(".selected");
const btnTime = document.querySelector(".select-btn-time");
const optionsTime = document.querySelector(".options-time");
const selectedTime = document.querySelector(".selected-time");
const sessionDate = document.querySelectorAll(".session-date-item");
const arrowIcon = document.querySelector(".arrow");
const arrowTimeIcon = document.querySelector(".arrow-time");
const list = document.querySelector(".seat-list");
const listSecond = document.querySelectorAll(".seat-list-dwn");
const payAmount = document.querySelector(".pay-amount");
const btnTrailer = document.querySelector(".film-trailer");
const modalWindow = document.querySelector(".modal-window");
const closeModal = document.querySelector(".close-modal");
const body = document.body;
const iframe = document.querySelector("iframe");


const tempScr = iframe.src;

// Початкова сума до сплати
const pay = 0;

const price = 320;

// Встановлюємо початкову суму до сплати
payAmount.textContent = `${pay} ₴`;

// Кількість місць для вибору
const numberOfSeats = 75;
const numberOfSeatsSecond = 39;

// Створюємо місця для вибору
for (let i = 1; i <= numberOfSeats; i++) {
    list.innerHTML += `<li class="seat-item">
        <svg class="seat-icon"><use href="./img/Vector-1.svg"></use></svg>
    </li>`
}

// Створюємо місця для вибору (другий список)
for (let i = 1; i <= numberOfSeatsSecond; i++) {
    listSecond[0].innerHTML += `<li class="seat-item">
        <svg class="seat-icon"><use href="./img/Vector-1.svg"></use></svg>
    </li>`
    listSecond[1].innerHTML += `<li class="seat-item">
        <svg class="seat-icon"><use href="./img/Vector-1.svg"></use></svg>
    </li>`
}

// Встановлюємо поточну дату для сеансів
 const date = new Date();
const months = [
    "січ", "лют", "бер", "квіт",
    "трав", "черв", "лип", "серп",
    "вер", "жовт", "лист", "груд"
  ];

  const days = [
    "нд", "пн", "вт", "ср",
    "чт", "пт", "сб"
];

// Заповнюємо інформацію про дату для 4 сеансів, починаючи з поточної дати
for (let i = 0; i < 4; i++) {
    sessionMounth[i].textContent = `${months[date.getMonth()]}`
    sessionDay[i].textContent = `${date.getDate()}`
    sessionWeekDay[i].textContent = `${days[date.getDay()]}`
    const month = months[date.getMonth()];
    const dayNumber = date.getDate();
    const weekDay = days[date.getDay()];
    date.setDate(date.getDate() + 1);
}

  // подія на кастомний селектор вибору кінотеатру
btn.addEventListener("click", () => {
    options.classList.toggle("active");
    arrowIcon.classList.toggle("active-arrow");
});

// подія на вибір кінотеатру, просто замінюємо текст у селекторі на вибраний і ховаємо список
document.querySelectorAll(".options li").forEach(option => {
  option.addEventListener("click", () => {
    selected.textContent = option.textContent;
      options.classList.remove("active");
       arrowIcon.classList.remove("active-arrow");
  });
});

// подія на клік поза селектором, ховаємо список
document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
      options.classList.remove("active");
    arrowIcon.classList.remove("active-arrow");
  }
});

// подія на кастомний селектор вибору часу
btnTime.addEventListener("click", () => {
    optionsTime.classList.toggle("active");
    arrowTimeIcon.classList.toggle("active-arrow");
});

// подія на вибір часу, просто замінюємо текст у селекторі на вибраний і ховаємо список
document.querySelectorAll(".options-time li").forEach(option => {
  option.addEventListener("click", () => {
    selectedTime.textContent = option.textContent;
    optionsTime.classList.remove("active");
    arrowTimeIcon.classList.remove("active-arrow");
  });
}); 

// подія на клік поза селектором, ховаємо список
document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select-time")) {
    optionsTime.classList.remove("active");
    arrowTimeIcon.classList.remove("active-arrow");
  }
});

// подія на вибір дати сеансу, просто додаємо клас active до вибраного елемента і видаляємо його у інших
sessionDate.forEach(dateItem => {
  dateItem.addEventListener("click", () => {
    sessionDate.forEach(item => item.classList.remove("active"));
    dateItem.classList.add("active");
  });
});

// подія на вибір місця, просто додаємо клас active-item до вибраного елемента і видаляємо його при повторному кліку, також рахуємо суму до сплати залежно від кількості вибраних місць
const seatItems = document.querySelectorAll(".seat-icon");

seatItems.forEach(seat => {
    seat.addEventListener("click", () => {
        // перевіряємо, чи місце вже заброньовано, якщо ні - дозволяємо вибирати, якщо так - виводимо повідомлення
        if (!seat.classList.contains("icon-booked")) {
             seat.classList.toggle("active-item");
        payAmount.textContent = `${document.querySelectorAll(".active-item").length * price} ₴`;
        } else {
            console.log("Це місце вже заброньовано"); 
        }
    }); 
});

// подія на клік по кнопці перегляду трейлера, відкриваємо модальне вікно
btnTrailer.addEventListener("click", () => {
  modalWindow.classList.add("is-open");
  body.classList.add("modal-open");
  iframe.src = tempScr; // Встановлюємо src iframe, щоб відтворювати відео
}); 

closeModal.addEventListener("click", () => {
  modalWindow.classList.remove("is-open");
  body.classList.remove("modal-open");
  iframe.src = ""; // Очищуємо src iframe, щоб зупинити відтворення відео
});

// подія на клік по модальному вікну, якщо клік поза контентом - закриваємо модальне вікно
modalWindow.addEventListener("click", (e) => {
  if (e.target === modalWindow) {
    modalWindow.classList.remove("is-open");
    body.classList.remove("modal-open");
    iframe.src = ""; // Очищуємо src iframe, щоб зупинити відтворення відео
  }
});
