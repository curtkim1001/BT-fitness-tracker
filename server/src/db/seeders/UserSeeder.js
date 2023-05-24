import { User } from "../../models/index.js"

class userSeeder {
    static async seed() {
        const userData = [
            {
                email:"launchacademy@email.com",
                password: "launch",
                firstName: "John",
                lastName: "Doe"
            }, 
            {
                email:"test@test.com",
                password: "test",
                firstName: "Jane",
                lastName: "Doe"
            },
            {
                email:"fitness@email.com",
                password: "fitness",
                firstName: "Peter",
                lastName: "Quill"
            }
        ]
        
        for (const singleUser of userData) {
            const currentUser = await User.query().findOne({ email: singleUser.email })
            if (!currentUser) {
                await User.query().insert(singleUser)
            }
        }
    }
}

export default userSeeder