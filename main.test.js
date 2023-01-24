const {Student} = require("./js/main");
const student = new Student();

test(
    "Перевірка на екземпляр класу", 
    () => {
        expect(student).toBeInstanceOf(Student);
    }
);

test("Перевірка року народження на правильність", () => {
    student.year = 1996;
    expect(student.age).not.toBe('Виправте рік нарождення');
});

test('Правильність підрахунку віку', () => {
    student.year = 1990;
    expect(student.age).toBe(33);
});

test("Перевірка підрахунку середнього балу", () => {
    student.marks = [60, 60, 60, 60, 60];
    expect(student.averageMark).toBe(60);
});

test("Перевірка додавання пропуску за відсутність на занятті", () => {
    student.presence = [];
    student.absent().absent();
    expect(student.presence).toEqual([false, false]);
});

test("Перевірка додавання оцінки та відмітки за присутність на занятті", () => {
    student.presence = [];
    student.marks = [];
    student.present(90).present(160);
    expect(student.presence).toEqual([true, true]);
    expect(student.marks).toEqual([90]);
});

test("Перевірка на закінчення навчання", () => {
    student.presence = [];
    student.maxCoutLesson = 5;
    student.absent().absent().present().present();
    expect(student.checkPresence).toBeTruthy();
});

test("Перевірка відправки правильногo повідомлення з підсумком", () => {
    student.marks = [90, 90, 90, 90, 90];
    student.presence = [true, false, false, true];
    expect(student.summary()).toBe('Добре, але можна краще.');
});