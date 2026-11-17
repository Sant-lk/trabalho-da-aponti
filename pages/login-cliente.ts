import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async realizarLogin(email: string, senha: string) {
        await this.page.locator('#email').fill(email);
        await this.page.locator('#password').fill(senha);

        await this.page.getByRole('button', {
            name: /^entrar$/i
        }).click();

        await expect(this.page).toHaveURL(/checkout\.html/, {
            timeout: 15000
        });
    }
}