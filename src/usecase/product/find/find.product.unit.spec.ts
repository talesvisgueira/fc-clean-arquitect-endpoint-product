import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import { OutputFindProductDto } from "./find.product.dto";

const product = new Product("1","Produto 1", 15.0);

const ProductMockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {

  it("should find a product", async () => {
    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Produto 1",
      price: 15.0,
    } as OutputFindProductDto;

    const productRepository = ProductMockRepository();
    const usecase = new FindProductUseCase(productRepository);
    
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const input = {
      id: "123",
    };

    const productRepository = ProductMockRepository();
    const usecase = new FindProductUseCase(productRepository);

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    expect(() => {
      return  usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
