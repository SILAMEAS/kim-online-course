import i18n from "@/i18n";
import {Localization} from "@/i18n/lang";

export const formatDurationVideo = (seconds?: number) => {
    const _m= i18n.t(Localization("duration_format","m"));
    const _h= i18n.t(Localization("duration_format","h"));
    const _s= i18n.t(Localization("duration_format","s"));

    if (!seconds) return `0 ${_s}`;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0) return `${h} ${_h} ${m} ${_m}`;
    if (m > 0) return `${m} ${_m} ${s} ${_s}`;
    return `${s} ${_s}`;
};