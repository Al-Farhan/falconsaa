import React, {createContext, useContext, useState} from "react";

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [query, setQuery] = useState('');
    const [queryProducts, setQueryProducts] = useState([]);

    const updateSearchQuery = (q) => {
        setQuery(q);
    }


    return (
        <SearchContext.Provider value={{query, updateSearchQuery, queryProducts, setQueryProducts}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if(!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}