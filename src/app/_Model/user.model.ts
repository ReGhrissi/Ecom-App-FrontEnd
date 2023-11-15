import { Contact } from "./contact.model"
import { paymentCard } from "./payment-card.model"

export class User {

    userId: string =''
	photoName:string=''
	firstName: string = ''
	lastName: string=''
	email: string=''
	admin:boolean=false


    contact :Contact = new Contact()

	paymentCard :paymentCard =
		{
			cardNumber:'',
			cardOwner:'',
			expirationDate:new Date()
			
		}
}