// lib/projects.ts
export type Cat = "All" | "Web App" | "AI / ML" | "Data Analytics";

export interface Feature {
    title: string;
    desc: string;
}

export interface Result {
    metric: string;
    baseline: number;
    best: number;
    experiment: string;
}

export interface ProjectLinks {
    demo: string | null;
    github: string | null;
    paper: string | null;
}

export interface Project {
    id: string;
    featured: boolean;
    title: string;
    subtitle: string;
    desc: string;
    category: Cat;
    tags: string[];
    year: string;
    views: string;
    image: string | string[];
    longDesc?: string;
    problem?: string;
    features?: Feature[];
    techStack?: string[];
    results?: Result[];
    architecture?: string;
    challenges?: string[];
    links?: ProjectLinks;
}

export const projects: Project[] = [
    {
        id: "08",
        featured: true,
        title: "DermaDiff: Improving Skin Lesion Classification of Rare Classes via Targeted Synthetic Augmentation with Latent Diffusion and Vision Foundation Models",
        subtitle: "AI Skin Analysis",
        desc: "AI-powered skin condition analysis tool leveraging diffusion models for dermatological assessment and diagnosis support.",
        category: "AI / ML",
        tags: ["Stable Diffusion Model", "Vision Foundation Model", "PanDerm", "PyTorch", "Computer Vision", "LoRA", "DoRA"],
        year: "2026",
        views: "0",
        image: ["/dermadiff-1.png", "/dermadiff-6.png", "/dermadiff-2.png", "/dermadiff-5.png", "/dermadiff-4.png", "/dermadiff-3.png"],
        longDesc: "Automated skin lesion classification from dermoscopic images suffers from severe class imbalance, in which diagnostically critical minority classes such as melanoma, a malignant skin cancer for which early detection is essential to patient survival, and dermatofibroma are substantially underrepresented relative to common conditions such as melanocytic nevi.We present DermaDiff, a targeted synthetic augmentation framework that compares four latent diffusion model configurations across three architectures(Stable Diffusion 2.1, Stable Diffusion XL, and Stable Diffusion 3.5 Large) and two parameter-efficient adaptation methods(LoRA and DoRA) to identify the most effective configuration for generating class- specific dermoscopic images for five minority classes.Generated images are directly combined with real data for training a PanDerm ViT - Large classifier.A five - way comparative study on HAM10000 demonstrates that diffusion - based augmentation consistently improves minority class recall, with Stable Diffusion XL DoRA attaining the highest Macro F1(0.847) and Weighted F1(0.897), and SD 3.5 Large yielding the largest melanoma recall gain(+10.8 percentage points).Under cross - domain evaluation on PAD - UFES - 20 dataset(clinical smartphone photographs), Stable Diffusion XL DoRA emerges as the strongest generalizer(accuracy 0.530).Our analysis reveals that generative quality metrics correlate with classification performance: configurations balancing sufficiently low FID with adequately high perceptual diversity(LPIPS) and structural similarity(MS - SSIM) consistently outperform those excelling in only one metric, confirming that stability across fidelity and diversity is a reliable predictor of classification gains.",
        problem: "Skin lesion datasets suffer from severe class imbalance, rare conditions like dermatofibroma and vascular lesions make up less than 2% of training data, causing classifiers to underperform on these critical minority classes. Misdiagnosis of rare but dangerous conditions like melanoma can have life-threatening consequences.",
        features: [
            {
                title: "LoRA & DoRA Fine-Tuning",
                desc: "Rank-64 LoRA and DoRA adapters trained per minority class on Stable Diffusion 2.1, SDXL, and SD 3.5 Large for targeted and more stable synthetic image generation with improved representation capacity."
            },
            {
                title: "PanDerm Classifier",
                desc: "ViT-Large foundation model fine-tuned on augmented dataset with proportional undersampling and AMP mixed precision training."
            },
            {
                title: "Multi-Model Comparison",
                desc: "Systematic evaluation across five experiments (Baseline, SD 2.1 LoRA, SDXL LoRA, SD 3.5 LoRA, and SDXL DoRA) with comprehensive metrics including Weighted and Macro F1 also Recall."
            },
        ],
        techStack: ["PyTorch", "Stable Diffusion", "HuggingFace", "diffusers", "PEFT/LoRA", "DoRA", "Google Colab", "Modal.com"],
        results: [
            { metric: "Weighted F1", baseline: 0.8785, best: 0.8972, experiment: "SDXL DoRA" },
            { metric: "Macro F1", baseline: 0.8114, best: 0.8482, experiment: "SD 3.5 Large" },
            { metric: "Accuracy", baseline: 0.8756, best: 0.8935, experiment: "SDXL DoRA" },
        ],
        architecture: "/dermadiff-arch-1.png",
        challenges: [
            "Class-specific negative prompts were essential to prevent mode collapse in minority class generation.",
            "Generating more than 1x ratio have not result in better classification, so that using generative ai to create new dataset are not completely handle the imbalanced data",
            "Fine-Tuning Stable Diffusion 3.5 Large with LoRA for around 35.000 dermascopic images require heavy computation",
        ],
        links: {
            demo: "https://dermadiff-website.vercel.app",
            github: "https://github.com/febryannnn/dermadiff",
            paper: "https://dermadiff-website.vercel.app/paper"
        },
    },
    {
        id: "05",
        featured: false,
        title: "Pothole Segmentation using SegFormer-b2 (ARA ITS Data Science)",
        subtitle: "Road Condition Analysis",
        desc: "Deep learning model using SegFormer-b2 for accurate pothole detection and road condition analysis.",
        category: "AI / ML",
        tags: ["Computer Vision", "PyTorch", "TensorFlow"],
        year: "2026",
        views: "2,190",
        image: ["/segformer.png", "/ara-1.png", "/ara.png", "/ara-2.png", "/segformer-2.png"],
        longDesc: "This project presents a deep learning pipeline for automated pothole detection using semantic segmentation with the SegFormer-B2 architecture. The model is trained on a custom road dataset with carefully paired images and masks to ensure data consistency.\n\nTo improve generalization, the pipeline applies extensive data augmentation including flipping, brightness adjustment, and geometric transformations. A hybrid loss function combining Binary Cross Entropy and Dice Loss is used to handle class imbalance and improve detection of small pothole regions.\n\nThe system leverages pretrained transformers for efficient training, applies threshold tuning and test-time augmentation during inference, and includes post-processing to remove noise. Final predictions are encoded in RLE format, making the pipeline suitable for real-world deployment and evaluation.",
        problem: "Road infrastructure damage, particularly potholes, is a significant issue in Indonesia, leading to vehicle damage, increased maintenance costs, and traffic safety risks. Traditional manual inspection methods are time-consuming, labor-intensive, and often inconsistent. This project addresses the need for an automated, scalable, and accurate detection system by leveraging computer vision and deep learning techniques to identify potholes directly from road imagery.",
        features: [
            { title: "SegFormer-b2 Architecture", desc: "Hierarchical transformer encoder with lightweight MLP decoder for efficient semantic segmentation." },
            { title: "Custom Augmentation", desc: "Road-specific augmentation pipeline including perspective transforms, weather simulation, and lighting variation." },
            { title: "Contour Refinement", desc: "Post-processing module that refines segmentation boundaries for accurate pothole area estimation." },
        ],
        techStack: ["PyTorch", "SegFormer", "OpenCV", "Albumentations", "Google Colab"],
        challenges: [
            "Severe class imbalance between pothole and non-pothole pixels required careful loss function design with class weighting.",
            "Varying road surface textures and lighting conditions in Indonesian roads demanded extensive augmentation strategies.",
        ],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "11",
        featured: false,
        title: "myPelindo: One Gate Customer Portal with Retrieval-Augmented Generation (RAG) AI for Integrated Logistics Services (ICON 3.0)",
        subtitle: "AI-Powered Logistics Platform",
        desc: "Unified logistics service portal enhanced with Retrieval-Augmented Generation (RAG) to provide intelligent assistance, automation, and real-time decision support.",
        category: "AI / ML",
        tags: ["RAG", "LLM", "System Integration", "API Gateway", "Cloud"],
        year: "2026",
        views: "0",
        image: ["/pelindo-3.png", "/miro.png", "/rag-1.jpeg", "/rag.jpeg", "/pelindo-0.png", "/pelindo-1.png", "/pelindo-2.png", "/pelindo-4.png"],
        longDesc: "myPelindo RAG is an intelligent One Gate Customer Portal designed to integrate fragmented logistics services across Pelindo subholdings into a unified digital platform. Leveraging Retrieval-Augmented Generation (RAG), the system provides a smart logistics assistant capable of understanding user queries, retrieving relevant operational data, and generating context-aware responses. The platform integrates multiple legacy systems such as Phinnisi, Palapa, Maleo, and Praya through an API Gateway, while utilizing vector databases and LLMs to deliver intelligent recommendations, document guidance, and real-time operational insights.",
        problem: "Post-merger Pelindo systems remain fragmented across multiple portals, billing systems, and operational platforms, leading to inefficient workflows, lack of data integration, and poor customer experience. Additionally, users—especially new exporters—struggle with complex documentation and logistics procedures without intelligent guidance.  [oai_citation:0‡Copy of Proposal ICON 3.0 One Gate Customer Portal.pdf](sediment://file_000000005bc8720ba2cb0ed3755e6e7e)",
        features: [
            {
                title: "RAG-based AI Assistant",
                desc: "Intelligent assistant that retrieves relevant logistics data from vector databases and generates contextual responses using LLMs to guide users through complex workflows."
            },
            {
                title: "API Gateway Integration",
                desc: "Unified integration layer connecting legacy systems (Phinnisi, Palapa, Maleo, Praya) to ensure real-time data synchronization across all services."
            },
            {
                title: "Smart Scheduling Optimization",
                desc: "AI-driven scheduling system that recommends optimal truck booking and port operations based on predictive analytics and real-time data."
            },
            {
                title: "Unified Billing & Monitoring",
                desc: "Centralized dashboard for real-time tracking, billing consolidation, and operational monitoring across all Pelindo services."
            }
        ],
        techStack: [
            "Python",
            "Flask",
            "LangChain (RAG Pipeline)",
            "LLM (Gemini)",
            "ChromaDB (Vector Database)",
            "FAISS (Similarity Search)",
            "HuggingFace Transformers",
            "ONNX Runtime",
            "SQLAlchemy",
            "NLTK",
            "REST API (HTTPX / Requests)"
        ],
        // results: [
        //     { metric: "Workflow Efficiency", improvement: "+30%" },
        //     { metric: "User Task Completion Time", improvement: "-40%" },
        //     { metric: "System Integration Coverage", improvement: "90%+" },
        // ],
        // architecture: "/mypelindo-arch.png",
        challenges: [
            "Integrating heterogeneous legacy systems with different data formats and protocols into a unified API layer.",
            "Designing RAG pipeline to ensure accurate retrieval from multiple operational data sources.",
            "Maintaining low-latency response while querying vector databases and LLM simultaneously.",
            "Ensuring compliance with data security regulations (UU PDP) in a centralized system."
        ],
        links: {
            demo: null,
            github: null,
            paper: null
        }
    },
    {
        id: "12",
        featured: false,
        title: "ISPU Pollutant Forecasting with Chronos-T5-Small Foundation Model (Datavidia)",
        subtitle: "Environmental Intelligence System",
        desc: "AI-powered air quality monitoring and forecasting platform using Chronos foundation model for time series prediction.",
        category: "AI / ML",
        tags: ["Time Series", "Chronos", "Forecasting", "Boosting Model"],
        year: "2026",
        views: "0",
        image: ["/ispu-0.png", "/ispu.png", "/ispu-1.png"],
        longDesc: "ISPU Analytics is a data-driven platform designed to monitor and forecast air quality levels using historical and real-time environmental data. The system processes ISPU indicators such as PM2.5, PM10, CO, NO2, and SO2, and leverages Chronos, a time series foundation model, to generate accurate multi-step forecasts. By utilizing pretrained temporal representations, the model captures complex seasonal patterns and trends, providing more robust predictions compared to traditional statistical or machine learning approaches. The platform also offers interactive visualizations and actionable insights for environmental monitoring and public health awareness.",
        problem: "Air pollution data is often underutilized and difficult for the public to interpret. Traditional forecasting approaches struggle to capture complex temporal dependencies, making it difficult to anticipate hazardous air conditions and respond proactively.",
        features: [
            {
                title: "Chronos-based Forecasting",
                desc: "Utilizes Chronos time series foundation model for accurate multi-step air quality prediction across multiple pollutant indicators."
            },
            {
                title: "Multi-Variable Analysis",
                desc: "Analyzes relationships between multiple pollutants to understand contributing factors to air quality changes."
            },
        ],
        techStack: [
            "Python",
            "Chronos (Time Series Foundation Model)",
            "PyTorch",
            "Pandas",
            "Matplotlib",
            "Jupyter Notebook",
            "Streamlit"
        ],
        // results: [
        //     { metric: "Forecast Horizon", value: "Multi-step (up to 7 days)" },
        //     { metric: "Prediction Stability", value: "Improved vs baseline ML models" },
        //     { metric: "Use Case Impact", value: "Early warning for air pollution spikes" }
        // ],
        // architecture: "/ispu-arch.png",
        challenges: [
            "Adapting Chronos pretrained model to domain-specific environmental data.",
            "Handling missing and noisy sensor data in time series inputs.",
            "Aligning multi-variable pollutant data into consistent temporal windows.",
            "Balancing model accuracy with computational efficiency for real-time forecasting."
        ],
        links: {
            demo: null,
            github: null,
            paper: null
        }
    },
    {
        id: "03",
        featured: false,
        title: "AI Route Optimizer for HFFCVRP Website",
        subtitle: "Optimization System",
        desc: "Web-based route optimization system implementing a Hybrid Firefly–Genetic algorithm for cost-efficient vehicle routing.",
        category: "AI / ML",
        tags: ["Python", "Genetic-Algorithm", "Simulated Annealing", "Tabu-Search"],
        year: "2025",
        views: "1,244",
        image: ["/vrp-2.png", "/vrp-1.png", "/vrp-3.png", "/vrp-4.png", "/ai-2.png", '/ai-1.png'],
        longDesc: "A full-stack web application for solving the Heterogeneous Fixed Fleet Capacitated Vehicle Routing Problem (HFFCVRP) using metaheuristic optimization algorithms. The system compares multiple approaches including Genetic Algorithm, Simulated Annealing, Tabu Search, and a novel Hybrid Firefly–Genetic algorithm to find cost-optimal delivery routes under vehicle capacity constraints.",
        problem: "Logistics companies need to optimize delivery routes across heterogeneous vehicle fleets with varying capacities and costs. Traditional exact methods become computationally intractable for real-world problem sizes.",
        features: [
            { title: "Multi-Algorithm Comparison", desc: "Side-by-side evaluation of GA, SA, Tabu Search, and Hybrid Firefly–GA with convergence visualization." },
            { title: "Interactive Route Map", desc: "Visual route display on interactive map with vehicle assignments, stop sequences, and capacity utilization." },
            { title: "Constraint Handling", desc: "Supports heterogeneous fleet with different vehicle types, capacities, and cost structures." },
        ],
        techStack: ["Python", "Flask", "JavaScript", "Leaflet.js", "NumPy"],
        challenges: [
            "Balancing exploration vs exploitation in hybrid metaheuristics required careful parameter tuning across algorithm boundaries.",
            "Real-time route visualization needed efficient data serialization between Python backend and JavaScript frontend.",
        ],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "01",
        featured: false,
        title: "Identifying Game Identity from User Reviews using TF-IDF and KeyBERT",
        subtitle: "NLP",
        desc: "This study identifies the core identity of games from user reviews using TF-IDF and KeyBERT. TF-IDF highlights frequent and distinctive terms, while KeyBERT captures contextual meaning. The combination enables extraction of representative keywords that reflect game characteristics and player perception.",
        category: "AI / ML",
        tags: ["BERT", "Transformer", "TF-IDF"],
        year: "2026",
        views: "3,847",
        image: ["/iim-1.png", "/iim-2.png", "/iim-3.png"],
        longDesc: "This project explores how game identity can be derived from user-generated reviews using natural language processing techniques. TF-IDF is applied to measure the importance of words across the dataset, while KeyBERT leverages transformer-based embeddings to capture semantic relevance. By combining both approaches, the system produces representative keywords that describe gameplay, genre, mechanics, and overall player experience. The results demonstrate how user feedback can be transformed into structured insights that reflect a game's identity.",
        problem: "Game reviews contain rich information about gameplay, mechanics, and player experience, but they are unstructured and difficult to analyze at scale. Developers and researchers need a way to extract meaningful insights that represent the identity of a game from large volumes of text data.",
        architecture: "/mci-1.png",
        features: [
            {
                title: "TF-IDF Keyword Extraction",
                desc: "Identifies important terms based on term frequency and inverse document frequency to highlight distinctive words in reviews."
            },
            {
                title: "Contextual Keyword Extraction with KeyBERT",
                desc: "Uses transformer embeddings to capture semantic meaning and generate context-aware keywords."
            },
            {
                title: "Game Identity Representation",
                desc: "Combines statistical and contextual methods to produce representative keywords that reflect game characteristics and player perception."
            }
        ],
        techStack: ["Python", "TF-IDF", "KeyBERT", "BERT"],
        links: {
            demo: "https://medium.com/@farelfebryan06/identifying-game-identity-from-user-reviews-using-tf-idf-and-keybert-9bfbea6b31d1?postPublishedType=repub",
            github: "https://medium.com/@farelfebryan06/identifying-game-identity-from-user-reviews-using-tf-idf-and-keybert-9bfbea6b31d1?postPublishedType=repub",
            paper: "https://medium.com/@farelfebryan06/identifying-game-identity-from-user-reviews-using-tf-idf-and-keybert-9bfbea6b31d1"
        }
    },
    {
        id: "09",
        featured: false,
        title: "Toxic Comment Classification using RoBERTa Large",
        subtitle: "NLP Classification",
        desc: "Multi-label toxic comment classification using fine-tuned RoBERTa Large transformer model for content moderation.",
        category: "AI / ML",
        tags: ["NLP", "PyTorch", "Transformers"],
        year: "2026",
        views: "2,190",
        image: ["/roberta.png", "/roberta-1.png", "/roberta-2.png", "/roberta-3.png"],
        longDesc: "A multi-label text classification system built on RoBERTa Large for detecting various types of toxic content in online comments. The model classifies comments across six toxicity categories: toxic, severe toxic, obscene, threat, insult, and identity hate. Fine-tuned with mixed precision training and threshold optimization for production-ready content moderation.",
        problem: "Online platforms struggle with toxic content that drives away users and creates hostile environments. Manual moderation doesn't scale, and simple keyword filtering misses nuanced toxicity and context-dependent hate speech.",
        features: [
            { title: "Multi-Label Detection", desc: "Simultaneously classifies comments across six toxicity categories with independent probability thresholds per class." },
            { title: "RoBERTa Large Backbone", desc: "Fine-tuned 355M parameter transformer with task-specific classification head and dropout regularization." },
            { title: "Threshold Optimization", desc: "Per-class threshold tuning on validation set to maximize F1 score for each toxicity category independently." },
        ],
        techStack: ["PyTorch", "HuggingFace Transformers", "RoBERTa", "Scikit-Learn", "Google Colab"],
        challenges: [
            "Extreme label imbalance, severe_toxic and threat categories had less than 1% positive samples, requiring careful sampling strategies.",
            "Multi-label evaluation required per-class threshold optimization rather than a single global threshold.",
        ],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "06",
        featured: false,
        title: "Customer Segmentation Using KMeans Clustering (Unsupervised Learning)",
        subtitle: "Data Science",
        desc: "KMeans-based clustering to identify customer segments from purchasing behavior data.",
        category: "AI / ML",
        tags: ["Scikit-Learn", "K-Means"],
        year: "2025",
        views: "1,932",
        image: ["/lbe.png", "/lbe-3.png", "/lbe-1.png", "/lbe-2.png"],
        longDesc: "An unsupervised machine learning project that segments customers based on purchasing patterns, demographics, and behavioral features using KMeans clustering. The pipeline includes comprehensive EDA, feature engineering, PCA dimensionality reduction for visualization, and silhouette analysis for optimal cluster selection.",
        problem: "Businesses need to understand their diverse customer base to tailor marketing strategies, but manually categorizing thousands of customers is impractical and subjective.",
        features: [
            { title: "Elbow & Silhouette Analysis", desc: "Systematic approach to determine optimal number of clusters using both elbow method and silhouette scores." },
            { title: "PCA Visualization", desc: "Dimensionality reduction to 2D/3D for intuitive cluster visualization and interpretation." },
            { title: "Segment Profiling", desc: "Detailed statistical profiling of each customer segment with actionable business insights." },
        ],
        techStack: ["Scikit-Learn", "Pandas", "Matplotlib", "Seaborn", "NumPy"],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "07",
        featured: false,
        title: "TV Network Classification Using Ensemble Learning (Stacking)",
        subtitle: "Machine Learning",
        desc: "Ensemble stacking model for multi-class TV network classification with improved predictive performance.",
        category: "AI / ML",
        tags: ["Stacking", "Ensemble Learning"],
        year: "2026",
        views: "1,244",
        image: "/kcv.png",
        longDesc: "A machine learning classification system that predicts TV network categories using an ensemble stacking approach. Multiple base learners (Random Forest, SVM, XGBoost) are combined through a meta-learner to achieve superior classification accuracy compared to individual models.",
        problem: "Single classifiers often struggle with complex multi-class problems where decision boundaries overlap. Ensemble methods can capture diverse patterns that individual models miss.",
        features: [
            { title: "Stacking Ensemble", desc: "Two-level architecture with diverse base learners feeding into a logistic regression meta-classifier." },
            { title: "Cross-Validated Predictions", desc: "Base learner predictions generated via K-fold cross-validation to prevent data leakage in meta-learner training." },
            { title: "Model Comparison", desc: "Comprehensive benchmarking of individual models vs. ensemble performance across multiple metrics." },
        ],
        techStack: ["Scikit-Learn", "XGBoost", "Pandas", "NumPy"],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "10",
        featured: false,
        title: "Victoria Property Website",
        subtitle: "Real Estate Platform",
        desc: "Modern responsive property listing website with dynamic pages, advanced search and filtering, interactive maps, and optimized performance for seamless user experience.",
        category: "Web App",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        year: "2026",
        views: "8,421",
        image: ["/property.png", "/daftar.png", "/login.png", "/dashboard.png", "/vp-1.png", "/vp-2.png"],
        longDesc: "A full-featured real estate platform built with Next.js App Router featuring server-side rendering, dynamic property detail pages, advanced multi-criteria search with filtering by price, location, property type, and amenities. Includes interactive map integration for location-based browsing, responsive image galleries, and performance optimization with ISR and image lazy loading.",
        problem: "Traditional property listing sites suffer from slow page loads, poor mobile experience, and limited search capabilities that frustrate potential buyers browsing hundreds of listings.",
        features: [
            { title: "Dynamic Property Pages", desc: "Server-rendered detail pages with ISR for fast loading and SEO optimization across thousands of listings." },
            { title: "Advanced Search & Filter", desc: "Multi-criteria filtering by price range, location, property type, bedrooms, and amenities with instant results." },
            { title: "Interactive Map", desc: "Location-based property browsing with clustered markers and boundary-based search on interactive map." },
            { title: "Responsive Gallery", desc: "Touch-friendly image carousel with lightbox, lazy loading, and optimized image delivery." },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Golang", "Gin Framework", "MySQL"],
        links: { demo: "https://victoria-property-frontend-igi8.vercel.app/", github: null, paper: null },
    }, {
        id: "17",
        featured: false,
        title: "Real Time Data Analytics using Apache Airflow, ClickHouse and Metabase",
        subtitle: "Data Analytics",
        desc: "Real-time data analytics pipeline using Apache Airflow for workflow orchestration and automated data processing.",
        category: "Data Analytics",
        tags: ["Apache Airflow", "Python", "ETL"],
        year: "2025",
        views: "3,847",
        image: ["/apace-2.png", "/apache-1.png", "/apache-4.png", "/pipeline-apache.png", "/apache-5.png", "/apache-7.png"],
        longDesc: "A real-time data analytics project designed to automate data collection, transformation, and analysis using Apache Airflow. The system orchestrates scheduled workflows, processes incoming data through ETL pipelines, and prepares analytics-ready datasets for monitoring and decision-making. This project demonstrates workflow automation, data pipeline management, and practical implementation of modern data engineering concepts.",
        problem: "Organizations often need timely insights from continuously generated data, but manual data processing is inefficient, error-prone, and difficult to scale. A structured workflow orchestration system is needed to automate data pipelines and ensure reliable analytics delivery.",
        features: [
            { title: "Workflow Orchestration", desc: "Automated data pipeline scheduling and task dependency management using Apache Airflow DAGs." },
            { title: "ETL Pipeline", desc: "Data extraction, transformation, and loading process to prepare clean and structured analytics data." },
            { title: "Real-Time Monitoring", desc: "Pipeline execution monitoring to track task status, detect failures, and ensure reliable data processing." },
        ],
        techStack: ["Apache Airflow", "Python", "Pandas", "PostgreSQL"],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "18",
        featured: false,
        title: "Internship Scam Detection with TabM Ensemble MLP",
        subtitle: "Machine Learning",
        desc: "A machine learning project for detecting fake internship postings using TabM, Logistic Regression, and CatBoost models.",
        category: "AI / ML",
        tags: ["TabM", "Machine Learning", "Classification"],
        year: "2026",
        views: "3,847",
        image: [
            "/tabm-1.png",
            "/tabm.png",
        ],
        longDesc: "A machine learning project focused on detecting fake internship postings using tabular classification models. The project compares Logistic Regression, CatBoost, and TabM, an ensemble MLP-based deep learning model for tabular data. The system processes internship posting data, handles categorical and numerical features, applies preprocessing scenarios such as scaling and feature selection, and evaluates model performance using accuracy, precision, recall, F1-score, ROC-AUC, and confusion matrix.",
        problem: "Online internship platforms make it easier for students and job seekers to find opportunities, but they also create risks of fake postings. Scam internships may include suspicious email domains, unclear job descriptions, unrealistic offers, payment requests, and low trust signals. A reliable classification model is needed to help identify potentially fraudulent internship postings.",
        features: [
            {
                title: "Scam Internship Classification",
                desc: "Classifies internship postings into real or fake categories using supervised machine learning models."
            },
            {
                title: "TabM Ensemble MLP Model",
                desc: "Implements TabM as a deep learning approach for tabular data using an ensemble MLP-based architecture."
            },
            {
                title: "Model Performance Comparison",
                desc: "Compares Logistic Regression, CatBoost, and TabM across baseline, scaling, feature selection, and combined preprocessing scenarios."
            },
        ],
        techStack: ["Python", "Scikit-learn", "CatBoost", "PyTorch", "TabM", "Pandas"],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "02",
        featured: false,
        title: "TCanteen Frontend Development",
        subtitle: "Campus Canteen System",
        desc: "Responsive frontend for a smart campus canteen system with real-time interaction and clean UI.",
        category: "Web App",
        tags: ["Vite", "React"],
        year: "2025",
        views: "5,203",
        image: ["/tcanteen.png", "/tc-1.png", "/tc-2.png", "/tc-3.png", "/tc-4.png", "/tc-5.png"],
        longDesc: "A modern single-page application for ITS campus canteen digitalization, enabling students to browse menus, place orders, and track order status in real-time. Built with Vite + React for fast development and optimized bundle size, featuring component-based architecture and responsive design for mobile-first campus usage.",
        problem: "Campus canteen ordering involves long queues and miscommunication. Students waste time waiting in line, and vendors struggle to manage peak-hour order volume efficiently.",
        features: [
            { title: "Real-Time Order Tracking", desc: "Live order status updates from placed to ready, reducing wait time and queue congestion." },
            { title: "Menu Management", desc: "Dynamic menu display with categories, availability status, and vendor-specific filtering." },
            { title: "Mobile-First Design", desc: "Optimized for smartphone usage with touch-friendly interactions and responsive layouts." },
        ],
        techStack: ["React", "Vite", "Tailwind CSS", "Axios"],
        links: { demo: null, github: null, paper: null },
    },
    {
        id: "04",
        featured: false,
        title: "Lucretia Fashion Brand Website",
        subtitle: "Fashion E-Commerce",
        desc: "Modern fashion brand website with dynamic catalog and visually refined design.",
        category: "Web App",
        tags: ["HTML", "CSS", "Javascript"],
        year: "2025",
        views: "3,847",
        image: ["/lucretia.png", "/lucretia-1.png", "/lucretia-2.png", "/lucretia-3.png",],
        longDesc: "A visually striking fashion brand website designed with editorial aesthetics, featuring smooth scroll animations, dynamic product catalog with category filtering, and a refined typography system. Built with vanilla HTML, CSS, and JavaScript to demonstrate strong fundamentals in frontend development without framework dependencies.",
        problem: "Fashion brands need web presence that reflects their aesthetic identity. Template-based solutions fail to capture unique brand personality and create forgettable browsing experiences.",
        features: [
            { title: "Editorial Design", desc: "Magazine-inspired layout with bold typography, full-bleed imagery, and curated visual hierarchy." },
            { title: "Smooth Animations", desc: "Scroll-triggered reveal animations and hover micro-interactions using pure CSS and vanilla JavaScript." },
            { title: "Dynamic Catalog", desc: "Product grid with category filtering, quick-view functionality, and responsive image galleries." },
        ],
        techStack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        links: { demo: "https://felucretia.com", github: null, paper: null },
    }
];

export function getProjectById(id: string) {
    return projects.find(p => p.id === id) ?? null;
}

export function getThumb(project: Project): string {
    return Array.isArray(project.image) ? project.image[0] : project.image;
}

export function getGallery(project: Project): string[] {
    return Array.isArray(project.image) ? project.image : [project.image];
}