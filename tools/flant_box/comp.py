import sys
from PIL import Image, ImageDraw, ImageFilter
src,out,wf,hf,side = sys.argv[1],sys.argv[2],float(sys.argv[3]),float(sys.argv[4]),sys.argv[5]
im=Image.open(src); bb=im.getchannel('A').getbbox(); box=im.crop(bb)
bw,bh=box.size; W,H=int(bh*wf),int(bh*hf)
bg=Image.new('RGB',(W,H),(236,236,232))
g=Image.linear_gradient('L').resize((W,H)); bg=Image.composite(Image.new('RGB',(W,H),(222,222,217)),bg,g.point(lambda v:v*0.7))
ox=(W-bw)//2; oy=int((H-bh)*0.42); base=oy+bh
sh=Image.new('L',(W,H),0); d=ImageDraw.Draw(sh)
x0,x1 = (ox-bw*0.25, ox+bw*0.95) if side=='l' else (ox+bw*0.05, ox+bw*1.25)
d.ellipse((x0, base-bh*0.035, x1, base+bh*0.02), fill=120)
sh=sh.filter(ImageFilter.GaussianBlur(bh*0.025))
bg=Image.composite(Image.new('RGB',(W,H),(150,150,145)),bg,sh).convert('RGBA')
bg.alpha_composite(box,(ox,oy)); bg=bg.convert('RGB')
tw=1600 if W>=1600 else W
bg=bg.resize((tw,int(tw*H/W)),Image.LANCZOS); bg.save(out,quality=90); print(out,bg.size)
