// pages/inscription/page3.jsx
"use client"
import React, { FormEvent } from 'react'

import { useInscriptionStore } from '../components/Store'
import Link from 'next/link'
import { submitInscriptionData } from '../api'

const InscriptionPage3 = () => {
    const {
        numeroPortableMahram,
        emailMahram,
        wilayaMahram,
        commune,
        numeroPassportMahram,
        dateExpirationPassportMahram,
        idMahram,
        photoPersonnelleMahram,

    } = useInscriptionStore()
    const setField = useInscriptionStore((state) => state.setField)

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        setField(e.target.name, e.target.value)
    }

    const handlePhotoChange = (e: any) => {
        setField('photoPersonnelleMahram', e.target.files[0])
    }
    const formData = useInscriptionStore((state => state.form))
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(formData);
        try {
            await submitInscriptionData(formData);
        } catch (error) {
            console.error('Error submitting inscription data:', error);
        }
    };
    return (
        <>

            <form className="mb-1" onSubmit={handleSubmit}>

                <div className="flex justify-center space-x-[400px] mr-[260px]">
                    <div className="mb-5 w-10">
                        <label htmlFor="number" className="mb-1.5 block  w-40 text-sm text-left" >  Numéro de portable</label>
                        <input name="numeroPortableMahram" value={numeroPortableMahram} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] bg-grey" type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" aria-describedby="helper-text-explanation" placeholder="" id="number" required />
                    </div>
                    <div className="w-10">
                        <label htmlFor="email" className="mb-1.5 block text-center text-sm">  Email</label>
                        <input name="emailMahram" value={emailMahram} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="email" placeholder="" id="email" required />
                    </div>
                </div>
                <div className="flex justify-center space-x-[400px] mr-[260px]">
                    <div className="mb-5 w-10">
                        <label htmlFor="wilaya" className="mb-1.5 block text-center text-sm" > Wilaya </label>
                        <input name="wilayaMahram" value={wilayaMahram} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] bg-grey" type="text" placeholder="" id="Wilaya" required />
                    </div>
                    <div className="w-10">
                        <label htmlFor="commune" className="mb-1.5 block text-center text-sm">  commune </label>
                        <input name="prenomArabeMahram" dir="rtl" lang="ar" value={commune} onChange={handleInputChange} className=" py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="text" placeholder="" id="commune" required />
                    </div>

                </div>
                <div className="flex justify-center space-x-[400px] mr-[260px] ">
                    <div className="mb-5 w-10">
                        <label htmlFor="np" className="mb-1.5 block  w-40 text-sm text-left">  Numéro de passport</label>
                        <input name="numeroPassportMahram" value={numeroPassportMahram} onChange={handleInputChange} className="py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] mb-1" type="number" placeholder="" id="np" required />
                    </div>
                    <div className="w-10">
                        <label htmlFor="DEP" className="mb-1.5 block text-left text-sm w-40 mt-[1.8px]">  Date d’expiration </label>
                        <input name="dateExpirationPassportMahram" value={dateExpirationPassportMahram} onChange={handleInputChange} className="py-4 border-gray-100 shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565]" type="date" placeholder="Date d’expiration" id="DEP" required />
                    </div>
                </div>
                <div className=" flex justify-center space-x-[400px] mr-[260px] mb-6">
                    <div className="mb-5 w-10">
                        <label htmlFor="idmahram" className="mb-1.5 block  w-40 text-sm text-left">   ID du mahram </label>
                        <input name="idMahram" value={idMahram} onChange={handleInputChange} className="py-4 border-gray-100  shadow-md focus:border-blue w-[340px] h-7 rounded-lg border p-2 text-left text-slate-500 focus:outline-[#EBA565] mb-1" type="number" placeholder="" id="idmahram" required />
                    </div>
                    <div className="mb-6 w-10">
                        <label htmlFor="picture" className="mb-1.5 block text-left w-40 text-sm" >   Photo personnelle </label>
                        <input onChange={handlePhotoChange} value={photoPersonnelleMahram} name="photoPersonnelleMahram" className="text-transparent border-gray-100 text-center shadow-md focus:border-blue w-[154px] h-[40px] rounded-lg border p-1 text-slate-500 focus:outline-[#EBA565]" type="file" placeholder="" id="picture" required />
                    </div>

                </div>
                <div className="flex justify-center ">
                    <button type="submit" className="border-orange-400 shadow-md h-15 mb-5 block w-[340px] rounded-lg border px-4 py-2 text-center font-bold text-black" >
                        Confirmer
                    </button>
                </div>

            </form>
            <div className="flex justify-center ">
                <Link href={"/inscription"} className="font-bold">
                    Cliquez pour aller à la page précédente</Link>
            </div>
        </>
    )
}
export default InscriptionPage3



