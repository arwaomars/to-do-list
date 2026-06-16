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

  //متغير احفظ فيه اندكس كل مهمة حتى استطيع التميز بينهم
  var index = 0;

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
      <button class="circular_btn" id="delet_btn" onclick = "deletTask(${index})">
        <span class="material-symbols-outlined"> delete </span>
      </button>
    </div>
  </div>
`;

    // 3. إضافة الـ HTML الجديد بداخل الحاوية الكبيرة
    document.getElementById("tasks_container").innerHTML += content;
    index++;
  }
}

function addTask() {
  const modal = document.getElementById("add_task_prompt");
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

function deletTask(index) {
  // 1. استهداف عنصر الـ Modal الأصلي الموجود في الـ HTML
  const modal = document.getElementById("delet_task_prompt");

  // 2. تحديث نص السؤال ليظهر اسم المهمة المراد حذفها ديناميكياً
  modal.querySelector("h3").innerText =
    `هل انت متأكد من رغبتك في حذف المهمة (${tasks[index].title})؟`;

  // 3. إظهار النافذة المنبثقة
  modal.style.display = "flex";

  // 4. عند الضغط على زر "نعم" داخل النافذة المنبثقة
  const deleteBtn = document.getElementById("delet_task_btn");
  deleteBtn.onclick = function () {
    tasks.splice(index, 1); // حذف العنصر من المصفوفة
    readTask(); // إعادة بناء قائمة المهام
    modal.style.display = "none"; // إخفاء النافذة
  };

  // 5. عند الضغط على زر "لا" (إلغاء)
  const cancelBtn = document.getElementById("undelet_task_btn");
  cancelBtn.onclick = function () {
    modal.style.display = "none"; // إخفاء النافذة دون حذف
  };
}

readTask();
addTask();
