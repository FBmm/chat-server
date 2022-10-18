export default {
  getUserInfoExceptPass(user) {
    const _user = user._doc;
    const { _id: id, __v, pass, ...result } = _user;
    return {
      ...result,
      id,
    };
  },
};
