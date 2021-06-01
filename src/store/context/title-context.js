import React from 'react';

const ContentContext = React.createContext({
  title: '[>>>THE TITLE IS MISSING<<<]',
  setTitle: () => {},
});

// export const ContentCtxProvider = (props) => {
//   const [title, setTitle] = useState('[>>> THE TITLE IS MISSING <<<]');

//   return (
//     <ContentContext.Provider
//       value={{
//         title: title,
//         setTitle: setTitle,
//       }}
//     >
//       {props.children}
//     </ContentContext.Provider>
//   );
// };

export default ContentContext;
