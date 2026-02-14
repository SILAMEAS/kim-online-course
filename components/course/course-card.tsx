'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const levelColors = {
    'Beginner': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Intermediate': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        {/* Course Image */}
        <div className="relative w-full h-48 bg-secondary overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-primary">
            ${course.price}
          </Badge>
        </div>

        {/* Course Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Category and Level */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
            <Badge className={`text-xs ${levelColors[course.level]}`}>
              {course.level}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
              {course.instructor.name.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground/80">{course.instructor.name}</p>
              <p className="text-xs text-foreground/60">{course.instructor.title}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
              <span className="text-xs">({course.reviews_count})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">{course.students_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{course.duration}h</span>
            </div>
          </div>

          {/* Button */}
          <Button className="w-full mt-auto" size="sm">
            View Course
          </Button>
        </div>
      </div>
    </Link>
  );
}
