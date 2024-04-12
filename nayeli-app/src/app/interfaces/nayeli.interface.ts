export interface User {
    address: string;
    bag_list: Product[];
    email: string;
    favs_list: Product[];
    id: number;
    username: string;
}

export interface Product {
    brand: string;
    categories: Category[];
    id: number;
    name: string;
    price: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface NewUser {
    username: string;
    password: string;
    email: string;
    address: string;
}

export interface NewProduct {
    name: string;
    brand: string;
    price: number;
}

export interface UpdatedUser {
    id: number;
    username: string;
    password: string;
    email: string;
    address: string;
}
