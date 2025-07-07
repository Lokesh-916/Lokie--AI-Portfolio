'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export function Education() {
  const education = [
    {
      degree: 'B.Tech in Artificial Intelligence and Data Science',
      school: 'IIITDM Kurnool',
      location: 'Kurnool, Andhra Pradesh',
      period: '2023 - Present',
      description: 'Peer-to-peer learning program focused on software development, algorithms, and system administration.',
      achievements: ['DSA', 'DBMS', 'AI/ML', 'Computer Networking', 'Compiler Design', 'Operating Systems', 'Probability and Statistics'],
      gpa: '8.8/10',
    },
    {
      degree: 'Higher Secondary Education (Class XII)  ',
      school: 'Krishna Chaitanya Junior College',
      location: 'Nellore, Andhra Pradesh',
      period: '2021 - 2023',
      description: 'Completed high school education with focus on mathematics and sciences.',
      achievements: ['Mathematics', 'Physics', 'Chemistry'],
      gpa: '96.5%',
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Education</h2>
          <p className="text-muted-foreground">My academic background and achievements</p>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border bg-white/30 p-6 backdrop-blur-lg transition-all duration-300 hover:bg-white/40 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{edu.school}</span>
                    <span>•</span>
                    <span>{edu.location}</span>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {edu.description}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm font-semibold text-primary">
                      Grade: {edu.gpa}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <span
                        key={achievementIndex}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        <Award className="h-3 w-3" />
                        {achievement}
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

export default Education; 