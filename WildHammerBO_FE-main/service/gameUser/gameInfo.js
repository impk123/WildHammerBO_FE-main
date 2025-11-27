import { fetcher } from '../../service/fetcher';


export const getGameInfo = () =>
    fetcher('/gameinfo', {
        method: 'GET',
    })

// export const getGameInfoById = (id) =>
//     fetcher(`/gameinfo/${id}`, {
//         method: 'GET',
//     })

export const getGameInfoByUserId = (userId) =>
    fetcher(`/roleinfo/${userId}`, {
        method: 'GET',
    })

export default getGameInfo;
