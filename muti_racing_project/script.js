const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  setTimeout(() => preloader.classList.add('go'), 250);
  setTimeout(() => preloader.classList.add('hide'), 1150);
});

const cursor = document.getElementById('cursorAura');
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,.hobby-card,.gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.18) rotate(-8deg)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1) rotate(0)');
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const nav = document.getElementById('mainNav');
document.getElementById('menuToggle').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const track = document.getElementById('galleryTrack');
const progress = document.getElementById('galleryProgress');
function moveGallery(direction) {
  const card = track.querySelector('.gallery-item');
  track.scrollBy({left: direction * (card.getBoundingClientRect().width + 18), behavior: 'smooth'});
}
document.getElementById('galleryPrev').addEventListener('click', () => moveGallery(-1));
document.getElementById('galleryNext').addEventListener('click', () => moveGallery(1));
track.addEventListener('scroll', () => {
  const max = track.scrollWidth - track.clientWidth;
  const pct = max > 0 ? (track.scrollLeft / max) * 83.34 + 16.66 : 100;
  progress.style.width = pct + '%';
});
