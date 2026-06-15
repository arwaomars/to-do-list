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

function readTask() {
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
}

/*function addTask() {
  document
    .getElementById("add_task_btn")
    .addEventListener("click", function () {
      let newtask = prompt("ادخل المهمة");
      console.log(newtask);
      let newTaskObj = {
        title: newtask,
        isDone: false,
      };
      tasks.push(newTaskObj);
      readTask();
    });
}*/

function addTask() {
  const modal = document.getElementById("custom_prompt");
  const taskInput = document.getElementById("task_input");

  // 1. عند الضغط على زر "إضافة مهمة" الرئيسي بالصفحة: اظهر النافذة
  document
    .getElementById("add_task_btn")
    .addEventListener("click", function () {
      taskInput.value = ""; // تصفية الحقل
      modal.style.display = "flex"; // إظهار النافذة في المنتصف
      taskInput.focus();
    });

  // 2. عند الضغط على زر "إضافة" داخل النافذة المنبثقة
  document
    .getElementById("confirm_task_btn")
    .addEventListener("click", function () {
      let newtask = taskInput.value.trim();

      if (newtask !== "") {
        console.log(newtask);
        let newTaskObj = {
          title: newtask,
          isDone: false,
        };
        tasks.push(newTaskObj);
        readTask();
        modal.style.display = "none"; // إخفاء النافذة بعد الحفظ
      } else {
        alert("الرجاء إدخال نص المهمة!");
      }
    });

  // 3. عند الضغط على زر "إلغاء"
  document
    .getElementById("cancel_task_btn")
    .addEventListener("click", function () {
      modal.style.display = "none"; // إخفاء النافذة دون حفظ
    });
}

readTask();
addTask();
