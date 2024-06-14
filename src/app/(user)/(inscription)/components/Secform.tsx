// pages/inscription/page2.jsx
import React, { FormEvent, useState } from 'react'
import { useInscriptionStore } from '../components/Store'
import Link from 'next/link'
import { submitInscriptionData } from '../api';
import { useUser } from '@/hooks/use-user';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast"


const InscriptionPage2 = () => {
    const { numeroPortable, numeroPassport, dateExpirationPassport, sexe, idMahram } = useInscriptionStore((state) => state.form)
    const setField = useInscriptionStore((state) => state.setField)
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        setField(e.target.name, e.target.value)
    }

    const [photo, setPhoto] = useState<File[]>([]);
    const handlePhotoChange = (e: any) => {
        setPhoto([e.target.files[0]])
    }

    const formData = useInscriptionStore((state => state.form));
    const [popup, setPopup] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: submitInscriptionData,
        onMutate: () => {
            setPopup(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
            queryKey: ["profile"],
            })
        },
        onError: (error) => {
            toast({
                description: "inscription échoué.",
                variant: "destructive",
            });
            console.log(error);
            setPopup(false);
        }
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        formData.photoPersonnelle = photo[0];
        mutate(formData);
    };

    const { user } = useUser();
    return (
        <>

            <form className="mb-1" onSubmit={handleSubmit}>
                <div className="flex justify-center space-x-[400px] mr-[260px]">
                    <div className="mb-5 w-10">
                        <label htmlFor="number" className="mb-1.5 block  w-40 text-sm text-left" >  Numéro de portable</label>
                        <input name="numeroPortable" value={numeroPortable} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] bg-grey" type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" aria-describedby="helper-text-explanation" placeholder="" id="number" required />
                    </div>
                    <div className="w-10">
                        <label htmlFor="email" className="mb-1.5 block text-center text-sm">  Email</label>
                        <input name="email" disabled value={user.email} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="email" placeholder="" id="email" required />
                    </div>
                </div>
                <div className="flex justify-center space-x-[400px] mr-[260px]">
                    <div className="mb-5 w-10">
                        <label htmlFor="wilaya" className="mb-1.5 block text-center text-sm" > Wilaya </label>
                        <input name="wilaya" disabled value={user.province} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] bg-grey" type="text" placeholder="" id="Wilaya" required />
                    </div>
                    <div className="w-10">
                        <label htmlFor="commune" className="mb-1.5 block text-center text-sm">  commune </label>
                        <input name="commune" disabled value={user.city} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="text" placeholder="" id="commune" required />
                    </div>

                </div>
                <div className="flex justify-center space-x-[400px] mr-[260px] ">
                    <div className="mb-5 w-10">
                        <label htmlFor="np" className="mb-1.5 block  w-40 text-sm text-left">  Numéro de passport</label>
                        <input name="numeroPassport" value={numeroPassport} onChange={handleInputChange} className="py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] mb-1" type="number" placeholder="" id="np" required />
                    </div>
                    <div className="w-10">
                        <label htmlFor="DEP" className="mb-1.5 block text-left text-sm w-40 mt-[1.8px]">  Date d’expiration </label>
                        <input name="dateExpirationPassport" value={dateExpirationPassport} onChange={handleInputChange} className="py-4 border-gray-100 shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="date" placeholder="Date d’expiration" id="DEP" required />
                    </div>
                </div>
                <div className="flex justify-center space-x-[400px] mr-[710px] mb-6">
                    {sexe === 'FM' && (
                        <div className="mb-5 w-10 ml-[450px]">
                            <label htmlFor="idmahram" className="mb-1 block w-40 text-sm text-left">
                                ID du mahram
                            </label>
                            <input
                                name="idMahram"
                                value={idMahram}
                                onChange={handleInputChange}
                                className="py-4 border-gray-100 shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]  "
                                type="number"
                                placeholder=""
                                id="idmahram"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-5 w-10">
                        <label htmlFor="photoPersonnelle" className="mb-1.5 block text-left w-40 text-sm">
                            Photo personnelle
                        </label>
                        <input
                            name="photoPersonnelle"
                            onChange={handlePhotoChange}
                            className="text-transparent border-gray-100 text-center shadow-md focus:border-blue w-[190px] h-[40px] rounded-lg border  mr-1 p-1 text-slate-500 focus:outline-[#EBA565]"
                            type="file"
                            placeholder=""
                            id="photoPersonnelle"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-center ">
                    <button type="submit" className="border-orange-400 shadow-md h-15 mb-5 block w-[340px] rounded-lg border px-4 py-2 text-center font-bold text-black" >
                        Confirmer
                    </button>
                </div>
            </form >
            <div className="flex justify-center ">
                <Link href={"/inscription"} className="font-bold">
                    Cliquez pour aller à la page précédente</Link>
            </div>
            <Toaster />
            {
                popup &&
                    <Popup isLoading={isPending}/>
            }
        </>

    )
}

function Popup({ isLoading }: { isLoading: boolean }) {
    return (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/45 flex justify-center items-center">
            <div className="min-h-[55%] min-w-[50%] rounded-[4rem] bg-white flex flex-col items-center justify-center">
                {
                    isLoading ?
                        <Spinner direction={"col"} size={"xl"} text={"show"} className="text-slate-500" />
                    :
                        <div className="flex flex-col items-center justify-center w-full flex-grow p-5 relative">
                            <div className="relative text-orange-400 mb-20 mt-16">
                                <div className="-translate-x-1/2 -translate-y-1/2 top-0 left-0 size-32 bg-orange-50 absolute rounded-full z-[2]"></div>
                                <div className="-translate-x-1/2 -translate-y-1/2 top-0 left-0 size-28 bg-orange-100 absolute rounded-full z-[3]"></div>
                                <IoIosCheckmarkCircle className="-translate-x-1/2 -translate-y-1/2 top-0 left-0 size-28 absolute z-[4] text-orange-400"/>
                            </div>
                            <h2 className="text-3xl font-bold mb-20">
                                {"Inscription avec succés"}
                            </h2>
                            <Button variant={"outline"} 
                                className="border-2 border-orange-400 hover:bg-orange-400 hover:text-white font-bold text-xl w-8/12 rounded-xl py-6 absolute bottom-10">
                                <Link href="/">{"Revenir à l'acceuil"}</Link>
                            </Button>
                        </div>
                }
            </div>
        </div>
    );
}

export default InscriptionPage2
