import { fetcher } from '../../service/fetcher';


export const getRoleHero = () =>
    fetcher('/rolehero', {
        method: 'GET',
    })


// export const getRoleHeroById = (id) =>
//     fetcher(`/rolehero/${id}`, {
//         method: 'GET',
//     })

export const getRoleHeroByUserId = (userId) =>
    fetcher(`/rolehero/${userId}`, {
        method: 'GET',
    })

export default getRoleHero;
