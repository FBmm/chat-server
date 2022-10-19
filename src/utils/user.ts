export default {
  getUserInfoExceptPass(user) {
    const _user = user._doc;
    const { _id: id, mobile, createdAt } = _user;
    return {
      mobile,
      createdAt,
      id,
    };
  },
};
