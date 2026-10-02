export interface Project {
  id: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string;
  longDescription: string;
  features: string[];
  keyHighlights: string[];
  image: string;
  imageAlt: string;
  category: 'Machine Learning' | 'AI / NLP' | 'Data Analytics' | 'Web Development';
  year?: string;
  date?: string;
  order?: number;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  honors?: string;
  status: 'In Progress' | 'Completed';
  location: string;
  description: string;
  coursework: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: 'Familiar' | 'Intermediate' | 'Working Knowledge';
    category: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  organizationType: string;
  badge: string;
  period: string;
  description: string;
  responsibilities: string[];
  skillsUsed: string[];
  isInternship?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialBadge: string;
  skills: string[];
  description: string;
  imageFileName: string;
  accentColor: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  tools: string[];
  deliverables: string[];
}

export const portfolioData = {
  personal: {
    name: "KABIL B",
    title: "AI/ML Engineer",
    subtitle: "AI/ML Engineer | M.Sc. Data Science | Machine Learning & GenAI | Python Developer",
    location: "Tiruchirappalli, Tamil Nadu, India",
    email: "kabil19112004c@gmail.com",
    phone: "+91 8807710529",
    github: "https://github.com/kabil19112004",
    linkedin: "https://www.linkedin.com/in/kabil-b-b0452a2a5",
    portfolioUrl: "https://portfolio-4zup.vercel.app",
    avatarUrl: "/src/assets/images/candidate_profile_1790954001522.jpg",
    heroDescription:
      "Aspiring AI/ML Engineer pursuing an M.Sc. in Data Science, with hands-on experience building machine learning models and AI-powered applications using Python, SQL, Pandas, NumPy, and Scikit-learn. Skilled in data preprocessing, feature engineering, model evaluation, and NLP-based chatbot development.",
    aboutDescription:
      "Aspiring AI/ML Engineer pursuing an M.Sc. in Data Science, with hands-on experience building machine learning models and AI-powered applications using Python, SQL, Pandas, NumPy, and Scikit-learn. Skilled in data preprocessing, feature engineering, model evaluation, and NLP-based chatbot development. Practical exposure through an AI/ML internship at FrontierWox Tech and academic projects spanning prediction, classification, and generative AI. Strong analytical mindset and quick learner focused on applying AI and automation to solve real-world problems.",
    quickInfo: [
      { label: "Education", value: "M.Sc. Data Science", detail: "Bishop Heber (Top 10 in class)" },
      { label: "Location", value: "Tiruchirappalli, India", detail: "Tamil Nadu" },
      { label: "Internship", value: "AI & ML Intern", detail: "FrontierWox Tech Pvt Ltd" },
      { label: "Core Focus", value: "AI/ML, LLMs & RAG", detail: "Predictive Models & AI Chatbots" },
      { label: "Programming", value: "Python, R & SQL", detail: "Clean Data & Backend Pipelines" },
      { label: "Databases", value: "MongoDB Atlas & MySQL", detail: "Cloud & Relational Stores" },
    ],
    roles: [
      "AI/ML Engineer",
      "GenAI & RAG Specialist",
      "Machine Learning Engineer",
      "Python Developer",
      "Data Science Student",
    ],
  },

  stats: [
    {
      label: "AI/ML Internship",
      value: "FrontierWox",
      subtext: "Tech Private Limited (2026)",
    },
    {
      label: "Academic CGPA",
      value: "8.28",
      subtext: "Top 10 in class • M.Sc. Data Science",
    },
    {
      label: "Projects Completed",
      value: "4+",
      subtext: "ML, RAG/LLM, Flask & Cloud DB",
    },
    {
      label: "Verified Credentials",
      value: "15+",
      subtext: "G-TEC, LinkedIn Learning & more",
    },
  ],

  education: [
    {
      id: "msc-ds",
      degree: "Master of Science, Data Science",
      institution: "Bishop Heber College",
      period: "June 2025 – Present",
      cgpa: "8.28 (Pursuing)",
      honors: "Top 10 in class",
      status: "In Progress",
      location: "Tiruchirappalli, Tamil Nadu, India",
      description:
        "Pursuing Master of Science in Data Science with advanced knowledge in machine learning, deep learning, statistical modeling, database systems, and generative AI.",
      coursework: [
        "Advanced Machine Learning & Deep Learning",
        "Python & R for Data Science",
        "Data Preprocessing & Feature Engineering",
        "Statistical Modeling & Evaluation Metrics",
        "Generative AI & Large Language Models (LLMs)",
        "Relational (MySQL) & NoSQL (MongoDB Atlas)",
      ],
    },
    {
      id: "bca",
      degree: "Bachelor of Computer Applications (Web Development)",
      institution: "Srimad Andavan Arts & Science College",
      period: "June 2022 – May 2025",
      cgpa: "7.76",
      status: "Completed",
      location: "Tiruchirappalli, Tamil Nadu, India",
      description:
        "Completed Bachelor of Computer Applications with specialization in Web Development, programming fundamentals, databases, and software engineering.",
      coursework: [
        "Web Technologies (HTML5, CSS3, JavaScript)",
        "Python Programming & Data Structures",
        "Database Management Systems & SQL",
        "Software Engineering & Architecture",
        "Object-Oriented Programming (OOP)",
      ],
    },
  ] as EducationItem[],

  skillCategories: [
    {
      title: "Programming & Query Languages",
      icon: "Code",
      description: "Core scripting and database query languages",
      skills: [
        { name: "Python", level: "Intermediate", category: "Programming" },
        { name: "SQL", level: "Intermediate", category: "Programming" },
        { name: "R", level: "Working Knowledge", category: "Programming" },
        { name: "JavaScript", level: "Intermediate", category: "Programming" },
      ],
    },
    {
      title: "ML & Data Libraries",
      icon: "Layers",
      description: "Data processing, scientific computing & visualization tools",
      skills: [
        { name: "Pandas", level: "Intermediate", category: "ML Libraries" },
        { name: "NumPy", level: "Intermediate", category: "ML Libraries" },
        { name: "Scikit-learn", level: "Intermediate", category: "ML Libraries" },
        { name: "Matplotlib", level: "Intermediate", category: "ML Libraries" },
      ],
    },
    {
      title: "Machine Learning & Deep Learning",
      icon: "BrainCircuit",
      description: "Predictive pipelines, feature engineering, and neural network frameworks",
      skills: [
        { name: "Model Training & Evaluation", level: "Intermediate", category: "ML & DL" },
        { name: "Feature Engineering", level: "Intermediate", category: "ML & DL" },
        { name: "Data Preprocessing", level: "Intermediate", category: "ML & DL" },
        { name: "Classification & Prediction", level: "Intermediate", category: "ML & DL" },
        { name: "TensorFlow", level: "Working Knowledge", category: "ML & DL" },
        { name: "PyTorch", level: "Familiar", category: "ML & DL" },
        { name: "Neural Networks", level: "Working Knowledge", category: "ML & DL" },
      ],
    },
    {
      title: "Generative AI & NLP",
      icon: "Sparkles",
      description: "Modern language models, context augmentation, and conversational AI",
      skills: [
        { name: "Large Language Models (LLMs)", level: "Working Knowledge", category: "GenAI & NLP" },
        { name: "Retrieval-Augmented Generation (RAG)", level: "Working Knowledge", category: "GenAI & NLP" },
        { name: "AI Chatbots Development", level: "Intermediate", category: "GenAI & NLP" },
        { name: "Natural Language Processing (NLP)", level: "Intermediate", category: "GenAI & NLP" },
      ],
    },
    {
      title: "Data Analysis & Visualization",
      icon: "BarChart3",
      description: "Statistical analysis, business intelligence, and storytelling dashboards",
      skills: [
        { name: "Data Analysis", level: "Intermediate", category: "Analysis & BI" },
        { name: "Data Visualization", level: "Intermediate", category: "Analysis & BI" },
        { name: "Statistics", level: "Intermediate", category: "Analysis & BI" },
        { name: "Power BI", level: "Working Knowledge", category: "Analysis & BI" },
        { name: "Tableau", level: "Working Knowledge", category: "Analysis & BI" },
      ],
    },
    {
      title: "Web, Backend & Databases",
      icon: "Database",
      description: "Server-side routing APIs, frontend markup, and persistence stores",
      skills: [
        { name: "Flask", level: "Intermediate", category: "Web & DB" },
        { name: "MongoDB (MongoDB Atlas)", level: "Intermediate", category: "Web & DB" },
        { name: "MySQL", level: "Intermediate", category: "Web & DB" },
        { name: "HTML5 & CSS3", level: "Intermediate", category: "Web & DB" },
        { name: "Bootstrap", level: "Working Knowledge", category: "Web & DB" },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: "Cpu",
      description: "Development workflows, version control, and prototyping environments",
      skills: [
        { name: "VS Code", level: "Intermediate", category: "Tools" },
        { name: "Git / GitHub", level: "Intermediate", category: "Tools" },
        { name: "Jupyter Notebook", level: "Intermediate", category: "Tools" },
        { name: "Figma", level: "Working Knowledge", category: "Tools" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "intern-performance-prediction",
      title: "Intern Performance Prediction System",
      subtitle: "Python, Flask, Machine Learning, MongoDB Atlas",
      technologies: ["Python", "Flask", "Machine Learning", "MongoDB Atlas", "Scikit-learn", "Pandas", "Bootstrap"],
      category: "Machine Learning",
      year: "May 2026 – June 2026",
      date: "2026-06",
      order: 4,
      description:
        "Developed a machine learning–based web application to automate intern performance evaluation, replacing a manual, mentor-driven scoring process.",
      longDescription:
        "An end-to-end predictive modeling web application designed to automate intern performance evaluation. Features attendance, project milestones, and task-completion data ingestion, followed by feature engineering and classification model training. Backed by a responsive UI (HTML, CSS, JS, Bootstrap), a Flask REST API, and MongoDB Atlas cloud database.",
      features: [
        "Developed a machine learning–based web application to automate intern performance evaluation, replacing a manual, mentor-driven scoring process",
        "Engineered features from attendance, project work, and task-completion data, then trained a classification model to predict overall performance scores",
        "Designed and built a responsive frontend with HTML, CSS, JavaScript, and Bootstrap, backed by a Flask API and MongoDB Atlas cloud database",
        "Delivered a tool that enables organizations to monitor intern productivity and flag support needs earlier and more consistently",
      ],
      keyHighlights: [
        "Eliminated subjective manual grading bottlenecks through reproducible ML scoring",
        "Full-stack cloud deployment using Flask backend and MongoDB Atlas cluster",
        "Predictive risk alerts identifying interns needing early academic intervention",
      ],
      image: "intern performance.png",
      imageAlt: "Intern Performance Prediction System Interface",
      metrics: [
        { label: "Timeline", value: "May – June 2026" },
        { label: "Cloud DB", value: "MongoDB Atlas" },
        { label: "Impact", value: "Early Flagging & Automation" },
      ],
    },
    {
      id: "student-assistant-chatbot",
      title: "Student Assistant Chatbot",
      subtitle: "Python, NLP, LLMs, RAG",
      technologies: ["Python", "NLP", "Large Language Models (LLMs)", "RAG", "Generative AI", "Flask"],
      category: "AI / NLP",
      year: "July 2026 – Sep 2026",
      date: "2026-09",
      order: 3,
      description:
        "Built an AI chatbot using Generative AI and Large Language Models to answer academic questions and explain concepts in simplified language.",
      longDescription:
        "Built during an AI & ML Internship at FrontierWox Tech Private Limited, this intelligent conversational chatbot uses Python, Natural Language Processing, and LLM-based techniques to help college students revise and comprehend study materials. Employs PDF-based content extraction, summarization, and Retrieval-Augmented Generation (RAG) to deliver personalized, context-aware answers.",
      features: [
        "Built an AI chatbot using Generative AI and Large Language Models to answer academic questions and explain concepts in simplified language",
        "Enabled students to extract key points and summaries from study materials through PDF content processing",
        "Applied Retrieval-Augmented Generation (RAG) to deliver personalized, context-aware responses grounded in verified course materials",
        "Supported assignment help, doubt clarification, and interactive study conversations to improve learning efficiency",
      ],
      keyHighlights: [
        "Engineered and improved during industry AI/ML internship at FrontierWox Tech",
        "Integrated PDF extraction pipeline for instant curriculum summarization",
        "End-to-end testing, bug fixing, and response accuracy optimization",
      ],
      image: "student assistant chatbot",
      imageAlt: "Student Assistant Chatbot Interface",
      metrics: [
        { label: "Architecture", value: "RAG + Generative AI" },
        { label: "Experience", value: "FrontierWox Tech Internship" },
        { label: "Function", value: "Doubt & Exam Clarification" },
      ],
    },
    {
      id: "ecommerce-sales-analytics",
      title: "E-Commerce Sales & Customer Analytics Dashboard",
      subtitle: "Python, SQL, Excel, Power BI, Pandas, DAX",
      technologies: ["Python", "SQL", "Excel", "Power BI", "Pandas", "DAX"],
      category: "Data Analytics",
      year: "2026",
      date: "2026-08",
      order: 1,
      description:
        "Analyzed e-commerce sales and customer data to identify sales trends, top products, customer behavior, and profitability. Created an interactive dashboard to present key business insights.",
      longDescription:
        "An end-to-end data analytics and business intelligence solution analyzing transactional e-commerce sales and customer purchase patterns. Automated ETL extraction and data wrangling with Python and Pandas, structured normalized relational SQL views, and developed an interactive Power BI dashboard featuring dynamic DAX calculations for revenue trends, product margins, customer segmentation, and churn forecasting.",
      features: [
        "Analyzed e-commerce sales and customer data to identify sales trends, top products, customer behavior, and profitability",
        "Created an interactive Power BI dashboard to present key business insights with dynamic slicing by region, category, and date",
        "Engineered custom DAX measures for Year-over-Year (YoY) revenue, customer lifetime value (CLV), and profit margin percentages",
        "Extracted and processed large-scale transactional datasets using Python (Pandas) and SQL query aggregations",
      ],
      keyHighlights: [
        "Interactive Power BI dashboard with dynamic DAX KPI metric cards",
        "Actionable customer segmentation and repeat purchase behavior insights",
        "Optimized SQL queries and automated Pandas ETL cleaning pipelines",
      ],
      image: "ecommerce sales analytics",
      imageAlt: "E-Commerce Sales & Customer Analytics Dashboard Interface",
      metrics: [
        { label: "BI Platform", value: "Power BI & DAX" },
        { label: "Data Pipeline", value: "Python + Pandas + SQL" },
        { label: "Core Impact", value: "Profitability & Trend Analysis" },
      ],
    },
  ] as Project[],

  experience: [
    {
      id: "ai-ml-intern",
      role: "AI & ML Intern",
      company: "FrontierWox Tech Private Limited",
      organizationType: "Industry Internship",
      badge: "Industry Experience",
      period: "July 2026 – September 2026",
      isInternship: true,
      description:
        "Built and improved a Student Assistant Chatbot using Python, NLP, and LLM-based techniques to help students revise and understand study materials.",
      responsibilities: [
        "Built and improved a Student Assistant Chatbot using Python, NLP, and LLM-based techniques to help students revise and understand study materials.",
        "Implemented PDF-based content extraction and summarization to generate simplified explanations and study-focused summaries from learning materials.",
        "Applied Generative AI and Retrieval-Augmented Generation (RAG) concepts to deliver personalized, context-aware responses to student queries.",
        "Tested chatbot functionality end-to-end, fixing bugs and improving response accuracy, gaining practical experience in AI/ML model integration and backend development.",
      ],
      skillsUsed: ["Python", "NLP", "LLMs", "RAG", "Generative AI", "Flask", "PDF Extraction", "Prompt Engineering"],
    },
    {
      id: "ml-research",
      role: "Machine Learning & Prediction Systems",
      company: "Academic & Research Projects",
      organizationType: "Research & Academic Projects",
      badge: "Academic Projects",
      period: "May 2026 – June 2026",
      isInternship: false,
      description:
        "Developed machine learning models for classification, prediction, feature engineering, and evaluation using Python and Scikit-learn.",
      responsibilities: [
        "Engineered predictive features from attendance, project deliverables, and task completion data for the Intern Performance Prediction System.",
        "Conducted end-to-end model training, data preprocessing, hyperparameter tuning, and cross-validation.",
        "Evaluated classification pipelines using precision, recall, F1-scores, and confusion matrices.",
        "Integrated model inference with Flask microservices and connected cloud persistence to MongoDB Atlas.",
      ],
      skillsUsed: ["Scikit-learn", "Python", "Pandas", "NumPy", "MongoDB Atlas", "Model Evaluation"],
    },
  ] as ExperienceItem[],

  certifications: [
    {
      id: "python-gtech",
      title: "Python Programming",
      issuer: "G-TEC Computer Education",
      year: "Certified",
      credentialBadge: "Institutional Certificate",
      skills: ["Python", "Data Structures", "OOP", "File Handling", "Algorithm Design"],
      description:
        "Official certification from G-TEC Computer Education verifying proficiency in core Python programming, data structures, object-oriented concepts, and practical software design.",
      imageFileName: "python certificate.jpeg",
      accentColor: "#eab308",
    },
    {
      id: "ml-linkedin",
      title: "Machine Learning",
      issuer: "LinkedIn Learning",
      year: "Certified",
      credentialBadge: "Verified Credential",
      skills: ["Machine Learning", "Supervised Learning", "Classification", "Model Evaluation"],
      description:
        "Comprehensive training in core Machine Learning principles, algorithms (Decision Trees, Regression, Clustering), and practical implementation workflows in Python.",
      imageFileName: "Machine learning.jpeg",
      accentColor: "#0284c7",
    },
    {
      id: "sql-linkedin",
      title: "SQL & Database",
      issuer: "LinkedIn Learning",
      year: "Certified",
      credentialBadge: "Verified Credential",
      skills: ["MySQL", "SQL Queries", "Joins", "Data Aggregation", "Database Normalization"],
      description:
        "Mastery in relational database querying, schema design, complex joins, subqueries, grouping aggregations, and performance-efficient data extraction.",
      imageFileName: "MY Sql.jpeg",
      accentColor: "#06b6d4",
    },
    {
      id: "ds-linkedin",
      title: "Data Science",
      issuer: "LinkedIn Learning",
      year: "Certified",
      credentialBadge: "Verified Credential",
      skills: ["Data Science", "Pandas", "NumPy", "Statistical Analysis", "Data Wrangling"],
      description:
        "Professional certification covering the end-to-end data science lifecycle, exploratory data analysis, statistical hypotheses testing, and data cleaning.",
      imageFileName: "Data science.jpeg",
      accentColor: "#8b5cf6",
    },
    {
      id: "tableau-linkedin",
      title: "Tableau & Data Analysis",
      issuer: "LinkedIn Learning",
      year: "Certified",
      credentialBadge: "Verified Credential",
      skills: ["Tableau", "Data Visualization", "Dashboards", "Business Intelligence", "Insights"],
      description:
        "Hands-on data visualization and business intelligence training for designing interactive dashboards, charts, calculated fields, and storytelling with data.",
      imageFileName: "Tableau & Data Analysis.jpeg",
      accentColor: "#ec4899",
    },
    {
      id: "ai-dev-linkedin",
      title: "AI Developer",
      issuer: "LinkedIn Learning",
      year: "Certified",
      credentialBadge: "Verified Credential",
      skills: ["Artificial Intelligence", "Deep Learning Concepts", "Neural Networks", "Modern AI"],
      description:
        "Specialized accreditation exploring modern AI development paradigms, neural network foundations, cognitive computing architectures, and practical AI applications.",
      imageFileName: "AI and Developer.jpeg",
      accentColor: "#10b981",
    },
  ] as CertificateItem[],

  services: [
    {
      id: "ai-ml-engineering",
      title: "AI & Machine Learning Engineering",
      icon: "Cpu",
      tagline: "Predictive pipelines, model evaluation & RAG systems",
      description:
        "Build, evaluate, and deploy end-to-end machine learning and generative AI applications using Python, Scikit-learn, LLMs, and RAG architectures.",
      tools: ["Python", "Scikit-learn", "LLMs", "RAG", "TensorFlow", "Pandas", "NumPy"],
      deliverables: [
        "Supervised classification & regression model training",
        "Feature engineering & data preprocessing pipelines",
        "Context-aware AI chatbots with RAG and PDF content extraction",
        "Rigorous performance evaluation (Precision, Recall, F1-Score, ROC-AUC)",
      ],
    },
    {
      id: "data-analysis",
      title: "Data Analysis & Visualization",
      icon: "BarChart3",
      tagline: "Uncovering actionable patterns & quantitative insights",
      description:
        "Analyze datasets and generate useful insights using Python, Pandas, NumPy, Power BI, Tableau, and statistical methods.",
      tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Power BI", "Tableau", "SQL"],
      deliverables: [
        "Exploratory Data Analysis (EDA) reports",
        "Data cleaning, missing value imputation & outlier detection",
        "Interactive business intelligence dashboards (Power BI & Tableau)",
        "Actionable decision-making metrics",
      ],
    },
    {
      id: "backend-api-dev",
      title: "Backend & Web Development",
      icon: "CodeXml",
      tagline: "Lightweight APIs & responsive full-stack interfaces",
      description:
        "Build responsive web applications and backend APIs using Flask, Python, HTML5, CSS3, JavaScript, and Bootstrap.",
      tools: ["Flask", "Python", "REST APIs", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      deliverables: [
        "RESTful API endpoints bridging web clients with ML models",
        "Responsive, mobile-friendly user interfaces",
        "Modular MVC application structures",
        "Cross-browser tested web layouts with semantic markup",
      ],
    },
    {
      id: "database-development",
      title: "Database Engineering & Cloud DB",
      icon: "DatabaseZap",
      tagline: "Relational SQL & MongoDB Atlas cloud stores",
      description:
        "Work with MySQL and MongoDB (MongoDB Atlas) for structured application data storage, querying, and cloud management.",
      tools: ["MySQL", "MongoDB (MongoDB Atlas)", "SQL Queries", "Compass", "Schema Design"],
      deliverables: [
        "Relational table design & normalization (1NF, 2NF, 3NF)",
        "MongoDB Atlas cloud cluster deployment & collection design",
        "Optimized queries, complex joins, and aggregations",
        "Data integrity constraints and index optimization",
      ],
    },
  ] as ServiceItem[],

  resume: {
    downloadFileName: "Kabil_B_Resume.pdf",
    fullName: "KABIL B",
    roleTitle: "AI/ML Engineer",
    contactInfo: {
      email: "kabil19112004c@gmail.com",
      phone: "+91 8807710529",
      location: "Tiruchirappalli, India",
      linkedin: "linkedin.com/in/kabil-b-b0452a2a5",
      github: "github.com/kabil19112004",
      portfolio: "portfolio-4zup.vercel.app",
    },
    summary:
      "Aspiring AI/ML Engineer pursuing an M.Sc. in Data Science, with hands-on experience building machine learning models and AI-powered applications using Python, SQL, Pandas, NumPy, and Scikit-learn. Skilled in data preprocessing, feature engineering, model evaluation, and NLP-based chatbot development. Practical exposure through an AI/ML internship and academic projects spanning prediction, classification, and generative AI. Strong analytical mindset and quick learner focused on applying AI and automation to solve real-world problems.",
    skills: [
      {
        category: "Programming & Query Languages",
        items: "Python, R, SQL",
      },
      {
        category: "ML & Data Libraries",
        items: "Pandas, NumPy, Matplotlib, Scikit-learn",
      },
      {
        category: "Machine Learning & Deep Learning",
        items: "Model Training, Feature Engineering, Data Preprocessing, Model Evaluation, Classification, Prediction, TensorFlow, PyTorch, Neural Networks",
      },
      {
        category: "Generative AI & NLP",
        items: "Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Chatbots, NLP",
      },
      {
        category: "Data Analysis & Visualization",
        items: "Data Analysis, Data Visualization, Statistics, Power BI",
      },
      {
        category: "Web, Backend & Databases",
        items: "Flask, HTML, CSS, MySQL, MongoDB (MongoDB Atlas)",
      },
      {
        category: "Tools & Platforms",
        items: "VS Code, Git/GitHub, Jupyter Notebook, Figma",
      },
    ],
    experience: [
      {
        role: "AI & ML Intern",
        company: "FrontierWox Tech Private Limited",
        period: "July 2026 – September 2026",
        bullets: [
          "Built and improved a Student Assistant Chatbot using Python, NLP, and LLM-based techniques to help students revise and understand study materials.",
          "Implemented PDF-based content extraction and summarization to generate simplified explanations and study-focused summaries from learning materials.",
          "Applied Generative AI and Retrieval-Augmented Generation (RAG) concepts to deliver personalized, context-aware responses to student queries.",
          "Tested chatbot functionality end-to-end, fixing bugs and improving response accuracy, gaining practical experience in AI/ML model integration and backend development.",
        ],
      },
    ],
    projects: [
      {
        title: "Intern Performance Prediction System",
        stack: "Python, Flask, Machine Learning, MongoDB Atlas",
        period: "May 2026 – June 2026",
        bullets: [
          "Developed a machine learning–based web application to automate intern performance evaluation, replacing a manual, mentor-driven scoring process.",
          "Engineered features from attendance, project work, and task-completion data, then trained a classification model to predict overall performance scores.",
          "Designed and built a responsive frontend with HTML, CSS, JavaScript, and Bootstrap, backed by a Flask API and MongoDB Atlas cloud database.",
          "Delivered a tool that enables organizations to monitor intern productivity and flag support needs earlier and more consistently.",
        ],
      },
      {
        title: "Student Assistant Chatbot",
        stack: "Python, NLP, LLMs, RAG",
        period: "2026",
        bullets: [
          "Built an AI chatbot using Generative AI and Large Language Models to answer academic questions and explain concepts in simplified language.",
          "Enabled students to extract key points and summaries from study materials through PDF content processing.",
          "Supported assignment help, doubt clarification, and interactive study conversations to improve learning efficiency.",
        ],
      },
      {
        title: "E-Commerce Sales & Customer Analytics Dashboard",
        stack: "Python, SQL, Excel, Power BI, Pandas, DAX",
        period: "2026",
        bullets: [
          "Analyzed e-commerce sales and customer data to identify sales trends, top products, customer behavior, and profitability.",
          "Created an interactive dashboard to present key business insights.",
          "Engineered custom DAX measures and SQL analytical queries for revenue and retention evaluation.",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Science, Data Science",
        college: "Bishop Heber College, Tiruchirappalli",
        period: "June 2025 – Present",
        score: "CGPA: 8.28 (Pursuing) — Top 10 in class",
      },
      {
        degree: "Bachelor of Computer Applications (Web Development)",
        college: "Srimad Andavan Arts & Science College, Tiruchirappalli",
        period: "June 2022 – May 2025",
        score: "CGPA: 7.76",
      },
    ],
    certifications: [
      "Python Programming — G-TEC Computer Education",
      "Machine Learning — LinkedIn Learning",
      "SQL & Database — LinkedIn Learning",
      "Data Science — LinkedIn Learning",
      "Tableau & Data Analysis — LinkedIn Learning",
      "AI Developer — LinkedIn Learning",
    ],
  },
};
