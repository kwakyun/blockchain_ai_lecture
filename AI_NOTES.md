# AI 활용 기록

## 2026-09-23 · 저장소 정리

- 요청: README가 없는 강의 실습 저장소에 문서를 추가하고, 커밋된 `node_modules/`를 정리하고, GitHub 프로필에 핀으로 노출.
- 도구: Claude. 저장소의 모든 코드 파일(Solidity 4개, Node.js 예제 6개, 데모 서버 2개)과 강의 자료 목록을 직접 읽고 README·AI_NOTES·CHANGELOG·.gitignore를 작성.
- 변경 범위: README, 이번 변경 기록, .gitignore, `git rm --cached`로 `node_modules/` 추적 해제. 애플리케이션 코드(.sol, .js, .html)는 수정하지 않음.
- 확인한 특이사항: `AppendText.sol`의 문서 주석이 닫히지 않아 `appendText` 함수가 주석 안에 포함되어 있음을 확인했고, README에 그대로 기록만 하고 코드는 고치지 않음.
- 한계: 이 작업은 문서 정리와 저장소 위생(untrack) 범위이며, Solidity 컨트랙트의 컴파일·배포 여부나 Node 예제의 실행 결과를 자동으로 검증하지는 않았습니다.
