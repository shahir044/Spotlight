import axios from "axios";

const GITHUB_URL= process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {Authorization: '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'}
})

// @Search User Api // now it is taken to Github Actions
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const resp = await github.get(`/search/users?${params}`)
    console.log(resp.data);
    return resp.data.items;

    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
    //     headers:{
    //         Authorization: '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',
    //     },
    // })
    // if (!response.ok) {
    //     throw new Error('Data could not be fetched!')
    // }else {
    //     const {items} = await response.json();
    //     return items;
    //
    //     // dispatch({
    //     //     type: 'GET_USERS',
    //     //     payload: items
    //     // });
    //
    //     // console.log(data);
    //     // return response.json()
    // }
}

export const getUserAndRepos = async (login) =>{
    const [user,repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ]);

    return {
        user: user.data,
        repos: repos.data
    }
}

// @Fetch Get Single User
// export const getUser = async (login) => {
//
//     const response = await fetch(`${GITHUB_URL}/users/${login}`,{
//         headers:{
//             Authorization: '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',
//         },
//     })
//
//     if(response.status===404){
//         window.location = '/notfound';
//     }else if (!response.ok) {
//         throw new Error('Data could not be fetched!')
//     }else {
//         const data = await response.json(); //getting only one data thats why no object {item}
//         return data;
//         // dispatch({
//         //     type: 'GET_USER',
//         //     payload: data
//         // });
//         // console.log(data);
//         // return response.json()
//     }
//
// }
//
// // @Get User Repos
// export const getUserRepos = async (login) => {
//
//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page: 10
//     })
//
//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
//         headers:{
//             Authorization: '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',
//         },
//     })
//     if (!response.ok) {
//         throw new Error('Data could not be fetched!')
//     }else {
//         const data = await response.json();
//         return data;
//         // dispatch({
//         //     type: 'GET_REPOS',
//         //     payload: data
//         // });
//
//         // console.log(data);
//         // return response.json()
//     }
// }

//Get initial users TESTING PURPOSE ONLY
const fetchUsers = async () => {

    const response = await fetch('https://api.github.com/users',{
        headers:{
            Authorization: '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',
        },
    })
    if (!response.ok) {
        throw new Error('Data could not be fetched!')
    }else {
        const data = await response.json();

        // dispatch({
        //     type: 'GET_USERS',
        //     payload: data
        // });

        console.log(data);
        // return response.json()
    }
}

//SET LOADING
// const setLoading = () => dispatch({
//     type: 'SET_LOADING'
// })

// const clearUsers = () => {
//     dispatch({
//         type: 'CLEAR_USERS',
//         payload: []
//     })
// }