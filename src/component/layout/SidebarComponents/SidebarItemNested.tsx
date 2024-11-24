import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple'
import { StyleClass } from 'primereact/styleclass';
import React, { useRef } from 'react'

const SidebarItemNested = (props: any) => {
    const { label, link, icon, submenu, RenderMenu, isNested } = props;
    const btnRef20 = useRef<any>();
    if (isNested) {
        return (
            <li>
                <StyleClass
                    nodeRef={btnRef20}
                    selector="@next"
                    toggleClassName="hidden"
                >
                    <a
                        ref={btnRef20}
                        className="p-ripple flex align-items-center cursor-pointer p-3 hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full"
                    >
                        <i className={`${icon} mr-2`}></i>
                        <span className="font-medium">
                            {label}
                        </span>
                        <i className="pi pi-chevron-down ml-auto"></i>
                        <Ripple />
                    </a>
                </StyleClass>
                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                    {RenderMenu(submenu, true, btnRef20)}
                </ul>
            </li>
        )
    }
    return (
        <li className="relative">
            <StyleClass
                nodeRef={btnRef20}
                selector="@next"
                enterClassName="hidden"
                leaveToClassName="hidden"
                hideOnOutsideClick
            >
                <a
                    ref={btnRef20}
                    className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:bg-gray-800 border-round text-gray-300 hover:text-white transition-duration-150 transition-colors w-full"
                >
                    <i className={`${icon} mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-lg p-overlay-badge`}>
                        <Badge severity="danger" />
                    </i>
                    <span className="font-medium inline text-base lg:text-xs lg:block">
                        {label}
                    </span>
                    <i className="pi pi-chevron-down ml-auto lg:hidden"></i>
                    <Ripple />
                </a>
            </StyleClass>
            <ul className="list-none pl-3 pr-0 py-0 lg:p-3 m-0 lg:ml-3 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out static lg:absolute left-100 top-0 z-1 bg-gray-900 shadow-none lg:shadow-2 w-full lg:w-15rem">
                {RenderMenu(submenu, true, btnRef20)}

            </ul>
        </li>
    )
}

export { SidebarItemNested }