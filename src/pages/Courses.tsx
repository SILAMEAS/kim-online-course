import {Navbar} from "@/components/navbar.tsx";
import {Footer} from "@/components/footer.tsx";
import {CourseFilters} from "@/components/course/course-filters";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Filter} from "lucide-react";
import {CourseResponse, useListAllCoursesQuery} from "@/lib/api/api.generated.ts";
import {CustomTable, MODE_TABLE} from "@/components/table/CustomTable.tsx";
import useCustomTable from "@/components/table/hooks/useCustomTable.tsx";
import {CourseCard} from "@/components/course/course-card.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export default function CoursesPage() {
    const {t} = useTranslation();
    const {
        filter,
        setFilter,
    } = useCustomTable<CourseResponse>();
    const {
        currentData,
        isLoading,
        isFetching
    } = useListAllCoursesQuery({...filter}, {refetchOnMountOrArgChange: true,});
    const courses = currentData?.contents || [];


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{t(Localization("home_page", "all_courses"))}</h1>
                    </div>

                    {/* Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar - Desktop */}
                        <div className="hidden md:block">
                            <div className="sticky top-24">
                                <CourseFilters<CourseResponse> setFilters={setFilter} filters={filter}/>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-3">
                            {/* Filter Button - Mobile */}
                            <div className="md:hidden mb-6">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="gap-2 w-full">
                                            <Filter className="w-4 h-4"/>
                                            Filters
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left">
                                        <CourseFilters<CourseResponse> setFilters={setFilter} filters={filter}/>
                                    </SheetContent>
                                </Sheet>
                            </div>

                            <CustomTable<CourseResponse>
                                mode={MODE_TABLE.GRID}
                                setFilter={setFilter}
                                filter={filter}
                                columns={[
                                    {key: 'title', label: 'Title', sortable: true},
                                    {key: 'category', label: 'Category', sortable: true},
                                    {key: 'price', label: 'Price', sortable: true},
                                    {key: 'status', label: 'Status', sortable: true},
                                ]}
                                data={courses}
                                pagination={{page: filter.page, limit: filter.limit, total: currentData?.total ?? 0}}
                                isLoading={isLoading || isFetching}
                                customRenderModeContent={row => <CourseCard course={row}/>}
                                styles={{
                                    classNameGrid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                }}

                            />

                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
