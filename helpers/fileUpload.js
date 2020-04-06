export const getBase64Image = (img, type) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL(type);
};

export const getImage = file => new Promise(resolve => {
  const fReader = new FileReader();
  const img = document.createElement('img');

  fReader.onload = () => {
    img.src = fReader.result;
    resolve(fReader.result);
    // resolve(getBase64Image(img, file.type));
  };

  fReader.readAsDataURL(file);
});
