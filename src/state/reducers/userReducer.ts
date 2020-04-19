const UserReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        email: action.payload.email,
        loggedIn: true,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        email: action.payload.email,
        loggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
