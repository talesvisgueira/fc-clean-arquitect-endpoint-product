import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Produto 1",
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Produto 1");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Produto 1",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Produto 1",
        price: 10,
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Produto 2",
        price: 20,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product = listResponse.body.products[0];
    expect(product.name).toBe("Produto 1");
    expect(product.price).toBe(10);
    
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Produto 2");
    expect(product2.price).toBe(20);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    // console.log(listResponseXML.text);

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);

    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Produto 1</name>`);
    expect(listResponseXML.text).toContain(`<price>10</price>` );
    expect(listResponseXML.text).toContain(`</product>`);

    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Produto 2</name>`);
    expect(listResponseXML.text).toContain(`<price>20</price>` );
    expect(listResponseXML.text).toContain(`</product>`);

    expect(listResponseXML.text).toContain(`</products>`);
  });
});
