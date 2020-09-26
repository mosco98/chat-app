const users = []

const addUser = ({ id, name, room }) => {
  // remove whitespaces between names and rooms and change all letters to lowercase
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  // Check if user exists
  const existingUser = users.find((user) => user.room === room && user.name === name)

  if (existingUser) {
    return { error: 'Username is taken' }
  }

  const user = { id, name, room }

  users.push(user)

  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => {
  const usersInRoom = users.filter((user) => user.room === room)

  return usersInRoom
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom }