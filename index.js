/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 const createEmployeeRecord = function (array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    }
  }
  
  const createEmployeeRecords = function (arrayOfRecords) {
    console.log(arrayOfRecords)    
    return arrayOfRecords.map(rec => createEmployeeRecord(rec))
   
  }

const createTimeInEvent = function (dateStamp)  {
    const [date, hour] = dateStamp.split(" ")
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date,
    }
    this.timeInEvents.push(inEvent)
    //console.log(this)
    return this
}


const createTimeOutEvent = function (dateStamp)  {
    const [date, hour] = dateStamp.split(" ")

    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    }
    this.timeOutEvents.push(outEvent)
    //console.log(this)
    return this
}

const hoursWorkedOnDate = function (targetDate) {
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (payOwed) {
    return hoursWorkedOnDate.call(this, payOwed) * this.payPerHour
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    // can also do this: 
    // const payable = eligibleDates.reduce((memo, d) => {
    //     return memo + wagesEarnedOnDate.call(this, d)
    // }, 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (srcArray, fName) {
    return srcArray.find(record => record.firstName === fName)
}

const calculatePayroll = function (recordsArray) {
    return recordsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}