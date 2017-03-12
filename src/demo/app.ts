import { UnisonApp, UnisonServer } from '../index';

import { HomeComponent } from './views/home.view';
import { APIService } from './services/api.service';
import { UserService } from './services/user.service';
import { Authenticated, Authenticated2 } from './permissions/authenticated.permission';

@UnisonApp({

    components: [
        HomeComponent
    ],

    injectables: [
        APIService,
        UserService,
        Authenticated,
        Authenticated2
    ]

})
class App { 

    constructor() {
        console.log('App Launch');
    }

}

new UnisonServer({ 
    host: 'localhost', 
    port: 8080 
}).bootstrap(App);