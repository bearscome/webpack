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
해당 경로를 변경하고 싶으면 entry의 속성추가하여 변경하면 된다.<br><br>
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

# 5. 빌드 파일에 HTML파일 포함
모든 웹앱에는 최소의 하나의 HTML파일이 존재한다.<br>
HTML을 동작하기 위해 html-webpack-plugin 설치한다.<br>
```
npm install --save-dev html-webpack-plugin
```
plugin은 HTML파일을 읽고 같은 파일에 번들을 삽입한다.<br>
```
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  plugins: [
    new HTMLWebpackPlugin({ -> html에 <script>index.js</script>파일 추가
      template: path.resolve(__dirname, 'source', 'index.html'),
    }),
  ],
}

옵션은 아래와 같다
template: path.resolve(__dirname, 'src', 'index.html'),  // 템플릿 경로
inject: true, // 자동 인젝트 옵션
minify: true, // 압축 설정
meta: { //문서 메타(head에 meta속성으로 들어감)
    'theme-color': '#4285f4',
    'description': 'meta: Webpack',
},
templateParameters: { // 사용자 정의 옵션
    title: 'Webpack', // 문서 타이틀
    lang: 'ko-KR',    // 주 언어 명시
},  
```

# 6. webpack Loaders 사용
loader는 다른 파일 확장자를 다루기 위한 확장 프로그램이다.<br>
웹팩 laoder: https://webpack.js.org/loaders/ <br>
각 파일은 rules 배열에 객체로 추가해야 한다. <br>
모든 객체는 두 개의 속성으로 구성되어 있다.<br>
> test: 파일의 타입을 정의<br> 
> use: loader로 이루어진 배열<br>
> use로 정의된 loader는 오른쪽에서 왼쪽순으로 불러온다. 빅엔디안..? 순서가 중요!<br>

> css 파일을 처리할 수 있는 style-loader, css-loader을 설치한다.
```
npm i --s style-loader css-loader
css-loader: css파일 로드
style-loader: DOM에서 스타일 시트 로드
```
> style.css
```
body {
    color red
}
```
>webpack.config.js
```
module.exports = {
  module: {
        rules: [
            {
                test: /\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    }
}
```
> index.js
```
import ./style.css //번들링을 사용하는데 html에 링크할 순 없을까?
```

// 참조: https://serzhul.io/JavaScript/learn-webpack-in-under-10minutes/