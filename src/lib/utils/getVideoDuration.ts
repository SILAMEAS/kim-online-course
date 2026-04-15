export const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");

        video.preload = "metadata";

        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration); // seconds
        };

        video.onerror = () => {
            reject("Cannot load video metadata");
        };

        video.src = URL.createObjectURL(file);
    });
};