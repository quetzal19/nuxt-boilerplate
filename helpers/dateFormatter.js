export default function (val) {
  if (!val) return '';

  const date = new Date(val);
  const year = date.getFullYear();
  const month = date.toLocaleDateString('ru', {
    day: '2-digit',
    month: 'long',
  });

  return `${month} ${year}`;
}
