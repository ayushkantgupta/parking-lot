#!/usr/bin/env node

var ErrorHandler = require('./modules/errorHandler');
var DisplayMessage = require('./modules/displayMessage');

const fs = require('fs'),
	readLine = require('readline');

var	commandLineInputs = process.argv, // processing command line inputs
    interactiveMode = false;

/**
 * @description importing the parkingLot class
 */
var Parking = require('./modules/parkingLot.js'),
	parkingLot = new Parking();

if (commandLineInputs[commandLineInputs.length - 1].endsWith('.txt')) {
    interactiveMode = false;
    fs.readFile(commandLineInputs[2], 'utf-8', function (err, data) {
        if (err) {
            new ErrorHandler('Error in reading file');
        }
        var arr = data.split('\n');
		for (var i = 0; i < arr.length; i++) {
			processUserCommands(arr[i]);
        }

        // returning to console once all the inputs are processed
        process.exit(1);
    });
}
else {
    interactiveMode = true;
    openInteractiveConsole();
}

/**
 * @description called when users want to interact via console
 * it process one command at a time
 */
function openInteractiveConsole () {

    var prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // option for user to enter commands
    if (interactiveMode) {
        prompts.question('Input: ', function (data) {
            processUserCommands(data);
        });
    }
}

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function processUserCommands (input) {
	var userCommand = input.split(' ')[0],
		totalParkingSlots,
		parkingSlotNumber,
		parkingSlotNumbers;
    switch (userCommand) {
        case 'create_parking_lot':
            try {
                totalParkingSlots = parkingLot.createParkingLot(input);
                new DisplayMessage('ayush')
                new DisplayMessage('Created a parking lot with ' + totalParkingSlots + ' slots.');
            }
            catch (err) {
                new ErrorHandler(err.message);
            }

            break;
        case 'park':
            try {
                parkingSlotNumber = parkingLot.parkCar(input);
                new DisplayMessage('Allocated slot number: ' + parkingSlotNumber);
            }
            catch (err) {
                new ErrorHandler(err.message);
            }
            break;
        case 'leave':
            try {
                parkingSlotNumber = parkingLot.leaveCar(input);
                new DisplayMessage('Slot number ' + parkingSlotNumber + ' is free.');
            }
            catch (err) {
                new ErrorHandler(err.message); // handling exceptions
            }
            break;
        case 'status':
            try {
                var parkingSlotStatus = parkingLot.getParkingStatus();
                if (parkingSlotStatus.length > 1) {
                    new DisplayMessage(parkingSlotStatus.join('\n'));
                }
                else {
                    new ErrorHandler('Sorry, parking lot is empty'); // what if it's empty
                }
            }
            catch (err) {
                new ErrorHandler(err.message);
            }
            break;
        case 'registration_numbers_for_cars_with_colour':
            var registrationNumbers = parkingLot.getCarsWithSameColor(input);
            if (registrationNumbers) {
                new DisplayMessage(registrationNumbers);
			}
			else {
                new ErrorHandler('Sorry, Car with given color is not found');
            }
            break;
        case 'slot_numbers_for_cars_with_colour':
            parkingSlotNumbers = parkingLot.getSlotsWithSameColorCar(input);
            if (parkingSlotNumbers) {
                new DisplayMessage(parkingSlotNumbers);
            }
            else {
                new ErrorHandler('Sorry, Car with given color is not found');
            }
            break;
        case 'slot_number_for_registration_number':
            parkingSlotNumber = parkingLot.getSlotByCarNumber(input);
            if (parkingSlotNumber) {
                new DisplayMessage(parkingSlotNumber);
			}
			else {
                new ErrorHandler('Sorry, Car with given registration number is not found');
            }
            break;
        case 'leave_car_by_registration_number':
            try {
                parkingSlotNumber = parkingLot.leaveCarByCarNumber(input);
                new DisplayMessage('Slot number ' + parkingSlotNumber + ' is free.');
            }
            catch (err) {
                new ErrorHandler('Sorry, car with given registration is not found');
            }
            break;
        case 'available_slot_numbers':
            var availableSlotNumbers = parkingLot.findAllAvailableSlots(input);
            if (availableSlotNumbers) {
                new DisplayMessage(availableSlotNumbers);
			}
			else {
                new ErrorHandler('Sorry, Parking Lot is not created');
            }
            break;
        case 'allocated_slot_numbers':
            var allocatedSlotNumbers = parkingLot.findAllAllocatedSlots(input);
            if (allocatedSlotNumbers) {
                new DisplayMessage(allocatedSlotNumbers);
			}
			else {
                new ErrorHandler('Sorry, Parking Lot is not created');
            }
            break;
        case 'exit':
			process.exit(0);
			break;
        default:
            new ErrorHandler(' an invalid command');
            break;
    }
    openInteractiveConsole();
}
