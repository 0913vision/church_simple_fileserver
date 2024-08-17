const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8282;

// 다운로드할 파일 경로 설정 (예: 프로젝트 루트의 'downloads' 폴더)
const filePath = path.join(__dirname, 'downloads', 'app-release.apk');

app.get('/', (req, res) => {
    res.send(`
        <h1>파일 다운로드</h1>
        <a href="/download" download>파일 다운로드</a>
    `);
});

app.get('/download', (req, res) => {
    // 파일이 존재하는지 확인
    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).send('파일 다운로드 중 오류가 발생했습니다.');
            }
        });
    } else {
        res.status(404).send('파일을 찾을 수 없습니다.');
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});