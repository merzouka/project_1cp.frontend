import { z } from "zod";
import { registerSchema3 } from "../constants/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectContent } from "@radix-ui/react-select";
import { InputCalendar } from "@/components/ui/input-calendar";

export default function FormStep3({ props }: { props: { next: () => void; previous: () => void } }) {

    const form = useForm<z.infer<typeof registerSchema3>>({
        resolver: zodResolver(registerSchema3),
        defaultValues: {

        }
    });

    function onSubmit(values: z.infer<typeof registerSchema3>) {
        props.next();
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField 
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Nom*</FormLabel>
                            <FormControl>
                                <Input
                                    autoFocus
                                    placeholder="Entrez votre nom"
                                    className="bg-transparent border border-slate-300 rounded-full"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs"/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Pr&eacute;nom*</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-transparent border border-slate-300 rounded-full"
                                    placeholder="Entrez votre prénom"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs"/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="mb-2">
                            <FormLabel>Date de naissance*</FormLabel>
                            <FormControl>
                                <InputCalendar 
                                    className={{ button: "border-slate-400 text-slate-300" }} 
                                    value={field.value} 
                                    onChange={field.onChange} 
                                />
                            </FormControl>
                            <FormMessage className="text-xs"/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel>Sexe*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="rounded-full border-slate-300">
                                        <SelectValue placeholder="Sélectionnez votre sexe"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black" onFocus={() => console.log("hello")}>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-xs"/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="rounded-full bg-black hover:bg-black/70 w-full font-bold">
                    Continuer
                </Button>
            </form>
        </Form>
    );
}


