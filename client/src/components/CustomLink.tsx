import React from 'react'

function CustomLink({ children, href }: { children: React.ReactNode; href: string }): JSX.Element {
    return (
        <a
            onClick={(evt) => evt.stopPropagation()}
            className="underline text-gray-100 flex items-center hover:text-green-100"
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </a>
    )
}

export default CustomLink
