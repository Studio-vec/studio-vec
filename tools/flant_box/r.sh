# r.sh <svg> <out> <ry> <rx> <c1> <c2>
S=$(pwd); py -I gen.py $1 $2.html 5 $3 $4 "$5" "$6" ${7:-.32} && "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 --force-device-scale-factor=1.5 --virtual-time-budget=8000 --window-size=3000,3000 --screenshot="$(cygpath -w $S/$2.png)" "file:///$(cygpath -m $S/$2.html)" >/dev/null 2>&1
py -I -c "
from PIL import Image
im=Image.open('$2.png');bb=im.getchannel('A').getbbox();print(im.size,bb)
bg=Image.new('RGBA',im.size,(200,200,200,255));bg.alpha_composite(im);bg=bg.crop(bb);bg.thumbnail((1000,1000));bg.convert('RGB').save('prev.png')"
