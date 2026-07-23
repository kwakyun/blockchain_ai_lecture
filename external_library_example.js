/**
 * Node.js - 외장 라이브러리(External / Third-party Library) 개념 및 활용 실습
 * 
 * 외장 라이브러리란?
 * Node.js 설치 시 기본으로 제공되는 내장 모듈(fs, path, os 등)과 달리,
 * 전 세계 개발자들이 만들어 NPM(Node Package Manager) 상에 공개한 외부 모듈입니다.
 * 
 * [외장 라이브러리 사용을 위한 필수 명령어]
 * 1. 프로젝트 초기화 (package.json 파일 생성):
 *    $ npm init -y
 * 2. 원하는 패키지 설치:
 *    $ npm install axios lodash dotenv ethers
 */

console.log("==========================================");
console.log(" 1. 외장 라이브러리 동작 원리 (NPM & node_modules)");
console.log("==========================================");
console.log(`
- package.json : 프로젝트가 사용하는 외장 라이브러리 목록(dependencies)을 관리합니다.
- node_modules : npm install 명령어로 다운로드된 실제 라이브러리 코드가 저장되는 폴더입니다.
- require('패키지명') : node_modules 폴더에서 해당 모듈을 찾아서 코드로 불러옵니다.
`);


console.log("==========================================");
console.log(" 2. 주요 외장 라이브러리 분류 및 사용 패턴 예시");
console.log("==========================================");

/**
 * ----------------------------------------------------
 * 예시 1) axios (HTTP 네트워크 통신 외장 라이브러리)
 * ----------------------------------------------------
 * 설치: npm install axios
 * 용도: 외부 웹 API 서버로 데이터를 요청하거나 응답을 받을 때 사용 (fetch보다 편리한 기능 제공)
 */
console.log("\n[1] axios - HTTP 요청 라이브러리 사용 패턴:");
console.log(`
const axios = require('axios');

// 외부 open API로 데이터를 요청하는 예시 (비동기 처리)
async function fetchBitcoinPrice() {
    try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        console.log("비트코인 시세 데이터:", response.data.bpi.USD.rate);
    } catch (error) {
        console.error("API 요청 실패:", error.message);
    }
}
`);

/**
 * ----------------------------------------------------
 * 예시 2) lodash (유용한 데이터 조작 유틸리티 라이브러리)
 * ----------------------------------------------------
 * 설치: npm install lodash
 * 용도: 배열, 객체, 문자열 등을 편리하게 가공 및 복사(깊은 복사 등)할 때 사용
 */
console.log("[2] lodash - 유틸리티 라이브러리 사용 패턴:");
console.log(`
const _ = require('lodash');

const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = _.uniq(numbers); // 중복 제거 함수
console.log("중복 제거 결과:", uniqueNumbers); // [1, 2, 3, 4, 5]

const randomNum = _.random(1, 100); // 1~100 사이 랜덤 정수 생성
console.log("랜덤 숫자:", randomNum);
`);

/**
 * ----------------------------------------------------
 * 예시 3) dotenv (환경변수 관리 라이브러리)
 * ----------------------------------------------------
 * 설치: npm install dotenv
 * 용도: API 키, 데이터베이스 비밀번호 등 보안 데이터를 .env 파일에 안전하게 보관할 때 사용
 */
console.log("[3] dotenv - 보안 및 환경변수 라이브러리 사용 패턴:");
console.log(`
require('dotenv').config(); // .env 파일의 내용을 process.env에 로드

const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;
console.log("보안 API 키:", apiKey);
`);

/**
 * ----------------------------------------------------
 * 예시 4) ethers (블록체인 스마트 컨트랙트 연동 라이브러리)
 * ----------------------------------------------------
 * 설치: npm install ethers
 * 용도: 이더리움 블록체인 노드 연결, 스마트 컨트랙트 호출, 지갑 생성 및 트랜잭션 전송
 */
console.log("[4] ethers - 블록체인 DApp 연동 라이브러리 사용 패턴:");
console.log(`
const { ethers } = require('ethers');

// 무작위 이더리움 지갑 생성 예시
const wallet = ethers.Wallet.createRandom();
console.log("새 이더리움 지갑 주소:", wallet.address);
console.log("개인키 (Private Key):", wallet.privateKey);
`);


console.log("==========================================");
console.log(" 3. 내장 모듈 vs 외장 라이브러리 한눈에 비교");
console.log("==========================================");
console.log(`
+------------------+------------------------------+----------------------------------+
| 구분             | 내장 모듈 (Built-in)          | 외장 라이브러리 (Third-party)    |
+------------------+------------------------------+----------------------------------+
| 설치 필요 여부   | 불필요 (Node.js 기본 포함)   | 필수 (npm install 패키지명)       |
| 저장 위치        | Node.js 런타임 내부          | node_modules 폴더                |
| 관리 파일        | 없음                         | package.json 의 dependencies     |
| 대표 모듈        | fs, path, os, crypto, http   | axios, express, lodash, ethers   |
| 불러오기 방식    | require('fs')                | require('axios')                 |
+------------------+------------------------------+----------------------------------+
`);
