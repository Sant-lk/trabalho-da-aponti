import{test as base, expect} from '@playwright/test'
import { from } from 'node:stream/iter';

type DadosLogin={
    email: string;
    senha: string;
};

type MinhasFixtures={
    loginCliente: DadosLogin;
    loginLojista: DadosLogin;
};
export const test= base.extend<MinhasFixtures>({
    loginCliente: async({},use)=>{
        await use({
    email:'user@system.com',
    senha: 'UserPassword123'
});
},

loginLojista: async({},use)=>{
    await use({
        email:'lojista@system.com',
        senha:'SellerPass123'
    });
}
});

export {expect} from '@playwright/test';
