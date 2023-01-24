class Performance {
    presence = [];
    maxCoutLesson = 25;

    constructor(marks = []) {
        this.marks = marks;
    };

    get checkPresence() {
        try {
            if(this.presence.length >= this.maxCoutLesson) {
                throw new RangeError('Встановлена кількість занять пройдена. Навчальний семестр закінчено.');
            }
            return true;
        } catch(error) {
            console.error(`${error.name}: ${error.message}`);
            return false;
        }
    };

    absent() {
        if(this.checkPresence) {
            this.presence.push(false); 
        };
        return this;    
    };

    present(mark) {
        if(this.checkPresence) {
            if(typeof mark == 'number' && mark <= 100 && mark >= 20) {
                this.marks.push(mark);
            }
            this.presence.push(true); 
        }
        return this;    
    };

    summary() {
        const presenceFactor = 0.9;
        const marksFactor = 90;
        const avaragePresence = Math.round((this.presence.reduce((a, b) => a + b) / this.presence.length) * 100) / 100;

        if (this.averageMark < marksFactor && avaragePresence < presenceFactor) {
            return 'Редиска!';
        } else if (this.averageMark < marksFactor || avaragePresence < presenceFactor) {
            return 'Добре, але можна краще.';
        } else {
            return 'Молодець!';
        }
    };
}

class Student extends Performance {
    constructor(firstName, lastName, year, marks) {
        super(marks);
        this.firstName = firstName;
        this.lastName = lastName;
        this.year = year;
    }

    get age() { 
        const now = new Date().getFullYear();
        try {
            if(this.year < 1920 || this.year >= now) {
                throw new Error('Рік народження студента вказан невірно.');
            }
            return now - this.year;
        } catch(error) {
            console.error(`${error.name}: ${error.message}`);
            return 'Виправте рік нарождення';
        }
    }

    get averageMark() {
        return Math.floor(this.marks.reduce((a, b) => a + b) / this.marks.length);    
    }
}

const student1 = new Student('Bayraktar', 'Ukrainian', 2000, [90, 90, 90, 90, 90]);
const student2 = new Student('Stepan', 'Bandera', 2003, [100, 90, 90, 90, 90]);
const student3 = new Student('Ivan', 'Дурник', 2005, [60, 60, 60, 60, 60]);
student1.present(90).present(90).present(90).present(90).present(90).present(90);
student2.present(100).absent().present(80).present(100).present().present(90);
student3.present(60).absent().absent().absent().present(60).present(60);

if (typeof module === 'object') {
    module.exports =  {Student};
}

console.log(student1.age);
console.log(`Середній бал: ${student1.averageMark}`);
console.log(student1.summary());
console.log(student2.age);
console.log(`Середній бал: ${student2.averageMark}`);
console.log(student2.summary());
console.log(student3.age);
console.log(`Середній бал: ${student3.averageMark}`);
console.log(student3.summary());