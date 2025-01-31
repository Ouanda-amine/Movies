class MovieManager {
    constructor() {
        this.movieList = document.getElementById('movieList');
        this.movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
        this.movieForm = document.getElementById('movieForm');
        this.saveButton = document.getElementById('saveMovie');
        this.currentMovieId = null;

        this.init();
    }

    init() {
        this.loadMovies();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.saveButton.addEventListener('click', () => this.saveMovie());
        document.getElementById('movieModal').addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });
    }

    loadMovies() {
        const movies = this.getMoviesFromStorage();
        this.movieList.innerHTML = '';
        movies.forEach(movie => this.createMovieCard(movie));
    }

    createMovieCard(movie) {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${movie.image}" class="card-img-top" alt="${movie.title}" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                        <strong>Director:</strong> ${movie.director}<br>
                        <strong>Genre:</strong> ${movie.genre}<br>
                        <strong>Release Date:</strong> ${movie.releaseDate}<br>
                        <strong>Status:</strong> ${movie.status}
                    </p>
                    <div class="btn-group w-100">
                        <button class="btn btn-primary edit-movie" data-id="${movie.id}">Edit</button>
                        <button class="btn btn-danger delete-movie" data-id="${movie.id}">Delete</button>
                    </div>
                </div>
            </div>
        `;

        col.querySelector('.edit-movie').addEventListener('click', () => this.editMovie(movie));
        col.querySelector('.delete-movie').addEventListener('click', () => this.deleteMovie(movie.id));

        this.movieList.appendChild(col);
    }

    saveMovie() {
        if (!this.movieForm.checkValidity()) {
            this.movieForm.reportValidity();
            return;
        }

        const movieData = {
            id: this.currentMovieId || Date.now().toString(),
            title: document.getElementById('movieTitle').value,
            image: document.getElementById('movieImage').value,
            director: document.getElementById('director').value,
            releaseDate: document.getElementById('releaseDate').value,
            genre: document.getElementById('genre').value,
            status: document.getElementById('status').value
        };

        let movies = this.getMoviesFromStorage();

        if (this.currentMovieId) {
            movies = movies.map(movie => movie.id === this.currentMovieId ? movieData : movie);
        } else {
            movies.push(movieData);
        }

        localStorage.setItem('movies', JSON.stringify(movies));
        this.loadMovies();
        this.movieModal.hide();
    }

    editMovie(movie) {
        this.currentMovieId = movie.id;
        document.getElementById('modalTitle').textContent = 'Edit Movie';
        document.getElementById('movieTitle').value = movie.title;
        document.getElementById('movieImage').value = movie.image;
        document.getElementById('director').value = movie.director;
        document.getElementById('releaseDate').value = movie.releaseDate;
        document.getElementById('genre').value = movie.genre;
        document.getElementById('status').value = movie.status;
        this.movieModal.show();
    }

    deleteMovie(id) {
        if (confirm('Are you sure you want to delete this movie?')) {
            const movies = this.getMoviesFromStorage().filter(movie => movie.id !== id);
            localStorage.setItem('movies', JSON.stringify(movies));
            this.loadMovies();
        }
    }

    getMoviesFromStorage() {
        return JSON.parse(localStorage.getItem('movies') || '[]');
    }

    resetForm() {
        this.currentMovieId = null;
        document.getElementById('modalTitle').textContent = 'Add Movie';
        this.movieForm.reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MovieManager();
});