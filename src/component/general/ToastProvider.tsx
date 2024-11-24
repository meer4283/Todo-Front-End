'use client'
import React, { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useGlobalHook } from '@/hooks';

export default function ToastProvider({children}:any) {
    const toast = useRef<Toast>(null);
    const {
        showToast,
        toastMessage,
        // closable,
        toastDetail,
        toastType,
        toastLife,
        sticky,
        toastId,
        updateGlobalToast
      } = useGlobalHook();

    const showContrast = () => {
        toast.current?.show({ severity: toastType, summary: toastMessage, detail: toastDetail, life: 3000, sticky: sticky });
    };
    useEffect( () => {
        if ( showToast && toastMessage !== null ) {
            showContrast()
          updateGlobalToast({showToast: false});
        }
        return () => { };
      }, [
        showToast,
        toastMessage,
        toastDetail,
        toastType,
        toastLife,
        sticky,
        toastId,
      ] );

    return (
        <>
        {children}
            <Toast ref={toast} />
        </>
    )
}
        