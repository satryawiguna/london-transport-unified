export type Language = {
    id: number
    slug: string
    title: string
}

export type TopMenu = {
    id: number,
    name: string,
    path?: string,
    childs?: Array<TopMenu>
}
