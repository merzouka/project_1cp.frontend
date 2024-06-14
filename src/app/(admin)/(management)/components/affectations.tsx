"use client"
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/components/ui/use-toast";
import { getUrl } from "@/constants/api";
import { endpoints } from "@/constants/endpoints";
import { AxiosInstance } from "@/config/axios";
import { Toaster } from "@/components/ui/toaster";
import { Pages } from "@/constants/pages";

export type af = {
    N: string,
    Nom: string,
    Prénom: string,
    Email: string,
}

export function DataTableDemoaf() {
    const [selectedData, setSelectedData] = React.useState<{ flightId: string | undefined, hotelId: string | undefined }[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    function setReserve(index: number, data: {
    flightId: string | undefined,
    hotelId: string | undefined,
    }) {
        const newData = [...selecteData];
        newData[index] = data;
        setSelectedData(newData);
    }
    const columns: ColumnDef<af>[] = [

        {
            accessorKey: "N",
        header: () => {
            return (
                <div className="text-black font-semibold">N</div>
            )
        },
            cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("N")}</div>,
        },
        {
            accessorKey: "Nom",
            header: () => {
                return (
                    <div className="text-black font-semibold">Nom</div>
                )
            },
            cell: ({ row }) => <div className="lowercase font-medium">{row.getValue("Nom")}</div>,
        },
        {
            accessorKey: "Prénom",
            header: () => {
                return (
                    <div className="text-black font-semibold">Prénom</div>
                )
            },
            cell: ({ row }) => <div className="lowercase font-medium">{row.getValue("Prénom")}</div>,
        },
        {
            accessorKey: "Email",
            header: () => {
                return (
                    <div className="text-black font-semibold">Email</div>
                )
            },
            cell: ({ row }) => <div className="lowercase font-medium">{row.getValue("Email")}</div>,
        },
        {
            id: "Vols",
            accessorKey: "Vols",
            header: () => {
                return (
                    <div className="text-black font-semibold">Vols</div>
                )
            },
            enableHiding: false,
            cell: ({ row }) => {
                const af = row.original
                const index = Number(row.getValue('N'));
                const data = selectedData[index];
                return (
                    <Select defaultValue={row.getValue('Vols')?.id} onValueChange={(value) => setReserve(index, { ...data, flightId: value })}>
                        <SelectTrigger className="w-[100px] shadow-md" disabled={!flights}>
                            <SelectValue placeholder="Vols" />
                        </SelectTrigger>
                        <SelectContent>
                            {flights?.map((flight: any) => {
                                return <SelectItem key={flight.id} value={flight.id}>{flight.name}</SelectItem>
                            })}
                        </SelectContent>
                    </Select>

                )
            },
        },
        {
            id: "Hotels",
            accessorKey: "Hotels",
            header: () => {
                return (
                    <div className="text-black font-semibold">Hotels</div>
                )
            },
            enableHiding: false,
            cell: ({ row }) => {
                const af = row.original
                const index = Number(row.getValue('N'));
                const data = selectedData[index];

                return (
                    <Select defaultValue={row.getValue('Hotels')?.id} onValueChange={(value) => setReserve(index, { ...data, hotelId: value })}>
                        <SelectTrigger className="w-[100px] shadow-md" disabled={!hotels}>
                            <SelectValue placeholder="Hotels" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                hotels.map((hotel: any) => {
                                    return <SelectItem key={hotel.id} value={hotel.id}>{hotel.name}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>
                )
            },
        },
        {
            id: "actions",
            accessorKey: "actions",
            header: () => {
                return (
                    <div className="text-black font-semibold">actions</div>
                )
            },
            enableHiding: false,
            cell: ({ row }) => {
                const af = row.original
                const index = Number(row.getValue('N'));
                return (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => mutate(index)}
                            className="px-2 py-1 bg-[#FFE9D5] text-black rounded-[30px] font-semibold"
                        >
                            Sauvegarde
                        </button>
                    </div>
                )
            },
        },
    ]

    const { user, useValidateAccess } = useUser();
    useValidateAccess(Pages.hodjadj);
    const { toast } = useToast();
    const { data: hodjadj, isLoading: isHadjFetching } = useQuery({
        retry: 0,
        queryKey: ["bookings", "hodjadj", user.email],
        queryFn: async () => {
            try {
                const response = await AxiosInstance.get(getUrl(endpoints.getHodjadj));
                const ids: {flightId: string | undefined; hotelId: string | undefined} = [];
                const data = response.data.map((hadj: {
                    id: number;
                    email: string;
                    firstName: string;
                    lastName: string;
                    flight?: {
                        id: number;
                        name: string;
                    },
                    hotel?: {
                        id: number;
                        name: string;
                    },
                }, index: number) => { 
                        ids.push({
                            flighId: flight?.id || undefined,
                            hotelId: hotel?.id || undefined,
                        });
                        return {
                            N: index,
                            Nom: hadj.lastName,
                            Prénom: hadj.firstName,
                            Email: hadj.email,
                            flight: hadj.flight ? { id: hadj.flight.id, name: hadj.flight.name, } : undefined,
                            hotel: hadj.hotel ? { id: hadj.hotel.id, name: hadj.hotel.name, } : undefined,
                        }
                    });
                setSelectedData(ids);
                return data;
            } catch (error) {
                toast({
                    title: "Erreur de connexion",
                    description: "Nous ne pouvons pas récupérer les pélèrins.",
                    variant: "destructive",
                });
            }
        }
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (index: number) => {
            const data = selectedData[index];
            const hadj = hodjadj[index];
            const respnose = await AxiosInstance.post(getUrl(endpoints.assignHadj), {
                winner_id: hadj.id,
                hotel_id: data.hotelId ? Number(data.hoteId): undefined,
                vol_id: data.flightId ? Number(data.flightId): undefined,
            });
            return response.data;
        },
        onSucces: () => {
            toast({
                description: "succés",
            });
            queryClient.invalidateQueries({
                queryKey: ["bookings", "hodjadj", user.email],
            });
        },
        onError: () => {
            toast({
                description: "échec"
            })
        }})

    const { data: flights, isLoading: isFlightsFetching } = useQuery({
        retry: 0,
        queryKey: ["bookings", "flights"],
        queryFn: async () => {
            try {
                const response = await AxiosInstance.get(getUrl(endpoints.flights));
                return response.data.map((flight: any) => ({
                    id: flight.id,
                    name: flight.nom,
                }));
            } catch (error) {
                toast({
                    title: "Erreur de connexion",
                    description: "Nous ne pouvons pas récupérer les pélèrins.",
                    variant: "destructive",
                });
            }
        }
    });

    const { data: hotels, isLoading: isHotelsFetching } = useQuery({
        retry: 0,
        queryKey: ["bookings", "flights"],
        queryFn: async () => {
            try {
                const response = await AxiosInstance.get(getUrl(endpoints.hotels));
                return response.data.map((hotel: any) => ({
                    id: hotel.id,
                    name: hotel.nom,
                }));
            } catch (error) {
                toast({
                    title: "Erreur de connexion",
                    description: "Nous ne pouvons pas récupérer les pélèrins.",
                    variant: "destructive",
                });
            }
        }
    });
    const table = useReactTable({
        data: hodjadj || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <>

            <div className="w-full  mt-[60px]">
                <div className="font-semibold ml-10 text-3xl mt-10 mb-[50px]">
                    Les pélèrins
                </div>


                <div className="rounded-[25px] mr-8 ml-8 border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="w-full flex items-center justify-center">
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

