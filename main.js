const STORAGE_KEYS = {
  projects: 'portfolioProjects',
  skills: 'portfolioSkills',
  clients: 'portfolioClients',
  testimonials: 'portfolioTestimonials',
  contactMessages: 'contactMessages'
};

const defaultProjects = [
  {
    name: 'Codefest26',
    subject: 'Registration website with a clean responsive interface for managing event registrations.',
    technology: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    status: 'Public'
  },
  {
    name: 'Personal Portfolio',
    subject: 'A focused portfolio experience designed to present skills, work, and personality clearly.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    status: 'Live'
  },
  {
    name: 'Medinova',
    subject: 'Informative healthcare interface built around trust, accessibility, and easy navigation.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    status: 'Public'
  },
  {
    name: 'Perfect Hair Salon',
    subject: 'Service-led salon website with a polished visual system and appointment-focused layout.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    status: 'Public'
  },
  {
    name: 'Parth Travels',
    subject: 'Travel booking platform concept with destination discovery and simple booking flows.',
    technology: ['HTML', 'CSS', 'TypeScript'],
    status: 'Public'
  }
];

const defaultSkills = [
  { name: 'HTML', technology: 'Markup' },
  { name: 'CSS', technology: 'Styling' },
  { name: 'JavaScript', technology: 'Interactivity' },
  { name: 'TypeScript', technology: 'Frontend logic' },
  { name: 'Responsive Design', technology: 'UI/UX' }
];

const defaultClients = [
  { name: 'Aster Labs', subject: 'Product design partner' },
  { name: 'Northpeak Studio', subject: 'UX consulting' },
  { name: 'Harbor Media', subject: 'Campaign website' }
];

const defaultTestimonials = [
  { name: 'Aarav Shah', subject: 'Product Lead', technology: 'Darshil made the entire process smooth and the final interface felt premium from day one.' },
  { name: 'Nisha Patel', subject: 'Marketing Manager', technology: 'The site was polished, fast, and easy to understand. The attention to detail stood out.' }
];

function safeRead(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    if (Array.isArray(value) && value.length) {
      return value;
    }
  } catch (error) {
    console.warn('Storage read failed:', error);
  }
  return fallback;
}

function normalizeTech(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  const projects = safeRead(STORAGE_KEYS.projects, defaultProjects).map((project, index) => ({
    name: project.name || `Project ${index + 1}`,
    subject: project.subject || 'New portfolio project',
    technology: normalizeTech(project.technology),
    status: project.status || (index === 0 ? 'Public' : 'Live')
  }));

  container.innerHTML = projects
    .map((project) => `
      <article class="project-card ${project.name === 'Personal Portfolio' ? 'project-card-featured' : ''}">
        <div class="project-image ${['Codefest26', 'Parth Travels'].includes(project.name) ? 'image-blue' : project.name === 'Personal Portfolio' ? 'image-photo' : project.name === 'Medinova' ? 'image-light' : 'image-warm'}">
          <img src="${project.name === 'Codefest26' ? 'images/codefest.png' : project.name === 'Personal Portfolio' ? 'images/logo.png' : project.name === 'Medinova' ? 'images/medinova.png' : project.name === 'Perfect Hair Salon' ? 'images/perfect.png' : 'images/parth travels.png'}" alt="${project.name} preview">
        </div>
        <div class="project-info">
          <div class="project-title">
            <h3>${project.name}</h3>
            <span>${project.status}</span>
          </div>
          <p>${project.subject}</p>
          <div class="tech-tags">
            ${project.technology.map((tech) => `<span>${tech}</span>`).join('')}
          </div>
        </div>
      </article>
    `)
    .join('');

  updateStat('projects', projects.length);
}

function renderSkills() {
  const skills = safeRead(STORAGE_KEYS.skills, defaultSkills);
  const container = document.getElementById('skills-grid');
  container.innerHTML = skills
    .map((skill) => `
      <div class="skill-item">
        <span>${skill.name}</span>
        <small>${skill.technology || 'Technology'}</small>
      </div>
    `)
    .join('');

  updateStat('skills', skills.length);
}

function renderClients() {
  const clients = safeRead(STORAGE_KEYS.clients, defaultClients);
  const container = document.getElementById('clients-grid');
  container.innerHTML = clients
    .map((client) => `
      <div class="client-card">
        <div class="client-avatar">${(client.name || 'C').charAt(0).toUpperCase()}</div>
        <div>
          <h3>${client.name || 'Client Name'}</h3>
          <p>${client.subject || 'Business partner'}</p>
        </div>
      </div>
    `)
    .join('');

  updateStat('clients', clients.length);
}

function renderTestimonials() {
  const testimonials = safeRead(STORAGE_KEYS.testimonials, defaultTestimonials);
  const container = document.getElementById('testimonials-grid');
  container.innerHTML = testimonials
    .map((item) => `
      <article class="testimonial-card">
        <p>“${item.technology || item.message || 'Great work and great communication throughout the project.'}”</p>
        <div class="testimonial-meta">
          <strong>${item.name || 'Client Name'}</strong>
          <span>${item.subject || 'Client'}</span>
        </div>
      </article>
    `)
    .join('');

  updateStat('testimonials', testimonials.length);
}

function updateStat(key, value) {
  document.querySelectorAll(`[data-stat="${key}"]`).forEach((element) => {
    element.textContent = value;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.contactMessages) || '[]');
      const message = Object.fromEntries(new FormData(form).entries());

      savedMessages.push({
        ...message,
        submittedAt: new Date().toISOString()
      });

      localStorage.setItem(STORAGE_KEYS.contactMessages, JSON.stringify(savedMessages));
      formStatus.textContent = 'Your message has been saved successfully.';
      form.reset();
    });
  }

  renderProjects();
  renderSkills();
  renderClients();
  renderTestimonials();
});
