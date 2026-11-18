'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  projects.forEach(project => {
    const visible = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
    project.hidden = !visible;
    if (visible) count++;
  });
  document.getElementById('filter-status').textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}.`;
}));
if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
let sending = false;
form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  if (!window.emailjs) {
    formStatus.dataset.state = 'error';
    formStatus.textContent = 'Le service d’envoi est indisponible. Vous pouvez m’écrire directement à Benzinanehaytam1@gmail.com.';
    return;
  }
  const submit = form.querySelector('button[type="submit"]');
  sending = true;
  submit.disabled = true;
  formStatus.dataset.state = 'pending';
  formStatus.textContent = 'Envoi en cours…';
  try {
    await window.emailjs.sendForm('service_206zija', 'template_lczgedx', form, { publicKey: 'CuelrRDlPdPlZjLnK' });
    formStatus.dataset.state = 'success';
    formStatus.textContent = 'Merci ! Votre message a bien été envoyé. À très bientôt.';
    form.reset();
  } catch {
    formStatus.dataset.state = 'error';
    formStatus.textContent = 'L’envoi a échoué. Réessayez ou écrivez-moi directement à Benzinanehaytam1@gmail.com.';
  } finally {
    sending = false;
    submit.disabled = false;
  }
});

// Le lecteur apparaît dès qu'une source est renseignée dans le HTML.
const presentationVideo = document.getElementById('presentation-video');
const videoPlaceholder = document.getElementById('video-placeholder');
const videoStatus = document.getElementById('video-status');
if (presentationVideo && presentationVideo.querySelector('source[src]')) {
  presentationVideo.hidden = false;
  videoPlaceholder.hidden = true;
  presentationVideo.addEventListener('error', () => {
    presentationVideo.hidden = true;
    videoPlaceholder.hidden = false;
    videoStatus.textContent = 'La vidéo est momentanément indisponible. Vous pouvez me contacter pour en savoir plus sur mon parcours.';
  });
  presentationVideo.querySelectorAll('source').forEach(source => {
    source.addEventListener('error', () => {
      presentationVideo.hidden = true;
      videoPlaceholder.hidden = false;
      videoStatus.textContent = 'La vidéo est momentanément indisponible. Vous pouvez me contacter pour en savoir plus sur mon parcours.';
    });
  });
  presentationVideo.load();
}


// Afficher la capture du projet dès que le fichier est disponible.
document.querySelectorAll('img[data-project-image]').forEach(img => {
  img.addEventListener('load', () => {
    img.hidden = false;
    const placeholder = img.parentElement.querySelector('.project-image-pending');
    if (placeholder) placeholder.hidden = true;
  });
  img.addEventListener('error', () => {
    img.hidden = true;
  });
  img.src = img.dataset.projectImage;
});
