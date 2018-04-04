# 블록체인에 기반한 예약신용평가 dAPP

## 서비스 데모 스크린샷

![Image of ADD BlackList](https://github.com/flowkater/no-show-block/blob/master/addblacklist.png)
![Image of token](https://github.com/flowkater/no-show-block/blob/master/tokenmarket.png)

## 개요

예약고객중 노쇼 고객에 대하여 해당 정보를 블록체인에 블랙리스트로 등록하여 추후 예약시에 신용평가요소로 사용

## 목적(내용) 및 기대효과

사회적 문제인 노쇼 고객에 대하여 정보등록을 통해 평가요소로 활용하여 시간적, 금전적 손실을 사전에 방지하며 , 정상적인 고객에 대해서는 토큰을 발행하여 혜택을 부여하는데 사용한다. *토큰에 대한 내용은 피드백 필요*

## Spec

### 블록체인에 블랙리스트 대상 추가

- 전화번호 // 나중에는 해시값으로 들어가야하나 지금은 그냥 전화번호
- 카운트 (블랙리스트 누적 횟수)
- 예약 플랫폼 // 포잉, 데일리 호텔, 야놀자 등등, 마찬가지로 데이터 분석을 위해
- 식당 또는 예약 장소의 좌표 (latitude, longitude) // 추후 데이터 분석을 위해
- 또 들어갈게 있을까요? // 식당(예약 장소) 정보나 식당(예약 장소) 종류(한식, 중식 등)

### 토큰 거래

- 기본적으로 토큰 사고 팔기 가능
- 토큰을 사면 본인의 블랙 리스트 카운트를 제거 가능
- 예를들어, 1000000, 100만 토큰을 발행하고 1토큰에 0.01 ETH 로 지정하여 1 토큰으로 1 블랙 카운트를 제거할 수 있도록 한다.

*위 구현을 위해 Voting.sol 참고 부탁드립니다!*

### UI 구성

- Single Page 로 블랙 리스트 대상 추가 및 토큰 거래 가능
- 전화번호 검색, Table UI
- 나의 토큰 확인 및 토큰 거래

## 개발 스택

### Frontend

- HTML, CSS, JS(React) // 제가 jQuery 보다 이게 편합니다..

### BlockChain (Back)

- Solidity
- Remix, Truffle 등으로 컴파일

## 목표 및 추후 계획

- 개발 환경에서 개발 후 ropsten 테스트넷에 배포 (웹 브라우저에 metamask 가 있으면 사용 가능)
- 레거시 시스템과 연동 가능한 API 제공
- 쌓인 데이터를 활용해서, 블랙 리스트가 많은 지역 데이터 분석 및 시각화
- 식당 뿐만 아니라 다양한 예약 시스템으로 확장
- ICO 등 부자되기(?)

## Development 환경 구축하기

1.package.json 에 있는 라이브러리를 초기화한다. npm 대신에 [Yarn을 깔아주세요.](https://yarnpkg.com/lang/en/)

```terminal
yarn
```

2.설치가 끝나면 터미널을 또 하나를 켜서 다음 명령어로 가나슈를 실행.

```terminal
node_modules/.bin/ganache-cli
```

3.트러플을 이용해서 solidity 파일을 컴파일 해주고 가나슈에 마이그레이트를 해주어야 한다.

- Blacklist.sol 이 우리의 스마트 컨트랙
- Migration.sol 이 migrate 할때 쓰이는 truffle에서 자동 생성된 스마트 컨트랙
- truffle compile 을 하면 build/contracts/ 폴더에 json 파일로 컴파일 결과인 abi, bytecode 등이 기록된다.
- 개발하다가 가나슈 블록을 리셋하고 싶으면 truffl migrate --reset 명령어를 이용하면 된다. (개발환경에서 solidity 파일을 고치면 compile 하고, migrate --reset 깔끔하게 해주는 식으로 사용.)
- 테스트넷에 배포하는 건 빠르게 하려면 build/contracts/Blacklist.json 파일의 내용을 수정(?) 하면 될 것 같습니다. 정석으로는 geth로 테스트넷 블록을 모두 동기화하고 배포하는게 한 방법입니다. (다른 분이 한번 해주세요..)

3-1.트러플 설치 필요

```terminal
yarn global add truffle
```

```terminal
truffle compile
truffle migrate
```

4.클라이언트 노드 서버를 실행

```terminal
yarn run start
```

5.만약 웹브라우저 inspect(검사)를 띄워서 에러가 뜨면 로컬호스트 port를 확인해보세요.

- truffle-config.js or truffle.js 수정
- 블랙리스트를 제거할때 토큰의 개수가 카운트보다 많거나 토큰 개수 유효성이 false 면 revert 가 뜹니다.
- 현재 Add 했을때 정확히 UI상 메시지를 띄워주지는 않습니다. 브라우저 검사에서 확인해보시면 됩니다.

6.(참고) 프로덕션 배포시에는 yarn run build 명령어로 나온 폴더를 해당 웹서버에 올리시면 됩니다.

## 코드 구조

### contracts 폴더에 Blacklist.sol 이 우리가 작성하는 스마트 컨트랙입니다

- contracts/
  - Blacklist.sol
  - Migrations.sol

### truffle compile, migrate 명령어를 통해서 초기화가 되는 코드 부분은 migrations 폴더입니다. 2_deploy_contracts.js 파일에서 토큰을 얼마 발행할건지 토큰 가격은 어떻게 할건지 등의 초기 생성자 값을 세팅해주시면 됩니다

- migrations/
  - 1_initial_migration.js
  - 2_deploy_contracts.js

### src가 주요 프론트엔드 코드입니다

- react와 redux를 모르시면 프로젝트 구조가 쉽게 이해가 안갈수도 있습니다.
- 일단 핵심 코드는
  - containers/
    - *BlackListContainers.js*
    - TokenMarketContainer.js
  - components/
    - BlackList/BlackList.js
    - TokenMarket/TokenMarket.js
  - utils/
    - *getWeb3.js*
  - store/modules/
    - *blacklist.js*
- 위 코드 위주로 보시면 됩니다.
- react 프로젝트의 root 는 index.js 입니다.

### BlackListContainer 로 간단히 function 설명을 해드리겠습니다. 이 설명을 바탕으로 TokenMarketContainer를 이해하실 수 있을 것 같습니다

- componentWillMount() 는 컴포넌트가 rendering 되기 전에 한번 호출됩니다. 이 코드에서 getWeb3 코드를 가져와서 web3 객체와 account 정보를 가져와서 UI에 업데이트해줍니다.
  - utils/getWeb3.js 주석을 해제하면 테스트넷, 즉 메타마스크를 이용해서 할 수 있는 코드가 나와있습니다.
- getMyToken() 은 자기가 구매한 토큰만 가져와서 UI에 업데이트.
- onAddSubmit() 은 블랙리스트를 추가할때 호출하는 onClick 이벤트입니다. solidity 코드의 addList function 을 호출합니다. (함수 호출이 안되는 경우가 가끔 있는데 gas 값을 높게 잡아주면 잘 됩니다.)
- onSearchSibmit() 은 전화번호를 검색해서 count를 가져오고 reporter 리스틑 가져옵니다. (현재 solidity가 struct[] 반환이 안되서 length를 가져와서 한번에 하나씩 가져옵니다. 그때마다 그려줘서 졸라 느려요.) solidity 코드의 getLength, getInfo 를 호출
- onReduceCount() 는 구매한 토큰으로 블랙리스트를 제거하는 onClick 이벤트 함수입니다. solidity 코드에서 removeCount 를 호출합니다.

#### Written by [@Flowkater](https://github.com/flowkater)

> 아무래도 한정된 시간으로 작업하다보니 제가 편한 react 로 작업을 하였습니다. Dapp 개발에는 프론트엔드 개발이 필수니 jQuery 같은 레거시 라이브러리보다 최신 트렌드인 react, redux 등을 이번 기회에 학습하시는 기회가 되는 것도(?) 좋겠다는 제 나름의 합리화였습니다. (ㅋㅋㅋㅋㅋㅋ) 소스코드 보시다 모르시면 제가 알려드리겠습니다.