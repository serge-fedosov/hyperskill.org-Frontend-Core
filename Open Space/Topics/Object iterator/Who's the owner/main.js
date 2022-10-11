function switchTheValues(cats) {
    cats.forEach(obj => {
        const temp = obj.name;
        obj.name = obj.owner;
        obj.owner = temp;

        console.log(`${obj.owner} has a cat named ${obj.name}, whose breed is ${obj.breed}`);
    });
}