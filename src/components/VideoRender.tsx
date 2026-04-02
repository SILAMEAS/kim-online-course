const VideoRender = ({preview}:{preview?: string}) => {
    return <video controls className="w-full rounded-md border">
        <source
            src={preview}
            type="video/mp4"
        />
        <track
            kind="captions"
            srcLang="en"
            label="English"
        />
    </video>


};

export default VideoRender;