export default function (timeStamp) {
  const d = new Date(timeStamp * 1000);
  return d.toDateString();
}
