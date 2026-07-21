// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AppendText
 * @notice 입력한 문자열을 기존 문자열 뒤에 계속 추가하고 조회하는 예제
 */
contract AppendText {
    // 블록체인에 저장되는 누적 문자열
    string private savedText;

    // 문자열이 추가될 때 기록되는 이벤트
    event TextAppended(address indexed sender, string input, string fullText);

    /**
     * @notice 새로운 문자열을 기존 문자열 뒤에 추가합니다.
     * @param newText 추가할 문자열
     *
    function appendText(string memory newText) public {
        require(bytes(newText).length > 0, "Text cannot be empty");

        savedText = string.concat(savedText, newText);

        emit TextAppended(msg.sender, newText, savedText);
    }

    /**
     * @notice 지금까지 누적된 전체 문자열을 조회합니다.
     */
    function getText() public view returns (string memory) {
        return savedText;
    }

    /**
     * @notice 저장된 문자열의 바이트 길이를 조회합니다.
     * @dev 한글 한 글자는 UTF-8에서 일반적으로 3바이트입니다.
     */
    function getTextByteLength() public view returns (uint256) {
        return bytes(savedText).length;
    }
}
