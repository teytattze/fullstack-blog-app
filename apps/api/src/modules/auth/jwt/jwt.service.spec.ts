import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { IJwtPayload } from './jwt.interface';
import { RepositoryModule } from '../../../repositories/repository.module';
import { ConfigModule } from '../../../common/config/config.module';
import { Errors } from '../../../errors/errors';

describe('Jwt Services', () => {
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, RepositoryModule],
      providers: [JwtService],
    }).compile();
    jwtService = await moduleRef.get<JwtService>(JwtService);
  });

  describe('generate jwt token', () => {
    it('should return a jwt token', () => {
      const payload: IJwtPayload = {
        userId: 'dc3c3f98-48fe-4d6c-ad6b-2b2d999c1444',
        username: 'teytattze',
        email: 'tattzetey@gmail.com',
        emailVerified: false,
        role: 'MEMBER',
      };
      expect(typeof jwtService.generateJwtToken(payload)).toEqual('string');
    });
  });

  describe('validate jwt token', () => {
    it('should return decoded payload and isExpired equals to true', async () => {
      const payload: IJwtPayload = {
        userId: 'dc3c3f98-48fe-4d6c-ad6b-2b2d999c1444',
        username: 'teytattze',
        email: 'tattzetey@gmail.com',
        emailVerified: false,
        role: 'MEMBER',
      };
      const token = jwtService.generateJwtToken(payload);
      await expect(jwtService.validateJwtToken(token)).resolves.toMatchObject({
        aud: /api.blog-app-practice.com/,
        email: /tattzetey@gmail.com/,
        exp: /^d{10}$/,
        iat: /^d{10}$/,
        isExpired: false,
        iss: /api.blog-app-practice.com/,
        role: /MEMBER/,
        userId: /dc3c3f98-48fe-4d6c-ad6b-2b2d999c1444/,
        username: /teytattze/,
      });
    });

    it('should return decoded payload and isExpired equals to false', async () => {
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYzNjM2Y5OC00OGZlLTRkNmMtYWQ2Yi0yYjJkOTk5YzE0NDQiLCJ1c2VybmFtZSI6InRleXRhdHR6ZSIsImVtYWlsIjoidGF0dHpldGV5QGdtYWlsLmNvbSIsInJvbGUiOiJNRU1CRVIiLCJpc3MiOiJhcGkuYmxvZy1hcHAtcHJhY3RpY2UuY29tIiwiYXVkIjoiYXBpLmJsb2ctYXBwLXByYWN0aWNlLmNvbSIsImlhdCI6MTYyNTM5NzU1MCwiZXhwIjoxNjI1Mzk3NTgwfQ.eR-4zrWHBk-GcLZ3jRcnyVfZOfRNYA3K9EzLZNkd1TWLsDDWtTkQy_PLm16qsMWIe5U_UcNPvzOte6NpFlGrqtA-c7dOE7Va6FeEmcfDY88ylI2wThD-dXK4FWIL2Y3amoXi6TR_rmGTMgPqWDeDVrF9_zK-sVwS8JioFq8zAIiFoJstqONdHsqry9Filct5uX63qC_Hqcaxm1rjX0w9deTfxdgoXVn5SbDwqgnqtjBVOCho4agZqZVoNH8WPSQnWbO5AwTJjThguw_9odoJ_-z3kJMSGVgtdgm4BKd6Ks9YY1FGXrVEaPMhSs73nhX_StmhziszxH__iGA44fpZgzfD-bJuEjmoL9yjXeUlrAmUpg0IoDJrje3lHhRdZbpiOGTz07qxc491Cs9-__zpbm3Jori0vawf7RGOx6HTTaShEbq490cjV7Y8_2_WbwCJUByxcSZlOaoTUN8okrmVBqs--k9XB4P5l3EE30zvBsbR2t1irfpyNeLaI-Yv1zcoyPQfmjhe3NQueK7K7iLZsbCTBmgEwq54oo25BKVebOF0ZQpoIm76-RECU4z6HZegRa43W1fWXmUx-AJ6KMTznkmgcyponK-OGPB4_ueOfBfWkTPsEtKmsSASP7bRFcYMlvuvUKuEIOFoIiQjvKq7iiJwDM6KNgpkYd2Xs2ypjDc';
      await expect(jwtService.validateJwtToken(token)).resolves.toMatchObject({
        aud: /api.blog-app-practice.com/,
        email: /tattzetey@gmail.com/,
        exp: /^d{10}$/,
        iat: /^d{10}$/,
        isExpired: true,
        iss: /api.blog-app-practice.com/,
        role: /MEMBER/,
        userId: /dc3c3f98-48fe-4d6c-ad6b-2b2d999c1444/,
        username: /teytattze/,
      });
    });

    it('jwt token with unknown userId should throw error', async () => {
      const payload: IJwtPayload = {
        userId: 'dc3c3f98-48fe-4d6c-ad6b-2b2d999c144',
        username: 'teytattze',
        email: 'tattzetey@gmail.com',
        emailVerified: false,
        role: 'MEMBER',
      };
      const token = jwtService.generateJwtToken(payload);
      await expect(jwtService.validateJwtToken(token)).rejects.toThrowError(
        new UnauthorizedException(Errors.GENERAL_UNAUTHORIZED_ERROR),
      );
    });

    it('invalid jwt token should throw error', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      await expect(jwtService.validateJwtToken(token)).rejects.toThrowError(
        new UnauthorizedException(Errors.GENERAL_UNAUTHORIZED_ERROR),
      );
    });
  });
});
