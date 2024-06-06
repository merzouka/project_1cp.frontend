"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import { useEffect } from "react";
import { Role } from "@/stores/user-store";

function getProfile(role: Role) {
    switch (role) {
        case Role.haaj:
            return "/profile/haaj";
        case Role.drawingManager:
            return "/profile/drawing-manager";
        case Role.doctor:
            return "/profile/doctor"
        case Role.user:
            return "/profile";
        case Role.paymentManager:
            return "/profile/payment-manager";
        case Role.admin:
            return "/profile/admin";
    }
}

export const ProfilePicture = ({ className }: { className?: string }) => {
    const { user, role } = useUser();

    let profile = "/";
    useEffect(() => {
        profile = getProfile(role);
    }, [role])
    return (
        <Button 
            className={cn(
                "flex gap-x-2 group",
                "bg-transparent hover:bg-transparent rounded-full size-10 relative",
                className
            )}
            size={"icon"}
        >
            <Link href={profile}>
                {
                    user.image ? 
                        <Image src={user.image} fill style={{ objectFit: "cover" }} sizes="10vw" className="w-full h-full rounded-full" alt="user photo" />
                        :
                        <VscAccount className="size-8 text-black hover:text-orange-400"/>
                }
            </Link>
        </Button>
    );
}
