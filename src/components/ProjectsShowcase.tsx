'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export function ProjectsShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      title: 'Coming Soon',
      description: " Cool projects are brewing! I'm working on some exciting new ideas that I can't wait to share with you. Stay tuned!",
      image: '/Coming-Soon.png',
      tech: ['In Progress', 'Innovation', 'Coming Soon'],
      year: '2025',
      links: [],
    },
    {
      title: 'AdaptIQ',
      description: 'An AI-powered adaptive learning and career guidance platform that creates a dynamic loop between a user\'s skills, aspirations, and real-time AI mentorship. Dynamically generates personalized quizzes that scale difficulty based on inferred comprehension, visualizes career roadmaps and skill trees via Mermaid.js, and ingests past learning history from ChatGPT/Gemini exports via Multer. Uses a strict 1500-token context window strategy with rolling summaries to maintain long-term behavioral profiles without bloating LLM context.',
      image: '/Coming-Soon.png',
      image: '/adaptiq.png',
      tech: ['React 19', 'Vite', 'Tailwind CSS v4', 'Express.js', 'MongoDB', 'Mongoose', 'Groq API', 'LLaMA 3.3 70B', 'Mermaid.js', 'Multer', 'React Router v7'],
      year: '2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/karthikpappala/AdaptIQ', icon: Github },
      ],
    },
    {
      title: 'AbleEat',
      description: 'Built an end-to-end computer vision system that scans entire grocery shelves and highlights food items safe to consume based on dietary restrictions, allergies, and health goals. Fine-tuned a ResNet-based classifier on 36 fruit and vegetable classes, achieving 98% classification accuracy. Implemented a Vision + OCR pipeline using Google Vision API to localize product regions and extract ingredient labels with 90% text extraction accuracy. Designed an LLM-driven ingredient analysis engine to match extracted labels against user-defined allergens, macros, and dietary rules, improving unsafe-item recall by 30%.',
      image: '/ableeat.png',
      tech: ['Python', 'OpenCV', 'RAG', 'Google Vision API', 'OCR', 'LLMs', 'ResNet'],
      year: 'Dec 2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/AbleEat', icon: Github },
      ],
    },
    {
      title: 'Croporia',
      description: 'A full-stack, AI-powered agricultural intelligence platform built for Indian farmers. Consolidates crop science, real-time mandi prices, RAG-powered agronomy guidance, computer-vision pest & disease detection, hold-or-sell price forecasting, P2P crop marketplace, community forum, and a personalized daily feed — all in one place. Built on a three-service architecture: React SPA, Express + MongoDB REST API, and a FastAPI AI/ML backend with LangChain, FAISS, and Groq LLaMA 3.3 70B.',
      image: '/croporia.png',
      tech: ['React 19', 'Vite', 'Tailwind CSS', 'Express.js', 'MongoDB', 'FastAPI', 'LangChain', 'FAISS', 'Groq', 'RAG', 'Plant.id API', 'Python'],
      year: '2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/Croporia', icon: Github },
      ],
    },
    {
      title: 'SevaSetu',
      description: 'An AI-powered government form assistant for Indian citizens that eliminates preventable application rejections. Combines a RAG pipeline (sentence-transformers + AWS Bedrock Claude 3.5 Sonnet), EasyOCR document extraction, and a scikit-learn rejection-risk scoring engine to validate documents, auto-fill forms from uploaded IDs, and answer queries in 9 Indian languages. Escalates to a human officer when AI confidence drops below a configurable threshold. Deployed with React on Vercel and FastAPI on AWS EC2.',
      image: '/sevasetu.png',
      tech: ['React 19', 'TypeScript', 'FastAPI', 'AWS Bedrock', 'Claude 3.5 Sonnet', 'EasyOCR', 'RAG', 'scikit-learn', 'SQLAlchemy', 'Docker', 'Groq'],
      year: '2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/jahnaviyakkala/SevaSetu', icon: Github },
        { name: 'Live Demo', url: 'https://sevasetu-demo.vercel.app/', icon: ExternalLink },
      ],
    },
    {
      title: 'EventHive',
      description: 'A full-stack event operations platform connecting organizers, volunteers, and clients on a single system. Replaces ad-hoc workflows with structured event creation, role-based volunteer enrollment, client offer negotiation, expense tracking, advance payment with counter-negotiation, real-time 1:1 and group messaging, incident reporting, and an analytics dashboard. Features a volunteer XP/badge reputation system with 6 rank tiers and 9 badge definitions, organizer composite ratings, and a Bird\'s Eye View for public volunteer assignment breakdowns.',
      image: '/eventhive.png',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Multer', 'Tailwind CSS v4', 'Vanilla JS', 'Mongoose', 'bcryptjs', 'Helmet'],
      year: '2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/EventHive', icon: Github },
      ],
    },
    {
      title: 'Deep Dehazing',
      description: 'Implemented a Transformer-based image dehazing system using U-Net with MiT-B3 encoder, achieving 20.53 dB PSNR and 0.9109 SSIM on 110 validation images. Optimized CPU inference pipeline to 580 ms/image, enabling near-real-time haze removal without GPU hardware. Trained on paired hazy/clear datasets using hybrid reconstruction + perceptual loss, improving average PSNR by 9+ dB. Deployed a Flask web application with real-time upload, visualization, and automated PSNR/SSIM scoring across 50+ samples.',
      image: '/dehaze.png',
      tech: ['Python', 'PyTorch', 'Transformers', 'U-Net', 'MiT-B3', 'Flask'],
      year: 'Feb 2026',
      links: [
        { name: 'GitHub', url: 'https://github.com/karthikpappala/Deep-Dehazing', icon: Github },
      ],
    },
    {
      title: 'DineAssist',
      description: 'An AI-powered restaurant recommendation system built during the OpenAI Hackathon. The project uses a Retrieval-Augmented Generation (RAG) pipeline to embed and store restaurant menu data, enabling the model to fetch precise dish-level information during conversations. By combining semantic search, user-mood based intent detection, and LLM-driven reasoning, DineAssist generates personalized suggestions for cravings, diets, and price ranges. The system integrates menu parsing, vector embeddings, and contextual retrieval to make meal discovery smarter and more interactive.',
      image: '/dineassist_temp.png',
      tech: ['LangChain', 'FAISS', 'Groq', 'Flask', 'HTML', 'CSS', 'JavaScript'],
      year: 'Oct 2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/DineAssist', icon: Github },
      ],
    },
    {
      title: 'GPU Kernel Execution Time Prediction',
      description: 'A performance-modeling project where I built an ML system that predicts the execution time of a 2048×2048 SGEMM kernel using 14 configurable GPU parameters. The model also estimates MNIST training time and power consumption as reference workloads, enabling fast performance forecasting without executing the kernels. This project combines GPU profiling, feature extraction, regression modeling, and power-runtime analysis for practical system-level optimization.',
      image: '/sgemm_preview.png',
      tech: ['Scikit Learn', 'Random Forest', 'Pandas', 'NumPy', 'HTML', 'CSS', 'JavaScript'],
      year: 'Oct 2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/GPU-Kernel-Execution-Time-Prediction', icon: Github },
      ],
    },
    {
      title: 'Voice-Based Speaker Recognition Model ',
      description: 'Developed and trained deep learning models using Recurrent Neural Networks (RNN) with Long Short-Term Memory (LSTM) architectures to process sequential audio data. Engineered and extracted relevant speech features such as Mel-Frequency Cepstral Coefficients (MFCCs) to enhance model accuracy and performance. ',
      image: '/proj-preview.jpeg',
      tech: ['Python', 'TensorFlow', 'RNN', 'LSTM'],
      year: 'Feb 2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/SIC-AI-Project', icon: Github },
      ],
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl py-8 font-sans">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Projects</h2>
          <p className="text-muted-foreground">Some of my recent work and personal projects</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-white/30 backdrop-blur-lg transition-all duration-300 hover:bg-white/40 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/40"
            >
              {/* Project Image */}
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent 
          className="!max-w-[90vw] !w-[90vw] sm:!max-w-[85vw] md:!max-w-[80vw] lg:!max-w-[75vw] xl:!max-w-[70vw] !p-0 !bg-transparent !border-none !shadow-none"
          style={{ maxWidth: '90vw', width: '90vw' } as React.CSSProperties}
        >
          <DialogTitle className="sr-only">Project Preview Image</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-auto max-h-[85vh] flex items-center justify-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src={selectedImage}
                alt="Full size preview"
                width={1400}
                height={1000}
                className="w-full h-auto max-w-full object-contain rounded-lg"
                unoptimized
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectsShowcase; 