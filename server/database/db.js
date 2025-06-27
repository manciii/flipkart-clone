import mongoose from "mongoose";


export const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@ac-gyensgu.ettjroa.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-web`;
    try{
        await mongoose.connect(URL, { dbName: 'ecommerce'})
        console.log('Database connected Successfully');
    } catch(error){
        console.log('Error while connecting with database', error.message);
    }
}

export default Connection;