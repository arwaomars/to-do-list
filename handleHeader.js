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

  document.getElementById("todayName").innerHTML = days[now.getDay()];

  document.getElementById("currentDate").innerHTML =
    `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

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
