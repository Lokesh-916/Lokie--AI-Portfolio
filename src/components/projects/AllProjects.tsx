"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/Data";


export default function AllProjects() {
  console.log('AllProjects component rendered');
  console.log('Total data length:', data.length);
  console.log('First item:', data[0]);
  
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));
  console.log('Number of cards created:', cards.length);

  return (
    <div className="w-full h-full pt-8">
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
