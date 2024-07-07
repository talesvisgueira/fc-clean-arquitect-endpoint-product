import ProductFactory from "../../../domain/product/factory/product.factory";
 import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create( "a","Produto 1",10 );

const input = {
  id: product.id,
  name: "Product 1 (novo)",
  price: 15,
};

const ProductMockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {

  it("should update a product", async () => {
    const productRepository = ProductMockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const output = await productUpdateUseCase.execute(input);
    console.log(output);
    expect(output).toEqual(input);
  });

});