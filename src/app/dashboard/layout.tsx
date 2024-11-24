import { DashboardLayout } from '@/component/layout/DashboardLayout'
import React from 'react'

function layout({ children }: { children: any }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>

    )
}

export default layout
