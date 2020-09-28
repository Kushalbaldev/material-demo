import { contains, email, password, required } from '@rxweb/reactive-form-validators';

export class User{
    
        @required({message:"This field is required"})
        @email({message:"Enter valid email"})
        // @contains({ value: "aa@b.c",message:""})
        public email:string;

        @required({message:"This field is required"})
        public password:string;
        
 

}