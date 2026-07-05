//======= storage funcions =======
function setTaskToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTaskFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (retrievedTasks && retrievedTasks.length > 0) {
    tasks = retrievedTasks;
  } else {
    setTaskToStorage();
  }
}
getTaskFromStorage();

//======= show tasks =======
function readTask() {
  arrangeTheTasks();
  // 1. استهداف وتفريغ الحاوية الرئيسية الكبيرة
  document.getElementById("tasks_container").innerHTML = "";

  //متغير احفظ فيه اندكس كل مهمة حتى استطيع التميز بينهم
  var index = 0;

  const today = new Date();

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.id);

    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });
  // 2. تكرار المصفوفة لبناء المهام
  for (task of todayTasks) {
    let content = `
  <div class="task ${task.isDone ? "doneTask" : ""}">
    <div class="task_info">
        <h2>${task.title}</h2>
    </div>

    <div id="task_actions">
        <button class="circular_btn ${task.isDone ? "done_btn_active" : ""}" id="done_btn" onclick="completeTask(${task.id})">
            <span class="material-symbols-outlined">check</span>
        </button>
        
        ${
          !task.isDone
            ? `
            <button class="circular_btn" id="edit_btn" onclick="editTask(${task.id})">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="circular_btn" id="delet_btn" onclick="deletTask(${task.id})">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `
            : ""
        }
    </div>
</div>
`;

    // 3. إضافة الـ HTML الجديد بداخل الحاوية الكبيرة
    document.getElementById("tasks_container").innerHTML += content;
    index++;
  }
  updateProductivityStats();
}

//======= add tasks =======
function addTask() {
  const modal = document.getElementById("add_task_prompt");
  const taskInput = document.getElementById("task_input");

  // استخدام onclick يضمن أن الحدث يتبرمج مرة واحدة فقط ولا يتكرر
  document.getElementById("add_task_btn").onclick = function () {
    taskInput.value = "";
    modal.style.display = "flex";
    taskInput.focus();
  };

  document.getElementById("confirm_task_btn").onclick = function () {
    let newtask = taskInput.value.trim();

    if (newtask !== "") {
      let newTaskObj = {
        id: Date.now(), // 3. نولّد ID فريد يعتمد على الوقت الحالي بالملي ثانية
        title: newtask,
        isDone: false, // المهمة الجديدة دائماً false
        completedAt: null,
      };
      tasks.push(newTaskObj);
      setTaskToStorage();
      readTask();
      if (typeof updateChart === "function") {
        updateChart();
      }

      modal.style.display = "none";
    } else {
      alert("الرجاء إدخال نص المهمة!");
    }
  };

  document.getElementById("cancel_task_btn").onclick = function () {
    modal.style.display = "none";
  };
}

//======= delete tasks =======
function deletTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
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
    setTaskToStorage();

    readTask(); // إعادة بناء قائمة المهام
    if (typeof updateChart === "function") {
      updateChart();
    }
    modal.style.display = "none"; // إخفاء النافذة
  };

  // 5. عند الضغط على زر "لا" (إلغاء)
  const cancelBtn = document.getElementById("undelet_task_btn");
  cancelBtn.onclick = function () {
    modal.style.display = "none"; // إخفاء النافذة دون حذف
  };
}

//======= edit tasks =======
function editTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  // 1. تصحيح getElementById
  const modal = document.getElementById("edit_task_prompt");
  const input = document.getElementById("edit_task_input");

  // 2. تصحيح طريقة إسناد قيمة المهمة الحالية داخل حقل الإدخال
  input.value = tasks[index].title;

  // إظهار النافذة
  modal.style.display = "flex";

  // عند الضغط على زر تحديث
  const updateBtn = document.getElementById("update_task_btn");
  updateBtn.onclick = function () {
    let newTitleTask = input.value.trim();
    if (newTitleTask !== "") {
      tasks[index].title = newTitleTask;
      setTaskToStorage();
      readTask();
      if (typeof updateChart === "function") {
        updateChart();
      }
      modal.style.display = "none";
    } else {
      alert("الرجاء إدخال نص المهمة!");
    }
  };

  // عند الضغط على زر إلغاء
  const cancelBtn = document.getElementById("unupdate_task_btn");
  cancelBtn.onclick = function () {
    modal.style.display = "none"; // إخفاء النافذة دون تعديل
  };
}

//======= complete tasks =======
function completeTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].isDone = true;
  tasks[index].completedAt = Date.now();
  setTaskToStorage();
  readTask();
  if (typeof updateChart === "function") {
    updateChart();
  }
}

//======= arrange tasks =======
function arrangeTheTasks() {
  tasks.sort((a, b) => {
    // غير المكتملة أولاً
    if (a.isDone !== b.isDone) {
      return a.isDone - b.isDone;
    }

    // إذا كانت المهمتان غير مكتملتين
    if (!a.isDone && !b.isDone) {
      return a.id - b.id; // الأحدث فوق
    }

    // إذا كانت المهمتان مكتملتين
    return a.completedAt - b.completedAt; // أول من أُنجز يكون فوق
  });
}

//======= Productivity =======
function updateProductivityStats() {
  const today = new Date();

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.id);

    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  const completed = todayTasks.filter((task) => task.isDone).length;

  const remaining = todayTasks.length - completed;

  const percent =
    todayTasks.length === 0
      ? 0
      : Math.round((completed / todayTasks.length) * 100);

  document.getElementById("todayTasks").textContent = todayTasks.length;

  document.getElementById("completedTasks").textContent = completed;

  document.getElementById("remainingTasks").textContent = remaining;

  document.getElementById("progressPercent").textContent = percent + "%";
}

window.addEventListener("DOMContentLoaded", () => {
  readTask();

  addTask();

  if (typeof initChart === "function") {
    initChart();
  }
});
