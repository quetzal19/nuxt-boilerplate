export default function (value) {
  if (!/^[а-яА-ЯЁё\s-]*$/.test(value)) {
    return false;
  }

  return true;
}
