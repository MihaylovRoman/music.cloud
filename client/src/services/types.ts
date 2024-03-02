export type User = {
    id: number
    email: string
    password: string
    login: string 
    basket_id: Basket
    role: Role
    image: string
}
export type Basket = {
    id: number
    user: User
    user_id: number
    User_list_music: User_list_music[]
}
export type User_list_music = {
    music: Music[]
    music_id: number
    basket: Basket[]
    basket_id: number
    
}
export type Music = {
    id: number
    name: string
    playtime: string
    image: string
    url_music: string
    User_list_music: User_list_music[]
    All_music: All_music[]
}

export type Artist = {
    id: number
    nickname: string
    image: string
    artist_music_id: Artist_music_basket

}
export type Artist_music_basket = { 
    id: number
    artist: Artist
    artist_id: number
    All_music: All_music[]
}

export type All_music = {
    music: Music
    music_id: number
    artist_basket: Artist_music_basket
    artist_basket_id: number
}

export enum Role {
    USER, ADMIN
}