let myChart;
let currentFilter = "week";

function initChart() {
  const canvas = document.getElementById("productivityChart");
  if (!canvas || typeof Chart === "undefined") return;

  myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "المهام المنجزة",
          data: [],
          borderColor: "#2A9D8F", // لون الخط
          backgroundColor: "#2A9D8F", // لون النقاط
          borderWidth: 1,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: "المهام غير المنجزة",
          data: [],
          borderColor: "#C94A4A",
          backgroundColor: "#C94A4A",
          borderWidth: 1,
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });

  updateChart();
}

function updateChart() {
  if (!myChart) return;
  if (typeof tasks === "undefined") return;

  const labels = [];
  const completed = [];
  const pending = [];

  const now = new Date();

  if (currentFilter === "week") {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];

    labels.push(...days);

    for (let i = 0; i < 7; i++) {
      completed.push(0);
      pending.push(0);
    }

    tasks.forEach((task) => {
      const date = new Date(task.isDone ? task.completedAt : task.id);

      const diff = (now - date) / (1000 * 60 * 60 * 24);

      if (diff <= 7) {
        if (task.isDone) completed[date.getDay()]++;
        else pending[date.getDay()]++;
      }
    });
  } else if (currentFilter === "month") {
    labels.push("الأسبوع1", "الأسبوع2", "الأسبوع3", "الأسبوع4");

    for (let i = 0; i < 4; i++) {
      completed.push(0);
      pending.push(0);
    }

    tasks.forEach((task) => {
      const date = new Date(task.isDone ? task.completedAt : task.id);

      if (date.getMonth() != now.getMonth()) return;

      let index = Math.min(Math.floor((date.getDate() - 1) / 7), 3);

      if (task.isDone) completed[index]++;
      else pending[index]++;
    });
  } else if (currentFilter === "year") {
    labels.push(
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
    );

    for (let i = 0; i < 12; i++) {
      completed.push(0);
      pending.push(0);
    }

    tasks.forEach((task) => {
      const date = new Date(task.isDone ? task.completedAt : task.id);

      if (date.getFullYear() != now.getFullYear()) return;

      if (task.isDone) completed[date.getMonth()]++;
      else pending[date.getMonth()]++;
    });
  } else {
    labels.push(String(now.getFullYear() - 1), String(now.getFullYear()));

    completed.push(0, 0);
    pending.push(0, 0);

    tasks.forEach((task) => {
      const date = new Date(task.isDone ? task.completedAt : task.id);

      if (date.getFullYear() == now.getFullYear() - 1) {
        if (task.isDone) completed[0]++;
        else pending[0]++;
      }

      if (date.getFullYear() == now.getFullYear()) {
        if (task.isDone) completed[1]++;
        else pending[1]++;
      }
    });
  }

  myChart.data.labels = labels;
  myChart.data.datasets[0].data = completed;
  myChart.data.datasets[1].data = pending;

  myChart.update();
  console.log(tasks);
  console.log(tasks.length);
}

function changeFilter(filter) {
  currentFilter = filter;
  updateChart();

  const buttons = document.querySelectorAll(".filter-buttons");
  buttons.forEach((btn) => btn.classList.remove("active"));

  buttons.forEach((btn) => {
    if (btn.getAttribute("onclick").includes(`'${filter}'`)) {
      btn.classList.add("active");
    }
  });
}
