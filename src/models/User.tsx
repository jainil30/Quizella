
export interface User{
    id? : number,
    username: string,
    password: string,
    phoneNumber: number,
    role : 'admin' | 'user',
    imageUrl? : string,
}

