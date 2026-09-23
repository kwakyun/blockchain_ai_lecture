# blockchain_ai_lecture

"AI Agent Web3 블록체인 융합" 강의를 들으며 정리한 실습 코드 모음입니다. Solidity 스마트 컨트랙트 기초 문법, Node.js 기초 문법과 외장 라이브러리 사용법을 각각 예제로 연습하고, 두 개의 작은 데모 웹 서버로 이어 붙였습니다.

## 구성

| 영역 | 파일 | 내용 |
| --- | --- | --- |
| Solidity 기초 | [SolidityBasics.sol](SolidityBasics.sol) | 상태 변수, 매핑, 구조체, 이벤트, modifier, constructor, view/pure/payable 함수 |
| Solidity 실습 | [CompareNumbers.sol](CompareNumbers.sol), [CrudContract.sol](CrudContract.sol), [AppendText.sol](AppendText.sol) | 숫자 비교, CRUD 매핑 구조, 문자열 누적 저장 예제 컨트랙트 |
| Node.js 기초 | [variables_and_constants.js](variables_and_constants.js), [functions_example.js](functions_example.js), [objects_example.js](objects_example.js) | let/const/var, 함수 선언, 객체 리터럴 예제 |
| 모듈/라이브러리 | [library_example.js](library_example.js), [external_library_example.js](external_library_example.js) | 내장 모듈(os, path 등)과 npm 외장 라이브러리(lodash 등) 사용법 |
| 데모 서버 1 | [calculator_server.js](calculator_server.js) | Node 내장 http 모듈만으로 만든 안드로이드 스타일 계산기 웹앱 (실행: `node calculator_server.js`) |
| 데모 서버 2 | [pub_server.js](pub_server.js), [code.html](code.html), [DESIGN.md](DESIGN.md) | 디자인 시스템(DESIGN.md) 기준으로 만든 생맥주집 예약/메뉴 데모 페이지와 Node 백엔드 (실행: `node pub_server.js`) |
| 강의 자료 | [document/](document) | 강의에서 받은 실습 교재와 1일차 수업 자료 |

## 실행 방법

~~~bash
git clone https://github.com/kwakyun/blockchain_ai_lecture.git
cd blockchain_ai_lecture
npm install
node calculator_server.js   # http://localhost:3000
# 또는
node pub_server.js          # http://localhost:8080
~~~

Node.js 기초 예제 파일들은 `node <파일명>`으로 각각 바로 실행해서 콘솔 출력을 확인할 수 있습니다 (예: `node functions_example.js`).

Solidity 파일들은 별도의 컴파일·배포 환경(Remix, Hardhat 등)이 필요하며, 이 저장소에는 컴파일/배포 스크립트가 포함되어 있지 않습니다.

## 현재 범위

- 강의를 들으며 개념을 익히기 위한 실습 코드 모음이며, 프로덕션 배포나 보안 검증을 거친 컨트랙트가 아닙니다.
- `AppendText.sol`은 문서 주석(`/** */`)이 중간에 닫히지 않아 `appendText` 함수 전체가 주석 안에 포함되어 있습니다. 실습 당시 상태를 그대로 보존했고, 이 저장소 정리 작업에서는 코드 내용을 수정하지 않았습니다.
- `myproject/`는 `npm init`으로 만든 빈 스캐폴드만 남아 있습니다.

## 작업 기록

[AI 활용 기록](AI_NOTES.md) · [변경 기록](CHANGELOG.md)
