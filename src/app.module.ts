import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyNameModule} from './company-name/company-name.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {doc} from "prettier";
import {join} from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev.local'],
        }),
        MongooseModule.forRoot(
            process.env.DATABASE_URL,
            {useNewUrlParser: true}
        ),
        CompanyNameModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'client/dist'),
        }),
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule {
}
