import { AbstractControl, ValidationErrors } from "@angular/forms";


export class ValidationFields {

    constructor()
    {}

    static passwordMatcher(control: AbstractControl) : { [key: string] : boolean } | null
    {

        const passwordControl= control.get('password')
        const confirmControl= control.get('password_conf')

        if(passwordControl?.pristine || confirmControl?.pristine) 
        {
            return null;
        }

        if(passwordControl?.value === confirmControl?.value)
        {
            return null;
        }

        return {'match' : true};
    }

    cannotContainSpace(control: AbstractControl) : ValidationErrors | null
    {
        if((control.value as string).indexOf(' ') >= 0) 
        {
            return { cannotContainSpace : true}
        }

        return null;
    }

/*
    requiredField(control: AbstractControl) : ValidationErrors | null
    {
        if(control.value) 
        {
            return { requiredField : true}
        }

        return null;
    }
*/


}