const rl = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const clear = require('clear');
const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu (){
  console.log('##### \t압축 및 릴리즈 도우미\t ####');
  console.log('#\t0. Init (초기설정) or 설정 변경\t#');
  console.log('#\t1. Vrdb 압축\t\t\t\t\t#');
  console.log('#\t2. Vr_fixed 압축\t\t\t\t#');
  console.log('#\t3. Vrdb, Vr_fixed 압축\t\t\t#');
  console.log('#\t4. 다 압축하고 패키징\t\t\t#');
  console.log('#\t5. 다 압축하고 패키징후 배포\t#');
  console.log('#####################################');
  r.prompt();
}

menu();
r.on('line', (line) => {
  switch (line.trim()) {
    case '0':
      init();
      break;
    case 'exit':
      console.log('종료합니다.');
      process.exit(0);
    default:
      console.log(`옳바른 번호를 선택해 주세요 `);
      break;
  }
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

function question(q) {
  return new Promise(resolve => {
    r.question(chalk.blue(`${q} : `), (answer) => {
      resolve(answer);
    });
  })
}


async function init() {
  if (!fs.existsSync('./config.json')) { //초기
    clear();
    console.log('config.json을 생성합니다.');
    let obj = {};
    obj.inputPath = await question('input 폴더를 선택해주세요. (예: C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\)');
    obj.outputPath = await question('output 폴더를 선택해주세요. (예: C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\)');
    console.log(obj);

    fs.writeFile('config.json', JSON.stringify(obj), 'utf8', (err) => {
      if (!err) {
        console.log("## 저장완료 ##");
        menu();
      } else {
        console.error(err);
      }
    });

  } else { //수정
    clear();

    console.log("config.json이 존재하여 수정합니다.");
    fs.readFile('./config.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);

    });
  }

}