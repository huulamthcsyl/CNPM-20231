import { createContext, useContext, useState } from "react";

const ListMemberContext = createContext();
export const ListMemberProvider = ({ children }) => {
    const [listMember, setListMember] = useState([]);

    return (
        <ListMemberContext.Provider value={{ listMember, setListMember }}>
            {children}
        </ListMemberContext.Provider>
    );
};
export const useListMember = () => {
    const context = useContext(ListMemberContext);
    if (!context) {
        throw new Error("useListMember must be used within a ListMemberProvider");
    }
    return context;
};