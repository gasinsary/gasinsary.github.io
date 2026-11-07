// Extraction technique des quatre photographies générées, puis export WebP.
const fs=require('fs');const path=require('path');const sharp=require('sharp');
(async()=>{
  const src=path.join(__dirname,'originaux/hotel-contact-sheet.png');
  const meta=await sharp(src).metadata();const w=Math.floor(meta.width/2),h=Math.floor(meta.height/2);
  const out=path.join(__dirname,'site/images');fs.mkdirSync(out,{recursive:true});
  for(const [name,x,y] of [['maison',0,0],['chambre',1,0],['restaurant',0,1],['suite',1,1]]){
    await sharp(src).extract({left:x*w,top:y*h,width:w,height:h}).resize({width:768}).webp({quality:86}).toFile(path.join(out,name+'.webp'));
    console.log(name,w,h);
  }
})().catch(e=>{console.error(e);process.exit(1)});
