# Video Club API

This api allows you to search and "rent" your favorite movies and video games.

### Routes

#### Auth

This route is used to handle authentication and token validation.
**Base route: /api/auth**

| PATH         | METHOD | PAYLOAD                       | RESPONSE                              | Auth Required |
| ------------ | ------ | ----------------------------- | ------------------------------------- | ------------- |
| /login       | POST   | [Login](#login_payload)       | [Login](#auth_response)               | FALSE         |
| /register    | POST   | [Register](#register_payload) | [Register](#auth_response)            | FALSE         |
| /verifyToken | GET    | N/A                           | [Verify Token](#verifyToken_response) | TRUE          |

### Payload References

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

### Response References

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

## License

MIT
