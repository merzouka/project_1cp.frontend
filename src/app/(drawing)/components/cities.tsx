"use client";

import { useToast } from "@/components/ui/use-toast";
import { endpoints, getUrl } from "@/constants/api";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useCitiesStore } from "@/app/(drawing)/stores/cities";
import { Toaster } from "@/components/ui/toaster";

export const Cities = () => {
    const { toast } = useToast();
    const setCities = useCitiesStore((state) => state.setCities);
    const { user } = useUser();
    // TODO: get info from user without request
    // TODO: make true
    const [isFetching, setIsFetching] = useState(true);
    const { isLoading, isError, data, failureCount } = useQuery({
        queryKey: ["cities", user.id],
        queryFn: async () => {
            try {
                setIsFetching(false);
                return [
                    {
                        id: 1,
                        name: "Algiers",
                        wilaya: 16
                    },
                    {
                        id: 2,
                        name: "Oran",
                        wilaya: 31
                    },
                    {
                        id: 3,
                        name: "Constantine",
                        wilaya: 25
                    }
                ];
                /* const response = await axios.get(getUrl(endpoints.profileCitites(user.id)));
                setIsFetching(false);
                setCities(response.data);
                return response.data; */
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
        enabled: isFetching,
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
                    // TODO: change name to appropriate field
                    !isLoading && !isError && `${data?.map((city: any) => city.name).join(", ")}`
                }
            </span>
            <Toaster />
        </div>
    );
}
