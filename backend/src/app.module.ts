import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyNameModule} from './company-name/company-name.module';

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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
