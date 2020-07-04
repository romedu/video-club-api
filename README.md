# Video Club API

This api allows you to search and "rent" your favorite movies and video games.

## Routes

#### Auth

This route is used to handle authentication and token validation.
**Base route: /api/auth**

| PATH         | METHOD | PAYLOAD                       | RESPONSE                              | AUTH REQUIRED |
| ------------ | ------ | ----------------------------- | ------------------------------------- | ------------- |
| /login       | POST   | [Login](#login_payload)       | [Login](#auth_response)               | FALSE         |
| /register    | POST   | [Register](#register_payload) | [Register](#auth_response)            | FALSE         |
| /verifyToken | GET    | N/A                           | [Verify Token](#verifyToken_response) | TRUE          |

#### Services

This route is used to fetch one or multiple movies/video games.
**Base route: /api/services**

| PATH             | METHOD | PAYLOAD                                 | RESPONSE                                 | AUTH REQUIRED |
| ---------------- | ------ | --------------------------------------- | ---------------------------------------- | ------------- |
| /searchMovies    | POST   | [Search Movies](#search_movies_payload) | [Search Movies](#search_movies_response) | FALSE         |
| /searchMovieById | POST   | [Search Movie](#search_movie_payload)   | [Search Movie](#search_movie_response)   | FALSE         |

## Payload References

#### <a name="login_payload"></a> Login

```ts
{
    username: String,
    password: String
}
```

#### <a name="register_payload"></a> Register

```ts
{
    username: String,
    password: String,
    name: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    isAdmin?: Boolean,
    adminPassword?: String
}
```

#### <a name="search_movies_payload"></a> Search Movies

```ts
{
    title: String,
    year?: Number
}
```

#### <a name="search_movie_payload"></a> Search Movie

```ts
{
	imdbID: String;
}
```

## Response References

#### <a name="error_response"></a> Error

```ts
{
    status: Number,
    message: String
}
```

#### <a name="auth_response"></a> Login / Register

```ts
{
    token: String,
    _id: String,
    username: String,
    isAdmin: Boolean,
    debt: Number
}
```

#### <a name="verifyToken_response"></a> Verify Token

```ts
{
    _id: String,
    username: String,
    isAdmin: Boolean,
    debt: Number,
    iat: Number,
    exp: Number
}
```

#### <a name="search_movies_response"></a> Search Movies

```ts
[
	{
		Title: String,
		Year: String,
		imdbID: String,
		Type: String,
		Poster: String
	}
];
```

#### <a name="search_movie_response"></a> Search Movie

```ts
{
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Country: String,
    Awards: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    DVD: String,
    BoxOffice: String,
    Production: String,
    Website: String,
    Response: String,
    Ratings: [
        {
            Source: String,
            Value: String
        }
    ]
}
```

## License

MIT
