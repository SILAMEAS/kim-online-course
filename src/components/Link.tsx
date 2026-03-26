import * as React from "react";
import {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import type {VariantProps} from "class-variance-authority";
import {Button, buttonVariants} from "@/components/ui/button.tsx";

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
        <Button variant={'outline'} onClick={() => navigate(href)} {...rest}>
            {children}
        </Button>
    );
};

export default Link;