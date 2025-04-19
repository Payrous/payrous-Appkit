interface Recipient {
    id: number; 
    initial: string;
    name: string;
    recipient: number;
    link: string;
}

export const recipient: Recipient[] = [
    {
        id: 1,
        initial: 'C',
        name: 'Confab Company',
        recipient: 500,
        link: '/dashboard/organization/added-organization'
    },
    {
        id: 2,
        initial: 'P',
        name: 'Platinum Company',
        recipient: 2125,
        link: '/dashboard/organization/added-organization'
    }
]