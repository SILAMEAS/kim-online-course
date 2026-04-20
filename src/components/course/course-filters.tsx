import {COURSE_LEVELS} from '@/lib/data/courses';
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
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Localization} from "@/i18n/lang";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
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

    const activeChips = [
        filters.search && {
            key: "search",
            label: `Search: ${filters.search}`,
            onRemove: () => setFilters(p => ({...p, search: ""}))
        },
        filters.categoryId && {
            key: "categoryId",
            label: `Category: ${filters.categoryId}`,
            onRemove: () => setFilters(p => ({...p, categoryId: undefined}))
        },
        filters.levelStatus && {
            key: "levelStatus",
            label: `Level: ${filters.levelStatus}`,
            onRemove: () => setFilters(p => ({...p, levelStatus: undefined}))
        },
        filters.rating && {
            key: "rating",
            label: `Rating: ${filters.rating}+`,
            onRemove: () => setFilters(p => ({...p, rating: undefined}))
        },
        (filters.minPrice || filters.maxPrice) && {
            key: "price",
            label: `Price: $${filters.minPrice ?? 0} - $${filters.maxPrice ?? 1000}`,
            onRemove: () =>
                setFilters(p => ({
                    ...p,
                    minPrice: undefined,
                    maxPrice: undefined
                }))
        }
    ].filter(Boolean)

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50"/>
                <Input
                    placeholder= {`${t(Localization("course","search_course"))}`}
                    className="pl-10"
                    value={searchTerm} // Use local state here
                    onChange={e => setSearchTerm(e.target.value)} // Update local state immediately
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {activeChips.map((chip: any) => (
                    <Badge
                        key={chip.key}
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        {chip.label}
                        <button
                            onClick={chip.onRemove}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                            <X size={14}/>
                        </button>
                    </Badge>
                ))}
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
                    {t(Localization("course","clear_filters"))}
                </Button>
            )}

            <Accordion type="single" collapsible className="w-full">
                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger>{t(Localization("course","price_range"))}</AccordionTrigger>
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
                    <AccordionTrigger>{t(Localization("footer","categories"))}</AccordionTrigger>
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
                                    {category?.name} ({category.id})
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>

                {/* Level */}
                <AccordionItem value="level">
                    <AccordionTrigger>{t(Localization("course","level"))}</AccordionTrigger>
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
                    <AccordionTrigger>{t(Localization("course","rating"))}</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={rating} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`rating-${rating}`}
                                    checked={filters.rating === rating}
                                    onCheckedChange={() =>
                                        setFilters(pre => ({...pre, rating: rating as any}))
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
