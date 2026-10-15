/* ===== EDIT YOUR CONTENT HERE =====
   Shared by every page (home, projects gallery, resume). */
const SITE={
  email:"aadeshmukh236@gmail.com",
  github:"https://github.com/aadesh2036",
  linkedin:"https://www.linkedin.com/in/aadesh-deshmukh-988a01330",
  /* path to your resume PDF, e.g. "assets/resume.pdf" — shows the Download button when set */
  resumePdf:"",
  /* path to your real photo, e.g. "assets/profile.jpg" — replaces the placeholder on the resume page */
  profilePhoto:"assets/profile.webp"
};

/* Projects
   featured: shown on the home page (keep it to 2; the third slot is the "more..." card)
   img:  cover image (source in tools/covers.html; re-render with tools/render-covers.sh)
   href: link to the code ("" hides the Code button)
   demo: YouTube video id for the demo ("" hides the Demo button) */
const PROJECTS=[
  {title:"Between Sessions", tag:"Non-stigmatizing ERP companion · WeMakeDevs 28/30", featured:true,
   desc:"A serverless care-continuity platform for OCD therapy: patients log distress and exposure practice between sessions, clinicians get objective visibility. 13 Lambda functions behind API Gateway on a single-table DynamoDB, consent-based access with AWS Cedar, and a RAG clinician summary with a deterministic fallback. 83/83 end-to-end checks passing.",
   stack:["React","Node.js","AWS Lambda","DynamoDB","AWS SAM","AWS Cedar","RAG"], img:"assets/covers/between-sessions.webp",
   href:"https://github.com/aadesh2036/Between_Sessions", demo:"yc_2QcDiXBk"},
  {title:"AquaAgent", tag:"Hidden-leak detection for water networks · physics + ML", featured:true,
   desc:"Finds hidden leaks in a pressurised water network watched by only 3 pressure and 2 flow sensors. A WNTR simulation generates the data, a model trained on SageMaker reconstructs the network's hidden state, residuals detect and localise the leak, and a Bedrock agent explains the evidence without inventing numbers.",
   stack:["WNTR","SageMaker","Bedrock","FastAPI","React"], img:"assets/covers/aquaagent.webp",
   href:"https://github.com/aadesh2036/AquaAgent", demo:"NgjBXg3FOok"},
  {title:"IRIS", tag:"UAV road defect detection · research",
   desc:"Intelligent Road Inspection System: a 4-person team pipeline that fuses a 51K-image, 5-class Indian road-damage dataset for a YOLOv11s detector, a 9-technique preprocessing ablation, and a cost module (IRC severity grading + knapsack) that ranks repairs, with MiDaS depth for volume estimates.",
   stack:["PyTorch","YOLOv11","OpenCV","MiDaS"], img:"assets/covers/iris.webp", href:"", demo:""},
  {title:"KrishiFlow", tag:"AI logistics for farmers · hackathon project",
   desc:"Capacitated vehicle routing with a cheapest-insertion heuristic, LSTM and LightGBM price prediction, and a trilingual React interface. Built at the Smart Kopargaon Hackathon 2026.",
   stack:["React","LSTM","LightGBM","Routing"], img:"assets/covers/krishiflow.webp", href:"", demo:""},
  {title:"AgriPhenotyper", tag:"Plant disease detection · patent published",
   desc:"An integrated, lightweight AI system for field crop phenotyping: image segmentation that quantifies plant-disease severity at scale, with trend monitoring across multi-field datasets. Presented at Kisan AgriShow; patent published.",
   stack:["Segmentation","CNN + Transformer","SLIC"], img:"assets/covers/agriphenotyper.webp", href:"", demo:""},
  {title:"ArogyaScript", tag:"Prescription intelligence · hackathon",
   desc:"An end-to-end pipeline (YOLOv8 + OCR) that extracts structured records from unstructured prescription images, feeding a risk-scoring engine and an analytics dashboard for non-technical stakeholders.",
   stack:["YOLOv8","OCR","Risk scoring"], img:"assets/covers/arogyascript.webp", href:"", demo:""},
  {title:"SafeRx", tag:"Prescription verification · OpenAI x NxtWave Buildathon",
   desc:"A rule-based anomaly-detection system that uses a Unified Prescription ID (UPID) to flag prescription-misuse patterns in structured data.",
   stack:["Anomaly detection","Rules engine","UPID"], img:"assets/covers/saferx.webp", href:"", demo:""}
];
