# 1. 시작
1. 파일 생성 
    ```
    npm init - y: packgejson.json
    ```
2. 필수 웹팩 패키지 설치 
    ```
    npm install --save-dev webpack webpack-cli webpack-dev-server
    ```
3. 정보! <br>
    웹팩의 entry point는 src/index.js이다.<br>
    웹팩은 dist라는 폴더에 빌드한 파일을 추출한다.
---
# 2. 웹팩 설정하기
1. 웹팩을 설정하기 위해서는 root폴더에 webpack.config.js라는 파일을 생성해야 한다.<br>
2. 파일에서 환경설정 객체를 추출해야 한다.<br>
3. 웹팩은 Node.js같은 브라우저창이 없는 자바스크립트 환경에서 동작하기 때문이다.
4. 웹팩에서 자주사용되는 용어
    - Entry Point: 모든 의존 객체들이 모인 퓁팩의 시작점을 정의한다
    - Output: 빌드 과정에서 나온 JS와 정적 파일들을 모을지 정의한다.
    - Loaders: 웹팩이 다양한 파일 확장자를 다를 수 있도록 도와주는 서드파티 확장 프로그램이다. JS가 아닌 파일들을 모듈로 바꿔준다.
    - Plugins: 웹팩의 동작 방식을 바꿔주는 서드파티 확장 프로그램들이다.
    - Mode: 개발(development)과 생산(production) 두 모드를 정의한다. 기본모드는 생산이다.
----------------------------
# 3. 엔트리포인트 변경
웹팩의 엔트리 폴더는 기본적으로 src/index.js다.<br>
해당 경로를 변경하고 싶으면 entry의 속성추가하여 변경하면 된다.<br>
기존 경로 (변경하지 않으면 작성X)
```
module.exports = {
  entry: './source/index.js',
}
```
변경한 경로
```
const path = require('path')
module.exports = {
  entry: { index: path.resolve(__dirname, 'source', 'index.js') },
}
```

# 4. 추출 폴더 변경
웹팩의 아웃풋 폴더는 기본적으로 dis폴더이다.<br>
해당 경로를 변경하고 싶으면 output의 속성을 추가하여 변경하면 된다.
```
const path = require('path')
module.exports = {
  output: { path: path.resolve(__dirname, 'build'), filename: 'main.js' },
}
```