'use strict';
// Inventaire fictif, limité à cette démonstration. Aucune requête, aucun stockage.
const rooms = [
  {id:'jardin',name:'La chambre Jardin',area:24,capacity:2,rate:145,image:'chambre',detail:'Un lit double, une salle de bain et une vue sur le jardin.',blocked:[['2025-12-21','2025-12-24']]},
  {id:'suite',name:'La suite Avelune',area:38,capacity:3,rate:210,image:'suite',detail:'Un lit double, un couchage individuel et un coin salon.',blocked:[['2025-12-24','2025-12-28']]},
  {id:'charme',name:'La chambre Charme',area:20,capacity:2,rate:125,image:'chambre',detail:'Une chambre intimiste côté cour, avec un lit double.',blocked:[['2025-12-18','2025-12-20']]}
];
const $=s=>document.querySelector(s);
const euros=n=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const dateLabel=s=>new Date(s+'T12:00:00Z').toLocaleDateString('fr-FR',{day:'numeric',month:'long',timeZone:'UTC'});
let stay=null, chosen=null;
function readStay(){
  const arrival=$('#arrival').value,departure=$('#departure').value,guests=Number($('#guests').value);
  if(!arrival||!departure||arrival<'2025-12-01'||departure>'2026-02-28'||departure<=arrival||![1,2,3].includes(guests))throw new Error('Choisissez une arrivée puis un départ ultérieur, entre le 1er décembre 2025 et le 28 février 2026.');
  return {arrival,departure,guests,nights:Math.round((Date.parse(departure)-Date.parse(arrival))/86400000)};
}
function available(room,s){return room.capacity>=s.guests&&!room.blocked.concat([['2025-12-25','2025-12-26']]).some(([a,b])=>s.arrival<b&&s.departure>a)}
function search(){
  chosen=null;$('#booking').hidden=true;$('#confirmation').hidden=true;$('#search-section').hidden=false;$('#results').hidden=false;$('#guest-form').reset();$('#error').textContent='';
  try{stay=readStay()}catch(e){stay=null;$('#results').replaceChildren();$('#error').textContent=e.message;return}
  const count=rooms.filter(r=>available(r,stay)).length;
  $('#results').innerHTML=`<div class="results-heading"><h2>${count} chambre${count>1?'s':''} disponible${count>1?'s':''}</h2><p>${stay.nights} nuit${stay.nights>1?'s':''} · ${stay.guests} adulte${stay.guests>1?'s':''}</p></div>`+(count?'':'<p class="empty">Aucune chambre disponible pour ces critères. Essayez d’autres dates ou un autre nombre de voyageurs.</p>')+rooms.map(r=>{const ok=available(r,stay);return `<article class="booking-room ${ok?'':'unavailable'}"><img src="images/${r.image}.webp" alt="${r.name}, illustration de la chambre fictive" width="768" height="512"><div class="details"><span class="tag">${ok?'Disponible pour votre séjour':r.capacity<stay.guests?'Capacité insuffisante':'Indisponible à ces dates'}</span><h3>${r.name}</h3><p>${r.area} m² · ${r.capacity} personnes maximum</p><p>${r.detail}</p></div><div class="rate"><strong>${euros(r.rate*stay.nights)}</strong><span>${stay.nights} nuits · ${euros(r.rate)} / nuit<br>Montant fictif total</span><button type="button" data-room="${r.id}" ${ok?'':'disabled'}>${ok?'Choisir cette chambre':'Non disponible'}</button></div></article>`}).join('');
  $('#step1').style.fontWeight='700';$('#step2').style.fontWeight='400';$('#step3').style.fontWeight='400';
}
function choose(id){
  const room=rooms.find(r=>r.id===id);if(!stay||!room||!available(room,stay))return;
  chosen=room;$('#results').hidden=true;$('#search-section').hidden=true;$('#booking').hidden=false;
  $('#summary').innerHTML=`<img src="images/${room.image}.webp" alt="${room.name}" width="768" height="512"><p class="eyebrow">Votre séjour à Maison Avelune</p><h3>${room.name}</h3><dl><div><dt>Arrivée</dt><dd>${dateLabel(stay.arrival)}</dd></div><div><dt>Départ</dt><dd>${dateLabel(stay.departure)}</dd></div><div><dt>Voyageurs</dt><dd>${stay.guests} adulte${stay.guests>1?'s':''}</dd></div><div><dt>${stay.nights} nuits × ${euros(room.rate)}</dt><dd>${euros(room.rate*stay.nights)}</dd></div><div class="total"><dt>Total fictif</dt><dd>${euros(room.rate*stay.nights)}</dd></div></dl><p class="fine" style="margin-top:18px">Tarif de démonstration. Aucun montant à régler.</p>`;
  $('#step2').style.fontWeight='700';window.scrollTo(0,0);$('#firstname').focus({preventScroll:true});
}
$('#search-form').addEventListener('submit',e=>{e.preventDefault();search()});
$('#results').addEventListener('click',e=>{const b=e.target.closest('[data-room]');if(b&&!b.disabled)choose(b.dataset.room)});
$('#back').addEventListener('click',()=>{search();$('#arrival').focus()});
$('#guest-form').addEventListener('submit',e=>{
  e.preventDefault();if(!chosen||!stay||!available(chosen,stay))return;
  $('#booking').hidden=true;$('#confirmation').hidden=false;$('#step3').style.fontWeight='700';
  $('#confirmation').innerHTML=`<span class="seal" aria-hidden="true">✓</span><p class="eyebrow">Parcours de démonstration terminé</p><h1>Votre séjour prend forme.</h1><p>${chosen.name}<br>Du ${dateLabel(stay.arrival)} au ${dateLabel(stay.departure)} · ${stay.nights} nuits<br>${stay.guests} adulte${stay.guests>1?'s':''} · Total fictif : ${euros(chosen.rate*stay.nights)}</p><p class="fine">Ceci est une confirmation simulée. Aucune chambre n'a été réservée, aucun paiement effectué et aucun e-mail envoyé. Vos coordonnées n'ont pas été conservées.</p><button type="button" id="restart">Essayer un autre séjour</button>`;
  $('#guest-form').reset();$('#restart').addEventListener('click',search);$('#confirmation').focus();
});
const params=new URLSearchParams(location.search);
for(const [key,id] of [['arrivee','arrival'],['depart','departure'],['voyageurs','guests']])if(params.has(key))$('#'+id).value=params.get(key);
search();
