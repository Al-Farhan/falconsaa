import React, {createContext, useContext, useState} from "react";

const SearchContext = createContext();

const CartOpenContext = createContext();

export const SearchProvider = ({children}) => {
    const [query, setQuery] = useState('');
    const [queryProducts, setQueryProducts] = useState([]);

    const updateSearchQuery = (q) => {
        setQuery(q);
    }


    return (
        <SearchContext.Provider value={{query, setQuery, updateSearchQuery, queryProducts, setQueryProducts}}>
            {children}
        </SearchContext.Provider>
    )
}

export const CartOpenProvider = ({children}) => {
    const [openCart, setOpenCart] = useState(false);

    const isCartToggle = () => {
        setOpenCart(!openCart);
    }

    return (
        <CartOpenContext.Provider value={{openCart, isCartToggle}}>
            {children}
        </CartOpenContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if(!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}

export const useCartIsOpen = () => {
    const context = useContext(CartOpenContext);
    if(!context) {
        throw new Error('useCartIsopen must be used within a SearchProvider');
    }
    return context;
}