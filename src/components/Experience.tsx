'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      title: 'Waiting for Approval',
      company: 'TBA',
      location: 'Remote',
      period: '2025',
      description: 'Application submitted. Awaiting approval for the next exciting opportunity!',
      technologies: ['Pending'],
    },
    {
      title: 'AI Intern',
      company: 'Samsung Innovation Campus',
      location: 'Kurnool',
      period: 'Dec 2024 - Mar 2025',
      description: ' Participated in AI-focused training sessions covering fundamentals of machine learning and deep learning algorithms. Worked on a project to build a voice based speaker recognition model.',
      technologies: ['Python', 'TensorFlow', 'Numpy', 'Pandas'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="mx-auto w-full max-w-4xl py-8 font-sans">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Experience</h2>
          <p className="text-muted-foreground">My professional journey and work experience</p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-white/30 p-6 backdrop-blur-lg transition-all duration-300 hover:bg-white/40 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{experience.company}</span>
                    <span>•</span>
                    <span>{experience.location}</span>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {experience.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Experience; 