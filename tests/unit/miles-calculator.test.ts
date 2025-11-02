import * as distanceCalculatorService from "services/distances-calculator-service";
import createTripMock from "../factories/miles-service-factory";
import * as milesCalculatorService from "services/miles-calculator-service";
import { AffiliateStatus, ServiceClass } from "protocols";


describe("Miles Calculator Service Unit Testing", () => {
const mockDistance = 1000;
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(distanceCalculatorService, "calculateDistance").mockReturnValueOnce(mockDistance);
    });

it("should return zero when using miles is true", async () => {
const tripMock = createTripMock();
tripMock.miles = true;


const result = milesCalculatorService.calculateMiles(tripMock);

expect(distanceCalculatorService.calculateDistance).not.toHaveBeenCalled();
expect(result).toBe(0);
})

it("should calculate miles for econimic trip", async () => {
    const tripMock = createTripMock();
    tripMock.service = ServiceClass.ECONOMIC;
    tripMock.affiliate = AffiliateStatus.BRONZE;
    tripMock.date = "2025-12-15";
    tripMock.miles = false;
    
    const result = milesCalculatorService.calculateMiles(tripMock);
    
    expect(result).toBe(1000);
    expect(distanceCalculatorService.calculateDistance).toHaveBeenCalled();
    })

it("should calculate miles with birthday bonus", async () => {
    const tripMock = createTripMock();
    tripMock.service = ServiceClass.ECONOMIC;
    tripMock.affiliate = AffiliateStatus.BRONZE;
    tripMock.date = "2025-05-15";

    const result = milesCalculatorService.calculateMiles(tripMock);
    
    expect(result).toBe(1100);
    expect(distanceCalculatorService.calculateDistance).toHaveBeenCalled();
})
})