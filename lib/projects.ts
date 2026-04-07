// lib/projects.ts
export type Cat = "All" | "Web App" | "AI / ML";

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
        featured: false,
        title: "DermaDiff: Improving Skin Lesion Classification of Rare Classes via Targeted Synthetic Augmentation with Latent Diffusion and Vision Foundation Models",
        subtitle: "AI Skin Analysis",
        desc: "AI-powered skin condition analysis tool leveraging diffusion models for dermatological assessment and diagnosis support.",
        category: "AI / ML",
        tags: ["Diffusion Model", "PyTorch", "Computer Vision"],
        year: "2026",
        views: "0",
        image: ["/dermadiff-1.png", "/dermadiff-6.png", "/dermadiff-2.png", "/dermadiff-5.png", "/dermadiff-4.png", "/dermadiff-3.png"],
        longDesc: "DermaDiff tackles the critical class imbalance problem in dermatological image classification by generating high-quality synthetic dermoscopic images using Stable Diffusion models fine-tuned with LoRA adapters. The pipeline targets five minority classes from HAM10000 and ISIC 2019 datasets — melanoma, basal cell carcinoma, actinic keratosis, dermatofibroma, and vascular lesions — and augments training data for a PanDerm (ViT-Large) foundation model classifier. Four experiments were conducted across SD 2.1, SDXL, and SD 3.5 Large, with BiomedCLIP-based quality filtering ensuring only clinically realistic synthetic images enter the training pipeline.",
        problem: "Skin lesion datasets suffer from severe class imbalance — rare conditions like dermatofibroma and vascular lesions make up less than 2% of training data, causing classifiers to underperform on these critical minority classes. Misdiagnosis of rare but dangerous conditions like melanoma can have life-threatening consequences.",
        features: [
            { title: "LoRA Fine-Tuning", desc: "Rank-64 LoRA adapters trained per minority class on Stable Diffusion 2.1, SDXL, and SD 3.5 Large for targeted synthetic image generation." },
            { title: "CLIP Filtering", desc: "BiomedCLIP-based quality filtering with adaptive thresholding and LPIPS diversity filtering to ensure generated images are clinically realistic." },
            { title: "PanDerm Classifier", desc: "ViT-Large foundation model fine-tuned on augmented dataset with proportional undersampling and AMP mixed precision training." },
            { title: "Multi-Model Comparison", desc: "Systematic evaluation across four experiments (Baseline, SD 2.1, SDXL, SD 3.5) with comprehensive metrics including WF1, MF1, and AUC-ROC." },
        ],
        techStack: ["PyTorch", "Stable Diffusion", "HuggingFace", "PEFT/LoRA", "Google Colab", "Vast.ai", "Next.js", "Modal.com"],
        results: [
            { metric: "Weighted F1", baseline: 0.8846, best: 0.8927, experiment: "SD 2.1" },
            { metric: "Macro F1", baseline: 0.8200, best: 0.8409, experiment: "SDXL" },
            { metric: "Accuracy", baseline: 0.8750, best: 0.8870, experiment: "SD 3.5" },
        ],
        architecture: "/diagrams/dermadiff-pipeline.png",
        challenges: [
            "Inverted flow matching formula in SD 3.5 custom training loop caused silent training failure — caught only after analyzing generated outputs.",
            "PEFT format incompatibility between training and inference required switching to native PeftModel loading pattern via PeftModel.from_pretrained().",
            "Drive I/O bottleneck during PanDerm training resolved by copying dataset to local disk before training.",
            "Class-specific negative prompts were essential to prevent mode collapse in minority class generation.",
        ],
        links: { demo: null, github: null, paper: null },
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
        longDesc: "This project implements a state-of-the-art semantic segmentation pipeline using SegFormer-b2 architecture for automated pothole detection from road imagery. Trained on a curated dataset of Indonesian road conditions collected by ARA ITS, the model achieves high IoU scores on both validation and test sets. The pipeline includes custom data augmentation strategies, class-weighted loss functions to handle imbalanced segmentation masks, and a post-processing module for contour refinement.",
        problem: "Indonesian road infrastructure suffers from widespread pothole damage that causes vehicle damage and traffic accidents. Manual road inspection is time-consuming and inconsistent, creating a need for automated detection systems.",
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
            "Extreme label imbalance — severe_toxic and threat categories had less than 1% positive samples, requiring careful sampling strategies.",
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
        image: "/lbe.png",
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
        id: "03",
        featured: false,
        title: "AI Route Optimizer for HFFCVRP Website",
        subtitle: "Optimization System",
        desc: "Web-based route optimization system implementing a Hybrid Firefly–Genetic algorithm for cost-efficient vehicle routing.",
        category: "AI / ML",
        tags: ["Python", "Genetic-Algorithm", "Simulated Annealing", "Tabu-Search"],
        year: "2025",
        views: "1,244",
        image: "/kka.png",
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
        title: "Victoria Property Website",
        subtitle: "Real Estate Platform",
        desc: "Modern responsive property listing website with dynamic pages, advanced search and filtering, interactive maps, and optimized performance for seamless user experience.",
        category: "Web App",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        year: "2026",
        views: "8,421",
        image: "/property.png",
        longDesc: "A full-featured real estate platform built with Next.js App Router featuring server-side rendering, dynamic property detail pages, advanced multi-criteria search with filtering by price, location, property type, and amenities. Includes interactive map integration for location-based browsing, responsive image galleries, and performance optimization with ISR and image lazy loading.",
        problem: "Traditional property listing sites suffer from slow page loads, poor mobile experience, and limited search capabilities that frustrate potential buyers browsing hundreds of listings.",
        features: [
            { title: "Dynamic Property Pages", desc: "Server-rendered detail pages with ISR for fast loading and SEO optimization across thousands of listings." },
            { title: "Advanced Search & Filter", desc: "Multi-criteria filtering by price range, location, property type, bedrooms, and amenities with instant results." },
            { title: "Interactive Map", desc: "Location-based property browsing with clustered markers and boundary-based search on interactive map." },
            { title: "Responsive Gallery", desc: "Touch-friendly image carousel with lightbox, lazy loading, and optimized image delivery." },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
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
        image: "/tcanteen.png",
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
        image: "/lucretia.png",
        longDesc: "A visually striking fashion brand website designed with editorial aesthetics, featuring smooth scroll animations, dynamic product catalog with category filtering, and a refined typography system. Built with vanilla HTML, CSS, and JavaScript to demonstrate strong fundamentals in frontend development without framework dependencies.",
        problem: "Fashion brands need web presence that reflects their aesthetic identity. Template-based solutions fail to capture unique brand personality and create forgettable browsing experiences.",
        features: [
            { title: "Editorial Design", desc: "Magazine-inspired layout with bold typography, full-bleed imagery, and curated visual hierarchy." },
            { title: "Smooth Animations", desc: "Scroll-triggered reveal animations and hover micro-interactions using pure CSS and vanilla JavaScript." },
            { title: "Dynamic Catalog", desc: "Product grid with category filtering, quick-view functionality, and responsive image galleries." },
        ],
        techStack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        links: { demo: null, github: null, paper: null },
    },
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