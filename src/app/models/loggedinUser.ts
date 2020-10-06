import { required } from '@rxweb/reactive-form-validators';

export class LoggedInUser {
    @required({ message: 'This field is required' })
    // @contains({ value: 'admin@abc.com', message: '' })
    public email: string;

    @required({ message: 'This field is required' })
    // @contains({ value: 'password', message: '' })
    public password: string;

}
