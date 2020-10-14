import { contains, email, password, prop, required } from '@rxweb/reactive-form-validators';
import { Role } from '../enums/role';

export class User {

        key: string;
        @required({ message: 'This field is required' })
        public firstName: string;
        @required({ message: 'This field is required' })
        public lastName: string;

        @prop()
        public role: Role;

        @email({ message: 'Enter valid email' })
        @required({ message: 'This field is required' })
        // @contains({ value: 'admin@abc.com', message: '' })
        public email: string;

        @required({ message: 'This field is required' })
        // @contains({ value: 'password', message: '' })
        public password: string;


}
