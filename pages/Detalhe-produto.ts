
import { Page, expect } from '@playwright/test';

export class DetalheProdutoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async acessarLoja() {
        await this.page.goto(
            'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/loja.html'
        );
    }

    async validarProdutos() {
        await expect(
            this.page.locator('.product-card').first()
        ).toBeVisible();
    }
}
