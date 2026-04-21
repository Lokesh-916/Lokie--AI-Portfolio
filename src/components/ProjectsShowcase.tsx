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
      description: 'Coming soon — details will be added shortly.',
      image: '/Coming-Soon.png',
      tech: ['Coming Soon'],
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
      description: 'Coming soon — details will be added shortly.',
      image: '/croporia.png',
      tech: ['Coming Soon'],
      year: '2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/Lokesh-916/Croporia', icon: Github },
      ],
    },
    {
      title: 'SevaSetu',
      description: 'Coming soon — details will be added shortly.',
      image: '/Coming-Soon.png',
      tech: ['Coming Soon'],
      year: '2025',
      links: [
        { name: 'GitHub', url: 'https://github.com/jahnaviyakkala/SevaSetu', icon: Github },
      ],
    },
    {
      title: 'EventHive',
      description: 'Coming soon — details will be added shortly.',
      image: '/eventhive.png',
      tech: ['Coming Soon'],
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