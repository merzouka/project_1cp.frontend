import { create } from "zustand";

export enum Role {
    haaj,
    drawingManager,
    superAdmin,
    doctor,
    user,
    paymentManager,
    admin,
}

const roleMapping = {
    "user": Role.user,
    "administrateur": Role.admin,
    "responsable tirage": Role.drawingManager,
    "medecin": Role.doctor,
    "Hedj": Role.haaj,
    "banquier": Role.paymentManager,
}

export function getRoleMap(role: Role): string {
    return Object.keys(roleMapping).find((key) => roleMapping[key as keyof typeof roleMapping] == role) || "user";
}

export function getRole(role: string): Role {
    if (!Object.keys(roleMapping).includes(role)) {
        throw new Error("invalid role");
    }
    return roleMapping[role as keyof typeof roleMapping];
}

export interface UserInfo {
    id?: string | number | undefined;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: Date | undefined;
    city: number | undefined;
    province: number | undefined;
    gender: "male" | "female" | undefined;
    image?: string | undefined;
    emailVerified?: boolean;
    isLoggedIn: boolean;
    status?: {
        registration: boolean;
        drawing: boolean;
        appointment: boolean;
        payment: boolean;
        booking: boolean;
        done: boolean;
    }
}

export interface User {
    user: UserInfo
}

interface Actions {
    setUser: (user: {
        id?: string | number | undefined;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
        phone: string;
        dateOfBirth: Date | undefined;
        city: number | undefined;
        province: number | undefined;
        gender: "male" | "female" | undefined;
        image?: string | undefined;
        emailVerified?: boolean;
        isLoggedIn: boolean;
        status?: {
            registration: boolean;
            drawing: boolean;
            appointment: boolean;
            payment: boolean;
            booking: boolean;
            done: boolean;
        }
    }) => void;
    emptyUser: () => void;
}

export const useUserStore = create<User & Actions>((set) => ({
    user: {
        id: undefined,
        email: "",
        role: Role.user,
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: undefined,
        city: undefined,
        province: undefined,
        gender: undefined,
        image: undefined,
        emailVerified: false,
        isLoggedIn: false,
        status: undefined
    },
    setUser: (user) => set({ user: {
        ...user,
        role: getRole(user.role),
    } }),
    emptyUser: () => set({ user: { 
        id: undefined,
        email: "",
        role: Role.user,
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: undefined,
        city: undefined,
        province: undefined,
        gender: undefined,
        image: undefined,
        emailVerified: false,
        isLoggedIn: false,
        status: undefined,
    }})
}));

