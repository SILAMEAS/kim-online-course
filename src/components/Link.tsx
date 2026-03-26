import * as React from "react";
import {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import type {VariantProps} from "class-variance-authority";
import {buttonVariants} from "@/components/ui/button.tsx";

type LinkProps = {
    href: string;
} & PropsWithChildren &
    React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
};

const Link = ({children, href, ...rest}: LinkProps) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(href)} {...rest}>
            {children}
        </button>
    );
};

export default Link;