
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import MenuComponent from './MenuComponent';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useLoginDetails } from '@/hooks';
import { allPrivateRoutes } from '@/utils/menuItem';
import { APP_LOGO } from '@/utils/constants';

export const DashboardLayout = ({ children }: any) => {
    const { userDetail , checkValidLoginRoute, removeUserInfo} = useLoginDetails();
    const btnRef22 = useRef(null);
    const btnRef23 = useRef(null);
    const op = useRef<any>(null);
    
    useEffect(() => {
       checkValidLoginRoute()
          return () => {};
    }, [])
    return (
        <div className="min-h-screen flex relative lg:static surface-ground">
            <div
                style={{ position: "sticky" }}
                id="app-sidebar-5"
                className="bg-gray-900 h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 border-gray-800 w-18rem lg:w-7rem select-none"
            >
                <div className="flex flex-column h-full">
                    <div
                        className="flex align-items-center justify-content-center flex-shrink-0 bg-white"
                        style={{ height: "60px" }}
                    >
                        <img
                            src={APP_LOGO}
                            alt="hyper-light"
                            height={30}
                        />
                        
                    </div>
                    <div className="mt-3">
                        <MenuComponent />
                    </div>
                    <div className="mt-auto mx-3">
                        <hr className="mb-3  border-top-1 border-gray-800" />
                        <div className='text-center'>
                        <Button type="button" size='small' icon="pi pi-user" rounded  text style={{ padding: 0, color:"#fff" }} className='p-0 px-0' outlined onClick={(e) => op.current.toggle(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen flex flex-column relative flex-auto">
                <div
                    className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border"
                    style={{ height: "60px" }}
                >
                    <div className="flex">
                        <StyleClass
                            nodeRef={btnRef22}
                            selector="#app-sidebar-5"
                            enterClassName="hidden"
                            enterActiveClassName="fadeinleft"
                            leaveToClassName="hidden"
                            leaveActiveClassName="fadeoutleft"
                            hideOnOutsideClick
                        >
                            <a
                                ref={btnRef22}
                                className="p-ripple cursor-pointer block lg:hidden text-700 mr-3"
                            >
                                <i className="pi pi-bars text-4xl"></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                        <span className="p-input-icon-left ml-2">
                            <i className="pi pi-search"></i>
                            <InputText
                                type="search"
                                className="border-none pl-5"
                                placeholder="Search"
                            />
                        </span>
                    </div>
                    <StyleClass
                        nodeRef={btnRef23}
                        selector="@next"
                        enterClassName="hidden"
                        enterActiveClassName="fadein"
                        leaveToClassName="hidden"
                        leaveActiveClassName="fadeout"
                        hideOnOutsideClick
                    >
                        <a
                            ref={btnRef23}
                            className="p-ripple cursor-pointer block lg:hidden text-700"
                        >
                            <i className="pi pi-ellipsis-v text-2xl"></i>
                            <Ripple />
                        </a>
                    </StyleClass>
                    <ul
                        className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
                    >
                        {/* <li>
                            <a
                                className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                            >
                                <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
                                <span className="block lg:hidden font-medium">
                                    Inbox
                                </span>
                                <Ripple />
                            </a>
                        </li>
                        <li>
                            <a
                                className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                            >
                                <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge">
                                    <Badge severity="danger" />
                                </i>
                                <span className="block lg:hidden font-medium">
                                    Notifications
                                </span>
                                <Ripple />
                            </a>
                        </li> */}
                        <li className="border-top-1 surface-border lg:border-top-none">
                            <a
                                className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                            >
                                <Button type="button" size='small' icon="pi pi-user" rounded text aria-label="Filter" style={{ padding: 0 }} className='p-0 px-0' outlined onClick={(e) => op.current.toggle(e)} />

                                <OverlayPanel ref={op}>
                                    <div className="block">
                                    <Button type="button" label='Logout' size='small' icon="pi pi-user" rounded text aria-label="Filter" style={{ padding: 0 }} className='p-0 px-0' outlined onClick={(e) => removeUserInfo()} />

                                    </div>
                                </OverlayPanel>
                                <Ripple />
                            </a>
                        </li>

                    </ul>
                </div>
                <div className="p-5 flex flex-column flex-auto">
                    <div className="border-2 border-dashed surface-border border-round surface-section flex-auto overflow-hidden md:overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
