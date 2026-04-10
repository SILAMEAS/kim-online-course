import {useAppDispatch} from '@/lib/redux/hooks';
import {setRating,} from '@/lib/redux/slices/courses.slice';
import {COURSE_LEVELS} from '@/lib/data/courses';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Slider} from '@/components/ui/slider';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from '@/components/ui/accordion';
import {Search, X} from 'lucide-react';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SORT} from "@/lib/enum.ts";
import {useListCategoriesQuery} from "@/lib/api/api.generated.ts";
import {DefaultPaginationRequest} from "@/lib/types.ts";

export function CourseFilters<T>({filters, setFilters}: Readonly<{
    setFilters: Dispatch<SetStateAction<{
        search: string,
        page: number,
        limit: number,
        sortBy: keyof T,
        sortOrder: SORT,
        maxPrice?: number,
        minPrice?: number,
        categoryId?: number,
        rating?: number,
        levelStatus?: "BEGINNER" | "INTERMEDIATE" | "ADVANCE"
    }>>,
    filters: {
        search: string,
        page: number,
        limit: number,
        sortBy: keyof T,
        sortOrder: SORT,
        maxPrice?: number,
        minPrice?: number,
        categoryId?: number,
        rating?: number,
        levelStatus?: "BEGINNER" | "INTERMEDIATE" | "ADVANCE"
    }
}>) {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const {currentData} = useListCategoriesQuery(DefaultPaginationRequest, {refetchOnMountOrArgChange: true});

    const handleResetFilters = () => {
        setFilters({
            ...filters,
            search: '',
            page: 1,
            categoryId: undefined,
            rating: undefined,
            levelStatus: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            sortBy: 'id' as any,
            sortOrder: SORT.DESC,
        })
    };

    const hasActiveFilters =
        filters.search ||
        filters.categoryId ||
        filters.levelStatus ||
        filters.rating ||
        (filters?.minPrice && (filters?.minPrice > 0)) ||
        (filters?.maxPrice && (filters?.maxPrice < 200));

    useEffect(() => {
        // If the local searchTerm is already equal to the parent filter, do nothing
        if (searchTerm === filters.search) return;

        const timer = setTimeout(() => {
            setFilters(prev => ({...prev, search: searchTerm, page: 1})); // Reset page to 1 on new search
        }, 500); // 3 seconds

        return () => clearTimeout(timer);
    }, [searchTerm, setFilters, filters.search]);

    // 3. Sync local state if parent filter changes (e.g., on Clear Filters)
    useEffect(() => {
        setSearchTerm(filters.search);
    }, [filters.search]);


    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50"/>
                <Input
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchTerm} // Use local state here
                    onChange={e => setSearchTerm(e.target.value)} // Update local state immediately
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
                    <X className="w-4 h-4"/>
                    Clear Filters
                </Button>
            )}

            <Accordion type="single" collapsible className="w-full">
                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <Slider
                            value={[filters?.minPrice ?? 0, filters?.maxPrice ?? 0]}
                            onValueChange={(value: [number, number]) => setFilters(pre => ({
                                ...pre,
                                minPrice: value[0],
                                maxPrice: value[1]
                            }))}
                            min={0}
                            max={1000}
                            step={50}
                            className="mt-2"
                        />
                        <div className="flex justify-between text-sm">
                            <span>${filters?.minPrice ?? 0}</span>
                            <span>${filters?.maxPrice ?? 0}</span>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Category */}
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                        {currentData?.contents?.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={String(category.id)}
                                    checked={filters.categoryId === category.id}
                                    onCheckedChange={() => setFilters(prev => ({...prev, categoryId: category?.id}))
                                    }
                                />
                                <Label
                                    htmlFor={category?.name}
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    {category?.name}
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
                                    checked={filters.levelStatus === level}
                                    onCheckedChange={() => setFilters(pre => ({...pre, levelStatus: level as any}))
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
