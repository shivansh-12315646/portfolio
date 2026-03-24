/**
 * data.js — Portfolio Data Layer
 * All portfolio content is stored in localStorage.
 * Falls back to DEFAULTS when no overrides exist.
 * Admin dashboard writes here; all pages read from here.
 */

const PORTFOLIO_DEFAULTS = {
  about: {
    name: "Shivansh Sharma",
    subtitle: "AI Enthusiast & CSE Student",
    bio: "A passionate CSE student at Lovely Professional University, driven by the power of Artificial Intelligence and modern technology to build meaningful solutions.",
    email: "shivanshsep16@gmail.com",
    phone: "+91-9877212157",
    location: "Punjab, India",
    github: "https://github.com/shivansh-12",
    linkedin: "https://linkedin.com/in/shivansh-sharma-89",
    avatar: "./photo.jpg"
  },

  education: [
    {
      id: "edu1",
      institution: "Lovely Professional University",
      degree: "B.Tech — Computer Science & Engineering",
      year: "Present",
      score: "CGPA: 6.23",
      location: "Punjab, India"
    },
    {
      id: "edu2",
      institution: "Sant Singh Sukha Singh Khalsa Sen. Sec.",
      degree: "Intermediate",
      year: "2020",
      score: "Percentage: 84%",
      location: "Amritsar, Punjab"
    },
    {
      id: "edu3",
      institution: "Modern Jagat Jyoti Sen. Sec. School",
      degree: "Matriculation",
      year: "2018",
      score: "Percentage: 94%",
      location: "Amritsar, Punjab"
    }
  ],

  projects: [
    {
      id: "proj1",
      title: "Browser History Manager",
      date: "March 2025",
      description: "A C++ browser history manager using a stack-based data structure to track and navigate visited web pages. Features efficient memory handling and object-oriented design to emulate real-world browser navigation.",
      tags: ["C++", "OOP", "Data Structures", "Stack"],
      github: "https://github.com/shivansh-12",
      live: ""
    },
    {
      id: "proj2",
      title: "Energy-Efficient CPU Scheduling",
      date: "January 2025",
      description: "Generated an energy-efficient CPU scheduling algorithm in C to optimize CPU utilization and reduce power consumption. Integrated context switching and wait-time logic, shrinking CPU idle time by 20%.",
      tags: ["C Language", "OS Concepts", "Algorithm Design"],
      github: "https://github.com/shivansh-12",
      live: ""
    }
  ],

  skills: {
    languages: [
      { name: "C++", icon: "fas fa-code", color: "#00599c" },
      { name: "C", icon: "fas fa-c", color: "#a8b9cc" },
      { name: "Python", icon: "fab fa-python", color: "#3776ab" },
      { name: "HTML5", icon: "fab fa-html5", color: "#e34f26" },
      { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572b6" }
    ],
    ai_ml: [
      { name: "TensorFlow", icon: "fas fa-brain", color: "#ff6f00" },
      { name: "Scikit-learn", icon: "fas fa-robot", color: "#f7931e" },
      { name: "Artificial Intelligence", icon: "fas fa-microchip", color: "#a855f7" },
      { name: "Machine Learning", icon: "fas fa-chart-line", color: "#22c55e" }
    ],
    tools: [
      { name: "MySQL", icon: "fas fa-database", color: "#4479a1" },
      { name: "MongoDB", icon: "fas fa-leaf", color: "#47a248" },
      { name: "VS Code", icon: "fas fa-laptop-code", color: "#007acc" },
      { name: "JupyterLab", icon: "fas fa-flask", color: "#f37626" },
      { name: "Git", icon: "fab fa-git-alt", color: "#f05032" }
    ],
    soft: [
      { name: "Problem Solving", icon: "fas fa-puzzle-piece", color: "#f967fb" },
      { name: "Adaptability", icon: "fas fa-sync-alt", color: "#6958d5" },
      { name: "Time Management", icon: "fas fa-clock", color: "#53bc28" },
      { name: "Consistency", icon: "fas fa-fire", color: "#f97316" }
    ]
  },

  achievements: [
    {
      id: "ach1",
      icon: "fas fa-trophy",
      date: "June 2025",
      title: "Two Bronze Badges — Stack Overflow",
      description: "Earned two Bronze Badges on Stack Overflow for exceptional coding contributions and problem-solving skills."
    },
    {
      id: "ach2",
      icon: "fas fa-code",
      date: "July 2024",
      title: "100+ Problems on CodeTantra",
      description: "Solved over 100 coding problems on the CodeTantra platform using Python, demonstrating strong algorithmic thinking."
    },
    {
      id: "ach3",
      icon: "fas fa-project-diagram",
      date: "Mar 2025",
      title: "Browser History Manager (C++)",
      description: "Built a stack-based browser history manager in C++ with back navigation and memory-efficient design using OOP."
    },
    {
      id: "ach4",
      icon: "fas fa-microchip",
      date: "Jan 2025",
      title: "Energy-Efficient CPU Scheduler (C)",
      description: "Designed a CPU scheduling algorithm in C that reduced idle time by 20% and optimized throughput for multi-process simulation."
    }
  ],

  patents: [
    // Example (will be shown as placeholder until admin adds real data)
    // {
    //   id: "pat1",
    //   title: "Patent Title",
    //   number: "IN/2025/001234",
    //   date: "2025",
    //   status: "Filed",
    //   description: "Brief description of the patent."
    // }
  ],

  research: [
    // Example
    // {
    //   id: "res1",
    //   title: "Research Paper Title",
    //   journal: "IEEE Conference 2025",
    //   date: "2025",
    //   doi: "10.1234/example",
    //   abstract: "Abstract of the paper.",
    //   link: ""
    // }
  ],

  certifications: [
    {
      id: "cert1",
      title: "Web Design Using HTML CSS",
      issuer: "Mind Luster",
      date: "Feb 2024",
      badge: "WEB",
      image: "./images/cert_certificate.jpg",
      link: ""
    },
    {
      id: "cert8",
      title: "C++ Programming: OOPs and DSA",
      issuer: "CSE Pathshala",
      date: "Aug 2025",
      badge: "C++",
      image: "./images/cert_cse_phatshala.jpg",
      link: ""
    },
    {
      id: "cert2",
      title: "Build Generative AI Apps & Solutions with No-Code Tools",
      issuer: "Udemy",
      date: "Aug 2025",
      badge: "AI",
      image: "",
      link: ""
    },
    {
      id: "cert3",
      title: "Computational Theory, Language Principle & Finite Automata",
      issuer: "Infosys",
      date: "Aug 2025",
      badge: "CS",
      image: "",
      link: ""
    },
    {
      id: "cert4",
      title: "Fundamentals of Network Communication",
      issuer: "Coursera",
      date: "Sep 2024",
      badge: "NET",
      image: "",
      link: ""
    },
    {
      id: "cert5",
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Coursera (Google)",
      date: "Sep 2024",
      badge: "NET",
      image: "",
      link: ""
    },
    {
      id: "cert6",
      title: "Packet Switching Networks and Algorithms",
      issuer: "Coursera",
      date: "Sep 2024",
      badge: "NET",
      image: "",
      link: ""
    },
    {
      id: "cert7",
      title: "TCP/IP and Advanced Topics",
      issuer: "Coursera",
      date: "Sep 2024",
      badge: "NET",
      image: "",
      link: ""
    },
    {
      id: "cert9",
      title: "Java Programming Certificate",
      issuer: "Neocolab",
      date: "2024",
      badge: "JAVA",
      image: "",
      link: ""
    }
  ],

  admin: {
    username: "admin",
    password: "admin123"
  }
};

/* ─── Storage helpers ─── */

function getPortfolioData(key) {
  try {
    const raw = localStorage.getItem("portfolio_" + key);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(PORTFOLIO_DEFAULTS[key]));
}

function setPortfolioData(key, value) {
  try {
    localStorage.setItem("portfolio_" + key, JSON.stringify(value));
  } catch (e) { console.error("localStorage write failed:", e); }
}

function resetAllPortfolioData() {
  const keys = Object.keys(PORTFOLIO_DEFAULTS);
  keys.forEach(k => localStorage.removeItem("portfolio_" + k));
}

/* ─── ID generator ─── */
function genId() {
  return Math.random().toString(36).slice(2, 9);
}
