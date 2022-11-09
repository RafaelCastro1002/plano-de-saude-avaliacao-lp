/*import { createTables } from "./config/db";
import { GenericDao } from "./models/dao/GenericDAO";
import { Post } from "./models/entities/Post"
import { User } from "./models/entities/User"

const run = async () => {
    await createTables()

    const newUser = new User('Bob', 'bob@email.com')
    const dao1 = new GenericDao(User)
    let sqlQuery = await dao1.save(newUser)
    console.log(sqlQuery)

    const newPost = new Post(
        'Tutorial TypesScript',
        'Este é o tutorial de TypeScript',
        new Date()
    )

    const dao2 = new GenericDao(Post)
    const savedPost = await dao2.save(newPost)
    console.log(savedPost)

}

run()
*/

import { createTables } from "./config/db";

const run = async () => {
    await createTables()

}

run()

