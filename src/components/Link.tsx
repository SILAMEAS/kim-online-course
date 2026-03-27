import * as React from "react";
import {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import type {VariantProps} from "class-variance-authority";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";

type LinkProps = {
    isActive?: boolean;
    href: string;
} & PropsWithChildren &
    React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
};

const Link = ({children, href, isActive = false, ...rest}: LinkProps) => {
    const navigate = useNavigate();

    return (
        <Button variant={'outline'} onClick={() => navigate(href)} {...rest}
                className={cn('flex justify-start w-full', isActive && "text-primary border-2 border-primary", rest.className)}>
            {children}
        </Button>
    );
};

export default Link;