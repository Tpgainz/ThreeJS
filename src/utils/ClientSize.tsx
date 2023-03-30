import { createContext, useEffect, useState } from "react";

type ClientSize = {
    width: number;
    height: number;
};

const ClientSizeContext = createContext<ClientSize>({ width: 0, height: 0 });

export const ClientSizeProvider = ({ children }: { children: React.ReactNode }) => {
    const [clientSize, setClientSize] = useState<ClientSize>({ width: 0, height: 0 });

    useEffect(() => {
        setClientSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    return (
        <ClientSizeContext.Provider value={clientSize}>{children}</ClientSizeContext.Provider>
    );
};

export default ClientSizeContext;