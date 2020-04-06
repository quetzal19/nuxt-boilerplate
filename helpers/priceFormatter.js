export default function (val) {
  if (!val) return '0';

  return val.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
