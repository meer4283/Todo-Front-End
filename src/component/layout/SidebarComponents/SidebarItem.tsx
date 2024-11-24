import Link from 'next/link';
import { Ripple } from 'primereact/ripple'
import React from 'react'

const SidebarItem = (props: any) => {
    const { label, link, icon, isNested = false } = props;
    if (isNested) {
        return (<li>
            <Link href={link} className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                <i className={`${icon} mr-2`}></i>
                <span className="font-medium">
                    {label}
                </span>
                <Ripple />
            </Link>
        </li>)
    }
    return (
        <li>
            <Link href={link} className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full">
                <i className={`${icon} mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg`}></i>
                <span className="font-medium inline text-base lg:text-xs lg:block">
                    {label}
                </span>
                <Ripple />
            </Link>
        </li>
    )
}

export { SidebarItem }