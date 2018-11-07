const targz = require('targz');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;
const isSymbolicLink = require('is-symbolic-link');
const tar = require('tar');


const inputPath = `C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\Input\\`;
const outputPath = `C:\\Output`;
const bzippath = '".\\GnuWin32\\bin\\bzip2.exe"';
const symbolicPath = '../../space/vr_fixed/LPTE/BASE';

const version = '52';
const EU = {
    nation: 'EU',
    dirname: 'vreu',
    filename: `vreu-5w-0.00.${version}`
};


const target = EU;

const vrPath = path.join(inputPath, target.nation, 'vr');
const vrFixedPath = path.join(inputPath, target.nation, 'space');
const outputDirnamePath = path.join(outputPath, target.dirname);
const sympath = path.join(vrPath, 'LPTE', 'BASE');

// TODO: - targz 압축시 .폴더 같이생김
const Comp = (input, dest) => {
    return new Promise((resolve, reject) => {
        fs.readdir(input, (err) => {
            if (!err) {
                console.log(`${input} 압축을 시작합니다.`);
                console.time(`ct`);
                targz.compress({
                    src: input,
                    dest,
                }, (err) => {
                    if (err) {
                        console.timeEnd(`ct`);
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${input} 압축이 끝났습니다.`);
                        console.timeEnd(`ct`);
                        resolve("done");
                    }
                });
            } else {
                reject(`${input} 경로가 존재하지 않습니다.`);
                console.timeEnd(`${input}`);
            }
        })
    })
};

const checkSymlink = (sympath) => {
    return new Promise((resolve, reject) => {
        isSymbolicLink(sympath)
            .then(isLink => {
                console.log('');
                if (isLink) {
                    console.log(`${sympath} 심볼릭 링크가 이미 존재하여 생성을 건너 뜁니다.`);
                    resolve();
                } else {
                    fs.symlink(symbolicPath, sympath, (err) => {
                        if (err) {
                            console.error(err);
                            console.error("권한 문제시 관리자 권한으로 실행해주세요.");
                            reject(err);
                        } else {
                            console.log('심볼릭 링크 생성 완료!');
                            resolve();
                        }
                    });
                }
            })
            .catch(err => console.error(err));
    })
};

new Promise((resolve) => {
    fs.readdir(outputDirnamePath, (error) => {
        if (error) {
            console.error(`${outputDirnamePath} 폴더가 없어 생성합니다.`);
            mkdirp(outputDirnamePath, (error) => {
                // console.error(error);
                resolve(error);
            });
        } else {
            resolve(error);
        }
    })
})
    .then(() => {
        return checkSymlink(sympath);
    })
    .then(() => {
        return Comp(vrPath, path.join(outputDirnamePath, 'mango-vr.tar.gz'));
    })
    .then(() => {
        return Comp(vrFixedPath, path.join(outputDirnamePath, 'mango-vr_fixed.tar.gz'));
    })
    .then(() => {
        return Comp(outputDirnamePath, path.join(outputPath, `${target.filename}.tar`));
    })
    .then(() => tar.c({ z: false, f: path.join(outputPath, `${target.filename}.tar`), cwd : outputPath}, [`.\\${target.dirname}`]))
    .then(() => {
        // exec(`cmd /c CHCP 65001 | "C:\\Program Files (x86)\\GnuWin32\\bin\\bzip2.exe" ${path.join(outputPath, + `${target.filename}.tar`)}"C:\\LP_Src\\IQS_18MY_Hybrid_Wide_STD\\Release\\compressor4release\\Output\\${filename}.tar"`, function callback(error, stdout, stderr){
        console.log('bz2 압축을 시작합니다.');
        console.time('bz2');
        exec(`cmd /c CHCP 65001 | ${bzippath} -f ${path.join(outputPath, `${target.filename}.tar`)}`, function callback(error, stdout, stderr) {

            if (!stderr && !error) {
                console.log(stdout);
                console.log('bz2 압축이 끝났습니다.');
                console.timeEnd('bz2');
            } else {
                console.error(error);
                console.error(stderr);
                console.timeEnd('bz2');
            }
        });
    })
    .catch(err => console.error(err));