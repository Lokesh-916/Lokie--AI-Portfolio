import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface OpenToWorkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const profile = {
  name: 'Lokesh Babu Kolamala',
  age: '19 years old',
  location: 'Vijayawada, Andhra Pradesh, India',
  description:
    "Hey! I'm Lokesh. I'm into AI, data stuff, and building projects that actually do something. Not a pro yet, but I keep trying new ideas, learning, and levelling up with every build.\n\nEx-Intern at Samsung Innovation Campus. Open to work — internships, startups, or anything meaningful. Currently working on AI Agents.",
  src: '/pfp-lokesh-modified.png',
  roles: [
    'AI Agent Developer',
    'Machine Learning Enthusiast',
    'BTech AI & DS Student',
    'Open to Internships',
    'Project Builder',
  ],
};

const resumeDetails = {
  downloadUrl: '/Lokesh_Resume.pdf',
};

const OpenToWorkModal: React.FC<OpenToWorkModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background z-52 max-h-[90vh] overflow-auto rounded-2xl border-none p-2 sm:p-4 py-6 shadow-xl w-[98vw] max-w-[98vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[1000px] flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        {/* Profile Image as a box */}
        <div className="w-32 h-32 sm:w-56 sm:h-56 bg-gray-100 shadow-lg overflow-hidden flex items-center justify-center rounded-2xl flex-shrink-0 mb-4 sm:mb-0 sm:-mt-6 mx-auto">
          <Image
            src={profile.src}
            alt="Profile Picture"
            width={220}
            height={220}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Info Section */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
          <DialogTitle className="text-2xl sm:text-3xl font-bold mb-1">{profile.name}</DialogTitle>
          <DialogDescription className="mb-2 text-muted-foreground">
            {profile.age} • {profile.location}
          </DialogDescription>
          <p className="mb-4 text-base text-foreground whitespace-pre-line">{profile.description}</p>
          <div className="mb-4 w-full">
            <div className="font-semibold text-lg mb-1">Roles:</div>
            <ul className="flex flex-wrap justify-center sm:justify-start gap-2">
              {profile.roles.map((role, idx) => (
                <li key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium border border-green-200">
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <Button asChild className="mt-2">
            <a href={resumeDetails.downloadUrl} download target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenToWorkModal; 