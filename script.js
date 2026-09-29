const FALLBACK_IMG="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=80&auto=format&fit=crop";
const fmt=n=>"Rs."+n.toLocaleString("en-IN");
const products=[
{name:"Bandhani Rouge Maxi",cat:"dresses",price:5499,tag:"BESTSELLER",img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&q=80&auto=format&fit=crop"},
{name:"Marigold Mirror-Work Top",cat:"dresses",price:2899,tag:"NEW",img:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=700&q=80&auto=format&fit=crop"},
{name:"Indigo Sun-Faded Flares",cat:"denim",price:3999,tag:"1 OF 1",img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&q=80&auto=format&fit=crop"},
{name:"Banjara Patchwork Jacket",cat:"denim",price:5999,tag:"HANDMADE",img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=700&q=80&auto=format&fit=crop"},
{name:"Kundan Coin Belt",cat:"accessories",price:1899,tag:"NEW",img:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700&q=80&auto=format&fit=crop"},
{name:"Ajrakh Silk Scarf",cat:"accessories",price:1499,tag:"HANDLOOM",img:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80&auto=format&fit=crop"},
{name:"Thar Desert Slip Dress",cat:"dresses",price:4799,tag:"1 OF 1",img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80&auto=format&fit=crop"},
{name:"Jute Fringe Jhola Bag",cat:"accessories",price:3299,tag:"BESTSELLER",img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80&auto=format&fit=crop"},
{name:"Genda Phool Mini Dress",cat:"dresses",price:3599,tag:"NEW",img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=80&auto=format&fit=crop"}
];
let cartItems=[],filter="all";
const grid=document.getElementById("productGrid");
function render(){
grid.innerHTML="";
products.filter(p=>filter==="all"||p.cat===filter).forEach((p,i)=>{
const idx=products.indexOf(p);
const d=document.createElement("div");d.className="product";
d.innerHTML=`<div class="p-img"><img loading="lazy" src="${p.img}" alt="${p.name}" onerror="this.src='${FALLBACK_IMG}'"><span class="tag">${p.tag}</span></div><div class="p-body"><span class="p-cat">${p.cat}</span><h4>${p.name}</h4><div class="price-row"><span class="price">${fmt(p.price)}</span><button class="add">Add +</button></div></div>`;
d.querySelector(".add").onclick=(e)=>{addToCart(idx);if(window.gsap)gsap.fromTo(e.target,{scale:1},{scale:1.25,duration:.15,yoyo:true,repeat:1});};
grid.appendChild(d);
if(window.gsap)gsap.fromTo(d,{y:40,opacity:0},{y:0,opacity:1,duration:.6,delay:i*.06,ease:"power3.out"});
});
}
render();
document.querySelectorAll(".f-btn").forEach(b=>b.onclick=()=>{document.querySelectorAll(".f-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render();});
function addToCart(idx){
const found=cartItems.find(c=>c.idx===idx);
if(found)found.qty++;
else cartItems.push({idx,qty:1});
updateCart();
const t=document.getElementById("toast");t.textContent=`${products[idx].name} added to potli`;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);
openCart();
}
function cartCount(){return cartItems.reduce((s,c)=>s+c.qty,0);}
function cartSubtotal(){return cartItems.reduce((s,c)=>s+c.qty*products[c.idx].price,0);}
function updateCart(){
document.getElementById("cartCount").textContent=cartCount();
document.getElementById("cartHeadCount").textContent=cartCount();
const box=document.getElementById("cartItems");
box.innerHTML="";
if(cartItems.length===0){box.innerHTML=`<div class="cart-empty">Potli khaali hai...<br>Chalo kuch rang chunte hain!</div>`;}
cartItems.forEach(c=>{
const p=products[c.idx];
const row=document.createElement("div");row.className="c-item";
row.innerHTML=`<img src="${p.img}" onerror="this.src='${FALLBACK_IMG}'" alt="${p.name}"><div class="c-info"><b>${p.name}</b><div class="c-price">${fmt(p.price)}</div><div class="qty-row"><button class="dec">-</button><span>${c.qty}</span><button class="inc">+</button><button class="rm">remove</button></div></div>`;
row.querySelector(".inc").onclick=()=>{c.qty++;updateCart();};
row.querySelector(".dec").onclick=()=>{c.qty--;if(c.qty<=0)cartItems=cartItems.filter(x=>x!==c);updateCart();};
row.querySelector(".rm").onclick=()=>{cartItems=cartItems.filter(x=>x!==c);updateCart();};
box.appendChild(row);
});
const sub=cartSubtotal();
const ship=sub===0?0:(sub>=4999?0:199);
document.getElementById("cartSubtotal").textContent=fmt(sub);
document.getElementById("cartShipping").textContent=sub>=4999&&sub>0?"FREE":fmt(ship);
document.getElementById("cartTotal").textContent=fmt(sub+ship);
const pct=Math.min(100,Math.round(sub/4999*100));
document.getElementById("shipFill").style.width=pct+"%";
document.getElementById("shipMsg").textContent=sub>=4999?"Badhai! FREE shipping unlock ho gayi":`Add ${fmt(4999-sub)} more for FREE shipping`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartOverlay").classList.add("open");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("open");}
updateCart();
let prog=0;const preFill=document.getElementById("preFill"),preCount=document.getElementById("preCount");
const preInt=setInterval(()=>{prog+=Math.random()*18;if(prog>=100){prog=100;clearInterval(preInt);setTimeout(()=>{document.getElementById("preloader").classList.add("done");heroIntro();},400);}preFill.style.width=prog+"%";preCount.textContent=Math.floor(prog)+"%";},160);
const dot=document.getElementById("cursorDot"),ring=document.getElementById("cursorRing");
let mx=0,my=0,rx=0,ry=0;
window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-5}px,${my-5}px)`;});
(function loop(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx-19}px,${ry-19}px)`;requestAnimationFrame(loop);})();
const menu=document.getElementById("mobileMenu");
document.getElementById("menuBtn").onclick=()=>menu.classList.add("open");
document.getElementById("closeMenu").onclick=()=>menu.classList.remove("open");
menu.querySelectorAll("a").forEach(a=>a.onclick=()=>menu.classList.remove("open"));
const track=document.getElementById("lbTrack");
document.getElementById("lbNext").onclick=()=>track.scrollBy({left:340,behavior:"smooth"});
document.getElementById("lbPrev").onclick=()=>track.scrollBy({left:-340,behavior:"smooth"});
document.getElementById("newsForm").onsubmit=e=>{e.preventDefault();const v=document.getElementById("newsEmail").value;document.getElementById("newsMsg").textContent=`Shukriya, ${v}! Rs.500 off code RANG500 bheja hai.`;document.getElementById("newsEmail").value="";};
document.getElementById("cartBtn").onclick=()=>openCart();
document.getElementById("closeCart").onclick=()=>closeCart();
document.getElementById("cartOverlay").onclick=()=>closeCart();
document.getElementById("checkoutBtn").onclick=()=>{
if(cartItems.length===0){const t=document.getElementById("toast");t.textContent="Potli khaali hai — pehle kuch add karo!";t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);return;}
const total=document.getElementById("cartTotal").textContent;
const t=document.getElementById("toast");t.textContent=`Order placed! ${total} — COD/UPI. Dhanyavaad!`;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000);
cartItems=[];updateCart();setTimeout(closeCart,800);
};
function heroIntro(){if(!window.gsap){document.querySelectorAll(".reveal").forEach(el=>{el.style.opacity=1;el.style.transform="none";});return;}gsap.registerPlugin(ScrollTrigger);
const tl=gsap.timeline();
tl.from(".hero-title .line .word, .hero-title .sticker",{yPercent:110,duration:1,stagger:.12,ease:"power4.out"});
tl.to(".reveal",{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out"},"-=.6");
gsap.utils.toArray(".card,.rev,.story-card,.news-inner").forEach(el=>{gsap.fromTo(el,{y:60,opacity:0},{y:0,opacity:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%"}});});
gsap.to(".story-bg",{yPercent:14,ease:"none",scrollTrigger:{trigger:".story",scrub:true}});
gsap.utils.toArray("[data-count]").forEach(el=>{const end=+el.dataset.count;ScrollTrigger.create({trigger:el,start:"top 90%",once:true,onEnter:()=>{let o={v:0};gsap.to(o,{v:end,duration:2,ease:"power2.out",onUpdate:()=>el.textContent=Math.floor(o.v).toLocaleString()});}});});
}
