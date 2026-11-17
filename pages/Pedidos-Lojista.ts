
import { expect, Page } from '@playwright/test';

export class PedidosLojistaPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Validar acesso ao painel do lojista
    async validarPainel() {
        await expect(this.page).toHaveURL(/painel\.html/);
    }

    // Localizar a seção de pedidos recebidos
    async localizarPedidos() {
        await expect(
            this.page.getByRole('heading', {
                name: /pedidos recebidos pela loja/i
            })
        ).toBeVisible();
    }

    // Listar os pedidos encontrados
async listarPedidos() {
    await expect(
        this.page.getByRole('heading', {
            name: /pedidos recebidos pela loja/i
        })
    ).toBeVisible();
}


    // Consultar um pedido pelo código
    async consultarPedido(codigoPedido: string) {
        const pedido = this.page.getByText(codigoPedido, {
            exact: false
        });

        await expect(pedido).toBeVisible();
        await pedido.click();
    }
}
