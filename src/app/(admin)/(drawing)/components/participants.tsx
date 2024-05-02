"use client";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUrl } from "@/constants/api";
import { endpoints } from "@/constants/endpoints"
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Participant, ParticipantSkeleton } from "./participant";
import { PiWarningThin } from "react-icons/pi";
import { Toaster } from "@/components/ui/toaster";
import { useDebouncedCallback } from "use-debounce";
import { useUser } from "@/hooks/use-user";

const SearchBar = ({ onChange }: { onChange: (value: string) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string | undefined>(undefined);
    const handleChange = useDebouncedCallback((value: string) => {
        onChange(value);
    }, 500);

    return (
        <div className="flex items-center border border-slate-100 rounded-lg px-2 
            focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 mb-2 md:mb-4
            shadow-md shadow-slate-200
            ">
            <LuSearch className="size-7 text-slate-400" onClick={() => inputRef.current?.focus()}/>
            <Input 
                ref={inputRef}
                className="w-full border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                placeholder="Rechercer"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    handleChange(e.target.value);
                }}
            />
        </div>
    );
}

export const Participants = () => {
    const { toast } = useToast();
    const [isFetching, setIsFetching] = useState(true);
    const { user } = useUser();
    const { isLoading, data, isError, failureCount } = useQuery({
        queryKey: ["participants"],
        enabled: isFetching,
        staleTime: 5 * 60 * 1000,
        queryFn: async () => {
            try {
                setIsFetching(false);
                const response = await axios.get(getUrl(endpoints.participants(user.id)));
                console.log(response.data);
                return response.data;
            } catch (error) {
                if (failureCount == 3) {
                    toast({
                        title: "Erreur de connexion",
                        description: "Impossible de récupérer la liste des participants.",
                        variant: "destructive",
                    });
                }
                throw new Error("fetch failed");
            }
        }
    });
    const [term, setTerm] = useState("");
    const participants = term === "" ? data : data.filter(
        (participant: any) => `${participant.user.first_name} ${participant.user.last_name}`.toLowerCase().includes(term)
    );

    return (
        <> 
            <div className="flex flex-col size-full">
                <SearchBar onChange={setTerm}/>
                <div className="relative grow">
                    <div className={cn(
                        "absolute top-0 right-0 bottom-0 left-0 overflow-y-auto",
                        !isError ? "grid grid-cols-1 md:grid-cols-3 grid-flow-column place-items-start md:place-items-center gap-3"
                            : "flex justify-center items-center",
                    )}>
                        {
                            isLoading && Array(12).fill(0).map((_, i) => {
                                return (
                                    <ParticipantSkeleton key={i} />
                                );
                            })
                        }
                        {
                            isError && 
                                <div className="flex flex-col gap-y-3 text-gray-300 items-center text-4xl">
                                    <PiWarningThin className="size-14 md:size-16"/>
                                    <p>{"Erreur"}</p>
                                </div>
                        }
                        {
                            !isLoading && !isError &&
                                participants?.map((participant: any) => <Participant key={participant.id} participant={{
                                    image: participant.user.personal_picture,
                                    firstName: participant.user.first_name,
                                    lastName: participant.user.last_name,
                                    nin: participant.NIN,
                                }}/>)
                        }
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}