import {useEffect, useMemo} from 'react';

export function useFilePreview(file?: any, url?: string | null) {
    const previewUrl = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return url ?? null;
    }, [file, url]);

    useEffect(() => {
        return () => {
            if (file && previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [file, previewUrl]);

    return previewUrl;
}