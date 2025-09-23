const c = document.getElementById('bg-rain')
const x = c.getContext('2d')
let w, h, d, r
function S(){
  w = c.width = window.innerWidth
  h = c.height = window.innerHeight
  d = Math.ceil((w*h)/5200)
  r = Array.from({length:d},()=>({
    x: Math.random()*w,
    y: Math.random()*-h,
    z: Math.random()*0.6+0.4,
    v: Math.random()*0.6+0.8,
    s: Math.random()*1.1+0.6
  }))
}
function U(t){
  x.clearRect(0,0,w,h)
  x.globalCompositeOperation = 'lighter'
  for(let i=0;i<r.length;i++){
    const a = r[i]
    a.v += 0.012*a.z
    a.y += a.v*6*a.z
    a.x += Math.sin((a.y+t*0.0004))*0.6*a.z
    const lx = a.x
    const ly = a.y
    const tx = a.x - 2.6*a.z
    const ty = a.y - 18*a.z
    const g = x.createLinearGradient(lx,ly,tx,ty)
    g.addColorStop(0,'rgba(230,230,230,0.45)')
    g.addColorStop(1,'rgba(200,200,200,0.00)')
    x.strokeStyle = g
    x.lineWidth = a.s*a.z*1.35
    x.beginPath()
    x.moveTo(tx,ty)
    x.lineTo(lx,ly)
    x.stroke()
    if(a.y>h+20||a.x<-20||a.x>w+20){
      a.x = Math.random()*w
      a.y = -20
      a.v = Math.random()*0.6+0.8
      a.z = Math.random()*0.6+0.4
      a.s = Math.random()*1.1+0.6
    }
  }
  requestAnimationFrame(U)
}
window.addEventListener('resize',S)
S()
requestAnimationFrame(U)

