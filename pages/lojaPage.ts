import { expect, Page } from "@playwright/test";

export class LojaPage{
    readonly page:Page;

    constructor(page:Page){
        this.page=page
    }

    //1. Acessar a loja
    async acessarLoja(){
        await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/loja.html')
    }
    
    //2. Validar se os produtos aparecem
    async validarProduto(){
        await expect(
            this.page.getByRole('heading',{name:/produtos/i})
        
        ).toBeVisible()
    }

    //3. Selecionar Produto

  async selecionarProduto(nomeProduto: string) {
    const produto = this.page.getByText(nomeProduto, {
        exact: true
    });

    await expect(produto).toBeVisible();
}

    //4. Adicionar produto ao carrinho
async adicionarAoCarrinho(nomeProduto: string) {
    const produto = this.page.getByRole('article').filter({
        hasText: nomeProduto
    });

    await produto.getByRole('button', {
        name: /adicionar ao carrinho/i
    }).click();
}
   

// Acessar o carrinho
async acessarCarrinho() {
    await this.page.locator('#cartButton').click();
}

// Iniciar checkout
async iniciarCheckout() {
    await this.page.locator('#checkoutButton').click();
}
 //7. finalizar compra
 async finalizarCompra() {
    await this.page.locator('#btnPlaceOrder').click();
}


  async validarCompraRealizada() {
    await expect(this.page).toHaveURL(/painel\.html/);

    const pedidos = this.page.locator('#ordersList');

    await expect(pedidos).toBeVisible();
    await expect(pedidos).not.toBeEmpty();
}

}