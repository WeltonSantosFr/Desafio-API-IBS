export interface UserDataByMonth {
    [key: string]: number;
}

export interface AddressDataByMonth {
    [key: string]: number;
}

export interface ChartData {
    labels: string[],
    datasets: Dataset[]
}

export interface Dataset {
    label: string
    data: number[]
}