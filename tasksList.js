const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const nowMs = Date.now();

let tasks = [];

const taskNames = [
  "قراءة كتاب",
  "حل مسائل JavaScript",
  "تمرين رياضي",
  "تعلم React",
  "مراجعة HTML",
  "تطوير موقع",
  "مشاهدة دورة",
  "قراءة قرآن",
  "تعلم SQL",
  "كتابة ملاحظات",
  "حل LeetCode",
  "مراجعة CSS",
  "تطوير API",
  "تنظيف المكتب",
  "تنظيم الملفات",
  "ممارسة الإنجليزية",
  "مشروع الجامعة",
  "قراءة مقالة تقنية",
  "تصميم واجهة",
  "حل مشكلة برمجية",
];

// تعديل العداد إلى 60 مهمة
for (let i = 0; i < 60; i++) {
  // جعل النطاق آخر 30 يوماً فقط لتظهر النقاط متقاربة في الرسم البياني
  const daysAgo = Math.floor(Math.random() * 30);

  // تحديد وقت إنشاء المهمة (تاريخ عشوائي في الماضي)
  const taskCreatedTime =
    nowMs - daysAgo * oneDay - Math.floor(Math.random() * 12) * oneHour;

  const done = Math.random() > 0.35;

  // إذا كانت المهمة منجزة، نجعل وقت الإنجاز بعد وقت الإنشاء ببضع ساعات عشوائية
  const hoursToComplete = Math.floor(Math.random() * 5) + 1; // من 1 إلى 5 ساعات
  const taskCompletedTime = done
    ? taskCreatedTime + hoursToComplete * oneHour
    : null;

  tasks.push({
    // توليد ID فريد يعتمد على وقت الإنشاء + رقم الحلقة لضمان عدم التكرار مطلقاً
    id: taskCreatedTime + i,

    title: taskNames[i % taskNames.length] + " " + (i + 1),

    isDone: done,

    completedAt: taskCompletedTime,
  });
}

console.log(tasks);
