import { AppsInToss } from '@apps-in-toss/framework';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import { PropsWithChildren } from 'react';
import { InitialProps } from '@granite-js/react-native';
import { context } from './require.context';

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
  return (
    <TDSMobileAITProvider brandPrimaryColor="#3182F6">
      {children}
    </TDSMobileAITProvider>
  );
}

export default AppsInToss.registerApp(AppContainer, { context });
