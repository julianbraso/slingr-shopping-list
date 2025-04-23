export interface Item {
    id?: number;
    name: string;
    description: string;
    quantity: number;
    purchased: boolean;
}

export interface InputProps {
    item?: Item;
    isLoading?: boolean;
    onChangeCallback: (v: string) => void;
}