'use client';

import { Lesson } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, PlayCircle } from 'lucide-react';

interface CourseCurriculumProps {
  curriculum: Lesson[];
  totalDuration?: number;
}

export function CourseCurriculum({ curriculum, totalDuration }: CourseCurriculumProps) {
  const totalMinutes = curriculum.reduce((sum, lesson) => sum + lesson.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
        <h3 className="font-semibold">Course Curriculum</h3>
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Clock className="w-4 h-4" />
          <span>
            {hours}h {minutes}m • {curriculum.length} lessons
          </span>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {curriculum.map((lesson, index) => (
          <AccordionItem key={lesson.id} value={lesson.id}>
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-foreground/60">{lesson.duration} min</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-11 pt-0">
              <div className="space-y-3">
                <p className="text-sm text-foreground/70">{lesson.description}</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <PlayCircle className="w-4 h-4" />
                  <span>Video included</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
