import {ENV} from "@/config/env.ts";

const previewCloudinary = ({type, publicId}: { type: 'video' | "image", publicId: string }) => {
    switch (type) {
        case "video":
            return `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/video/upload/${publicId}.mp4`;
        case "image":
            return `https://res.cloudinary.com/${ENV.CLOUDINARY_NAME}/image/upload/${publicId}.jpg`;
        default:
            return publicId;
    }
};

export default previewCloudinary;