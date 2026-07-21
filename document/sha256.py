import hashlib

def sha256(text: str) -> str:
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

print(sha256('blockchain'))
print(sha256('Blockchain'))  # 한 글자 차이로 전혀 다른 결과
