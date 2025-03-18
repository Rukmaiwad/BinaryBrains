import { JSX, lazy } from "react"
const MCQs = lazy(() => import("@/pages/MCQs/MCQs"));

export enum PERMISSIONS {
    READ   =  "read",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}

export const USER_ALLOWED_ROUTES: Record<string, { route: string; permissions: string[] }> = {
    "USERS": {
        route: "/users",
        permissions: ['read']
    },
    "MCQS": {
        route: "/mcqs",
        permissions: ["read", "create"]
    }
} as const


export const KEY_TO_PAGE_MAP: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
    MCQS: MCQs
}