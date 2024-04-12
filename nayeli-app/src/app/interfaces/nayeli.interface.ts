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
