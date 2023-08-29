export class ReservationsDataSource {
    constructor(options) {
      this.dbConnection = this.initializeDBConnection();
      this.token = options.token;
    }
  
    async initializeDBConnection() {
      // set up our database details, instantiate our connection,
      // and return that database connection
        const dbConnection = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xypry9q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
        return dbConnection;
    }
  
}