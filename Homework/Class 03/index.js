import { EventEmitter } from 'events'

class Counter extends EventEmitter {
    constructor() {
        super()
        this.number = 0
        this.increasedStats = 0
        this.decreasedStats = 0
        this.resetStats = 0

        this.on("increase", () => {
            this.increasedStats = this.increasedStats + 1
            this.number = this.number + 1
            console.log(`The number increased to ${this.number}`);
        })

        this.on("decrease", () => {
            this.decreasedStats = this.decreasedStats + 1
            this.number = this.number -1
            console.log(`The number decreased to ${this.number}`);
        })

        this.on("zero", () => {
            console.log(`Counter is zero`)
        })

        this.on("positive", () => {
            console.log(`The number became positive`);
        })

        this.on("negative", () => {
            console.log(`The number became negative`);
        })

        this.on("maxReached", () => {
            console.log(`The number has reached the maximum limit (maximum limit is 5)`);
        })

        this.on("minReached", () => {
            console.log(`The number has reached the minimum limit (minimum limit is -5)`);
        })

        this.on("reset", () => {
            this.resetStats = this.resetStats + 1
            this.number = 0
            console.log(`The counter is reset`);
        })

        this.on("stats", () => {
            console.log(`The counnter was:
                        increased(not called): ${this.increasedStats}
                        decreased(not called): ${this.decreasedStats}
                        reset: ${this.resetStats}`)
        })
    }
    increase() {
        if (this.number < 5) {
            this.emit("increase", this.number)
        }
        else
            this.emit("maxReached")
        if (this.number === 0) {
            this.emit("zero")
        }
        if (this.number === 1) {
            this.emit("positive")
        }
    }
    decrease() {
        if (this.number > -5) {
            this.emit("decrease", this.number)
        }
        else
            this.emit("minReached")
        if (this.number === 0) {
            this.emit("zero")
        }
        if (this.number === -1) {
            this.emit("negative")
        }
    }
    reset() {
        this.emit("reset")
    }

    stats() {
        this.emit("stats")
    }


}

const myCounter = new Counter()

// TEST 1

// myCounter.decrease()
// myCounter.decrease()
// myCounter.decrease()
// myCounter.decrease()
// myCounter.reset()
// myCounter.decrease()
// myCounter.decrease()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.increase()
// myCounter.stats()
// myCounter.reset()
// myCounter.decrease()
// myCounter.decrease()
// myCounter.stats()

// TEST 2

// setInterval(() => {
//         const methods = ['increase', 'decrease', 'reset', 'stats'];
//         const randomMethod = methods[Math.floor(Math.random() * methods.length)];

//         myCounter[randomMethod](); 
// }, 2000)

