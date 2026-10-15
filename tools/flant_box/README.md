FLANT 상자 렌더 (covers 6페이지의 box-hero.jpg / box-back.jpg)

원본 전개도 `FLANT/4_Packages/Boxes_1.svg`를 CSS 3D 상자로 접어 headless Chrome으로 찍는다.

    bash r.sh Boxes_1.svg box1 -32 -14 '#56b585' '#174f3a' .32     # 앞면 + 사용 방법 면
    bash r.sh Boxes_1.svg back1 148 -14 '#56b585' '#174f3a' -.32   # 뒷면 + 효능 면
    py -I comp.py box1.png box-hero.jpg 0.66 1.12 l
    py -I comp.py back1.png box-back.jpg 0.66 1.12 r

인자: 회전 Y, 회전 X, 창 안 어댑터 색 2개, 어댑터 면 깊이. 접히는 모션을 만들 때도 이 면 구조를 쓰면 된다.
