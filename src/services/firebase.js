import {firebase, FieldValue} from '../lib/firebase';

export async function doesEmailExist(emailAddress){
    const result = await firebase
        .firestore()
        .collection('users')
        .where('emailAddress', '==', emailAddress)
        .get();

        return result.docs.map((user) => user.data().length > 0);

}

export async function getUserByUserId(userId){
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

    const user = result.docs.map((item) => ({
         ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getPosts(userId){
    const result = await firebase.firestore().collection('posts').where('userId', '!=', userId).get();

    const otherUserPosts = result.docs.map((post) => ({
        ...post.data(),
        docId: post.id
    }));
}
