import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {Clock} from "lucide-react";
import {VideoListResponse} from "@/lib/api/api.generated.ts";
import React from "react";
import {formatDuration} from "@/lib/utils/formatDuration.ts";
import VideoRender from "@/components/VideoRender.tsx";
import previewCloudinary from "@/components/previewCloudinary.ts";

interface CourseCurriculumProps {
    curriculum: VideoListResponse[];
    totalDuration?: number;
}

export function CourseCurriculum({curriculum}: Readonly<CourseCurriculumProps>) {
    const totalSeconds = React.useMemo(
        () =>
            curriculum.reduce(
                (sum, lesson) => sum + (lesson?.duration ?? 0),
                0
            ),
        [curriculum]
    );


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                <h3 className="font-semibold">Course's videos</h3>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Clock className="w-4 h-4"/>
                    <span>
            {formatDuration(totalSeconds)} • {curriculum.length} lessons
          </span>
                </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {curriculum.map((video, index) => (
                    <AccordionItem key={video.id} value={`${video.id}`}>
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center gap-3 text-left">
                                <div
                                    className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary font-semibold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{video.title}</p>
                                    <p className="text-sm text-foreground/60">
                                        {formatDuration(video.duration)}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-11 pt-0">
                            <VideoRender preview={previewCloudinary({type: "video", url: `${video.publicId}`})}/>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
