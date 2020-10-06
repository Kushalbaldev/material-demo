import { contains, email, password, prop, required } from '@rxweb/reactive-form-validators';

export class User {

        public id: number;
        @required({ message: 'This field is required' })
        public firstName: string;
        @required({ message: 'This field is required' })
        public lastName: string;

        @prop()
        public role: string;

        @email({ message: 'Enter valid email' })
        @required({ message: 'This field is required' })
        // @contains({ value: 'admin@abc.com', message: '' })
        public email: string;

        @required({ message: 'This field is required' })
        // @contains({ value: 'password', message: '' })
        public password: string;


}
