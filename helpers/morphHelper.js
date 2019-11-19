export default function (form1, form2, form3, count) {
  const num100 = count % 100;
  const num10 = count % 10;
  let result;

  if (typeof count === 'number') {
    if (num100 >= 5 && num100 <= 20) {
      result = form3;
    } else if (num10 === 0) {
      result = form3;
    } else if (num10 === 1) {
      result = form1;
    } else if (num10 >= 2 && num10 <= 4) {
      result = form2;
    } else if (num10 >= 5 && num10 <= 9) {
      result = form3;
    }
  }

  return result;
}
