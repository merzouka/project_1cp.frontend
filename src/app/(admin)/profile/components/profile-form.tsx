"use client";
import { useRegionSelect } from "@/app/components/hooks/use-region-select";
import { ProvinceSelect } from "@/app/components/province-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";
import { icons } from "@/constants/icons";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { z } from "zod";
import { EditableInput } from "./editable-input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AxiosInstance } from "@/config/axios";
import { getUrl } from "@/constants/api";
import { endpoints } from "@/constants/endpoints";
import { isAxiosError } from "axios";
import { useUserStore } from "@/stores/user-store";
import { CitySelect } from "@/app/components/city-select";
import { PhoneInput } from "./phone-input";
import { ImagePicker } from "./image-picker";

const formSchema = z.object({
    firstName: z.string({ required_error: "Veuillez saisir votre prénom." }),
    lastName: z.string({ required_error: "Veuillez saisir votre nom." }),
    email: z.string({ required_error: "Veuillez remplir votre email."}).email({
        message: "Veuillez saisir un email valide." 
    }),
    city: z.string({
        required_error: "Veuillez spécifier votre commune." 
    }).regex(new RegExp(/[0-9]+/), {
        message: "Veuillez spécifier votre commune."
    }),
    province: z.string({
        required_error: "Veuillez spécifier votre wilaya." 
    }).regex(new RegExp(/[0-9]+/), {
        message: "Veuillez spécifier votre wilaya.",
    }),
    phone: z.string({
        required_error: "Veuillez saisir un numéro de téléphone valide." 
    }).regex(new RegExp(/[0-9]{7,}/), {
        message: "Veuillez saisir un numéro de téléphone valide.",
    }),
});

export const ProfileForm = () => {
    const { user } = useUser();
    const setUser = useUserStore((state) => state.setUser);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            province: `${user.province || ""}`,
            phone: user.phone.includes("-") ? user.phone.split("-")[1] : user.phone,
        }
    });

    const { toast } = useToast();
    const [entries, setEntries] = useState<z.infer<typeof formSchema>>();
    const [phone, setPhone] = useState(user.phone);
    const [isFetching, setIsFetching] = useState(false);
    const { isLoading, failureCount } = useQuery({
        queryKey: ["profile", "update"],
        enabled: isFetching,
        queryFn: async () => {
            try {
                setIsFetching(false);
                const response = await AxiosInstance.post(getUrl(endpoints.profileUpdate), {
                    first_name: entries?.firstName,
                    last_name: entries?.lastName,
                    baladiyat: Number(entries?.city),
                    email: entries?.email,
                    image: image,
                }, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                setUser({
                    ...user,
                    firstName: entries?.firstName || user.firstName,
                    lastName: entries?.lastName || user.lastName,
                    city: entries?.city || user.city,
                    province: Number(entries?.province) || user.province,
                    phone: phone,
                    role: user.role.toString(),
                });
                setHasChanged(false);
                return response;
            } catch (error) {
                if (failureCount < 3) {
                    throw new Error("error");
                }
                if (isAxiosError(error) && error.response) {
                    toast({
                        description: "Cet email est déja utilisé.",
                        variant: "destructive",
                    });
                    throw new Error("invalid email");
                }
                toast({
                    title: "Erreur de connexion",
                    description: "Nous ne pouvons pas enregistrer vos modifications.",
                    variant: "destructive",
                });
                throw new Error("connection error");
            }
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setEntries(values);
        setIsFetching(true);
    }

    const {
        province,
        handleProvinceChange,
        handleCityChange 
    } = useRegionSelect(user.province);
    const [disableRegion, setDisableRegion] = useState(true);
    const [hasChanged, setHasChanged] = useState(false);
    const [image, setImage] = useState<File>();
    return (
        <div className="p-5 overflow-y-scroll">
            <ImagePicker 
                className="mx-5 mb-2"
                defaultImage={user.image}
                onChange={setImage}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:row-span-2">
                    <div className="flex flex-col w-full max-w-[33rem] md:flex-row items-stretch md:items-center justify-stretch gap-x-3">
                        <FormField 
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel>{"Nom"}</FormLabel>
                                    <FormControl>
                                        <EditableInput 
                                            className="max-w-[33rem]"
                                            onChange={(value) => {
                                                setHasChanged(true);
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel>{"Prénom"}</FormLabel>
                                    <FormControl>
                                        <EditableInput 
                                            className="max-w-[33rem]"
                                            onChange={(value) => {
                                                setHasChanged(true);
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-2">
                                <FormLabel>{"Email"}</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-2 w-full max-w-[33rem] relative">
                                        <EditableInput 
                                            className="max-w-[33rem]"
                                            onChange={(value) => {
                                                setHasChanged(true);
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                            disabled={field.disabled}
                                        />
                                        <BsFillPatchCheckFill 
                                            className={cn(
                                                "absolute right-0 translate-x-[120%] md:translate-x-[150%]" ,
                                                user.emailVerified ? "text-emerald-400" : "text-slate-200",
                                            )} 
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <PhoneInput 
                                    onPhoneChange={(value) => setPhone(value)}
                                    onPhoneNumberChange={field.onChange}
                                    phoneValue={field.value}
                                    disabled={field.disabled}
                                    control={(children) => (
                                        <FormControl>
                                            {children}
                                        </FormControl>
                                    )}
                                    styles={{
                                        container: "mb-2"
                                    }}
                                />
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <span className="text-sm font-medium mb-2 block">
                        {"Région"}
                    </span>
                    <div className={cn(
                        "p-2 md:p-4 md:pt-5 pt-5 border border-slate-300 rounded-2xl flex-grow max-w-[33rem] relative",
                        "mb-2 md:mb-3"
                    )}>
                        <div className="flex items-center justify-end absolute top-0 right-2">
                            <Toggle 
                                onPressedChange={() => setDisableRegion(!disableRegion)}
                                size={"sm"}
                                className="bg-transparent hover:bg-transparent [state=on]:text-black text-slate-400
                                data-[state=on]:bg-transparent"
                            >
                                {icons.modify("size-5")}
                            </Toggle>
                        </div>
                        <FormField 
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{"Wilaya"}</FormLabel>
                                    <ProvinceSelect
                                        onChange={handleProvinceChange((value) => {
                                            setHasChanged(true);
                                            field.onChange(value);
                                        })}
                                        defaultValue={`${field.value}`}
                                        control={(children) => (
                                            <FormControl>
                                                {children}
                                            </FormControl>
                                        )}
                                        disabled={disableRegion}
                                        className="rounded-xl"
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{"Commune"}</FormLabel>
                                    <CitySelect
                                        onChange={handleCityChange((value) => {
                                            setHasChanged(true);
                                            field.onChange(value);
                                        })}
                                        province={province}
                                        defaultValue={`${field.value}`}
                                        control={(children) => (
                                            <FormControl>
                                                {children}
                                            </FormControl>
                                        )}
                                        disabled={disableRegion}
                                        className="rounded-xl"
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                        disabled={!hasChanged || isLoading}
                        className="max-w-[33rem] bg-black hover:bg-black/75 w-full font-bold rounded-2xl"
                    >
                        {"Enregistrer"}
                    </Button>
                </form>
                <Toaster />
            </Form>
        </div>
    );
}