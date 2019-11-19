export default function (name, cookieStorage = '') {
  let source;

  if (process.server) {
    source = cookieStorage;
  } else {
    source = document.cookie;
  }

  const matches = source.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
  ));

  return matches ? decodeURIComponent(matches[1]) : false;
}
