import crone from 'node-cron'
import { deleteGustes } from '../middlewares/setLocation';
export const deleteGuest = () => {
    crone.schedule('* * */1 * * *', async () => {
        // delete all the user with empty email as guest
        // but first delete the cart form them
        deleteGustes()




    })
}