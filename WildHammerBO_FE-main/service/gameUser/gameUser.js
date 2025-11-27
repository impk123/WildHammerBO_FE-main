import { fetcher } from '../../service/fetcher';


export const getGameUsers = () =>
    fetcher('/gameUser', {
        method: 'GET',
    })

export default getGameUsers;
