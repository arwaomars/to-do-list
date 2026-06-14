let tasks = [
  {
    title: "قراءة كتاب",
    isDone: false,
  },
  {
    title: "رياضة",
    isDone: false,
  },
];

// 1. استهداف وتفريغ الحاوية الرئيسية الكبيرة
document.getElementById("tasks_container").innerHTML = "";

// 2. تكرار المصفوفة لبناء المهام
for (task of tasks) {
  let content = `
  <div class="task">
    <div class="task_info">
      <h2>${task.title}</h2>
    </div>

    <div id="task_actions">
      <button class="circular_btn" id="done_btn">
        <span class="material-symbols-outlined"> check </span>
      </button>
      <button class="circular_btn" id="edit_btn">
        <span class="material-symbols-outlined"> edit </span>
      </button>
      <button class="circular_btn" id="delet_btn">
        <span class="material-symbols-outlined"> delete </span>
      </button>
    </div>
  </div>
`;

  // 3. إضافة الـ HTML الجديد بداخل الحاوية الكبيرة
  document.getElementById("tasks_container").innerHTML += content;
}
