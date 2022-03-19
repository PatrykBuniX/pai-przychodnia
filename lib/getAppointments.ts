export function getAppointments(
  startTime: string,
  endTime: string,
  appointmentLength: number
) {
  const sTime = new Date(`1 ${startTime}`).getTime();
  const eTime = new Date(`1 ${endTime}`).getTime();

  const timeInMs = appointmentLength * 60 * 1000;

  const appointments = [];
  let currentTime = sTime;

  while (currentTime < eTime) {
    appointments.push(currentTime);
    currentTime += timeInMs;
  }

  const result = appointments.map((t, i) => {
    const date = new Date(t);
    const h = date.getHours();
    const m = date.getMinutes();
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  });

  return result;
}
