function updateHeader() {
  const now = new Date();

  const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  document.getElementById("currentDate").innerHTML =
    `${days[now.getDay()]}، ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  document.getElementById("currentTime").innerHTML = now.toLocaleTimeString(
    "ar-SA",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}

updateHeader();

setInterval(updateHeader, 1000);

//======= اسم المستخدم =======
function initUserName() {
  const nameDisplay = document.getElementById("userNameDisplay");
  const modal = document.getElementById("username_prompt");
  const input = document.getElementById("username_input");
  const confirmBtn = document.getElementById("confirm_username_btn");

  const savedName = localStorage.getItem("userName");

  if (savedName) {
    nameDisplay.textContent = savedName;
  } else {
    modal.style.display = "flex";
    input.focus();
  }

  confirmBtn.onclick = function () {
    const newName = input.value.trim();
    if (newName !== "") {
      localStorage.setItem("userName", newName);
      nameDisplay.textContent = newName;
      modal.style.display = "none";
    } else {
      alert("الرجاء إدخال اسمك!");
    }
  };

  // تسمح للزائر يغيّر اسمه لاحقاً بالضغط عليه
  nameDisplay.style.cursor = "pointer";
  nameDisplay.title = "اضغطي لتغيير اسمك";
  nameDisplay.onclick = function () {
    input.value =
      nameDisplay.textContent === "بك" ? "" : nameDisplay.textContent;
    modal.style.display = "flex";
    input.focus();
  };
}

initUserName();
