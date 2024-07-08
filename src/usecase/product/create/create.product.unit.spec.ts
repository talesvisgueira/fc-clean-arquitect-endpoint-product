 
import CreateProductUseCase from "./create.product.usecase";
 
const input = {
  name: "Produto 1",
  price: 10.6
}

const ProductMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};


describe("Unit test case for user case product", () => {
     
    it("should create a product", async()=>  {
      const productRepository =  ProductMockRepository();
      const productCreateUserCase = new CreateProductUseCase(productRepository);

      const output = await productCreateUserCase.execute(input);
                
      expect(output).toEqual({ 
            id: expect.any(String),
            name: input.name,
            price: input.price,
      });
    });

    it("should thrown an error when name is missing", async () => { 
      const productRepository =  ProductMockRepository();
      const productCreateUserCase = new CreateProductUseCase(productRepository);

      input.name = "";

      await expect(productCreateUserCase.execute(input)).rejects.toThrow(
        "Name is required"
      );
    });

    it("", async () => { 
      const productRepository =  ProductMockRepository();
      const productCreateUserCase = new CreateProductUseCase(productRepository);

      input.price = 0;

      await expect(productCreateUserCase.execute(input)).rejects.toThrow(
        "Name is required"
      );
    } );

});