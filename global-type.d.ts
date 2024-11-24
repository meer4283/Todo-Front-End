interface DispatchTypeParam {
    type: string;
    payLoad: any
}

type DispatchType = ({
    type,
    payLoad
}:DispatchTypeParam) => void


interface TodoItem {
    id:number;
    title: string;
    color: string;
    completed_status?: string;
    created_at?:string;
    updated_at?:string;
}