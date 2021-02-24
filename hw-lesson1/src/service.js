import axios from 'axios'


export async function createUser(user) {
    console.log('createUser')
    await axios.post('http://localhost:3500/createUser', user).then(
        res => {
            console.log('createpic work ' + JSON.stringify(res.data));
        },
        err => {
            console.log('error createpic: ' + err);
        }
    )
}

export async function signUp(user) {
    await axios.post('http://localhost:3500/login', user).then(
        res => {
            console.log('signUP work ' + JSON.stringify(res.data))
            if (res.data) {
                user.id = res.data._id
                return (res.data)
            } else
                return "data is null";
        },
        err => {
            console.log('error createUser: ' + err);
            return false;
        }
    )
}

export async function createPicture(picture) {
    await axios.post('http://localhost:3500/createPicture', picture).then(
        res => {
            console.log('createpic work ' + JSON.stringify(res.data));
        },
        err => {
            console.log('error createpic: ' + err);
        }
    )
}

export async function deletePicture(id) {
    await axios.delete('http://localhost:3500/deletePic', {
        data: { id: id }
    })
        .then(res => {
            console.log(JSON.stringify(res));
        },
            err => {
                console.log('error get users ' + err);
            })
}