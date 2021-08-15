# Parking Lot Problem

## About Problem

To **design a parking lot system** with ability to find:

- Registration numbers of all cars of a particular colour.

- Slot number in which a car with a given registration number is parked.

- Slot numbers of all slots where a car of a particular colour is parked.

#### For Interactive Mode

Open terminal and navigate (`cd`) to this folder and type the following commands:

1. npm install
2. npm start


## List of User Commands

Users can interact with the Parking Lot system via a following simple set of commands which produce a specific output:

- **create_parking_lot**: `create_parking_lot 8` will create a parking lot with 8 slots.

- **park < REGISTRATION NUMBER > < COLOR >**: `park UP-80-AB-4321 White` will allocate the nearest slot from entry gate.

- **leave**: `leave 2` will make slot number 2 free.

- **status**: `status` will display cars and their slot details

```bash
Slot No.  Registration No Color
1         UP-80-AB-4321  White
3         UP-80-BC-0001  White
4         UP-80-AB-9999  Red
5         UP-80-AB-2701  Black
6         UP-80-AB-3141  Black
```

- **registration_numbers_for_cars_with_colour < COLOR >**: `registration_numbers_for_cars_with_colour White` will display the registration number of the cars of white color e.g. `UP-80-AB-4321, UP-80-BC-0001`

- **slot_numbers_for_cars_with_colour < COLOR >**: `slot_numbers_for_cars_with_colour White` will display slot numbers of the cars of white color e.g. `1, 3`

- **slot_number_for_registration_number < REGISTRATION NUMBER >**: `slot_number_for_registration_number UP-32-AY-1111` will display the slot number for the car with registration number UP-32-AY-1111.

- **leave_car_by_registration_number**: `leave_car_by_registration_number UP-12-LT-0008` will free the slot occupied by car with registration number UP-12-LT-0008.

- **available_slot_numbers**: `available_slot_numbers` will display available slot numbers e.g. 2, 6, 8.

- **allocated_slot_numbers**: `allocated_slot_numbers` will display occupied slot numbers e.g. 1, 3, 4, 5, 7.

- **exit**: `exit` will quit the application and return to the console.

> **NOTE: Any commands which are not mentioned above will throw an error: `<INPUT> is an invalid command`**


There are two classes defined:

`ParkingLot()`: It is the main class which is used to initialize a parking lot. In each parking lot there is maximum number of slots and an array of slots that will be occupied by the car. It has following methods:

- `createParkingLot(input)` : Creates a parking lot with given input. It throws an error `Minimum one slot is required to create parking slot` if zero or negative number (n <= 0) is provided as an input.

- `parkCar(input)` : Allocates nearest slot from entry gate to the car. It can throw following errors:

    - `Minimum one slot is required to create parking slot` : When parking lot is not initialized.

    - `Sorry, parking lot is not empty` : When parking lot has reached its maximum capacity.

    - `Either registration number or color is not provided` : When input contains either of two i.e. registration number and color of the car, not both.

- `leaveCar(input)` : Removes car in given slot in parking lot. It throws following errors:

  - `Sorry, parking lot is empty` if parking lot is empty.

  - `Slot number <SLOT NUMBER> is not there` when slot number is absent.

  - `Slot number <SLOT NUMBER> is already empty` when slot number is not occupied.

- `leaveCarByCarNumber (input)` : Makes the slot free for car of given registration number.

- `getParkingStatus()` : Returns an array containing slot number, registration number and color. It throws an error `Sorry, parking lot is empty` if parking lot is empty.

- `getCarsWithSameColor(input)` : Returns a comma separated string containing registration numbers of cars with same color e.g. `UP-80-AB-4321, UP-80-AB-9999, KA-01-P-333`.

- `getSlotsWithSameColorCar(input)` : Returns a comma separated string containing slot numbers of car with same color e.g. `3, 5, 6`.

- `getSlotByCarNumber(input)` : Finds slot number of car for given registration number. It returns `Not found` when car is not present.

- `findNearestAvailableSpace()` : Finds nearest free slot.

- `findAllAvailableSlots()` : returns a comma separated string of free parking slots e.g. 1, 4, 7. It returns `null` if parking lot is not created.

- `findAllAllocatedSlots()` : returns a comma separated string of allocated parking slots e.g. 2, 3, 5, 6. It returns `null` if parking lot is not created.

`Car()`

- `new Car(NUMBER, COLOR)` : Constructor used to initialize a car object containing two fields, registration number and color.

- `isCarEqual()` : Checks whether two cars are equal or not.

**Note:** *I've made an assumption that the registration number for two cars can never be same.*
