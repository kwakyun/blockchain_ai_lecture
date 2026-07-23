/**
 * 김태경 생맥주집 (Kim Tae-kyung Draft Beer Pub) - Node.js 웹 서버
 * 
 * DESIGN.md 디자인 시스템 및 code.html, screen.png를 기반으로 구현된
 * Pure Node.js 내장 모듈(http, fs, path) 기반 웹서버 및 RESTful API 백엔드입니다.
 * 
 * 실행 방법:
 * node pub_server.js
 * 브라우저 접속: http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HTML_FILE_PATH = path.join(__dirname, 'code.html');

// 백엔드 메모리 DB: 테이블 예약 데이터 스토리지
const reservations = [];
let reservationCounter = 101;

// 백엔드 메모리 DB: 시그니처 맥주 메뉴 데이터
const menuData = {
    signatureDrafts: [
        {
            id: 'beer-1',
            name: 'Golden Lager',
            abv: '4.5%',
            taste: 'Refreshing & Crisp',
            pairing: 'Crispy Fried Chicken',
            price: 7000,
            status: 'Just Tapped',
            isFresh: true
        },
        {
            id: 'beer-2',
            name: 'Creamy Stout',
            abv: '5.2%',
            taste: 'Coffee & Chocolate',
            pairing: 'Smoked BBQ Platter',
            price: 8500,
            status: 'Recommended',
            isFresh: false
        },
        {
            id: 'beer-3',
            name: 'Sunset Ale',
            abv: '6.0%',
            taste: 'Citrusy & Bold',
            pairing: 'Grilled Seafood Skewers',
            price: 9000,
            status: 'Best Seller',
            isFresh: false
        }
    ],
    pubInfo: {
        name: '김태경 생맥주집',
        slogan: '인생의 가장 시원한 순간',
        address: '서울시 강남구 신사동 123-45',
        phone: '02-1234-5678',
        hours: '17:00 ~ 02:00 (연중무휴)',
        freshnessStandard: '0°C Cold Storage & Daily Line Cleaning'
    }
};

// HTTP 요청 처리 핸들러
const server = http.createServer((req, res) => {
    const reqUrl = req.url.split('?')[0];

    // CORS 및 공통 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 1. 메인 웹페이지 출력 (code.html 서비스)
    if (req.method === 'GET' && (reqUrl === '/' || reqUrl === '/index.html' || reqUrl === '/code.html')) {
        fs.readFile(HTML_FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('서버 오류: code.html 파일을 읽을 수 없습니다.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    // 2. 정적 파일 (screen.png 서비스)
    if (req.method === 'GET' && reqUrl === '/screen.png') {
        const imagePath = path.join(__dirname, 'screen.png');
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data);
        });
        return;
    }

    // 3. API Endpoint: 시그니처 메뉴 및 점포 정보 조회 (/api/menu)
    if (req.method === 'GET' && reqUrl === '/api/menu') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, data: menuData }));
        return;
    }

    // 4. API Endpoint: 테이블 예약 신청 POST (/api/reservation)
    if (req.method === 'POST' && reqUrl === '/api/reservation') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const { name, phone, date, time, guests } = payload;

                if (!name || !phone || !date || !time) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, message: '필수 예약 정보를 모두 입력해 주세요.' }));
                    return;
                }

                // 예약 객체 생성 및 배열 저장
                const newReservation = {
                    id: `RES-${Date.now().toString().slice(-4)}-${reservationCounter++}`,
                    name,
                    phone,
                    date,
                    time,
                    guests: guests || '2',
                    createdAt: new Date().toISOString()
                };

                reservations.push(newReservation);

                console.log(`[신규 테이블 예약 성공] ID: ${newReservation.id} | 예약자: ${name}님 (${guests}명) | 일시: ${date} ${time}`);

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    success: true,
                    message: '예약이 성공적으로 완료되었습니다.',
                    reservation: newReservation
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, message: '유효하지 않은 요청 데이터 형식입니다.' }));
            }
        });
        return;
    }

    // 5. API Endpoint: 현황 조회 (/api/reservations)
    if (req.method === 'GET' && reqUrl === '/api/reservations') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            success: true,
            totalCount: reservations.length,
            reservations: reservations
        }));
        return;
    }

    // 404 처리
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
});

// 서버 가동
server.listen(PORT, () => {
    console.log("==================================================");
    console.log(" 🍺 [김태경 생맥주집 Web Server Running] 🍺");
    console.log(`- 접속 주소: http://localhost:${PORT}`);
    console.log(`- 메인 페이지: code.html (DESIGN.md Amber & Slate 디자인 적용)`);
    console.log(`- API 엔드포인트: /api/menu , /api/reservation`);
    console.log("==================================================");
});
