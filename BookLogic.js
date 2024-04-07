const Book = resource("Book");

Book.beforeCreate(book => {

    if(!book.description) {
        book.description = book.title
    }

    return book
})
