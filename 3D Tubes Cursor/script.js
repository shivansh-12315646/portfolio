// Removed TubesCursor import

// =============================================
// 0. SPLASH SCREEN (PRELOADER)
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('no-scroll')
  
  const splashScreen = document.getElementById('splash-screen')

  if (splashScreen) {
    const splashText = document.getElementById('splashText');
    const splashSub = document.getElementById('splashSub');
    
    const dismissSplash = () => {
      if (!splashScreen.parentNode || splashScreen.classList.contains('dismissing')) return; // Prevent multiple triggers
      splashScreen.classList.add('dismissing');
      
      // 1. Fade out the texts
      if (splashText) splashText.classList.add('fade-out');
      if (splashSub) splashSub.classList.add('fade-out');
      
      // 2. Wait for fade out, change text to "Welcome" and fade in
      setTimeout(() => {
        if (splashText) {
          splashText.textContent = 'Welcome';
          splashText.classList.remove('fade-out');
        }
        
        // 3. Keep "Welcome" briefly, then slide up the entire screen
        setTimeout(() => {
          splashScreen.classList.add('slide-up');
          document.body.classList.remove('no-scroll');
          setTimeout(() => splashScreen.remove(), 1200); // remove after slide
        }, 1000);
      }, 400); // Wait for the .fade-out CSS transition
    }

    splashScreen.addEventListener('click', dismissSplash)
    
    // Additionally listen for the Enter key to dismiss splash screen
    const keyHandler = (e) => {
      if (e.key === 'Enter') {
        dismissSplash()
        document.removeEventListener('keydown', keyHandler)
      }
    }
    document.addEventListener('keydown', keyHandler)
  }
})

// =============================================
// 1. INTERACTIVE DRAGON BACKGROUND
// =============================================
;(function initDragon() {
  const screen = document.getElementById("screen");
  if (!screen) return;
  const xmlns = "http://www.w3.org/2000/svg";
  const xlinkns = "http://www.w3.org/1999/xlink";
  
  let width, height;
  let rad = 0;
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  let time = 0;
  let isMouseActive = false;
  let mouseTimeout;

  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      rad = 0;
      isMouseActive = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => { isMouseActive = false; }, 2500); // go idle after 2.5s
    },
    false
  );

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  window.addEventListener("resize", () => resize(), false);
  resize();

  const prepend = (use, i) => {
    const elem = document.createElementNS(xmlns, "use");
    elems[i].use = elem;
    elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
    screen.prepend(elem);
  };

  const N = 40;
  const elems = [];
  for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
  let frm = Math.random();

  for (let i = 1; i < N; i++) {
    if (i === 1) prepend("Cabeza", i);
    else if (i === 8 || i === 14) prepend("Aletas", i);
    else prepend("Espina", i);
  }

  const run = () => {
    requestAnimationFrame(run);
    let e = elems[0];
    
    if (!isMouseActive) {
      time += 0.035;
      // Infinity (Figure-8) motion
      pointer.x = (width / 2) + Math.cos(time) * (width * 0.35);
      // Math.sin(time * 2) gives the vertical figure-8 crossover
      pointer.y = (height / 2) + Math.sin(time * 2) * (height * 0.25);
      rad = 0; // prevent wide spiral when wandering
    } else {
      const radm = Math.min(pointer.x, pointer.y) - 20;
      if (rad < radm) rad++;
    }

    const ax = (Math.cos(3 * frm) * rad * width) / height;
    const ay = (Math.sin(4 * frm) * rad * height) / width;
    e.x += (ax + pointer.x - e.x) / 6;
    e.y += (ay + pointer.y - e.y) / 6;
    for (let i = 1; i < N; i++) {
      let e = elems[i];
      let ep = elems[i - 1];
      const a = Math.atan2(e.y - ep.y, e.x - ep.x);
      e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
      e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
      const s = (162 + 4 * (1 - i)) / 50;
      e.use.setAttributeNS(
        null,
        "transform",
        `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${
          (180 / Math.PI) * a
        }) translate(${0},${0}) scale(${s},${s})`
      );
    }
    frm += 0.003;
  };

  run();
})();

// =============================================
// 2. PARTICLE NETWORK BACKGROUND
// =============================================
;(function initParticles() {
  const canvas = document.getElementById('particles-canvas')
  const ctx = canvas.getContext('2d')
  let W, H, particles = [], mouse = { x: -9999, y: -9999 }
  const COUNT = 80, MAX_DIST = 130

  function resize() {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

  function Particle() {
    this.x = Math.random() * W
    this.y = Math.random() * H
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.r  = Math.random() * 2 + 1
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle())

  const isDark = () => !document.body.dataset.theme || document.body.dataset.theme === 'dark'

  function draw() {
    ctx.clearRect(0, 0, W, H)
    const dotColor = isDark() ? 'rgba(249,115,22,0.5)' : 'rgba(105,88,213,0.4)'
    const lineColor = isDark() ? 'rgba(249,115,22,' : 'rgba(105,88,213,'

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1

      // attract to mouse
      const mdx = mouse.x - p.x, mdy = mouse.y - p.y
      const md  = Math.sqrt(mdx * mdx + mdy * mdy)
      if (md < 150) { p.x += mdx * 0.01; p.y += mdy * 0.01 }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = dotColor
      ctx.fill()
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < MAX_DIST) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = lineColor + (1 - d / MAX_DIST) * 0.3 + ')'
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }
    requestAnimationFrame(draw)
  }
  draw()
})()

// =============================================
// 3. TYPEWRITER EFFECT
// =============================================
;(function initTypewriter() {
  const el = document.getElementById('typewriter')
  if (!el) return
  const words = [
    'Artificial Intelligence',
    'AI Enthusiast',
    'Machine Learning',
    'Python Programming',
    'Problem Solving',
    'Deep Learning',
    'Algorithm Design',
    'C++ Development'
  ]
  let wi = 0, ci = 0, deleting = false

  function type() {
    const word = words[wi]
    if (!deleting) {
      el.textContent = word.slice(0, ++ci)
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return }
    } else {
      el.textContent = word.slice(0, --ci)
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length }
    }
    setTimeout(type, deleting ? 55 : 95)
  }
  type()
})()

// =============================================
// 4. NAVBAR — active link on scroll + shrink
// =============================================
const navbar   = document.getElementById('navbar')
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-link')

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.style.background = 'rgba(13,17,23,0.97)'
  else navbar.style.background = ''

  const scrollTop  = document.getElementById('scrollTop')
  if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 300)
})

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'))
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`)
      if (a) a.classList.add('active')
    }
  })
}, { threshold: 0.35 })
sections.forEach(s => obs.observe(s))

// =============================================
// 5. THEME TOGGLE
// =============================================
const themeToggle = document.getElementById('themeToggle')
const icon = themeToggle?.querySelector('i')
themeToggle?.addEventListener('click', () => {
  const isLight = document.body.dataset.theme === 'light'
  document.body.dataset.theme = isLight ? 'dark' : 'light'
  if (icon) { icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun' }
})

// =============================================
// 6. SCROLL TO TOP
// =============================================
document.getElementById('scrollTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// =============================================
// 7. ANIMATE ELEMENTS ON SCROLL (fade in up)
// =============================================
;(function initScrollAnimations() {
  const style = document.createElement('style')
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.in-view { opacity: 1; transform: none; }
  `
  document.head.appendChild(style)

  const targets = [
    '.skill-card', '.edu-card', '.achieve-card',
    '.cert-card', '.contact-card', '.about-photo-col',
    '.about-content-col'
  ]
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal')
      el.style.transitionDelay = (i * 0.07) + 's'
    })
  })

  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el))
})()

// =============================================
// 8. AI CHAT ASSISTANT
// =============================================
;(function initChat() {
  const KB = {
    about: `
      <h2 style="font-size:1.8rem; margin-bottom: 20px;">Hey, I'm Shivansh 👋</h2>
      <h3 style="font-size:1.1rem; color:var(--muted); margin-bottom: 24px; font-weight:500;">AI Enthusiast & CSE Student</h3>
      
      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-user-graduate" style="color:var(--primary); margin-right:8px;"></i> Academic Background</h4>
      <ul style="margin-bottom: 24px;">
        <li>B.Tech Computer Science Engineering</li>
        <li>Lovely Professional University (2023–present)</li>
        <li>Punjab, India</li>
      </ul>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-bullseye" style="color:var(--primary); margin-right:8px;"></i> Vision</h4>
      <p style="color:var(--muted); line-height:1.6; margin-bottom:12px;">My ultimate goal is to architect intelligent, self-sustaining systems that solve critical real-world problems. Whether it is through designing highly efficient machine learning architectures, optimizing low-level algorithms, or engineering robust full-stack applications, I am relentlessly driven by the pursuit of innovation.</p>
      <p style="color:var(--muted); line-height:1.6;">I believe that the future of technology lies at the intersection of human creativity and artificial intelligence, and as an engineer, I am dedicated to pushing those boundaries every single day to build software that scales, adapts, and makes a genuine impact.</p>
    `,
    skills: `
      <h2 style="font-size:1.8rem; margin-bottom: 24px;">Skills & Expertise</h2>

      <h4 style="font-size:1.05rem; margin-bottom:12px;">&lt; /&gt; Programming Languages</h4>
      <ul style="margin-bottom: 24px;">
        <li>Python</li><li>C++</li><li>C</li><li>JavaScript</li><li>TypeScript</li><li>HTML5</li><li>CSS3</li>
      </ul>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-brain" style="margin-right:8px;"></i> AI & Machine Learning</h4>
      <ul style="margin-bottom: 24px;">
        <li>TensorFlow</li><li>PyTorch</li><li>Scikit-Learn</li><li>NLP</li><li>Computer Vision</li><li>Generative AI</li><li>Data Analytics</li>
      </ul>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-server" style="margin-right:8px;"></i> Tools & Databases</h4>
      <ul style="margin-bottom: 24px;">
        <li>Git</li><li>GitHub</li><li>Docker</li><li>MySQL</li><li>MongoDB</li><li>JupyterLab</li><li>VS Code</li>
      </ul>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-users" style="margin-right:8px;"></i> Soft Skills</h4>
      <ul>
        <li>Analytical Thinking</li><li>Problem Solving</li><li>Adaptability</li><li>Team Collaboration</li><li>Agile Mindset</li>
      </ul>
    `,
    work: `
      <h2 style="font-size:1.8rem; margin-bottom: 24px;">Featured Projects</h2>
      
      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-project-diagram" style="color:var(--primary); margin-right:8px;"></i> Browser History Manager</h4>
      <p style="color:var(--muted); margin-bottom:12px; font-size:0.9rem;">An Object-Oriented C++ application leveraging stack-based architecture to simulate efficient browser navigation.</p>
      <ul style="margin-bottom: 24px;">
        <li>C++</li><li>OOP</li><li>Data Structures</li>
      </ul>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-microchip" style="color:var(--primary); margin-right:8px;"></i> Energy-Efficient CPU Scheduler</h4>
      <p style="color:var(--muted); margin-bottom:12px; font-size:0.9rem;">A low-level C program optimizing task execution, reducing algorithm idle time by over 20%.</p>
      <ul style="margin-bottom: 24px;">
        <li>C Language</li><li>OS Concepts</li><li>Algorithms</li>
      </ul>
      
      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-robot" style="color:var(--primary); margin-right:8px;"></i> Smart Assistant Engine</h4>
      <p style="color:var(--muted); margin-bottom:12px; font-size:0.9rem;">A conversational AI interface (like this one!) utilizing dynamic DOM manipulation and Glassmorphism design.</p>
      <ul>
        <li>JavaScript</li><li>DOM</li><li>UI/UX</li>
      </ul>
    `,
    achievements: `
      <h2 style="font-size:1.8rem; margin-bottom: 24px;">Trophies & Milestones</h2>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-award" style="color:var(--primary); margin-right:8px;"></i> Competitive Programming</h4>
      <ul style="margin-bottom: 24px;">
        <li>100+ CodeTantra Problems Solved</li>
        <li>Advanced Python Challenges</li>
        <li>Algorithm Optimization</li>
      </ul>

      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fab fa-stack-overflow" style="color:var(--primary); margin-right:8px;"></i> Community Contributions</h4>
      <ul style="margin-bottom: 24px;">
        <li>2x Bronze Badges on Stack Overflow</li>
        <li>Active Open Source Contributor</li>
      </ul>
      
      <h4 style="font-size:1.05rem; margin-bottom:12px;"><i class="fas fa-certificate" style="color:var(--primary); margin-right:8px;"></i> Certifications</h4>
      <ul>
        <li>Generative AI Apps (Udemy)</li>
        <li>Finite Automata (Infosys)</li>
        <li>Computer Networking (Google)</li>
      </ul>
    `,
    contact: `
      <h2 style="font-size:1.8rem; margin-bottom: 24px;">Let's Build Together</h2>
      <p style="color:var(--muted); margin-bottom: 24px; line-height: 1.6;">I'm always open to discussing AI innovations, software engineering, or new opportunities. Reach out to my human creator below!</p>
      
      <h4 style="font-size:1.05rem; margin-bottom:12px;">Connect</h4>
      <ul style="margin-bottom: 24px; flex-direction:column; gap:12px;">
        <li><a href="mailto:shivanshsep16@gmail.com" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:8px;"><i class="fas fa-envelope"></i> shivanshsep16@gmail.com</a></li>
        <li><a href="tel:+919877212157" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:8px;"><i class="fas fa-phone"></i> +91-9877212157</a></li>
        <li><a href="https://linkedin.com/in/shivansh-sharma-89" target="_blank" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:8px;"><i class="fab fa-linkedin"></i> LinkedIn Match</a></li>
      </ul>
    `,
    default: `
      <h2 style="font-size:1.8rem; margin-bottom: 16px;">AI Engineer Assistant</h2>
      <p style="color:var(--muted); line-height:1.6; margin-bottom:24px;">I'm the custom AI built by Shivansh. I can guide you through his <strong>expertise</strong>, <strong>projects</strong>, and <strong>achievements</strong>.<br><br>Click one of the quick questions below or type a custom query!</p>
    `
  }

  function getReply(q) {
    q = q.toLowerCase().trim()
    if (/about|who|himself|introduce/.test(q)) return KB.about
    if (/skill|tech|stack|know|language|python|c\+\+|ml|ai|tensorflow/.test(q)) return KB.skills
    if (/work|project|built|build|done|experience/.test(q)) return KB.work
    if (/achieve|badge|award|overflow|codetantra|trophy/.test(q)) return KB.achievements
    if (/contact|email|phone|reach|connect|linkedin|github/.test(q)) return KB.contact
    return KB.default
  }

  const containerEl = document.querySelector('.ai-container')
  const outputEl    = document.getElementById('aiOutput')
  const inputEl     = document.getElementById('chatInput')
  const sendEl      = document.getElementById('chatSend')

  if (!containerEl || !outputEl || !inputEl || !sendEl) return

  function triggerResponse(query) {
    if (!query.trim()) return
    // Activate Toukoum layout (shrinks avatar, shows output)
    containerEl.classList.add('active')
    
    // Simulate thinking
    outputEl.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>'
    inputEl.value = ''
    
    setTimeout(() => {
      outputEl.innerHTML = getReply(query)
    }, 600)
  }

  sendEl.addEventListener('click', () => triggerResponse(inputEl.value))
  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') triggerResponse(inputEl.value) })
  document.querySelectorAll('.toukoum-btn').forEach(btn => {
    btn.addEventListener('click', () => triggerResponse(btn.dataset.query))
  })
})()


// =============================================
// GSAP HORIZONTAL SCROLL FOR PROJECTS
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {
      const workFlex = document.querySelector(".work-flex");
      const workBoxes = document.querySelectorAll(".work-box");
      const workContainer = document.querySelector(".work-container");
      
      if (workFlex && workBoxes.length > 0 && workContainer) {
        function getTranslateX() {
          const rectLeft = workContainer.getBoundingClientRect().left;
          const boxRect = workBoxes[0].getBoundingClientRect();
          const parentWidth = workBoxes[0].parentElement.getBoundingClientRect().width;
          let padding = parseInt(window.getComputedStyle(workBoxes[0]).padding) / 2 || 15;
          return (boxRect.width * workBoxes.length) - (rectLeft + parentWidth) + padding;
        }
        
        let translateX = getTranslateX();
        
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-section",
            start: "top top",
            end: () => `+=${getTranslateX()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
          }
        });
  
        tl.to(".work-flex", {
          x: () => -getTranslateX(),
          ease: "none",
        });
      }
    }, 500); // Slight delay to ensure layout is ready
  }
});