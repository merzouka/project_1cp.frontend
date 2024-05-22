import { WinnerInfo } from "./winner";
import Image from "next/image";
import { icons } from "@/constants/icons";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useRef } from "react";

export const ChoicePopup = (
    {
        winnerInfo,
        onClose,
        onAccept,
        onDeny,
    }: {
        winnerInfo: WinnerInfo 
        onClose: () => void;
        onAccept: () => void;
        onDeny: () => void;
    }) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={ref}
            onKeyDown={(e) => {
                console.log(e.key);
                if (e.key == "Escape") {
                    onClose();
                }
            }}
            onClick={() => onClose && onClose()}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/45 z-[9999]"
        >
            <div className="max-w-96 rounded-3xl w-full flex flex-col items-center justify-center gap-y-6 bg-white pt-3 md:pt-7 pb-3 px-3">
                <div className="flex flex-col items-center justify-center gap-y-3">
                    <div className="rounded-full size-24 relative">
                        {
                            winnerInfo.image ?
                                <Image 
                                    src={winnerInfo.image}
                                    alt="profile picture"
                                    fill
                                    sizes="(max-width: 768px) 50vw, 75vw"
                                    className="object-fill rounded-full size-full"
                                />:
                                icons.profilePicture(`size-24 rounded-full border-2 ring-offset-1 ${winnerInfo.status == false ? "ring-red-400" : (winnerInfo.status == true ? "ring-emerald-400" : "ring-transparent")} ring-2`)
                        }
                    </div>
                    <span className="text-xl font-semibold">{`${winnerInfo.lastName} ${winnerInfo.firstName}`}</span>
                </div>
                <div className="w-full flex justify-between items-center">
                    <Button 
                        onClick={() => {
                            onAccept();
                            onClose && onClose();
                        }}
                        className="flex items-center justify-center gap-x-2 text-emerald-600 bg-transparent hover:bg-transparent hover:text-emerald-400 font-semibold"
                    >
                        <FaCheckCircle className="size-full" />
                        <span>{"Accepter"}</span>
                    </Button>
                    <Button 
                        onClick={() => {
                            onDeny();
                            onClose && onClose();
                        }}
                        className="flex items-center justify-center gap-x-2 text-red-500 bg-transparent hover:bg-transparent hover:text-red-400 font-semibold"
                    >
                        <IoIosCloseCircle className="size-full"/>
                        <span>{"Refuser"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
