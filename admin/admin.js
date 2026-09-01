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

function readData(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    if (Array.isArray(value) && value.length) {
      return value;
    }
  } catch (error) {
    console.warn('Unable to parse localStorage:', error);
  }

  localStorage.setItem(key, JSON.stringify(fallback));
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

function updateStats() {
  const projects = readData(STORAGE_KEYS.projects, defaultProjects);
  const skills = readData(STORAGE_KEYS.skills, defaultSkills);
  const clients = readData(STORAGE_KEYS.clients, defaultClients);
  const testimonials = readData(STORAGE_KEYS.testimonials, defaultTestimonials);
  const contactMessages = readData(STORAGE_KEYS.contactMessages, []);

  document.querySelectorAll('[data-stat="projects"]').forEach((item) => {
    item.textContent = projects.length;
  });
  document.querySelectorAll('[data-stat="skills"]').forEach((item) => {
    item.textContent = skills.length;
  });
  document.querySelectorAll('[data-stat="clients"]').forEach((item) => {
    item.textContent = clients.length;
  });
  document.querySelectorAll('[data-stat="testimonials"]').forEach((item) => {
    item.textContent = testimonials.length;
  });
  document.querySelectorAll('[data-stat="messages"]').forEach((item) => {
    item.textContent = contactMessages.length;
  });
}

function populateLists() {
  const projects = readData(STORAGE_KEYS.projects, defaultProjects);
  const skills = readData(STORAGE_KEYS.skills, defaultSkills);
  const clients = readData(STORAGE_KEYS.clients, defaultClients);
  const testimonials = readData(STORAGE_KEYS.testimonials, defaultTestimonials);
  const contactMessages = readData(STORAGE_KEYS.contactMessages, []);

  const projectList = document.getElementById('project-list');
  const skillList = document.getElementById('skill-list');
  const clientList = document.getElementById('client-list');
  const testimonialList = document.getElementById('testimonial-list');
  const messageList = document.getElementById('message-list');

  if (projectList) {
    projectList.innerHTML = projects
      .map((project) => `<li><strong>${project.name}</strong><span>${project.subject}</span><em>${normalizeTech(project.technology).join(', ') || 'No technology added'}</em></li>`)
      .join('');
  }

  if (skillList) {
    skillList.innerHTML = skills
      .map((skill) => `<li><strong>${skill.name}</strong><span>${skill.technology || 'Technology'}</span></li>`)
      .join('');
  }

  if (clientList) {
    clientList.innerHTML = clients
      .map((client) => `<li><strong>${client.name}</strong><span>${client.subject || 'Client'}</span></li>`)
      .join('');
  }

  if (testimonialList) {
    testimonialList.innerHTML = testimonials
      .map((testimonial) => `<li><strong>${testimonial.name}</strong><span>${testimonial.subject || 'Client'}</span><em>${testimonial.technology || 'No quote available'}</em></li>`)
      .join('');
  }

  if (messageList) {
    messageList.innerHTML = contactMessages
      .map((message) => `<li><strong>${message.name || 'Visitor'}</strong><span>${message.subject || 'No subject'}</span><em>${message.message || 'No message content'}</em></li>`)
      .join('');
  }
}

function setFormFields(type) {
  const fields = {
    name: document.getElementById('entry-name'),
    subject: document.getElementById('entry-subject'),
    technology: document.getElementById('entry-technology'),
    message: document.getElementById('entry-message')
  };

  const containerMap = {
    subject: document.getElementById('subject-field'),
    technology: document.getElementById('technology-field'),
    message: document.getElementById('message-field')
  };

  const fieldMap = {
    project: ['name', 'subject', 'technology'],
    skill: ['name', 'technology'],
    client: ['name', 'subject'],
    testimonial: ['name', 'subject', 'message']
  };

  Object.entries(containerMap).forEach(([key, container]) => {
    if (!container) return;
    const shouldShow = (fieldMap[type] || []).includes(key);
    container.classList.toggle('hidden', !shouldShow);
  });

  Object.entries(fields).forEach(([key, field]) => {
    if (!field) return;
    const shouldShow = (fieldMap[type] || []).includes(key);
    field.required = shouldShow && key !== 'technology';
    if (key === 'technology' || key === 'message') {
      field.required = shouldShow;
    }
  });

  const formTitle = document.getElementById('form-title');
  const labels = {
    project: 'Add Project',
    skill: 'Add Skill',
    client: 'Add Client',
    testimonial: 'Add Testimonial'
  };

  if (formTitle) {
    formTitle.textContent = labels[type] || 'Add Item';
  }

  const subjectLabel = document.getElementById('subject-label');
  if (subjectLabel) {
    const labelMap = {
      project: 'Project Subject',
      skill: 'Category',
      client: 'Company',
      testimonial: 'Role'
    };
    subjectLabel.textContent = labelMap[type] || 'Subject';
  }

  const technologyLabel = document.getElementById('technology-label');
  if (technologyLabel) {
    const labelMap = {
      project: 'Technology',
      skill: 'Technology',
      client: 'Notes',
      testimonial: 'Quote'
    };
    technologyLabel.textContent = labelMap[type] || 'Technology';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formType = document.getElementById('form-type').value;
  const formData = new FormData(form);
  const entry = Object.fromEntries(formData.entries());

  const collectionKey = {
    project: STORAGE_KEYS.projects,
    skill: STORAGE_KEYS.skills,
    client: STORAGE_KEYS.clients,
    testimonial: STORAGE_KEYS.testimonials
  }[formType];

  if (!collectionKey) return;

  const existing = readData(collectionKey, []);

  const payload = {
    name: String(entry.name || '').trim(),
    subject: String(entry.subject || '').trim(),
    technology: String(entry.technology || entry.message || '').trim(),
    status: 'Active'
  };

  if (!payload.name) {
    return;
  }

  if (formType === 'project') {
    existing.push({
      name: payload.name,
      subject: payload.subject || 'Portfolio project',
      technology: normalizeTech(payload.technology),
      status: 'Live'
    });
  } else if (formType === 'skill') {
    existing.push({
      name: payload.name,
      technology: payload.technology || 'Technology'
    });
  } else if (formType === 'client') {
    existing.push({
      name: payload.name,
      subject: payload.subject || 'Client'
    });
  } else if (formType === 'testimonial') {
    existing.push({
      name: payload.name,
      subject: payload.subject || 'Client',
      technology: payload.message || payload.technology || 'Great work!'
    });
  }

  localStorage.setItem(collectionKey, JSON.stringify(existing));
  form.reset();
  closeForm();
  populateLists();
  updateStats();
}

function openForm(type) {
  const panel = document.getElementById('quick-form-panel');
  const formTypeField = document.getElementById('form-type');
  if (panel && formTypeField) {
    formTypeField.value = type;
    setFormFields(type);
    panel.classList.remove('hidden');
  }
}

function closeForm() {
  const panel = document.getElementById('quick-form-panel');
  if (panel) {
    panel.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const actionCards = document.querySelectorAll('[data-open-form]');
  const quickForm = document.getElementById('quick-form');
  const closeButton = document.getElementById('close-form');

  actionCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      openForm(card.dataset.openForm);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeForm);
  }

  if (quickForm) {
    quickForm.addEventListener('submit', handleFormSubmit);
  }

  updateStats();
  populateLists();
  setFormFields('project');
});
