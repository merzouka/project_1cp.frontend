"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getUrl } from "@/constants/api";
import { endpoints } from "@/constants/endpoints";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MdSwitchAccount } from "react-icons/md";

export const SwitchAccount = ({className} : { className?: string }) => {
    const [loggingOut, setLoggingOut] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const { isLoading } = useQuery({
        queryKey: ["logout"],
        queryFn: async () => {
            try {
                // TODO: use appropriate endpoint if added switch account feature
                const response = await axios.post(getUrl(endpoints.logout), {}, {
                    xsrfCookieName: "csrftoken",
                    xsrfHeaderName: "X-CSRFToken",
                    withXSRFToken: true,
                });
                router.push("/login");
                return response
            } catch (error) {
                toast({
                    title: "La déconnexion a échoué",
                    variant: "destructive"
                });
                throw new Error("logout error");
            }
        },
        enabled: loggingOut,
        retry: false,
    });

    function handleClick() {
        setLoggingOut(true);
    }

    return (
        <>
            <Button 
                className={cn(
                    "flex gap-x-2 group",
                    "bg-transparent hover:bg-transparent hover:text-orange-300 w-full",
                    className,
                )}
                disabled={isLoading}
                onClick={handleClick}
                size="sm"
            >

                <MdSwitchAccount/>
                <span>{"Change de compte"}</span>
            </Button>
        </>
    );
}