const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('##### \t압축 및 릴리즈 도우미\t ####');
console.log('#\t0. Init (초기설정) or 설정 변경\t\t\t#');
console.log('#\t1. Vrdb 압축\t\t\t\t\t#');
console.log('#\t2. Vr_fixed 압축\t\t\t\t#');
console.log('#\t3. Vrdb, Vr_fixed 압축\t\t#');
console.log('#\t4. 다 압축하고 패키징\t\t\t#');
console.log('#\t5. 다 압축하고 패키징후 배포\t#');

// r.question(chalk.red("원하는 번호를 선택해주세요 : "), (answer) => {
//    console.log(chalk.blue(answer));
//
//    r.close();
// });
r.prompt();

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
    r.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});

function init() {
    if (!fs.existsSync('./config.json')) { //초기
        console.log('config.json을 생성합니다.');
        let obj = {};

       function Qinput() {
           return new Promise((resolve) => {
               r.question('input 폴더를 선택해주세요. (예: C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\', (result) => {
                   resolve(result);
               })
           });
       }
       function Qoutput() {
           return new Promise((resolve) => {
               r.question('output 폴더를 선택해주세요. (예: C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\', (result) => {
                   resolve(result);
               })
           });
       }

        fs.writeFile('config.json', JSON.stringify(obj), 'utf8', (err) => {
            if (!err) {
                console.log("저장완료");
            } else {
                console.error(err);
            }
        });

    } else { //수정
        console.log("config.json이 존재하여 수정합니다.");
    }

}