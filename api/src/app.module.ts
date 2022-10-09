import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { UsersModule } from './users/users.module'
import { ProjectModule } from './project/project.module'
import { ColumnModule } from './column/column.module'
import { CardModule } from './card/card.module'

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      autoSchemaFile: join(process.cwd(), 'src/_graphql/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      debug: false,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
    ProjectModule,
    ColumnModule,
    CardModule,
  ],
})
export class AppModule {}
