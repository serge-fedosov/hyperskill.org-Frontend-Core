let library = {
    books: {
        "first": "Brothers Karamazov",
        "second": "The Catcher in the Rye"
    }
};

for (let key in library.books) {
    console.log(library.books[key]);
}