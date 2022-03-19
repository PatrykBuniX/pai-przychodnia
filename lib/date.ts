export function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return [y, m, d].map(to2).join("-");
}

function to2(n: number) {
  return `${n}`.padStart(2, "0");
}

export function getTommorowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

// export function timestampToDigitalTime(t: number) {
//   const date = new Date(t);
//   const h = date.getHours();
//   const m = date.getMinutes();
//   return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
// }
