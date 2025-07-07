'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import WelcomeModal from '@/components/welcome-modal';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
  ArrowDown,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import GitHubButton from 'react-github-btn';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SidebarScrollspy from '@/components/SidebarScrollspy';
import OpenToWorkModal from '@/components/OpenToWorkModal';

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: "What's the craziest thing you've ever done? What are your hobbies?",
  Contact:
    'How can I contact you?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showArrow, setShowArrow] = useState(true);
  const [openToWorkModal, setOpenToWorkModal] = useState(false);

  const goToChat = (query: string) =>
    router.push(`/chat?query=${encodeURIComponent(query)}`);

  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8, delay: 0.2 },
    },
  };

  useEffect(() => {
    // Précharger les assets du chat en arrière-plan
    const img = new window.Image();
    img.src = '/landing-memojis.png';

    // Précharger les vidéos aussi
    const linkWebm = document.createElement('link');
    linkWebm.rel = 'preload'; // Note: prefetch au lieu de preload
    linkWebm.as = 'video';
    linkWebm.href = '/final_memojis.webm';
    document.head.appendChild(linkWebm);

    const linkMp4 = document.createElement('link');
    linkMp4.rel = 'prefetch';
    linkMp4.as = 'video';
    linkMp4.href = '/final_memojis_ios.mp4';
    document.head.appendChild(linkMp4);

    const onScroll = () => {
      if (window.scrollY > 40) setShowArrow(false);
      else setShowArrow(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="chat" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/30 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none font-serif sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Lokesh
        </div>
      </div>

      {/* Avatar in top left */}
      <div className="fixed top-6 left-6 z-50">
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="focus:outline-none"
        >
          <Avatar className="h-14 w-14 border-2 border-white shadow-lg dark:border-neutral-800">
            <AvatarImage src="/dogpaw.png" alt="Dog Paw" className="object-cover" />
            <AvatarFallback>LB</AvatarFallback>
          </Avatar>
        </button>
      </div>

      {/* Open To Work badge in top right */}
      <div className="fixed top-6 right-8 z-50">
        <button
          type="button"
          onClick={() => setOpenToWorkModal(true)}
          className="flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Open To Work
        </button>
        <OpenToWorkModal open={openToWorkModal} onOpenChange={setOpenToWorkModal} />
      </div>

      {/* header */}
      <motion.div
        className="z-1 mb-8 flex flex-col items-center text-center md:mb-12 mt-24 md:mt-4"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm Lokie
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Lokesh's AI Portfolio
        </h1>
      </motion.div>

      {/* centre infinity avatar */}
      <div className="relative z-10 h-52 w-52 overflow-hidden rounded-full bg-white/60 shadow-lg sm:h-72 sm:w-72 flex items-center justify-center">
        <Image
          src="/inf.png"
          alt="Infinity"
          width={400}
          height={400}
          priority
          className="object-cover w-full h-full mix-blend-multiply opacity-80"
        />
      </div>

      {/* input + quick buttons */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) goToChat(input.trim());
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="This chat knows me well — try it…"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* quick-question grid */}
        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => goToChat(questions[key])}
              variant="outline"
              className="shadow-none border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 backdrop-blur-lg active:scale-95 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm">{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Additional sections */}
      <div id="experience" className="relative z-10 w-full bg-gradient-to-b from-transparent to-neutral-50/50 dark:to-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Experience />
        </div>
      </div>

      <div id="education" className="relative z-10 w-full bg-gradient-to-b from-neutral-50/50 to-transparent dark:from-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Education />
        </div>
      </div>

      <div id="projects" className="relative z-10 w-full bg-gradient-to-b from-transparent to-neutral-50/50 dark:to-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <ProjectsShowcase />
        </div>
      </div>

      <SidebarScrollspy />
      <FluidCursor />

      {/* Animated down arrow for mobile */}
      {showArrow && (
        <div className="md:hidden absolute bottom-4 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none">
          <ArrowDown className="animate-bounce text-blue-500 opacity-80" size={36} />
          <span className="text-xs text-neutral-500 mt-1">Scroll to see more</span>
        </div>
      )}
    </div>
  );
}
