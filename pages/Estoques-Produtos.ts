import { Page,expect } from "@playwright/test";

export class EstoqueProdutoPage{
    readonly page: Page;

    constructor (page:Page){
        this.page=page;
    }
    async validarDisponibilidade(){
        await expect(
            this.page.getByText(/em estoque|disponivel/i).first()
        ).toBeVisible();
    }
    async validarProdutoEsgostado(){
        await expect(
            this.page.getByRole('button',{name:/comprar|adicionar ao carrinho/i})
        ).toBeDisabled();
    }
}