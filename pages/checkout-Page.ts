
import { expect, Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // 1. Validar acesso ao checkout
    async validarCheckout() {
        await expect(this.page).toHaveURL(/checkout\.html/);

        await expect(
            this.page.getByRole('heading', {
                name: 'Identificação do Comprador'
            })
        ).toBeVisible();
    }

    // 2. Validar se o produto chegou ao checkout
    async validarProdutoNoResumo(nomeProduto: string) {
        await expect(
            this.page.getByText(nomeProduto).first()
        ).toBeVisible();
    }

    // 3. Preencher CPF
    async preencherCPF(cpf: string) {
        await this.page.locator('#buyerCpf').fill(cpf);
    }

    // 4. Preencher CEP
    async preencherCEP(cep: string) {
        await this.page.locator('#deliveryCep').fill(cep);

        await this.page.locator('#btnLookupCep').click();

        await expect(
            this.page.locator('#cepFeedbackBox')
        ).toContainText('Localizado', { timeout: 10000 });
    }

    // 5. Validar endereço preenchido
    async validarEnderecoPreenchido() {
        await expect(this.page.locator('#deliveryStreet')).not.toBeEmpty();
        await expect(this.page.locator('#deliveryNumber')).not.toBeEmpty();
        await expect(this.page.locator('#deliveryNeighborhood')).not.toBeEmpty();
        await expect(this.page.locator('#deliveryCity')).not.toBeEmpty();
        await expect(this.page.locator('#deliveryState')).not.toBeEmpty();
    }

    // 6. Preencher número do endereço
    async preencherNumero(numero: string) {
        await this.page.locator('#deliveryNumber').fill(numero);
    }

    // 7. Selecionar PIX
    async selecionarPIX() {
        await this.page.locator('[data-method="pix"]').click();

        await expect(
            this.page.locator('#panePix')
        ).toBeVisible();
    }

    // 8. Finalizar pedido
   async finalizarCompra() {
    await this.page.getByRole('button', {
        name: /confirmar e finalizar pedido/i
    }).click();

    await expect(this.page).toHaveURL(/painel\.html/, {
        timeout: 15000
    });
}
}
