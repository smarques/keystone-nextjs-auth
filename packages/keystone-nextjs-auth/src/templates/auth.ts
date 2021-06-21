import { AuthGqlNames } from '../types';
import ejs from 'ejs';

const template = `
import getNextAuthPage from '@opensaas/keystone-nextjs-auth/pages/NextAuthPage';
import { nextAuthProviders as Providers } from '@opensaas/keystone-nextjs-auth';

export default getNextAuthPage({
        identityField: '<%= identityField %>',
        mutationName: '<%= gqlNames.authenticateItemWithPassword %>',
        providers:[ <% for (const provider in providers){ %>
            Providers.<%= provider.name %>({
                <% const providerConf = provider.config;
                for (const key in providerConf) { %>
                    <%= key %>: '<%= providerConf[key] %>',
                <%}%>
                }),
        <% } %>
        ],
    });
  `

export const authTemplate = ({
  gqlNames,
  identityField,
  providers
}: {
  gqlNames: AuthGqlNames;
  identityField: string;
  providers: any;
}) => {
  console.log(providers);
  
  const authOut = ejs
        .render(template, { gqlNames: gqlNames, identityField: identityField, providers: providers});
  return authOut;
};
