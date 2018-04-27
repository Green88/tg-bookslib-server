import uuid from 'node-uuid';

/**
 * @constructor
 */
function BookModel(book) {

    this.bookId = book.bookId || uuid.v4();
    this.authorId = book.authorId || uuid.v4();
    this.title = book.title || '';
    this.description = book.description || '';
    this.imageUrls = book.imageUrls || ['default.jpg'];
    this.text = book.text || '';
    this.genre = book.genre || '';
    this.finished = book.finished || false;
    this.rating = book.rating || 0;
    this.authorName = book.authorName || '';
    this.authorImageUrl = book.authorImageUrl || 'default.jpg';

}

BookModel.prototype.getBookId = function() {
    return this.bookId;
};

BookModel.prototype.setBookId = function(bookId) {
    this.bookId = bookId;
    return this;
};

BookModel.prototype.getAuthorId = function() {
    return this.authorId;
};

BookModel.prototype.setAuthorId = function(authorId) {
    this.authorId = authorId;
    return this;
};

BookModel.prototype.getTitle = function() {
    return this.title;
};

BookModel.prototype.setTitle = function(title) {
    this.title = title;
    return this;
};

BookModel.prototype.getDescription = function() {
    return this.description;
};

BookModel.prototype.setDescription = function(description) {
    this.description = description;
    return this;
};

BookModel.prototype.getImageUrls = function() {
    return this.imageUrls;
};

BookModel.prototype.setImageUrls = function(imageUrls) {
    this.imageUrls = imageUrls;
    return this;
};

BookModel.prototype.getText = function() {
    return this.text;
};

BookModel.prototype.setText = function(text) {
    this.text = text;
    return this;
};

BookModel.prototype.getGenre = function() {
    return this.genre;
};

BookModel.prototype.setGenre = function(genre) {
    this.genre = genre;
    return this;
};

BookModel.prototype.getFinished = function() {
    return this.finished;
};

BookModel.prototype.setFinished = function(finished) {
    this.finished = finished;
    return this;
};

BookModel.prototype.getRating = function() {
    return this.rating;
};

BookModel.prototype.setRating = function(rating) {
    this.rating = rating;
    return this;
};

BookModel.prototype.getAuthorName = function() {
    return this.authorName;
};

BookModel.prototype.setAuthorName = function(authorName) {
    this.authorName = authorName;
    return this;
};

BookModel.prototype.getAuthorImageUrl = function() {
    return this.authorImageUrl;
};

BookModel.prototype.setAuthorImageUrl = function(authorImageUrl) {
    this.authorImageUrl = authorImageUrl;
    return this;
};