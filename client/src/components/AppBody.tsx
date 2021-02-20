import React, { createContext, useState } from 'react'

export const CompactContentContext = createContext({
    compactContent: true,
    setCompactContent: (_: boolean) => {
        // to appease typescript complaints
        console.log('Setting compact content misconfigured', _)
    },
})

export const AppBody = ({
    children,
    defaultCompact = true,
}: {
    children: React.ReactNode
    defaultCompact: boolean
}): JSX.Element => {
    const [compactContent, setCompactContent] = useState<boolean>(defaultCompact)
    const currentGridSetup = compactContent
        ? 'grid-cols-mobile-main-list lg:grid-cols-main-list'
        : 'grid-cols-mobile-main-content lg:grid-cols-main-content'
    return (
        <CompactContentContext.Provider value={{ compactContent, setCompactContent }}>
            <div
                className={`w-screen grid gap-0 transition-grid-cols h-full overflow-auto ${currentGridSetup}`}
            >
                {children}
            </div>
        </CompactContentContext.Provider>
    )
}
