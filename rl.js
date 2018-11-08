const readlineSync = require('readline-sync');
const chalk = require('chalk');
const fs = require('fs');
const clear = require('clear');

menu();

function menu() {
  menus = [
    'init (초기설정) or 설정 변경',
    'vrdb 압축',
    'vrdb & vr_fixed 압축',
    'vrdb & vr_fixed 압축 후 패키징',
    'vrdb & vr_fixed 압축 후 패키징 후 배포',
    'LG서버 배포',
  ];

  const menu = readlineSync.keyInSelect(menus, '메뉴를 선택해 주세요');
  switch (menu + 1) {
    case 1:
      config();
      break;
    case 2:

  }
}


async function config() {
  if (!fs.existsSync('./config.json')) { //초기
    clear();
    console.log(chalk.green('config.json이 존재 하지 않아 초기 설정을 진행합니다.'));

    const obj = baseConfig('init');


    fs.writeFile('config.json', JSON.stringify(obj), 'utf8', (err) => {
      if (!err) {
        clear();
        console.log(chalk.red("## config.json 저장완료 ##"));
        menu();

      } else {
        console.error(err);
      }
    });

  } else { //수정
    // clear();
    console.log(chalk.green('config.json이 존재 하여 수정을 합니다.'));

    fs.readFile('./config.json', 'utf8', function (err, data) {
      if (err) throw err;
      const savedobj = JSON.parse(data);
      const newobj = baseConfig('modify', savedobj);

      fs.writeFile('config.json', JSON.stringify(newobj), 'utf8', (err) => {
        if (!err) {
          clear();
          console.log(chalk.red("## config.json 수정완료 ##"));
          menu();

        } else {
          console.error(err);
        }
      });
    });


  }

}

function baseConfig(mode, savedobj) {
  if (mode === 'init') {
    let obj = {};

    console.log(chalk.blue('input 폴더를 선택해주세요. (예: C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\)'));
    obj.inputPath = readlineSync.questionPath('경로 : ', {isDirectory: true, exists: true, create: false});

    console.log(chalk.blue(`output 폴더를 선택해주세요. (예: C:\\Output)`));
    obj.outputPath = readlineSync.questionPath('경로 : ', {isDirectory: true, exists: null, create: true});

    console.log(chalk.blue('향지를 적어주세요. (예: EU)'));
    obj.nation = readlineSync.question(`>> `);

    console.log(chalk.blue('vrdb의 디렉토리이름을 적어주세요. (예: vreu)'));
    obj.dirname = readlineSync.question(`>> `);

    console.log(chalk.blue('최종 패키징될 파일의 이름을 적어주세요. (예: vreu-5w-0.00.52})'));
    obj.filename = readlineSync.question(`>> `);

    return obj;
  }
  if (mode === 'modify') {
    clear();
    let newobj = {};

    console.log(chalk.blue(`input 폴더를 선택해주세요. (현재: ${savedobj.inputPath})`));
    newobj.inputPath = readlineSync.questionPath('경로 : ', {isDirectory: true, exists: true, create: false});
    if (newobj.inputPath === __dirname) newobj.inputPath = savedobj.inputPath;

    console.log(chalk.blue(`output 폴더를 선택해주세요. (현재: ${savedobj.outputPath})`));
    newobj.outputPath = readlineSync.questionPath('경로 : ', {isDirectory: true, exists: null, create: true});
    if (newobj.outputPath === __dirname) newobj.outputPath = savedobj.outputPath;

    console.log(chalk.blue(`향지를 적어주세요. (현재: ${savedobj.nation})`));
    newobj.nation = readlineSync.question(`>> `);
    if (newobj.nation === '') newobj.nation = savedobj.nation;

    console.log(chalk.blue(`vrdb의 디렉토리이름을 적어주세요. (현재: ${savedobj.dirname})`));
    newobj.dirname = readlineSync.question(`>> `);
    if (newobj.dirname === '') newobj.dirname = savedobj.dirname;

    console.log(chalk.blue(`최종 패키징될 파일의 이름을 적어주세요. (현재: ${savedobj.filename})`));
    newobj.filename = readlineSync.question(`>> `);
    if (newobj.filename === '') newobj.filename = savedobj.filename;

    return newobj;

  }
}

function ftpConfig() {
  if (mode === 'init') {

  }
  if (mode === 'modify') {

  }
}

function lgserverConfig() {
  if (mode === 'init') {

  }
  if (mode === 'modify') {

  }
}