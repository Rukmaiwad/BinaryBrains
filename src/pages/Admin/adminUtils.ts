import React, { JSX } from "react"
import { Dices, MessageCircleQuestionIcon, Newspaper, Notebook, ShieldUser, SquarePlay, User } from "lucide-react"
import { ElementType } from "react"
const AdminPages = React.lazy(() => import("./AdminPages"))


interface AdminMenu {
    option: string,
    identifier: string,
    icon: ElementType
}


export interface AdminPagesType {
    identifier: string,
    icon: ElementType,
    title: string,
    url: string
}

// this array is for showing the menu items to 
export const adminMenuOptions: AdminMenu []= [
    { option: 'Admin Pages', identifier: 'admin_pages', icon: ShieldUser},
    { option: 'Pages Control', identifier: 'pages_control', icon: Notebook },
    { option: 'Role Control', identifier: 'role_control', icon: User }
]

// Map shows identifier -> page property
export const ADMIN_MENU_TO_PAGES_MAP: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
    "admin_pages": AdminPages,
}

export const adminPages: AdminPagesType[] = [
    { identifier: 'mcqs', icon: MessageCircleQuestionIcon, title: "MCQs", url: "/admin/mcqs" },
    { identifier: 'article', icon: Newspaper, title: "Article", url: "/admin/article" },
    { identifier: 'video', icon: SquarePlay, title: "Video", url: "/admin/video" },
    { identifier: 'games', icon: Dices, title: "Games", url: "/admin/games" },
    { identifier: 'games', icon: Dices, title: "Games", url: "/admin/games" },

]