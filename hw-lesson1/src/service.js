import axios from 'axios'


export async function createUser(user) {
    console.log('createUser')
    await axios.post('http://localhost:3500/createUser', user).then(
        res => {
            res.status(200).json({ message: 'createUser work ' })
        },
        err => {
            res.status(400).send('error! ' + err)
        }
    )
}

export async function signUp(user) {
    debugger
    await axios.post('http://localhost:3500/login', user).then(
        res => {
            res.status(200).json({ message: 'signUP seccessfuly' })
            if (res.data) {
                user.id = res.data._id
                return (res.data)
            } else
                return "data is null";
        },
        err => {
            res.status(400).send('error createUser: ' + err)
            return false;
        }
    )
}

export async function createPicture(picture) {
    console.log('createPic', picture)
    debugger
    await axios.post('http://localhost:3500/createPicture', picture).then(
        res => {
            res.status(200).json({ message: 'create pecture seccessfuly' })
        },
        err => {
            res.status(400).send('error createpic: ' + err)

        }
    )
}

export async function deletePicture(id) {
    await axios.delete('http://localhost:3500/deletePic', { data: { id: id } })
        .then(res => {
            res.status(200).json({ message: 'seccessfuly deleted' })
        },
            err => {
                res.status(400).send('error get users: ' + err)
            })
}