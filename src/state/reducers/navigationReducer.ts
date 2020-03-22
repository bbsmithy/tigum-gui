export const navigationReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screenTree: action.payload };
    case 'HIDE_TOPIC_NAVBAR':
      return { ...state, showTopicNavbar: false };
    case 'SHOW_TOPIC_NAVBAR':
      return { ...state, showTopicNavbar: true };
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        showSidebar: false,
        useFullWidth: action.payload.useFullWidth
      };
    case 'SHOW_SIDEBAR':
      return {
        ...state,
        showSidebar: true,
        useFullWidth: action.payload.useFullWidth
      };
    default:
      return state;
  }
};
