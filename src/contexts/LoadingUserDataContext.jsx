import { createContext, useState } from "react";

const LoadingUserDataContext = createContext();

export const LoadingUserDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const changeLoading = (newLogin) => {
    setLoading(newLogin);
  };

  return (
    <LoadingUserDataContext.Provider value={{ loading, changeLoading }}>
      {children}
    </LoadingUserDataContext.Provider>
  );
};

export default LoadingUserDataContext;
