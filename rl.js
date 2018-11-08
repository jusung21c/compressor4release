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
    switch(menu+1){
        case 1:
            init();
            break;
        case 2:

    }
}


async function init() {
    if (!fs.existsSync('./config.json')) { //초기
        clear();
        console.log(chalk.green('config.json이 존재 하지 않아 초기 설정을 진행합니다.'));

        let obj = {};
        console.log(chalk.blue('input 폴더를 선택해주세요. (예: C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\)'));
        obj.inputPath = readlineSync.questionPath('경로 : ', {isDirectory: true, exists: true, create: false});

        console.log(chalk.blue('output 폴더를 선택해주세요. (예: C:\\Output)'));
        obj.outputPath = readlineSync.questionPath('경로 : ', {isDirectory: true,exists: null,create: true});

        console.log(chalk.blue('향지를 적어주세요. (예: EU)'));
        obj.nation = readlineSync.question(`>> `);

        console.log(chalk.blue('vrdb의 디렉토리이름을 적어주세요. (예: vreu)'));
        obj.dirname = readlineSync.question(`>> `);

        console.log(chalk.blue('최종 패키징될 파일의 이름을 적어주세요. (예: vreu-5w-0.00.52})'));
        obj.filename = readlineSync.question(`>> `);

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
        clear();
        console.log(chalk.green('config.json이 존재 하여 수정을 합니다.'));
        fs.readFile('./config.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            console.log(chalk.blue(`input 폴더를 선택해주세요. (현재: ${obj.inputPath})`));
            obj.inputPath = readlineSync.questionPath('경로 : ', {
                isDirectory: true,
                exists: true,
                create: false
            });

            console.log(chalk.blue(`output 폴더를 선택해주세요. (현재: ${obj.outputPath})`));
            obj.outputPath = readlineSync.questionPath('경로 : ', {
                isDirectory: true,
                exists: null,
                create: true
            });
            console.log(obj);
            fs.writeFile('config.json', JSON.stringify(obj), 'utf8', (err) => {
                if (!err) {
                    clear();
                    console.log(chalk.red("## config.json 저장완료 ##"));
                    menu();

                } else {
                    console.error(err);
                }
            });
        });
    }

}