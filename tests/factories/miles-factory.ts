import { de, faker } from "@faker-js/faker";
import { AffiliateStatus, ServiceClass, Trip } from "../../src/protocols";
import prisma from "database";
export default function createTripMock() {  
    const tripMock: Trip = {
        code:faker.string.alphanumeric(5),

        origin:{
            lat:(faker.location.latitude()),
            long:(faker.location.longitude()),
        },
        destination:{
            lat:(faker.location.latitude()),
            long:(faker.location.longitude()),
        },
        miles:faker.datatype.boolean(), 
        plane:faker.airline.airplane().name,
        service:faker.helpers.arrayElement(Object.values(ServiceClass)),
        coupom:faker.string.alphanumeric(5),
        affiliate:faker.helpers.arrayElement(Object.values(AffiliateStatus)),
        date: faker.date.future().toISOString().split('T')[0],
        }

        return tripMock    
}

export async function cleanDb() {
    await prisma.miles.deleteMany();
  }
  