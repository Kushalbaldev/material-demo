import { contains, email, password, required } from '@rxweb/reactive-form-validators';

export class User {

        @required({ message: 'This field is required' })
        @email({ message: 'Enter valid email' })
        @contains({ value: 'admin@abc.com', message: '' })
        public email: string;

        @required({ message: 'This field is required' })
        @contains({ value: 'password', message: '' })
        public password: string;

}
