"use client";

import { useToast } from "@/components/ui/use-toast";
import { getUrl } from "@/constants/api";
import { endpoints } from "@/constants/endpoints";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

export const Cities = () => {
    const { toast } = useToast();
    const { user } = useUser();
    const [isFetching, setIsFetching] = useState(true);
    const { isLoading, isError, data, failureCount } = useQuery({
        queryKey: ["cities"],
        queryFn: async () => {
            try {
                setIsFetching(false);
                const response = await axios.get(getUrl(endpoints.profileCitites(user.id)));
                setIsFetching(false);
                return response.data[Object.keys(response.data)[0]];
            } catch (error) {
                if (failureCount == 3) {
                    toast({
                        title: "Erreur de connexion",
                        description: "Impossible de récupérer les communes.",
                        variant: "destructive",
                    });
                }
                throw new Error("connection erorr");
            }
        },
        staleTime: 10 * 60 * 60 * 1000,
        enabled: isFetching,
        retry: 2,
    });
    return (
        <div className="text-slate-400 flex gap-x-2 items-center text-sm flex-wrap">
            {`Les communes concernées sont:`}
            {
                isLoading &&
                <Skeleton className="w-80 h-2 rounded-full inline"/>
            }
            { 
                isError &&
                    "erreur"
            }
            <span>
                {
                    !isLoading && !isError && `${data?.map((city: any) => city).join(", ")}`
                }
            </span>
            <Toaster />
        </div>
    );
}