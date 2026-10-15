/* =========================================================
   A4 SHEETS — edited for paper, not copied from the web pages.
   Each project: an opener (intent → brief) + section sheets.

   dir    : image folder under /assets/img/projects/
   tone   : { paper, dark, accent, accentOnDark } — the project's own colours on the shared frame.
            A sheet turns dark by itself when most of its pictures are dark (page bg:'dark'|'light' to force).
   intent : one sentence — why this project exists
   brief  : [label, text] rows on the opener (문제 / 해결 / 결과물 …)
   hero   : opener image
   pages  : one entry per A4 sheet
     sec   : section name (shown in the running header flow)
     title : the sheet's point, in one sentence
     lay   : 'side' (default, text col 1–2 · images col 3–7) | 'top' (text band above images)
     align : where a block narrower than its columns sits — side: 'right' (default) | 'center' | 'left'
     pull · body[] · list[[k,v]] · steps[[n,title,text]] · sw[[hex,name,note]] · flow[[title,note]] (vertical diagram)
     art   : { look, rows:[n,…] | cols:[n,…], i: images in order, fixed: keep this arrangement,
               fill: stretch to the whole image area (photos cropped round pos, plates grow), even: equal rows }
             look 'grid'   — explanation (boards, diagrams, steps): gutters, a caption under each
                  'mosaic' — mood and application (photographs): butted edge to edge, captions gathered below
             image : { s: file, cap, t: trim [t,r,b,l], mat: plate inset (0 = none), bg: plate colour, pos: [x,y] crop focus }
   trim   : false — keep every file whole (no measured trim, no mat) : slides whose margin belongs to the picture
   heroArt: art options for the opener image(s), e.g. {fill:true, even:true, look:'mosaic'}
   ========================================================= */
const SHEETS = {

kalido:{
  dir:'p01-kaleido',
  tone:{dark:'#000410', accent:'#007bff', accentOnDark:'#ff6f00'},
  intent:'색약자도 코스를 구분할 수 있는 클라이밍 홀드 브랜드.',
  brief:[
    ['문제','클라이밍은 홀드 색으로 코스와 난이도를 나눈다. 어린이·초보자·색약자에게는 이 색 구분이 보이지 않는 장벽이 된다.'],
    ['해결','대부분의 색각 유형에서 구분되는 블루·오렌지 대비, 동공 크기로 난이도를 표시하는 가변 심볼을 설계했다.'],
    ['결과물','브랜드 아이덴티티 · 홀드와 장비 제품군 · 앱 서비스 · 페스티벌 캠페인']
  ],
  hero:{s:'img-01.jpg'},
  pages:[
    {sec:'Problem', title:'홀드 색 구분이 진입 장벽이 되는 문제',
     body:['클라이밍장은 홀드 색으로 코스와 난이도를 나눈다. 색 구분이 어려운 어린이·초보자·색약자는 코스를 읽는 단계부터 막힌다.',
           'Kaleido는 색 외에 형태와 명도 차이로도 코스를 구분할 수 있도록 홀드·장비·서비스를 설계했다.'],
     art:{look:'mosaic', rows:[1,1], i:[
       {s:'img-02.jpg', cap:'키비주얼 — 별 형태의 그래픽이 손이 닿는 홀드를 가리킨다'},
       {s:'img-12.jpg', cap:'클라이밍장 장면'}]}},

    {sec:'Identity', title:'난이도 3단계 가변 심볼과 블루·오렌지 대비',
     body:['심볼은 눈의 동공을 모티프로 했다. 동공 크기를 세 단계로 바꿔 홀드 난이도를 표시한다.'],
     list:[['Bright light','입문 — 동공이 수축한 단계'],['Mid light','중급 — 동공이 안정된 단계'],['Low light','상급 — 동공이 확장된 단계']],
     sw:[['#007bff','Kaleido Blue','#007BFF'],['#fffdf0','Kaleido White','#FFFDF0'],['#ff6f00','Kaleido Orange','#FF6F00']],
     art:{look:'grid', rows:[1,2], i:[
       {s:'img-11.jpg', cap:'가변 심볼 — 입문 · 중급 · 상급'},
       {s:'img-04.jpg', cap:'워드마크와 심볼의 구성'},
       {s:'img-05.jpg', cap:'블루·오렌지 대비 적용'}]}},

    {sec:'Product', title:'홀드 · 암벽화 · 카라비너 · 장갑 제품군',
     body:['홀드와 암벽화, 카라비너, 장갑까지 같은 블루·오렌지 대비와 별 그래픽을 적용했다. 색에만 기대지 않고 형태와 명도 차이로도 알아볼 수 있게 하는 것이 기준이다.'],
     art:{look:'mosaic', rows:[1,2], i:[
       {s:'img-10.jpg', cap:'메인 제품'},
       {s:'img-09.jpg', cap:'카라비너와 장갑'},
       {s:'img-08.jpg', cap:'초크백과 로프'}]}},

    {sec:'Service', title:'기록 · 숍 · 루트 영상, 세 기능으로 구성한 앱',
     body:['앱은 세 기능으로 구성했다. 등반 기록을 쌓는 Records, 디자인된 홀드를 사는 Shop, 루트 파인딩에 맞춘 영상 플랫폼.','앱 아이콘과 웹 화면에도 가변 심볼을 그대로 쓴다.'],
     list:[['Records','등반 기록'],['Shop','홀드·장비 구매'],['Video','루트 파인딩 영상']],
     art:{look:'grid', rows:[1,1], i:[
       {s:'img-15.jpg', cap:'주요 화면 — 기록 · 숍 · 영상', t:[0,.105,0,.105]},
       {s:'img-14.jpg', cap:'웹과 앱 아이콘'}]}},

    {sec:'Campaign', title:'슬로건 레터링과 캠페인 적용',
     body:['슬로건 “Beyond Color, Beyond Limit”을 손글씨 레터링으로 만들어 포스터, 옥외광고, 티셔츠, 제품 태그로 이었다. 페스티벌 빌보드까지 같은 별 그래픽이 반복된다.'],
     lay:'top', art:{look:'mosaic', rows:[2,2], i:[
       {s:'img-18.jpg', cap:'버스 쉘터 포스터'},
       {s:'img-19.jpg', cap:'BEYOND FESTIVAL 빌보드'},
       {s:'img-07.jpg', cap:'티셔츠'},
       {s:'img-16.jpg', cap:'제품 태그', t:[0,0,0,0]}]}}
  ]
},

voyeur:{
  dir:'p02-voyeur',
  tone:{dark:'#1c1c1c', accent:'#0000fe', accentOnDark:'#6b6bff'},
  intent:'관음을 주제로, 읽기를 방해하는 그래픽으로 만든 전시 아이덴티티.',
  brief:[
    ['문제','SNS, 관찰 예능, 브이로그 등 타인의 일상을 지켜보는 콘텐츠 소비가 일상이 됐다. 이 과잉된 시선의 부작용을 관객이 직접 체감하는 전시를 기획했다.'],
    ['해결','글자를 과잉으로 겹치고 블라인드 같은 가로줄과 파란 점으로 시선을 가로막았다. 읽으려 할수록 방해받는 경험을 아이덴티티로 만들었다.'],
    ['결과물','포스터 · 배너 · 공간 사인 · 티켓과 출입증 · 도록 · 굿즈']
  ],
  hero:{s:'img-01.jpg'},
  pages:[
    {sec:'Concept', title:'점 · 블라인드 · 블루로 구성한 그래픽 요소',
     body:['전시는 관객을 시선을 받는 쪽에 세워 관음의 불편함을 체험하게 한다.','사람들의 시선은 점, 관음은 블라인드 가로줄, 현대인의 관음증은 블루로 정해 모든 매체에 반복했다.'],
     sw:[['#232323','점','사람들의 시선'],['#c1c1c1','블라인드','관음'],['#0000fe','블루','현대인의 관음증']],
     art:{look:'mosaic', rows:[1,1], i:[
       {s:'img-02.webp', cap:'메인 배너 — 가로줄과 점이 글자를 가린다'},
       {s:'bh-04.jpg', cap:'GAZE BEYOND BLINDS — 블라인드 너머의 시선'}]}},

    {sec:'Space', title:'입구부터 벽면까지 이어지는 가로줄 사인',
     body:['입구 사인부터 유리문, 벽면 포스터까지 같은 가로줄 문법을 이었다. 관객은 전시장에 들어서는 순간부터 가려진 글자를 읽어야 한다.'],
     art:{look:'mosaic', rows:[2,2], fill:true, i:[
       {s:'bh-09.jpg', cap:'입구 사인 — INTO LOATHFUL GAZE', pos:[0,.5]},
       {s:'bh-08.jpg', cap:'유리문 그래픽'},
       {s:'bh-02.jpg', cap:'전시 타이틀 사인'},
       {s:'img-04.webp', cap:'포스터'}]}},

    {sec:'Print', title:'티켓 · 리플렛 · 출입증 · 도록',
     body:['티켓과 리플렛, STAFF·GUEST·PRESS 출입증, 도록과 패키지. 관객이 손에 쥐는 인쇄물마다 같은 가로줄이 글자를 가린다.'],
     art:{look:'mosaic', rows:[2,3], i:[
       {s:'cut/bh-11-1.jpg', cap:'티켓', t:[0,0,0,0]},
       {s:'cut/bh-11-2.jpg', cap:'리플렛', t:[0,0,0,0]},
       {s:'bh-12.jpg', cap:'출입증'},
       {s:'bh-13.jpg', cap:'도록 내지'},
       {s:'bh-14.jpg', cap:'도록 패키지'}]}},

    {sec:'Goods', title:'테이프 · 비닐백 · 셔터 선글라스',
     body:['테이프와 비닐백에도 같은 가로줄을 적용했다. 셔터 선글라스는 블라인드 가로줄을 안경 형태로 옮긴 굿즈다.'],
     list:[['Team','2인 / 기여도 75%'],['Role','그래픽 개발 30% · 모션 100% · 어플리케이션 70%']],
     art:{look:'mosaic', rows:[4,1], fixed:true, i:[
       {s:'cut/bh-15-1.jpg', cap:'테이프', t:[0,0,0,0]},
       {s:'cut/bh-15-2.jpg', cap:'테이프 — 흩어진 조각', t:[0,0,0,0]},
       {s:'cut/bh-16-1.jpg', cap:'비닐백', t:[0,0,0,0]},
       {s:'cut/bh-16-2.jpg', cap:'비닐백 정면', t:[0,0,0,0]},
       {s:'bh-18.jpg', cap:'셔터 선글라스'}]}}
  ]
},

starry:{
  dir:'p03-starry',
  tone:{dark:'#0b0b16', accent:'#5a4cf0', accentOnDark:'#a79eff'},
  intent:'지인의 관찰을 별로 기록해 별자리로 보여주는 SNS 웹 서비스.',
  brief:[
    ['문제','성격 테스트는 사람을 하나의 유형과 점수로 고정하고, 타인의 시선과 변화는 담지 못한다.'],
    ['해결','지인이 남긴 관찰이 별로 기록되고, 별이 쌓여 나만의 별자리가 된다. 점수와 순위 없이 해석은 사용자에게 맡긴다.'],
    ['결과물','웹 서비스 런칭 · 로고와 그래픽 시스템 · 굿즈 · 텀블벅 펀딩과 인스타그램 홍보']
  ],
  hero:{s:'img-01.jpg'},
  pages:[
    {sec:'Problem', title:'기존 성격 테스트의 다섯 가지 한계',
     body:['기존 성격 테스트가 가진 한계를 다섯 가지로 정리하고 질문을 세웠다.'],
     list:[['정의 중심','하나의 유형·점수로 고정'],['자기 응답 편중','타인의 인식이 빠진다'],['평가 인터페이스','비교와 방어를 부른다'],['시간성 결여','변화가 기록되지 않는다'],['해석권 상실','의미를 시스템이 정한다']],
     pull:'어떻게 하면 판단하지 않고, 사람들이 나를 어떻게 보아왔는지 보여줄 수 있을까?',
     art:{look:'grid', rows:[1], i:[{s:'img-02.webp', cap:'STARRY — 디자이너·개발자 협업 프로젝트'}]}},

    {sec:'Solution', title:'설계 원칙과 3단계 사용 흐름',
     body:['다섯 한계를 하나씩 뒤집어 원칙을 세웠다. 누적과 변화를 기록하고, 관측만 남기고, 관계 속에서 수집하고, 점수와 순위를 없앤다.'],
     steps:[['1','링크 공유','지인이 설문에 답한다'],['2','별 누적','응답이 별자리가 된다'],['3','보기·공유','내 하늘을 확인하고 나눈다']],
     art:{look:'grid', rows:[1,1], i:[
       {s:'img-15.jpg', cap:'응답이 쌓여 그려지는 별자리'},
       {s:'img-14.webp', cap:'별 캐릭터와 앱 아이콘'}]}},

    {sec:'Process', title:'디자이너 1인 · 개발자 1인 협업',
     body:['기존 도구와 AI 도구로 제작 기간을 줄였다. Figma를 중심에 두고 디자이너는 기획·디자인·테스트·운영과 IP 확장을, 개발자는 개발을 맡았다.'],
     list:[['Team','디자이너 김태희 · 개발자 김기찬'],['Role','그래픽 100% · UI 80% · 모션 100% · 그래픽 확장 90% · 마케팅 70% · 운영 50%']],
     art:{look:'grid', rows:[2], i:[
       {s:'img-07.jpg', cap:'유저 플로우 — 사용자 A와 익명 응답자'},
       {s:'img-08.webp', cap:'주요 화면 흐름'}]}},

    {sec:'Brand', title:'별자리 그래픽 시스템과 브랜드 적용',
     body:['슬로건은 “Stars don’t decide us, they remind us”. 별자리 개념을 로고와 그래픽 전반으로 넓혔다. 별을 잇는 선과 별 캐릭터를 포스터, 옥외광고, 굿즈, 명함까지 같은 보라 톤으로 적용했다.'],
     art:{look:'mosaic', rows:[1,2], fixed:true, i:[
       {s:'img-13.jpg', cap:'굿즈'},
       {s:'img-11.jpg', cap:'로고와 포스터 · 옥외광고'},
       {s:'img-16.jpg', cap:'명함'}]}}
  ]
},

flant:{
  dir:'p04-flant',
  tone:{dark:'#0c0d0b', accent:'#2f7a35', accentOnDark:'#cfe97f'},
  intent:'식물에 맞춰 고르는 3D 프린팅 화분 브랜드.',
  brief:[
    ['대상','식물 애호가, ‘식집사’. 인테리어에 어울리면서 식물의 생장까지 돕는 화분을 원하는 사람들.'],
    ['해결','filament + plant. 모듈형 구조와 다양한 소재·텍스처로 고르는 3D 프린팅 화분 브랜드를 기획하고 키비주얼부터 캐릭터, 제품, 패키지까지 설계했다.'],
    ['결과물','가변 로고 시스템 · 캐릭터 플래니 · 커스텀 화분 앱 · 식물 영양제 패키지']
  ],
  hero:{s:'img-01.jpg'},
  pages:[
    {sec:'Brand', title:'브랜드 콘셉트와 키비주얼',
     body:['FLANT는 모듈형 구조의 3D 프린팅 화분이다. 소재와 텍스처를 골라 인테리어에 맞추고, 화분 구조로 식물 생장 조건을 맞춘다.','이미지 소스는 AI로 만들고 Illustrator로 다듬어, 모바일부터 대형 인쇄물까지 확장 가능한 그래픽 시스템을 구축했다.'],
     list:[['Nature-Engineered','자연을 닮은 구조 설계'],['Modular','지속가능성 · 미감 · 유연성'],['Eco-Conscious','정밀성 · 저폐기 · 미니멀리즘']],
     art:{look:'mosaic', rows:[1,2], fixed:true, i:[
       {s:'img-02.webp', cap:'키비주얼'},
       {s:'bh-14.jpg', cap:'식물을 다루는 손'},
       {s:'img-16.webp', cap:'커스텀 화분 앱'}]}},

    {sec:'Logo', title:'사용 크기에 따른 가변 로고',
     body:['화분 단면을 닮은 L을 중심으로 대표형, 압축형, 심볼 단독형, 최소형까지 다섯 가지 형태를 만들었다. 앱 아이콘부터 건물 현수막까지 같은 규칙으로 쓴다.'],
     lay:'top', art:{look:'grid', cols:[1,2], fill:true, i:[
       {s:'img-04.jpg', cap:'가변 로고 시스템', t:[.025,0,.085,0], mat:.001, bg:'#ffffff'},
       {s:'img-15.webp', cap:'현수막'},
       {s:'img-17.webp', cap:'카드와 포스터'}]}},

    {sec:'Character', title:'캐릭터 플래니 — 설정과 턴어라운드',
     body:['플래니는 식물을 돌보는 동반자 캐릭터다. 느긋하고 말수가 적으며, 식물의 작은 변화를 잘 알아채는 성격으로 설정했다.'],
     art:{look:'mosaic', rows:[1,1], i:[
       {s:'bh-10.jpg', cap:'턴어라운드와 장면'},
       {s:'bh-11.webp', cap:'정원을 탐험하는 플래니'}]}},

    {sec:'Package', title:'네 가지 영양제, 버섯과 잎 모양 어댑터',
     body:['네 가지 영양제와 버섯·잎 모양 어댑터로 구성한 식물 영양제. 상자 창으로 어댑터 형태가 보이도록 했고, 색으로 종류를 구분한다.'],
     art:{look:'mosaic', rows:[2,3], i:[
       {s:'img-25.png', cap:'라인업'},
       {s:'img-19.png', cap:'버섯'},
       {s:'img-20.png', cap:'꽃'},
       {s:'img-21.png', cap:'잎'},
       {s:'img-22.png', cap:'플래니'}]}},

    {sec:'Package', title:'창 따내기 리버스 턱 상자 구조',
     body:['40×40×100mm 리버스 턱 상자. 앞뒤 두 면의 창은 어댑터의 계단형 실루엣을 따라 따냈고, 상단 SKU 색이 아래로 갈수록 흰색으로 풀린다.','측면에는 사용 방법과 주의사항, 바코드를, 반대편에는 네 가지 효능을 모았다. 네 종이 같은 칼선을 쓰고 색만 바뀐다.'],
     list:[['규격','40 × 40 × 100 mm'],['구조','리버스 턱 엔드 · 창 따내기 2면'],['SKU','4종 — 색만 교체']],
     art:{look:'grid', cols:[1,2], fixed:true, i:[
       {s:'box-hero.jpg', cap:'앞면과 사용 방법 면', t:[0,0,0,0], mat:0},
       {s:'box-back.jpg', cap:'뒷면과 효능 면', t:[0,0,0,0], mat:0},
       {s:'dieline.png', cap:'전개도 4종 — 같은 칼선, 다른 색', mat:0}]}}
  ]
},

misfortune:{
  dir:'p05-unfortune',
  tone:{paper:'#999999', dark:'#151318', accent:'#4a12a8', accentOnDark:'#b98cff'},   // the campaign's own grey : the web slides' grey padding melts into the sheet
  intent:'가정폭력의 세대 간 전이를 다룬 캠페인·컨퍼런스 키비주얼.',
  brief:[
    ['주제','가정폭력이 세대를 건너 전이되는 문제를 알리고, 그 고리를 끊는 방안을 제안하는 캠페인과 컨퍼런스.'],
    ['해결','캠페인과 컨퍼런스의 키비주얼을 설계했다. 팀 작업이라 초기에 논리 구조를 먼저 세우고, 그 위에서 콘셉트가 흔들리지 않게 그래픽을 전개했다.'],
    ['결과물','포스터 · 옥외광고 · 컨퍼런스 무대 · 엽서와 설문 책자 등 편집물']
  ],
  hero:{s:'img-01.jpg'},
  pages:[
    {sec:'Key Visual', title:'캠페인 질문을 중심에 둔 키비주얼',
     body:['“폭력은 대물림되는가?” 이 질문을 포스터와 무대 스크린, 현수막에 그대로 세웠다.','짙은 보라 질감의 원과 그것이 기울어진 타원, 흰 파열 형태를 반복 요소로 삼아 매체가 바뀌어도 같은 캠페인으로 읽히게 했다.'],
     art:{look:'mosaic', gap:2, cols:[1,2], i:[
       {s:'img-02.jpg', cap:'메인 포스터'},
       {s:'bh-01.jpg', cap:'컨퍼런스 무대'},
       {s:'bh-03.jpg', cap:'건물 현수막'}]}},

    {sec:'Campaign', title:'옥외 매체 적용',
     body:['쇼윈도와 건물 외벽, 스탠드 배너와 대형 전광판까지 같은 형태를 크기만 바꿔 이었다.'],
     list:[['Team','2인 / 기여도 50%']],
     art:{look:'mosaic', gap:2, rows:[2,2], fill:true, i:[
       {s:'bh-04.jpg', cap:'쇼윈도'},
       {s:'cut/bh-05-2.jpg', cap:'스탠드 배너'},
       {s:'bh-09.jpg', cap:'건물 외벽'},
       {s:'bh-08.jpg', cap:'옥외 전광판', t:[.045,.51,.047,.12]}]}},

    {sec:'Editorial', title:'엽서와 설문 책자에 집중한 편집',
     body:['편집 디자인을 주로 맡았다. 설문 책자와 엽서, 리플렛을 같은 그래픽 언어로 정리했다. 원과 타원, 파열 형태가 지면마다 다른 크기로 반복된다.'],
     bg:'light', art:{look:'mosaic', gap:2, cols:[2,2], fixed:true, i:[
       {s:'hi/flyers-1.jpg', cap:'책자 내지', t:[0,0,0,0]},
       {s:'hi/flyers-2.jpg', cap:'설문 책자', t:[0,0,0,0]},
       {s:'cut/bh-02-1.jpg', cap:'엽서'},
       {s:'hi/survey.jpg', cap:'엽서를 읽는 장면', t:[0,0,0,0]}]}},

    {sec:'Collateral', title:'우편에서 쇼핑백, 출입증까지',
     body:['컨퍼런스 초대 우편과 쇼핑백, 스태프 출입증에 같은 그래픽 요소를 적용했다.'],
     bg:'light', art:{look:'mosaic', gap:2, cols:[2,2], fixed:true, i:[
       {s:'hi/mailbox.jpg', cap:'초대 우편', t:[0,0,0,0]},
       {s:'hi/flyers-4.jpg', cap:'엽서 세트', t:[0,0,0,0]},
       {s:'hi/paper-bag.jpg', cap:'쇼핑백', t:[0,0,0,0]},
       {s:'hi/name-tag.jpg', cap:'출입증', t:[0,0,0,0]}]}}
  ]
},

yomyom:{
  dir:'p06-yomyom',
  tone:{dark:'#4c6971', accent:'#4a4cff', accentOnDark:'#ffffff'},
  intent:'둘이 쓰는 PC 채팅 서비스와 친칠라 캐릭터 욤욤.',
  brief:[
    ['문제','회사 톡과 친구 톡이 섞여 답장을 놓치고, 기본 메신저로는 가벼운 농담을 보내기 어렵다. 재택근무 중엔 누군가와 같이 있는 느낌도 없다.'],
    ['해결','바탕화면에서 바로 여는 둘만의 PC 채팅 ‘Sh!t-Chat’과 친칠라 캐릭터 욤욤을 만들고, 직접 개발까지 했다.'],
    ['결과물','캐릭터 · 채팅 서비스 · 카드지갑 · 스티커 · 마스킹테이프 · 렌티큘러 키링']
  ],
  hero:{s:'img-01.jpg'},
  pages:[
    {sec:'Service', title:'사용자 불편에서 출발한 PC 채팅 서비스',
     body:['사용자 불편에서 출발했다. 단둘이 쓰는 PC 채팅, 부담 없이 막 보내는 채팅, 누군가와 같이 있는 느낌.','서비스 이름과 픽셀 그래픽은 오래된 윈도우 창 문법에서 가져왔다. 기획부터 Claude Code·Supabase·Vercel을 이용한 개발까지 혼자 진행했다.'],
     list:[['바탕화면 채팅','창 하나로 바로 대화'],['업무일지','대화 중 바로 기록'],['업무 분리','농담과 일을 나눠 보관']],
     art:{look:'grid', gap:10, rows:[3], i:[
       {s:'img-03.png', cap:'출발점 — 친칠라 똥이 도착했어요', bg:'#ffffff'},
       {s:'img-04.png', cap:'사용자들의 불편', bg:'#ffffff'},
       {s:'img-08.png', cap:'요금제'}]}},

    {sec:'Service Flow', title:'세 가지 메인 기능 — 채팅 · 업무일지 · 업무 분리',
     body:['세 가지 메인 기능을 하루의 흐름 순서로 배치했다.'],
     flow:[['바탕화면에서 바로 채팅','창 하나를 열면 둘만의 대화가 시작된다'],['나만의 업무일지','대화 중 떠오른 일을 그 자리에서 기록한다'],['업무량 분리','농담과 업무를 나눠 보관해 섞이지 않는다']],
     art:{look:'grid', rows:[1,2], fixed:true, i:[
       {s:'cut/img-05-1.jpg', cap:'바탕화면에서 바로 채팅'},
       {s:'cut/img-05-2.jpg', cap:'바로 기록하는 업무일지'},
       {s:'cut/img-05-3.jpg', cap:'농담과 업무 분리'}]}},

    {sec:'Card Wallet', title:'앱 알림을 옮긴 카드지갑',
     body:['Sh!t-Chat의 핵심 경험은 ‘친칠라 똥이 도착했어요’ 알림이다. 이 순간을 휴대폰 뒤 투명 카드지갑으로 옮겼다.','카드를 빼면 숨어 있던 똥 그림이 나온다. 앱에서 알림을 여는 동작을 카드를 빼는 동작에 대응시켰다.'],
     list:[['앱','똥이 도착했어요 — 알림을 연다'],['굿즈','카드를 뺀다 — 숨은 똥이 나온다']],
     art:{look:'mosaic', rows:[2,2], i:[
       {s:'card-hidden-a.jpg', cap:'카드를 꽂았을 때'},
       {s:'card-hidden-b.jpg', cap:'카드를 뺐을 때'},
       {s:'scene-inhand.jpg', cap:'휴대폰에 부착'},
       {s:'scene-desk.jpg', cap:'책상 위 사용 장면'}]}},

    {sec:'Goods', title:'스티커 · 마스킹테이프 · 렌티큘러 키링',
     body:['스티커와 마스킹테이프는 빛에 따라 질감과 글리터가 달라지고, 렌티큘러 키링은 각도에 따라 그림이 바뀐다. 픽셀 캐릭터에 글리터와 렌티큘러 후가공을 적용했다.'],
     art:{look:'mosaic', rows:[3,3], i:[
       {s:'deco-set.jpg', cap:'스티커와 마스킹테이프 세트'},
       {s:'deco-sticker-a.jpg', cap:'카드 스티커'},
       {s:'deco-sticker-b.jpg', cap:'빛에 따라 달라지는 질감'},
       {s:'deco-tape-b.jpg', cap:'마스킹테이프 글리터'},
       {s:'keyring-a.jpg', cap:'렌티큘러 키링'},
       {s:'keyring-b.jpg', cap:'각도에 따라 바뀌는 그림'}]}}
  ]
},

huihui:{
  dir:'p14-huihui',
  tone:{paper:'#f6f0e5', dark:'#1f2b48', accent:'#d9405a', accentOnDark:'#c9a24c'},
  intent:'지역마다 다른 열쇠를 모으는 국내 여행 서비스.',
  brief:[
    ['문제','여행 코스는 화면에서 끝나고 출발로 이어지지 않는다. 소도시는 이름만으로 갈 이유가 약하고, 기념품은 지역을 담지 못한다.'],
    ['해결','그 지역에 가야만 받을 수 있고, 모을수록 완성되는 물건 — 지역마다 다른 열쇠를 온라인과 오프라인을 잇는 하나의 매체로 삼았다.'],
    ['결과물','브랜드 · 열쇠 시스템 18종 · 모바일 웹(국내 17개 코스 운영 중) · 오프라인 제품 4종']
  ],
  hero:{s:'prod/box-hero.jpg'},
  pages:[
    {sec:'Concept', title:'객주의 공간 요소를 화면 구조에 대응',
     body:['조선의 여관 ‘객주’를 모티프로 삼았다. 처마와 풍경, 방 열쇠, 처마 아래 열쇠걸이, 방명록, 창호지 문을 서비스의 화면 요소에 하나씩 대응시켰다.'],
     list:[['처마와 풍경','첫 화면 · 오늘의 코스'],['방 열쇠','코스'],['열쇠걸이','갤러리'],['방명록','로그인 · 기록'],['창호지 문','404']],
     art:{look:'grid', rows:[1,1], fixed:true, i:[
       {s:'screen-d-home.jpg', cap:'첫 화면 — 처마 아래 풍경이 흔들린다'},
       {s:'cover-brand.jpg', cap:'브랜드 어플리케이션'}]}},

    {sec:'Identity', title:'전통 색명 기반 5색, 지붕선을 닮은 심볼',
     body:['심볼은 처마 지붕선과 열쇠를 겹친 형태. 색은 먹·연지·비취·한지·금 다섯 가지 전통 색명에서 가져와 화면과 지류에 같은 비율로 쓴다.'],
     sw:[['#1f2b48','먹','Ink'],['#e0475f','연지','Rouge'],['#109b84','비취','Jade'],['#f5efe3','한지','Paper'],['#c9a24c','금','Gold']],
     art:{look:'mosaic', rows:[2,2], fill:true, i:[
       {s:'prod/bi-card.jpg', cap:'명함'},
       {s:'prod/bi-stationery.jpg', cap:'스테이셔너리'},
       {s:'prod/bi-map.jpg', cap:'여권과 지도'},
       {s:'prod/bi-bag.jpg', cap:'쇼핑백'}]}},

    {sec:'Key System', title:'고정 4, 가변 1 — 열쇠 18종의 규칙',
     body:['코스마다 그 지역의 장면을 손잡이에 새긴 열쇠 18종을 만들었다. 네 가지는 고정하고 손잡이 장면 하나만 바꿔, 열쇠가 늘어도 한 벌로 보이게 했다.'],
     list:[['고정 01','세로 정렬 · 흰 바탕 · 사이드 라이트'],['고정 02','앤티크 실버 · 이음새 장식'],['고정 03','길고 곧은 몸통'],['고정 04','빗살 비트'],['가변','손잡이에 새길 그 지역의 장면']],
     art:{look:'grid', rows:[1,1], fixed:true, i:[
       {s:'key-secret.webp', cap:'비밀 코스 — 비밀코드로만 열리는 열쇠'},
       {s:'cover-keys.jpg', cap:'코스별 열쇠 18종'}]}},

    {sec:'Web', title:'3뎁스 IA와 모바일 웹 주요 화면',
     body:['한 화면에 주목점 하나, 클릭 깊이 5 이하를 원칙으로 IA를 3뎁스 안에 정리했다. 기획·디자인·개발을 혼자 맡아 travel-huihui.com으로 국내 17개 코스를 운영 중이다.'],
     list:[['Depth 0','홈 — 오늘의 열쇠 · 코스 카드'],['Depth 1','코스 · 갤러리 · 짐 싸기 · 방명록'],['Depth 2','여행 완료 → 갤러리에 열쇠가 걸린다'],['Depth 3','로그인 — 팁과 여행 완료 때만']],
     art:{look:'grid', rows:[4], i:[
       {s:'screen-m-home-frame.webp', cap:'홈 — 오늘 떠날 지역', t:[0,0,0,0], mat:0},
       {s:'screen-m-trip-frame.webp', cap:'코스 — 시간대별 일정', t:[0,0,0,0], mat:0},
       {s:'screen-m-gallery-frame.webp', cap:'갤러리 — 다녀온 열쇠', t:[0,0,0,0], mat:0},
       {s:'screen-m-game-frame.webp', cap:'짐 싸기', t:[0,0,0,0], mat:0}]}},

    {sec:'Offline', title:'현장에서만 받는 열쇠 — 오프라인 제품 4종',
     body:['문제 정의에서 바로 오프라인 확장 가설을 세웠다. 열쇠함은 현장에만 있고, 작은 도시에도 그곳만의 열쇠가 생기며, 모을수록 한 세트가 완성된다.'],
     list:[['화면에서 끝난다','→ 그 지역에서만 받는다'],['소도시는 갈 이유가 약하다','→ 지역마다 한 장면'],['기념품은 지역을 못 담는다','→ 모을수록 완성된다']],
     art:{look:'mosaic', rows:[2,2], fill:true, i:[
       {s:'prod/box-s1.jpg', cap:'마스터키 상자 — 창호문을 연다'},
       {s:'prod/locker-s2.jpg', cap:'지역 열쇠함 — NFC로 서랍이 열린다'},
       {s:'prod/kit-s2.jpg', cap:'이천 키트 — 잔에 산을 그린다'},
       {s:'prod/rack-s3.jpg', cap:'열쇠걸이판 — 다녀온 열쇠가 모인다'}]}},

    {sec:'Process', title:'판단은 직접, 생산은 AI로',
     body:['현장 답사 38일, 기록 237곳, 17코스의 동선과 시간대, 새길 장면 18개는 모두 직접 수행했다.'],
     flow:[['기획서 — 직접','한 화면에 주목점 하나 · 클릭 깊이 5 이하'],['규칙 — 직접','열쇠 프롬프트를 고정 4 · 가변 1로'],['생성 — AI','지역 장면을 새긴 열쇠 18종'],['구현 — AI','Claude Code · 248 commits'],['검수 — 직접','디자인 리뷰와 수정']],
     art:{look:'grid', rows:[1], i:[
       {s:'prod/rack-hero.jpg', cap:'열쇠걸이판 — 다녀온 지역이 지도 위에 모인다'}]}}
  ]
},

circa:{
  dir:'p07-circa',
  tone:{dark:'#141414', accent:'#274bff', accentOnDark:'#d0ff00'},
  intent:'일정 관리와 디지털 디톡스를 결합한 플래너 앱.',
  brief:[
    ['문제','일정은 흩어져 있고, 알림과 과시성 게시물, 가짜 뉴스가 집중을 끊는다.'],
    ['해결','아침·점심·저녁 순으로 흐르는 플래너에 디지털 디톡스를 결합했다. 불필요한 콘텐츠는 걸러내고 목표 달성은 눈에 보이게 했다.'],
    ['결과물','앱 UX/UI · 키비주얼 · 메뉴 구조 · 브랜드 어플리케이션']
  ],
  hero:[{s:'bh-00.webp'},{s:'bh-15.jpg'}],
  pages:[
    {sec:'Value', title:'일정 관리와 디지털 디톡스를 한 앱에',
     body:['CIRCA는 방해되는 알림과 과시성 게시물을 걸러내고, 시간대별 일정과 목표 달성률을 보여주는 앱이다.'],
     list:[['실시간 일정 관리','아침·점심·저녁에 맞춘 할 일'],['불안 제거 필터링','SNS 과시성 콘텐츠·가짜 뉴스 차단'],['디지털 디톡스','기기 사용 줄이기'],['심리적 안정감','작은 성취감과 명확한 계획']],
     art:{look:'grid', rows:[1], i:[{s:'bh-04.jpg', cap:'주요 기능 — 홈 · 기록 · 달력 · 집중 필터'}]}},

    {sec:'Screens', title:'톱니바퀴와 원 모티프의 주요 화면 4종',
     body:['톱니바퀴는 일정을 체계적으로 관리하는 기능과 구조를, 원은 시간의 순환과 하루의 흐름을 뜻한다. 네 화면 모두 같은 원형 요소로 목표와 시간을 보여준다.'],
     art:{look:'grid', rows:[2,2], fixed:true, trim:false, i:[
       {s:'bh-07.jpg', cap:'홈 — 목표 달성률과 타이머'},
       {s:'bh-09.jpg', cap:'기록 — 시간대별 할 일'},
       {s:'bh-11.jpg', cap:'달력 — 주간 일정 한눈에'},
       {s:'bh-13.jpg', cap:'집중 필터 — 과시성 게시물 대체'}]}},

    {sec:'Structure', title:'홈 · 기록 · 달력 · 설정, 네 갈래 메뉴',
     body:['메뉴를 네 갈래로 나누고 각 화면이 하나의 질문에 답하도록 정리했다 — 오늘 무엇을 하는가, 어떻게 보냈는가, 앞으로 무엇이 있는가.'],
     list:[['홈','오늘의 할 일 · 목표 · 스톱워치 · 집중 필터'],['기록','완료한 일 · 시간대별 기록'],['달력','주간 일정 · 스마트 알림'],['설정','필터 · 시간 · 알림']],
     art:{look:'grid', rows:[1], i:[
       {s:'bh-05.jpg', cap:'메뉴 트리'}]}},

    {sec:'Brand', title:'블루 · 라임 2색 브랜드 컬러',
     body:['파랑은 집중, 라임은 하루의 시작을 나타낸다. 앱 화면에서 머그, 명함, 포스터까지 두 색만으로 이었다.'],
     sw:[['#274bff','Blue','#274BFF 집중'],['#d0ff00','Lime','#D0FF00 시작']],
     list:[['Team','2인 / 세종대학교 UX2'],['Tools','Figma']],
     art:{look:'grid', rows:[1], i:[
       {s:'bh-16.jpg', cap:'브랜드 어플리케이션'}]}}
  ]
},

sipsi:{
  dir:'p08-sipsi',
  tone:{paper:'#fdfdf8', accent:'#4f9640'},
  trim:false,                                   // the slides' own margins are part of the drawings
  intent:'작은 화면에서 식별되고 비전공자도 쓸 수 있는 봉사단체 캐릭터 리브랜딩.',
  brief:[
    ['문제','청년 식사 지원 봉사단체 십시일밥의 기존 손그림 캐릭터는 SNS 같은 작은 화면에서 식별이 어려웠다.'],
    ['해결','밥풀 모양 메인 캐릭터와 완두콩 서브 캐릭터로 봉사자·수혜자의 관계를 표현하고, 비전공자도 쓰기 쉬운 단순한 형태와 감정 베리에이션을 만들었다.'],
    ['결과물','캐릭터 3종 · 포즈와 감정 베리에이션 · 도시락 패키지 등 굿즈 — 임기 종료 후에도 사용 중']
  ],
  hero:[{s:'bh-00.jpg'},{s:'bh-02.jpg'}],
  pages:[
    {sec:'Concept', title:'캐릭터 콘셉트 — 밥풀이와 한콩이·두콩이',
     body:['‘십시일반’의 가치를 담아 밥풀이와 한콩이·두콩이를 만들었다.'],
     list:[['직관적','밥풀, 완두콩 등 브랜드와 어울리는 모티브'],['상호보완','메인과 조화를 이루는 서브 캐릭터'],['친근함','둥글고 특징적인, 쉽게 기억되는 형태']],
     align:'center', art:{look:'grid', rows:[1,1], i:[
       {s:'bh-04.jpg', cap:'밥풀이 — 포크와 수저를 든 메인 캐릭터'},
       {s:'bh-08.jpg', cap:'한콩이·두콩이 — 완두콩 서브 캐릭터'}]}},

    {sec:'System', title:'크기 비율과 기본형을 규칙으로',
     body:['서브 캐릭터는 메인의 0.35배로 비율을 고정했다. 정면·측면·후면 기본형을 정해 누가 써도 같은 캐릭터로 보이게 했다.'],
     art:{look:'grid', rows:[1,2], fixed:true, i:[
       {s:'bh-03.jpg', cap:'크기 비교 — 서브 0.35배'},
       {s:'bh-05.jpg', cap:'밥풀이 기본형'},
       {s:'bh-09.jpg', cap:'한콩이·두콩이 기본형'}]}},

    {sec:'Variation', title:'상황별 포즈와 12가지 표정',
     body:['봉사 현장에서 바로 쓸 수 있도록 상황별 포즈와 감정 표정을 만들었다. 비전공자 단원도 골라 쓰기만 하면 된다.'],
     art:{look:'grid', rows:[2,2], i:[
       {s:'bh-06.jpg', cap:'밥풀이 포즈'},
       {s:'bh-07.jpg', cap:'역할별 포즈'},
       {s:'bh-10.jpg', cap:'한콩이·두콩이 포즈'},
       {s:'bh-11.jpg', cap:'감정 베리에이션'}]}},

    {sec:'Package', title:'2024 희망 도시락',
     body:['청년들에게 전달하는 ‘2024 희망 도시락’ 상자에 캐릭터를 올렸다. 손잡이 상자와 햄버거형 상자 두 가지로 만들었다.'],
     art:{look:'mosaic', rows:[1,1], fill:true, i:[
       {s:'bh-13.jpg', cap:'희망 도시락 패키지'},
       {s:'bh-14.jpg', cap:'도시락 상자'}]}},

    {sec:'Goods', title:'봉사 현장에서 쓰이는 굿즈',
     body:['봉사자 출입증과 스티커로 적용했다. 디자인 부팀장으로 참여했고, 임기가 끝난 뒤에도 단체가 계속 사용하고 있다.'],
     art:{look:'mosaic', rows:[2,2], fill:true, i:[
       {s:'bh-12.jpg', cap:'봉사자 출입증'},
       {s:'bh-15.jpg', cap:'스티커'},
       {s:'bh-16.jpg', cap:'롤 스티커'},
       {s:'bh-17.jpg', cap:'원형 스티커'}]}}
  ]
},

puffnote:{
  dir:'p09-puffnote',
  tone:{paper:'#f3ede3', dark:'#13203a', accent:'#e4532d', accentOnDark:'#ff6a3d'},
  intent:'재즈 레코드의 편집 문법을 적용한 짠맛 젤리 안주 브랜드.',
  brief:[
    ['문제','젤리는 달고 안주는 기름지다. 그 사이의 짠맛 젤리는 카테고리도, 설득할 시각 언어도 없었다. 음식 사진은 오히려 ‘간식’으로 보이게 했다.'],
    ['해결','과포화된 안주 매대의 코드를 모두 지우고 3색과 인쇄 문법만 남겼다. 60년대 재즈 포스터와 레코드 슬리브의 편집 문법을 가져왔다.'],
    ['결과물','네이밍 · 로고 · 컬러 시스템 · 패키지 · 터치포인트 · 팝업 공간']
  ],
  hero:[{s:'v2-hero-deboss.webp'},{s:'v2-brand-flatlay.webp'}],
  heroArt:{look:'mosaic', fill:true, even:true},
  pages:[
    {sec:'Product', title:'제품 연출과 SKU 네이밍 구조',
     body:['술과 함께 먹는 짠맛 젤리. 제품을 클로즈업으로 설명하지 않고, 밤의 바 테이블 위 장면으로 먼저 보여준다.','재즈 레이블 구조를 이름에 심었다. TRACK 01–04, VOL.1 세트, LIVE 한정판, FEAT. 협업까지 — SKU 확장이 번호와 색 교체만으로 끝난다.'],
     art:{look:'mosaic', rows:[1,2], i:[
       {s:'v2-bar-table.webp', cap:'바 테이블 위의 PUFFNOTE'},
       {s:'v2-jelly-macro.webp', cap:'짠맛 젤리'},
       {s:'v2-jelly-lineup.webp', cap:'TRACK 01–04', t:[.27,.025,.24,.025]}]}},

    {sec:'Logo', title:'복어와 레코드 스핀들을 결합한 심볼',
     body:['부풀어 오른 복어를 레코드 스핀들 위에 올린 심볼. 복어는 규제 식품이라 이름에서 빼고 심볼로만 남겼다.','AI 없이 벡터로 직접 제도하고, 1.5 등비 시스템으로 구조화했다.'],
     art:{look:'mosaic', rows:[1,2], fixed:true, i:[
       {s:'v2-logo-guidebook.webp', cap:'로고 가이드북'},
       {s:'v2-logo-letterpress.webp', cap:'레터프레스 로고'},
       {s:'v2-logo-sign.webp', cap:'사인'}]}},

    {sec:'Color & Graphic', title:'3색 컬러와 동심원 그래픽',
     body:['컨덴스드 그로테스크 서체와 레코드 홈을 닮은 동심원 모티프로 시스템을 구성했다. 매대의 다른 안주와 달리 인쇄물처럼 보이게 하는 것이 기준이다.'],
     sw:[['#0e1b33','Midnight Navy','#0E1B33'],['#f2ead8','Sleeve Cream','#F2EAD8'],['#ff4a1c','Burst Orange','#FF4A1C']],
     art:{look:'mosaic', rows:[1,2], fill:true, i:[
       {s:'v2-color-type.webp', cap:'컬러와 타이포그래피', pos:[.5,.8]},
       {s:'v2-record-sleeve.webp', cap:'레코드 슬리브'},
       {s:'v2-screenprint.webp', cap:'스크린 인쇄 포스터'}]}},

    {sec:'Packaging', title:'맛마다 TRACK 번호를 붙인 파우치',
     body:['앞면은 고지·주제·정보 3분할 밴드, 뒷면은 페어링 매트릭스와 필수표기 패널로 설계했다.','전개도와 판 구성까지 정리해, 새 맛은 별색판 1개 교체로 추가된다.'],
     art:{look:'mosaic', rows:[1,3], fixed:true, i:[
       {s:'v2-sku-range.webp', cap:'SKU 라인업', t:[.13,.035,.07,.035]},
       {s:'v2-pouch-front-back.webp', cap:'파우치 앞·뒷면', t:[.05,.06,0,0]},
       {s:'v2-press-sheet.webp', cap:'인쇄 판 구성'},
       {s:'v2-setbox.webp', cap:'VOL.1 세트', t:[.07,.03,0,0]}]}},

    {sec:'Touchpoints', title:'페어링 카드 · 코스터 · 팝업 공간',
     body:['페어링 카드, 코스터, 스테이셔너리까지 확장했다. 재질은 비도공지·매트 필름·골판지, 광택은 쓰지 않았다.','플래그십 팝업은 레코드 숍처럼 TRACK을 고르는 공간이다.'],
     art:{look:'mosaic', rows:[2,1], i:[
       {s:'v2-guide-cards.webp', cap:'페어링 카드'},
       {s:'v2-coasters.webp', cap:'코스터'},
       {s:'v2-popup-2a.webp', cap:'플래그십 팝업', t:[0,0,0,0]}]}}
  ]
},

wkf:{
  dir:'p13-wkf2026',
  tone:{dark:'#17120e', accent:'#d82d28', accentOnDark:'#ff7a2f'},
  intent:'제27회 세계지식포럼 키비주얼과 행사 아이덴티티.',
  brief:[
    ['주제','The Promethean Moment — 인간에게 불을 건넨 프로메테우스의 신화를 AI 시대에 빗댄 제27회 세계지식포럼의 주제.'],
    ['해결','불꽃 그라데이션을 같은 폭의 세로 기둥으로 잘랐다. 멀리서는 불꽃, 가까이서는 막대그래프로 읽힌다. 이 규칙 하나로 인쇄물부터 현장까지 적용했다.'],
    ['역할','Design Lead — 키비주얼 콘셉트부터 최종 아트워크까지 전담, 비주얼 가이드와 소책자·리플렛·웰컴키트 직접 디자인']
  ],
  hero:[{s:'kv-hero.jpg'},{s:'flag-mockup.webp'}],
  pages:[
    {sec:'Key Visual', title:'멀리서는 불꽃, 가까이서는 막대그래프',
     body:['키비주얼은 주제 문장 속 두 단어, 불과 지능을 하나의 형태로 묶는 데서 출발했다. 불꽃 그라데이션을 같은 폭의 기둥으로 자르고 기둥마다 높이를 달리했다.'],
     art:{look:'grid', cols:[1,2], fixed:true, i:[
       {s:'form-construction.webp', cap:'형태 구성 — 불꽃 · 기둥 · 하프톤'},
       {s:'kv-background.jpg', cap:'키비주얼'},
       {s:'homepage-hero.jpg', cap:'홈페이지 메인'}]}},

    {sec:'System', title:'7쪽 가이드로 정리한 규칙',
     body:['메인 3색과 서브 3색, 배경 밝기에 따라 바꿔 쓰는 다크·레드 두 버전. 규칙을 7쪽 가이드로 정리해 PCO와 제작 업체에 전달했다.'],
     art:{look:'grid', rows:[3], i:[
       {s:'guide-color.jpg', cap:'컬러'},
       {s:'guide-layout.jpg', cap:'레이아웃'},
       {s:'guide-variation.jpg', cap:'베리에이션'}]}},

    {sec:'Booklet', title:'표지는 기둥, 내지는 흰 바탕에 붉은 제목',
     body:['국·영문 소책자. 표지는 기둥과 세로 제목으로 채우고, 내지는 흰 바탕에 붉은 제목만 남겼다. 인사말, 포럼 소개, 올해의 주제와 연사 소개가 같은 규칙으로 이어진다.'],
     art:{look:'mosaic', rows:[1,4], fixed:true, i:[
       {s:'mock-booklet.jpg', cap:'소책자 실물', t:[0,0,0,0]},
       {s:'cut/booklet-cover-front.jpg', cap:'앞표지', t:[0,0,0,0]},
       {s:'cut/booklet-cover-back.jpg', cap:'뒤표지', t:[0,0,0,0]},
       {s:'booklet-04.jpg', cap:'내지 — 올해의 주제', t:[0,0,0,0]},
       {s:'booklet-06.jpg', cap:'내지 — 연사 소개', t:[0,0,0,0]}]}},

    {sec:'Leaflet', title:'3단으로 접는 리플렛',
     body:['리플렛은 3단으로 접어 표지, 역대 주요 연사, 숫자로 보는 포럼을 한 장에 담았다. 소책자와 같은 기둥과 붉은 제목을 쓴다.'],
     art:{look:'grid', cols:[1,2], fixed:true, i:[
       {s:'leaflet-photo.webp', cap:'리플렛 실물'},
       {s:'leaflet-front.jpg', cap:'국문 펼침면'},
       {s:'leaflet-back.jpg', cap:'영문 펼침면'}]}},

    {sec:'Goods & Event', title:'웰컴키트와 연계한 현장 이벤트',
     body:['‘프로메테우스의 불꽃을 찾아라’ — 웰컴카드가 정답 카드가 되는 현장 이벤트.'],
     flow:[['웰컴키트 수령','등록 데스크에서 카드와 불꽃 스티커를 받는다'],['세션장에서 불꽃 찾기','세션장마다 공개되는 불꽃 색을 확인한다'],['정답 스티커 붙이기','카드의 빈 기둥을 알맞은 불꽃으로 채운다'],['이벤트 데스크 제출','완성한 카드를 명함과 함께 낸다'],['기념 티셔츠','참가 경품을 받고 추첨에 응모한다']],
     art:{look:'mosaic', gap:2, rows:[2,2], fill:true, i:[
       {s:'kit-photo-1.jpg', cap:'웰컴키트'},
       {s:'kit-card.jpg', cap:'웰컴카드'},
       {s:'kit-sticker.jpg', cap:'불꽃 스티커'},
       {s:'tee-onsite.webp', cap:'기념 티셔츠', pos:[.5,.3]}]}},

    {sec:'On Site', title:'현장 사인과 대형 그래픽',
     body:['현수기와 대형 현수막, 장충아레나 외벽 통천까지 같은 기둥 그래픽을 키웠다. 신라호텔과 장충아레나에서 사흘간, 무대 LED부터 안내 데스크와 이벤트 부스까지 같은 그래픽이 이어졌다.'],
     list:[['Client','매일경제 · MBN'],['Date','2026.09.08–10'],['Venue','신라호텔 · 장충아레나']],
     art:{look:'mosaic', rows:[1,1], fill:true, i:[
       {s:'hall-main.jpg', cap:'메인 홀 무대'},
       {s:'venue-exterior-2.jpg', cap:'장충아레나 외벽'}]}}
  ]
},

hardcopy:{
  dir:'p10-hardcopy',
  tone:{dark:'#0e0e0f', accent:'#d52b1e', accentOnDark:'#ff3b2a'},
  intent:'전력망이 끊긴 도시를 가정한 촉각 출판 브랜드.',
  brief:[
    ['설정','전력망이 끊긴 도시. 화면은 꺼졌고, 읽기는 전력에 묶여 있다.'],
    ['해결','잔해에서 잘라낸 규격 판에 정보를 잉크 대신 양각으로 새겼다. ‘재료는 생산되지 않고 회수된다’는 설정을 기준으로 규격·패키지·그래픽·카피를 정했다.'],
    ['결과물','단층 마크 · 로고 시스템 · 컬러와 그래픽 시스템 · 판형 제품 · 회수 상자와 태그']
  ],
  hero:[{s:'img-01.png'},{s:'img-14.webp'}],
  pages:[
    {sec:'Mark', title:'단층 마크와 로고 시스템',
     body:['로고 ‘단층 마크’는 판이 어긋나 생긴 단층을 형태로 삼았다. 심볼과 문자가 같은 생성 원리에서 나오도록 묶었다.'],
     art:{look:'grid', rows:[1,1], i:[
       {s:'img-02.png', cap:'단층 마크'},
       {s:'img-03.png', cap:'로고 시스템'}]}},

    {sec:'System', title:'금속 색과 홈 간격에서 가져온 컬러·그래픽',
     body:['컬러는 금속과 판의 실제 색에서, 그래픽은 판 위 홈의 간격에서 가져왔다. 픽토그램은 판을 다루는 동작만 표시한다.'],
     art:{look:'grid', rows:[2,1], i:[
       {s:'img-04.png', cap:'컬러 시스템'},
       {s:'img-05.png', cap:'그래픽 시스템'},
       {s:'img-06.png', cap:'픽토그램'}]}},

    {sec:'Plate', title:'판형 제품과 회수 구조',
     body:['정보는 판 위의 양각으로만 새긴다. 읽고 난 판은 회수 상자로 돌려보내 다시 새긴다.'],
     art:{look:'mosaic', cols:[1,2,2], i:[
       {s:'img-08.webp', cap:'판 한 장'},
       {s:'img-10.webp', cap:'손으로 읽는다'},
       {s:'img-13.webp', cap:'회수 상자'},
       {s:'img-12.webp', cap:'회수 태그'},
       {s:'img-15.webp', cap:'열람대'}]}}
  ]
},

gimpick:{
  dir:'p11-gimpick',
  tone:{paper:'#faf7f2', accent:'#e8392c'},
  intent:'김밥을 조각 단위로 골라 담는 테이크아웃 브랜드.',
  brief:[
    ['문제','김밥 한 줄은 혼자 먹기엔 많고, 맛은 하나로 고정된다. 여러 맛을 조금씩 먹고 싶은 도심 소비자에게 맞지 않는 단위다.'],
    ['해결','조각 단위로 진열하고 가격을 매긴다. 자른 단면을 단청의 화형(花形) 문법으로 읽어 로고와 패턴을 만들고, 빈티지 미국 다이너 스타일을 더했다.'],
    ['결과물','로고 · 도형과 컬러 시스템 · 트레이 패키지 · 포스터와 배달앱 · 콜래터럴 · 매장']
  ],
  hero:[{s:'board-hero.jpg'},{s:'menu-counter.jpg'}],
  pages:[
    {sec:'Insight', title:'김밥 단면에서 출발한 브랜드 콘셉트',
     body:['김밥 단면은 원 안에 재료가 방사형으로 놓인 형태다. 이를 단청의 화형으로 해석했다.','정체성은 한국(단청 화형), 스타일은 빈티지 미국 다이너. 새 색·새 도형 없이 토큰 재사용만으로 모든 응용을 만든다.'],
     list:[['낱개로','조각당 진열 · 가격'],['단면 노출','오픈 커팅 스테이션'],['매일 즉석','생산 시각 표기']],
     art:{look:'mosaic', rows:[1,2], i:[
       {s:'moodboard.jpg', cap:'무드보드 — 단청과 다이너'},
       {s:'cutting-station.jpg', cap:'오픈 커팅 스테이션'},
       {s:'pick-tray-photo.jpg', cap:'골라 담은 조각'}]}},

    {sec:'Logo & Shape', title:'단청 머리초를 따라 그린 꽃잎 네 장',
     body:['좌우 대칭 연화형 꽃잎 4장에 먹선을 두르고 꽃잎 사이에 황색 휘점을 넣었다. 지름 12모듈 그리드, 28px 미만에서는 적·녹 반원으로 단순화한다.','단면 패턴은 외곽 8장과 내곽 8장의 2중 로제트. 맛이 늘어도 새 도형은 만들지 않고 색 조합만 바꾼다.'],
     art:{look:'grid', rows:[1,1], i:[
       {s:'board-construction.jpg', cap:'로고 구성'},
       {s:'board-rosette.jpg', cap:'2중 로제트 패턴'}]}},

    {sec:'Packaging', title:'2×2 원형 모듈 트레이',
     body:['4조각을 2×2 원형 모듈로 담는 170×120mm 트레이. 칸마다 맛·가격·칼로리가 인쇄되고, 상단에는 다이너 체커보드 밴드를 얹었다.'],
     art:{look:'grid', rows:[1,2], i:[
       {s:'board-tray.jpg', cap:'트레이 설계'},
       {s:'tray-hand.jpg', cap:'트레이'},
       {s:'tray-front.jpg', cap:'정면'}]}},

    {sec:'Application', title:'포스터에서 배달앱, 소스 뚜껑까지',
     body:['포스터에는 다이너 포스터 문법을 얹고, 같은 시스템을 배달앱 썸네일과 메뉴판으로 재구성했다. 소스는 글자 없이 뚜껑 색만으로 맛을 구분한다.','조각 진열대와 오픈 커팅 스테이션이 매장의 중심이다.'],
     art:{look:'mosaic', cols:[1,1,2], i:[
       {s:'poster-wall.jpg', cap:'포스터'},
       {s:'delivery-phone.jpg', cap:'배달앱'},
       {s:'tumbler-sauce.jpg', cap:'텀블러와 소스 컵'},
       {s:'storefront.jpg', cap:'매장'}]}}
  ]
},

seolred:{
  dir:'p12-seolred',
  tone:{paper:'#f5eee2', dark:'#1c1c26', accent:'#e8327c', accentOnDark:'#ff4f93'},
  intent:'1~2인 가구를 위한 소용량 사과 브랜드.',
  brief:[
    ['문제','사과는 10~15개 박스 단위로 팔린다. 1~2인 가구는 다 먹기 전에 무르고, 결국 사과를 사지 않게 된다.'],
    ['해결','사과 1알, 잼, 전용 스푼을 100mm 정사각 상자 하나에. 사과꽃과 단면 씨방에서 찾은 ‘5의 기하학’으로 로고·인서트·라인업을 하나의 구조로 묶었다.'],
    ['결과물','로고 · 컬러와 재질 · 패키지 · 제품 라인업 · 라이프스타일 · 명절 캠페인']
  ],
  hero:{s:'ed-hero.jpg'},
  pages:[
    {sec:'Origin', title:'사과 단면과 꽃에서 찾은 5의 구조',
     body:['사과를 가로로 자르면 씨방이 5각 별로 나타나고, 사과꽃의 꽃잎도 5장이다. 이 ‘5’가 로고의 방사형과 패키지 인서트의 꽃잎 분할로 이어진다.','전통 사과 박스의 정서를 1인 가구용 소형 패키지로 옮겼다.'],
     art:{look:'mosaic', rows:[2], i:[
       {s:'ed-origin-apple.jpg', cap:'단면의 5각 별'},
       {s:'ed-origin-blossom.jpg', cap:'사과꽃 5장 꽃잎'}]}},

    {sec:'Logo', title:'수확일 10월 30일을 담은 원형 심볼',
     body:['사과 밑면에서 출발한 원형 심볼. 시침·분침 같은 방사형 장식을 10시 30분 방향에 두어 부사의 적정 수확일 10월 30일을 새겼다.'],
     art:{look:'grid', rows:[1,2], i:[
       {s:'board-symbols.jpg', cap:'심볼 구성'},
       {s:'ed-logo-deboss.jpg', cap:'형압'},
       {s:'ed-logo-brandbook.jpg', cap:'브랜드북'}]}},

    {sec:'Color', title:'핫핑크 중심의 4색 컬러 비율',
     body:['과육의 핫핑크가 화면의 40~60%를 차지하고 본 크림과 니어블랙이 받친다. 딥그린은 한 장면에 한 요소만, 주로 상자 안 인서트에 쓴다.'],
     sw:[['#e8327c','핫핑크','40–60%'],['#f2e8d5','본 크림','바탕'],['#1a1a1a','니어블랙','글자'],['#0f5a3c','딥그린','한 요소']],
     art:{look:'mosaic', rows:[2], i:[
       {s:'ed-material-board.jpg', cap:'컬러와 재질 보드'},
       {s:'ed-material-paper.jpg', cap:'종이의 질감'}]}},

    {sec:'Package', title:'100mm 정사각 상자와 5분할 인서트',
     body:['100×100×60mm 정사각 상자 안에 5장 꽃잎으로 나눈 딥그린 인서트를 넣었다. 중앙에 사과 1알, 꽃잎에는 잼병·스푼·카드가 자리 잡는다. 이 구조가 곧 로고의 구조다.'],
     art:{look:'grid', rows:[2,2], i:[
       {s:'ed-pk-hero.jpg', cap:'상자'},
       {s:'ed-pk-topview.jpg', cap:'5장 꽃잎 인서트'},
       {s:'ed-pk-opening.jpg', cap:'개봉'},
       {s:'ed-pk-dieline.jpg', cap:'전개도'}]}},

    {sec:'Extension', title:'제품, 생활, 명절 캠페인으로',
     body:['사과잼 3종과 머그·스푼, 주스와 아이스크림으로 확장했다. 라벨은 컬러 밴드만으로 SKU를 구분한다.','설 명절 선물 시즌의 팝업 캠페인에는 8각 스타버스트와 핑크→블랙 그라데이션을 반복했다.'],
     art:{look:'mosaic', rows:[2,2], i:[
       {s:'ed-pr-jam-lineup.jpg', cap:'사과잼 3종'},
       {s:'ed-cp-posters.jpg', cap:'명절 캠페인 포스터'},
       {s:'ed-lf-breakfast.jpg', cap:'아침 식탁'},
       {s:'ed-cp-popup.jpg', cap:'팝업 스토어'}]}}
  ]
}

};
