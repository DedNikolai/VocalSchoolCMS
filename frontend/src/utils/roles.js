export const hasRoles = (user, roles) => {
    return user.roles.some(role => roles.some(item => item === role));
}