export default function imageWebPConvert() {
  const sharp = require('sharp');
  const sizeOf = require('image-size');

  const config = {
    path: './static/images/',
    pathGen: './static/images/gen',
  };
  const fs = require('fs');

  // function

  const get1x = (input, output, { width, height, fileName }) => {
    sharp(input)
      .resize(width / 2, height / 2)
      .toFile(output)
      .then(({ format }) => {
        console.log(`${fileName}--1x.${format} created successful`);
      });
  };
  const get2x = (input, output, { fileName }) => {
    sharp(input)
      .toFile(output)
      .then(({ format }) => {
        console.log(`${fileName}--2x.${format} created successful`);
      });
  };
  const getLqip = (input, output, { fileName }) => {
    sharp(input)
      .resize(1, 1)
      .toFile(output)
      .then(({ format }) => {
        console.log(`${fileName}--lqip.${format} created successful`);
      });
  };

  // eslint-disable-next-line max-len
  // Создаем массив со всеми картинками в /assets/images/ ( допустимые форматы .jpg .png )

  const fileArray = fs
    .readdirSync(config.path)
    .filter(item => item.includes('.png') || item.includes('.jpg'));

  // Надо проверить существование директорий /gen/название_каритнки/

  // Проверка /gen/
  if (!fs.existsSync(config.pathGen)) {
    console.log('Creating /gen/ folder');
    fs.mkdirSync(config.pathGen);
  }

  // проверка /gen/название_картинки
  fileArray.forEach(file => {
    const fileSpit = file.split('.');
    const fileName = fileSpit.slice(0, -1).join('.');
    const fileEnd = fileSpit[fileSpit.length - 1];
    if (!fs.existsSync(`${config.pathGen}/${fileName}`)) {
      console.log(`Creating /${fileName}/ folder`);
      fs.mkdirSync(`${config.pathGen}/${fileName}`);

      // Узнаем ширину и высоту картинки
      sizeOf(`${config.path}/${file}`, async (err, res) => {
        if (err) {
          console.log('image-size');
          console.log(err);
          console.log('image-size');
          return;
        }
        const { width, height } = res;
        // Создание lqip
        getLqip(`${config.path}/${file}`, `${config.pathGen}/${fileName}/${fileName}--lqip.${fileEnd}`, { fileName });
        // Оптимизация основного файла ( jpg / png )
        get2x(`${config.path}/${file}`, `${config.pathGen}/${fileName}/${fileName}--2x.${fileEnd}`, { fileName });
        get1x(`${config.path}/${file}`, `${config.pathGen}/${fileName}/${fileName}--1x.${fileEnd}`, { width, height, fileName });
        // webp конвертация
        get2x(`${config.path}/${file}`, `${config.pathGen}/${fileName}/${fileName}--2x.webp`, { fileName });
        get1x(`${config.path}/${file}`, `${config.pathGen}/${fileName}/${fileName}--1x.webp`, { width, height, fileName });
      });
    } else {
      console.log(`file ${fileName} already exists`);
    }
  });
}
