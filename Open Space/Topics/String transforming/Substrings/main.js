function greeting(line) {
    let name = line.substring(0, 10).trim();
    let job = line.substring(20).trim();
    return ("My name is " + name + " and I'm a " + job + ".");
}