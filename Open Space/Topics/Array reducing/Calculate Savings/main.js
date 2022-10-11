const salary = 25000;

function getSalary(expenses) {
    let remainingSalary = expenses.reduce((sum, val) => sum - val, salary);
    console.log(remainingSalary);
}