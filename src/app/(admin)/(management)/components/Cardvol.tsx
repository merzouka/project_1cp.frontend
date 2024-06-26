"use client"
import * as React from "react"
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "@/config/axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { getUrl } from "@/constants/api";
import { endpoints } from "@/constants/endpoints";
import { useToast } from "@/components/ui/use-toast";

const aeroports: readonly [string, ...string[]] = [ "Alger", "Oran", "Chlef", "Annaba", ]

const formSchema = z.object({
    title: z.string({ required_error: "Veuillez saisir le titre du vol." }),
    aeroport: z.enum(aeroports, { required_error: "Veuillez spécifier l'aéroport." }),
    places: z.string({ required_error: "Veuillez saisir le nombre de places." }).regex(new RegExp(/[0-9]+/), {
        message: "Veuillez saisir le nombre de places.",
    }),
    departureDate: z.date({ required_error: "Veuillez spécifier le date de départ." }),
    departureTime: z.string({ required_error: "Veuillez spécifier le date de départ." }).regex(new RegExp(/[0-9]{2}:[0-9]{2}/), {
        message: 'Veuillez utiliser le format 00:00.'
    }),
    arrivalDate: z.date({ required_error: "Veuillez spécifier le date d'arrivé." }),
    arrivalTime: z.string({ required_error: "Veuillez spécifier le date d'arrivé." }).regex(new RegExp(/[0-9]{2}:[0-9]{2}/), {
        message: 'Veuillez utiliser le format 00:00.'
    }),
})
.refine((data) => {
    const result = new Date(`${format(data.arrivalDate, 'yyyy-MM-dd')} ${data.arrivalTime}`) 
    > new Date(`${format(data.departureDate, 'yyyy-MM-dd')} ${data.departureTime}`)
    console.log(result);
    return result;
}, 
    {
        message: "Temps de départ doit être antérieure au temps d'arrivée.",
        path: ["departureDate"]
    });


export function AlertDialogDemo() {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { isPending, mutate } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await AxiosInstance.post(getUrl(endpoints.createFlight), {
                nom: values.title,
                aeroprt: values.aeroport,
                date_depart: format(values.departureDate, "yyyy-MM-dd"),
                heur_depart: values.departureTime,
                date_arrivee: format(values.arrivalDate, "yyyy-MM-dd"),
                heur_arrivee : values.arrivalTime,
                nb_places: Number(values.places),
            });
            return response.data;
        },
        onSuccess: () => {
            toast({
                description: "Le vols a été crée avec succés.",
            });
            setIsOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["vols"],
            });
            form.reset();
        },
        onError: () => {
            toast({
                description: "Nous ne pouvons pas créer le vol.",
                title: "Erreur de connexions",
                variant: "destructive",
            });
            // setIsOpen(false);
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline" className="font-semibold bg-[#1E1E1E] rounded-[30px] text-white w-[133px] mb-2" >Ajouter</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl border-transparent min-h-[33rem] max-w-[40rem]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full flex flex-col items-stretch justify-between">
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{"Titre"}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="rounded-2xl"
                                            placeholder="Veuillez entrer le titre du vol"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="aeroport"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{"Nombre de places"}</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="rounded-2xl">
                                                <SelectValue placeholder="Veuillez choisir un aèroport"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    aeroports.map(aeroport => (
                                                        <SelectItem key={aeroport} value={aeroport}>{aeroport}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="places"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{"Nombre de places"}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="rounded-2xl"
                                            placeholder="Veuillez entrer le nombre de places"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 grid-rows-2 items-center justify-stretch grid-flow-col gap-x-2 mb-2">
                            <FormField 
                                control={form.control}
                                name="departureDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Date de départ"}</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            className="w-full rounded-2xl bg-white text-black border border-slate-200 hover:bg-white hover:text-black/75"
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                    <span>{"Choisir une date"}</span>
                                                                )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="arrivalDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Date d'arrivée"}</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            className="w-full rounded-2xl bg-white text-black border border-slate-200 hover:bg-white hover:text-black/75"
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                    <span>{"Choisir une date"}</span>
                                                                )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="departureTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Heure de départ"}</FormLabel>
                                        <FormControl>
                                            <Input 
                                                className="rounded-2xl"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="arrivalTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Heure d'arrivée"}</FormLabel>
                                        <FormControl>
                                            <Input 
                                                className="rounded-2xl"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="rounded-xl bg-black text-white hover:bg-black/75 font-bold"
                        >
                            {"Enregistrer"}
                        </Button>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// function Old() {
//
    // /////////////////////////////////////////
    // const [isOpen, setIsOpen] = useState(false)
    // const [volData, setvolData] = useState({ name: '', framework: '', nbplace: '', calendara: '', calendarb: '', depheure: '', arheure: '' })
    // const queryClient = useQueryClient()
    //
    // const addVol = async (volData: any) => {
    //     try {
    //         const response = await AxiosInstance.post('http://localhost:8000/administrateur/add-vole', {
    //             nom: volData.name,
    //             aeroprt: volData.framework,
    //             'date_depart': volData.calendara,
    //             'date_arrivee': volData.calendarb,
    //             'nb_places': volData.nbplace,
    //             'heur_depart': volData.depheure,
    //             'heur_arrivee': volData.arheure,
    //
    //         });
    //         return response;  // Already just the data due to our interceptor
    //     } catch (error) {
    //         throw error;  // Rethrow for React Query to catch
    //     }
    // };
    //
    // const mutation = useMutation({
    //     mutationFn: addVol,
    //     onSuccess: (data) => {
    //         console.log('vol added:', data)
    //         queryClient.invalidateQueries({ queryKey: ['vols'] })
    //         setIsOpen(false)
    //         setvolData({ name: '', framework: '', nbplace: '', calendara: '', calendarb: '', depheure: '', arheure: '' })
    //         // Nice success toast
    //     },
    //     onError: (error) => {
    //         console.error('Failed to add hotel:', error.message)
    //         // Show error in a toast
    //     }
    // })
    //
    // const handleChange = (field: any) => (e: any) => {
    //     setvolData(prev => ({ ...prev, [field]: e.target.value }))
    // }
    //
    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //
    //     mutation.mutate(volData)
    // }
    // /////////////////////////////////////////////////////
    // const [date, setDate] = useState<Date | undefined>();
    // const [otherDate, setOtherDate] = useState<Date | undefined>();
//     return (
//                         <form onSubmit={handleSubmit} >
//                             <div className="grid w-full items-center gap-4">
//                                 <div className="flex flex-col space-y-1.5  ">
//                                     <label htmlFor="name">Titre</label>
//                                     <input className="flex flex-col space-y-1.5 p-9  h-10 w-full items-center justify-between rounded-[15px] border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed
//                                      disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950
//                                       dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
//                                         id="name"
//                                         placeholder="Veuillez entrer le nombre des place"
//                                         value={volData.name}
//                                         onChange={handleChange('name')}
//                                         required />
//                                 </div>
//                             </div>
//
//                             <div className="flex flex-col space-y-1.5 mt-4 mb-4 rounded-[15px]">
//                                 <label htmlFor="framework" className="ml-1">Aéroport</label>
//                                 <Select >
//                                     <SelectTrigger id="framework" className="rounded-[15px]" value={volData.framework}
//                                         onChange={handleChange('framework')}
//                                     >
//                                         <SelectValue placeholder="Veuillez choisir l’aéroport" />
//                                     </SelectTrigger>
//                                     <SelectContent position="popper"  >
//                                         <SelectItem value="next">oran</SelectItem>
//                                         <SelectItem value="sveltekit">alger</SelectItem>
//                                         <SelectItem value="astro">annaba</SelectItem>
//                                         <SelectItem value="nuxt">chlef</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//
//
//                             <div>
//
//
//                                 <div className="flex flex-col space-y-1.5 mb-3 ">
//                                     <label htmlFor="nbplace" className="ml-1">Nombre de places</label>
//                                     <input className=" mb-14 flex flex-col space-y-1.5   h-10 w-full items-center justify-between rounded-[15px]
//                                      border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white placeholder:text-slate-500 
//                                      focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed 
//                                      disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 
//                                      dark:placeholder:text-slate-400 dark:focus:ring-slate-300" id="nbplace"
//                                         placeholder="Veuillez entrer le nombre des places" type="number"
//                                         value={volData.nbplace}
//                                         onChange={handleChange('nbplace')}
//                                         required
//                                     />
//                                 </div>
//
//                             </div>
//                             <div className="flex justify-between mb-3">
//                                 <Label className="ml-1">Heure de départ </Label>
//                                 <Label className="mr-[105px] ml-10 ">Heure d’arrivée  </Label>
//                             </div>
//                             <div className="flex  mb-[-30px] ">
//                                 <input className="w-[580px]  justify-start mb-10 space-y-1.5   h-10 w-full items-center justify-between rounded-[15px]
//                                      border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white placeholder:text-slate-500 
//                                      focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed 
//                                      disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 
//                                      dark:placeholder:text-slate-400 dark:focus:ring-slate-300" id="nbplace" placeholder="" type="depheure"
//                                     value={volData.depheure}
//                                     onChange={handleChange('depheure')}
//                                     required
//                                 />
//                                 <input className=" w-[580px] ml-5 justify-end  flex flex-col space-y-1.5   h-10 w-full items-center justify-between rounded-[15px]
//                                      border border-slate-200 bg-white px-3 py-2 text-xs ring-offset-white placeholder:text-slate-500 
//                                      focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed 
//                                      disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 
//                                      dark:placeholder:text-slate-400 dark:focus:ring-slate-300" id="nbplace" placeholder="" type="arheure"
//                                     value={volData.arheure}
//                                     onChange={handleChange('arheure')}
//                                     required
//                                 />
//
//                             </div>
//                             <div className="flex justify-between mb-3">
//                                 <Label className="ml-1">Date de départ</Label>
//                                 <Label className="mr-[105px] ml-10">Date de départ</Label>
//                             </div>
//
//                             <div className="flex justify-between mb-[-20px]  ">
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             value={volData.calendara}
//                                             onChange={handleChange('calendara')}
//
//                                             variant={"outline"}
//                                             className={cn(
//                                                 "w-[280px] mr-5  rounded-[15px] justify-start text-left font-normal",
//                                                 !date && "text-muted-foreground"
//                                             )}
//                                         >
//                                             <CalendarIcon className="mr-2 h-4 w-4 " />
//                                             {date ? format(date, "PPP") : <span>Pick a date</span>}
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0 mr-5">
//                                         <Calendar
//                                             id="calendara"
//                                             mode="single"
//                                             selected={date}
//                                             onSelect={setDate}
//                                             initialFocus
//
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             value={volData.calendarb}
//                                             onChange={handleChange('calendarb')}
//                                             variant={"outline"}
//                                             className={cn(
//                                                 "w-[280px] justify-start  rounded-[15px] text-left font-normal",
//                                                 !date && "text-muted-foreground"
//                                             )}
//                                         >
//                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                             {otherDate ? format(otherDate, "PPP") : <span>Pick a date</span>}
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0 ">
//                                         <Calendar
//                                             id="calendarb"
//                                             mode="single"
//                                             selected={otherDate}
//                                             onSelect={setOtherDate}
//                                             initialFocus
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                             </div>
//                         </form>
//
//     );
// }
