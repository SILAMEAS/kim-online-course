import {ENV} from "@/config/env.ts";

const previewCloudinary = ({type, url}: { type: 'video' | "image", url: string }) => {
    switch (type) {
        case "video":
            return `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/video/upload/${url}.mp4`;
        case "image":
            return `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/image/upload/${url}.jpg`;
        default:
            return url;
    }
};

export default previewCloudinary;