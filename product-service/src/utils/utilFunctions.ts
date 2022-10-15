export const isValidUser = (user) => {
    return Object.keys(user).length
        && `${user.title}`.trim()
};