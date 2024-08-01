
# Shopping List Application

This project is a full-stack shopping list application with a React TypeScript frontend and a C# .NET backend.

## Server (C# .NET)

### Prerequisites
- .NET 8.0 SDK
- SQL Server

### Setup
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Restore dependencies:
   ```
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` to point to your SQL Server instance.

4. Apply database migrations:
   ```
   dotnet ef database update
   ```

5. Run the server:
   ```
   dotnet run
   ```

The server will start on `https://localhost:5001` by default.

### Key Features
- RESTful API for managing shopping lists and products
- Entity Framework Core for database operations
- Owned entity approach for storing products within shopping lists

## Client (React TypeScript)
- react (v18 ) vite


### Prerequisites
- Node.js (v20)
- npm or yarn

### Setup
1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

The client will start on `http://localhost:3000` by default.

### Key Features
- React hooks for state management
- TypeScript for type safety
- Material-UI for styling
- Grouped display of products by category

## API Endpoints

- `GET /api/categories`: Get all categories list
- `POST /api/shoppinglists`: Create a new shopping list

there are more but didn't use for this task:
- `GET /api/shoppinglists`: Get all shopping lists
- `GET /api/shoppinglists/{id}`: Get a specific shopping list
- `PUT /api/shoppinglists/{id}`: Update a shopping list
- `DELETE /api/shoppinglists/{id}`: Delete a shopping list

## Data Models

### ShoppingList
```csharp
public class ShoppingList
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; set; }
}
```

### Product
```csharp
public class Product
{
    public string Name { get; set; }
    public int Amount { get; set; }
    public int CategoryId { get; set; }
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
