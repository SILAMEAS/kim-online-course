import {useState} from "react";

export function PreviewImage({src, alt}: Readonly<{ src: string; alt: string }>) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className="relative w-full flex justify-center min-h-40">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center py-2">
                    <div className="animate-pulse w-72 h-40 bg-muted rounded-md"/>
                </div>
            )}

            {error ? (
                <div className="text-red-500">Failed to load image</div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                    className={`object-cover rounded-md border transition-opacity duration-300 ${
                        loading ? "opacity-0" : "opacity-100"
                    }`}
                />
            )}
        </div>
    );
}