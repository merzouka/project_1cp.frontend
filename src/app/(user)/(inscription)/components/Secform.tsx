// pages/inscription/page2.jsx
import React, { FormEvent, useState } from 'react'
import { useInscriptionStore } from '../components/Store'
import Link from 'next/link'
import { submitInscriptionData } from '../api';
import { useUser } from '@/hooks/use-user';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';


const InscriptionPage2 = () => {
    const { numeroPortable, numeroPassport, dateExpirationPassport, sexe, idMahram } = useInscriptionStore()
    const setField = useInscriptionStore((state) => state.setField)
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        setField(e.target.name, e.target.value)
    }
    const handleInputChange2 = (e: any) => {
        setField(e.target.name, e.target.value);
        const { name, value } = e.target;

        if (name === 'dateExpirationPassport') {
            const enteredDate = new Date(value);
            const currentDate = new Date();
            const minDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));

            if (enteredDate < minDate) {
                // Date is less than 6 months from the current date
                alert('Please enter a date that is at least 6 months from today.');
                // Reset the input field value to an empty string or the minimum allowed date
                e.target.value = '';
                // or e.target.value = minDate.toISOString().split('T')[0];
            } else {
                setField(name, value);
            }
        } else {
            setField(name, value);
        }
    };
    const [photo, setPhoto] = useState<File[]>([]);
    const handlePhotoChange = (e: any) => {
        setPhoto([e.target.files[0]])
    }

    const formData = useInscriptionStore((state => state.form))
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(photo);
        try {
            formData.photoPersonnelle = photo[0];

            await submitInscriptionData(formData);
        } catch (error) {
            console.error('Error submitting inscription data:', error);
        }
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
                        <input name="dateExpirationPassport" value={dateExpirationPassport} onChange={handleInputChange2} className="py-4 border-gray-100 shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="date" placeholder="Date d’expiration" id="DEP" required />
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

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit" className="border-orange-400 shadow-md h-15 mb-10 block w-[340px] rounded-lg border px-4 py-2 text-center font-bold text-black" variant="outline">Confirmer</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-center'>Vous avez été ajouté à la liste des inscripteures </AlertDialogTitle>

                            </AlertDialogHeader>
                            <AlertDialogFooter>

                                <AlertDialogAction>

                                    <Link href={'/'}> accueil </Link>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>


            </form >
            <div className="flex justify-center ">
                <Link href={"/inscription"} className="font-bold">
                    Cliquez pour aller à la page précédente</Link>
            </div>
        </>

    )
}

export default InscriptionPage2
