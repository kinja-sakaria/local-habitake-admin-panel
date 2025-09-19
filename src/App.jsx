import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';

// project-imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { store } from 'store/store';
import client from 'config/apollo';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

function AppContent() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
          <AppContent />
      </ApolloProvider>
    </ReduxProvider>
  );
}
 