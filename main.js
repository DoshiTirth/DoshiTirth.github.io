/* NAV SCROLL BEHAVIOR */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* MOBILE HAMBURGER */
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open')
      ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open')
      ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ACTIVE NAV LINK */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* SCROLL REVEAL ANIMATIONS */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.dataset.delay = el.dataset.delay || (i * 80);
  revealObserver.observe(el);
});

/* TYPEWRITER EFFECT */
function typewriter(element, texts, speed = 80, pause = 2000) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];

    if (isDeleting) {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, pause);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? speed / 2 : speed);
  }

  type();
}

/* CURSOR BLINK */
function initCursorBlink(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  setInterval(() => {
    el.style.opacity = el.style.opacity === '0' ? '1' : '0';
  }, 530);
}

/* SMOOTH COUNTER ANIMATION */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);

  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  };

  requestAnimationFrame(update);
}

/* Trigger counters when visible */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

/* COPY EMAIL */
const copyEmailBtn = document.querySelector('.copy-email');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('doshitirth1999@gmail.com');
    const original = copyEmailBtn.textContent;
    copyEmailBtn.textContent = 'copied!';
    copyEmailBtn.style.color = 'var(--green)';
    setTimeout(() => {
      copyEmailBtn.textContent = original;
      copyEmailBtn.style.color = '';
    }, 2000);
  });
}

/* PAGE TRANSITION SYSTEM */
// Fade out on leave, fade in on arrive

document.documentElement.classList.add('page-ready');

// Intercept all internal link clicks
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');

  // Only internal .html links, not anchors or external
  if (!href.startsWith('http') && !href.startsWith('#') && href.includes('.html') || href === '/' || href === '') {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.documentElement.classList.remove('page-ready');
      document.documentElement.classList.add('page-leaving');

      setTimeout(() => {
        window.location.href = href;
      }, 380);
    });
  }
});

/* MAGNETIC BUTTON EFFECT */
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    setTimeout(() => { btn.style.transition = ''; }, 500);
  });
});

/* PARALLAX SUBTLE */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* STAGGER CHILDREN ANIMATION */
function staggerChildren(parentSelector, childSelector, baseDelay = 80) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;

  parent.querySelectorAll(childSelector).forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(20px)';
    child.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
    child.style.transitionDelay = `${i * baseDelay}ms`;

    setTimeout(() => {
      child.style.opacity = '1';
      child.style.transform = 'translateY(0)';
    }, 100);
  });
}

window.PortfolioUtils = {
  ...window.PortfolioUtils,
  staggerChildren
};

/* EXPOSE UTILITIES */
window.PortfolioUtils = { typewriter, initCursorBlink, animateCounter };