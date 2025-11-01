import { generateMilesForTrip, getMilesFromCode } from "services/miles-service";
import * as milesRepository from "repositories/miles-repository";
import { Trip } from "protocols";
import exp from "node:constants";


beforeEach(() => {
    jest.clearAllMocks();
});

describe(" Miles Service Unit Testing", () => {
    
it("Should throw an error when miles already registered", async () => {
  const existing = {
    id: 1,
    code: "123",
    miles: 100
  }
    jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(existing);

    const tripMock = {code: "123"} as unknown as Trip;
    

    await expect(generateMilesForTrip(tripMock)).rejects.toEqual({
      type: "conflict",
      message: `Miles already registered for code ${tripMock.code}`
    });
})

it("should throw an erro when miles not found by code",() => {
  jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);
  
     const promise = getMilesFromCode("123");

        expect(promise).rejects.toEqual({
        type: "not_found",
        message: `Miles not found for code 123`
        })
    })

})