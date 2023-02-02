const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  // Test 1
  it("Testing status 200 y tipo de dato Array con al menos un objeto", async () => {
    const resultado = await request(server).get("/cafes").send();
    expect(resultado.statusCode).toBe(200);
    expect(resultado.body).toBeInstanceOf(Array);
    expect(resultado.body.length).toBeGreaterThanOrEqual(1);
  });

  // Test 2
  it("Testing status 404 al intentar eliminar un café con if que no existe", async () => {
    const token = "token";
    const resultado = await request(server)
      .delete("/cafes/100")
      .set("Authorization", token)
      .send();
    expect(resultado.statusCode).toBe(404);
  });

  // Test 3
  it("Testing agregar nuevo cafe y retornar 201", async () => {
    const nuevoCafe = {
      id: 5,
      nombre: "Espresso",
    };

    const resultado = await request(server).post("/cafes").send(nuevoCafe);
    expect(resultado.statusCode).toBe(201);
    expect(resultado.body).toContainEqual(nuevoCafe);
  });

  //Test 4
  it("Testing que no se pueda actualizar un cafe si el id es diferente", async () => {
    const actualizarCafe = {
      id: 1,
      nombre: "Con leche",
    };

    const resultado = await request(server)
      .put("/cafes/2")
      .send(actualizarCafe);
    expect(resultado.statusCode).toBe(400);
  });
});
