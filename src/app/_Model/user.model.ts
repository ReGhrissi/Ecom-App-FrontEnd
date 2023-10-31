
export interface User {

    userId?: string,
	firstName?: string,
	lastName?: string,
	email: string,
	password:string,

    contact? : 
		{
			mobile : string,
			skype : string
		}
}