
import { Page, expect } from '@playwright/test';

export class LoginLojistaPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async preencherEmail(email: string) {
        await this.page.locator('#email').fill(email);
    }

    async preencherSenha(senha: string) {
        await this.page.locator('#password').fill(senha);
    }

    async clicarEntrar() {
        await this.page.getByRole('button', {
            name: /^entrar$/i
        }).click();

        await expect(this.page).toHaveURL(/painel\.html/, {
            timeout: 15000
        });
    }

    async realizarLogin(email: string, senha: string) {
        await this.preencherEmail(email);
        await this.preencherSenha(senha);
        await this.clicarEntrar();
        
    }
    
}

