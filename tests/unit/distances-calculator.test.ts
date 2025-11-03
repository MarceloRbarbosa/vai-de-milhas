import { toRadius } from "services/distances-calculator-service";
import * as distanceCalculatorService from "services/distances-calculator-service";

describe("Distance Calculator Service Unit Testing", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("toRadius", () => {
        it("Should convert degrees to radians", () => {
            const degrees = 180;
            const radians = toRadius(degrees);
            expect(radians).toBe(Math.PI);
        })
    })

    describe("calculateDistance", () => {
        const coords1 = { lat: 0, long: 0 };
        const coords2 = { lat: 0, long: 1 };

        it("Should calculate distance", () => {
            
            const result = distanceCalculatorService.calculateDistance(coords1, coords2);
            expect(typeof result).toBe("number");
            expect(result).toBeGreaterThan(0);
        })
        
        it("shoul calculate distance when isMiles is true", () => {
            const distanceKM = distanceCalculatorService.calculateDistance(coords1, coords2);
            const distanceMiles = distanceCalculatorService.calculateDistance(coords1, coords2, true);
            expect(distanceKM).toBeGreaterThan(distanceMiles);
        })
        
    })

})