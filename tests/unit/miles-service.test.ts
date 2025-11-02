import { generateMilesForTrip, getMilesFromCode } from "services/miles-service";
import * as milesRepository from "repositories/miles-repository";
import * as milesCalculatorService from "services/miles-calculator-service";;
import { Trip } from "protocols";
import createTripMock from "../factories/miles-service-factory";




beforeEach(() => {
    jest.clearAllMocks();
});

describe(" Miles Service Unit Testing", () => {
  
it("Should create and return miles when not already registered", async () => {
 const tripMock = createTripMock();
 const milesCreated = {
    id: 1,
    code: tripMock.code,
    miles: 10
 }
 
  jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);
  jest.spyOn(milesRepository, "saveMiles").mockResolvedValueOnce(milesCreated);
  jest.spyOn(milesCalculatorService, "calculateMiles").mockReturnValueOnce(10);


  const promise =  await generateMilesForTrip(tripMock);

  expect(milesRepository.findMiles).toHaveBeenCalled();
  expect(milesRepository.saveMiles).toHaveBeenCalled();
  expect(promise).toEqual(milesCreated.miles);
})
    
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

it("should return miles when found by code", async () => {
    const code = "ABC123";
    const milesFound = { id: 1, code, miles: 20 };

    jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(milesFound);

    const result = await getMilesFromCode(code);

    expect(milesRepository.findMiles).toHaveBeenCalledWith(code);
    expect(result).toEqual(milesFound);
  });

  it("Should throw an error when miles not found", async () => {
    const code = "DEF456";
    jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);

    await expect(getMilesFromCode(code)).rejects.toEqual({
      type: "not_found",
      message: `Miles not found for code ${code}`,
    });
  })
})