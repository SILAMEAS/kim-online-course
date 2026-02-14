'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import {
  setSearchQuery,
  setCategory,
  setLevel,
  setPriceRange,
  setRating,
  resetFilters,
} from '@/lib/redux/slices/courses.slice';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/data/courses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, X } from 'lucide-react';

export function CourseFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.courses.filters);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.category ||
    filters.level ||
    filters.rating ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
        <Input
          placeholder="Search courses..."
          className="pl-10"
          value={filters.searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={handleResetFilters}
        >
          <X className="w-4 h-4" />
          Clear Filters
        </Button>
      )}

      <Accordion type="single" collapsible className="w-full">
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value: [number, number]) => dispatch(setPriceRange(value))}
              min={0}
              max={200}
              step={10}
              className="mt-2"
            />
            <div className="flex justify-between text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Category */}
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {COURSE_CATEGORIES.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category === category}
                  onCheckedChange={() =>
                    dispatch(setCategory(filters.category === category ? null : category))
                  }
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Level */}
        <AccordionItem value="level">
          <AccordionTrigger>Level</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {COURSE_LEVELS.map(level => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={filters.level === level}
                  onCheckedChange={() =>
                    dispatch(setLevel(filters.level === level ? null : level))
                  }
                />
                <Label
                  htmlFor={level}
                  className="text-sm font-normal cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {[5, 4, 3].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={() =>
                    dispatch(setRating(filters.rating === rating ? null : rating))
                  }
                />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-1"
                >
                  {rating}+ ★
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
