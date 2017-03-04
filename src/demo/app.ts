import { UnisonApp, UnisonServer } from '../index';

import { HomeView } from './views/home.view';
import { APIService } from './services/api.service';
import { UserService } from './services/user.service';
import { Authenticated, Authenticated2 } from './permissions/authenticated.permission';

@UnisonApp({

    views: [
        HomeView
    ],

    services: [
        APIService,
        UserService,
        Authenticated,
        Authenticated2
    ]

})
class App { }

new UnisonServer({ host: 'localhost', port: 8080 }).bootstrap(App);