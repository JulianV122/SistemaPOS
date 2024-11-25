import { create } from 'zustand';


type Item = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type ShoppingCarStore = {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (item: Item) => void;
    clear: () => void;
};


const uniqueProducts = (oldArrayProducts: Item[], newItem: Item): Item[] => {
    let newArray = [];

    const existProduct = oldArrayProducts.findIndex((product) => product.id === newItem.id);

    if (existProduct < 0) {
        newItem.quantity = 1;
        newArray = [...oldArrayProducts, newItem];
    }
    else {
        const updateCart = {...oldArrayProducts}
        updateCart[existProduct].quantity += 1;
        newArray = updateCart;
    }

    return newArray;
}


export const useShoppingCarStore = create<ShoppingCarStore>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: uniqueProducts(state.items, item)})),
    removeItem: (item) => set((state) => ({ items: state.items.filter((i) => i !== item) })),
    clear: () => set({ items: [] }),
}));
