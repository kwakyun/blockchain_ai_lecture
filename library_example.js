/**
 * Node.js - 라이브러리(모듈) 사용법 설명 예제
 * 
 * Node.js에서 라이브러리(모듈)는 크게 2가지로 나뉩니다:
 * 1. 내장 모듈 (Built-in Modules) : Node.js 설치 시 기본 포함되어 별도 설치 없이 바로 사용
 *    (예: os, path, fs, crypto, http 등)
 * 2. 외부 라이브러리 (Third-party Modules) : npm(Node Package Manager)을 통해 설치 후 사용
 *    (예: axios, express, dotenv, ethers 등)
 */

// ==========================================
// 1. 내장 모듈 사용하기 (Built-in Modules)
// `require('모듈명')` 구문으로 불러옵니다.
// ==========================================

// (1) os 모듈: 운영체제 및 컴퓨터 시스템 정보 조회
const os = require('os');

console.log("==========================================");
console.log(" 1. 내장 모듈 (os 모듈 - 시스템 정보)");
console.log("==========================================");
console.log("운영체제 플랫폼:", os.platform());       // win32, darwin, linux 등
console.log("CPU 아키텍처:", os.arch());           // x64, arm64 등
console.log("총 메모리 용량:", (os.totalmem() / (1024 ** 3)).toFixed(2), "GB");
console.log("사용 가능한 메모리:", (os.freemem() / (1024 ** 3)).toFixed(2), "GB");


// (2) path 모듈: 파일 및 디렉터리 경로 처리
const path = require('path');

console.log("\n==========================================");
console.log(" 2. 내장 모듈 (path 모듈 - 경로 조작)");
console.log("==========================================");
const samplePath = path.join(__dirname, 'data', 'user.json');
console.log("경로 병합 (path.join):", samplePath);
console.log("파일 확장자 (extname):", path.extname(samplePath));
console.log("파일명만 추출 (basename):", path.basename(samplePath));


// (3) fs 모듈: 파일 시스템 (파일 생성, 읽기, 수정, 삭제)
const fs = require('fs');

console.log("\n==========================================");
console.log(" 3. 내장 모듈 (fs 모듈 - 파일 생성 및 읽기)");
console.log("==========================================");

const fileName = 'demo_output.txt';
const fileContent = 'Node.js 내장 fs 라이브러리를 사용하여 생성된 파일 내용입니다.';

// 파일 쓰기 (생성)
fs.writeFileSync(fileName, fileContent, 'utf8');
console.log(`'${fileName}' 파일이 성공적으로 작성되었습니다.`);

// 파일 읽기
const readData = fs.readFileSync(fileName, 'utf8');
console.log("파일에서 읽어온 내용:", readData);


// (4) crypto 모듈: 암호화 및 해시 생성 (블록체인의 핵심 기술)
const crypto = require('crypto');

console.log("\n==========================================");
console.log(" 4. 내장 모듈 (crypto 모듈 - SHA256 해시 생성)");
console.log("==========================================");
const textData = "Blockchain & Node.js Library Demo";
const hash = crypto.createHash('sha256').update(textData).digest('hex');

console.log(`원본 데이터: "${textData}"`);
console.log(`SHA-256 해시 결과:`, hash);


// ==========================================
// 2. 외부 라이브러리 (NPM 패키지) 설치 및 사용 안내
// ==========================================
console.log("\n==========================================");
console.log(" 5. 외부 라이브러리 (NPM 패키지) 활용법 안내");
console.log("==========================================");

console.log(`
[외부 라이브러리 사용 3단계]

1단계: 프로젝트 초기화 (package.json 파일 생성)
   $ npm init -y

2단계: npm을 통해 외부 라이브러리 설치
   예) HTTP 요청 라이브러리: npm install axios
   예) 블록체인 연동 라이브러리: npm install ethers

3단계: 코드에서 require()로 가져와서 사용
   const axios = require('axios');
   const { ethers } = require('ethers');

   // 사용 예시:
   // axios.get('https://api.github.com').then(res => console.log(res.data));
`);
