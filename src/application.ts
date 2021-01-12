import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';

export class PassoAPassoAppApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        //Setando o datasource com dados de variáveis de ambiente
        //TL;DR: if you are using @loopback/boot to load your datasources (as is the default in LB4 applications
        //scaffolded using lb4 CLI tool), then you can bind just the custom datasource configuration.
        this.bind('datasources.config.passoApassoDS').to({
            name: 'passoApassoDS',
            connector: 'mongodb',
            host: process.env.MONGO_HOST || 'Variável de ambiente MONGO_HOST sem valor',
            port: process.env.MONGO_PORT || 'Variável de ambiente MONGO_PORT sem valor',
            database: process.env.MONGO_DATABASE || 'Variável de ambiente MONGO_DATABASE sem valor',
            user: process.env.MONGO_USER || 'Variável de ambiente MONGO_USER sem valor',
            password: process.env.MONGO_PASSWORD || 'Variável de ambiente MONGO_PASSWORD sem valor',
        });

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));

        // Customize @loopback/rest-explorer configuration here
        this.bind(RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(RestExplorerComponent);

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
