import { PageContentI } from '@/pages/Projects/KnowledgeHub/interfaces';
import { AuthVsAuthorization, CommonAuthFlows, WhatIsAuth } from './01.Introduction/Examples';
import { PasswordAndSalting, StoringUserCredClient } from './02.PasswordBasedAuth/Examples';
import { IntroductionToJWT, JWTStructureAndClaims } from './03.TokenBasedAuthWithJWT/Examples';

const INTRODUCTION_TO_AUTH_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'what-is-auth-example-id',
    title: 'What is Authentication?',
    children: <WhatIsAuth />,
  },
  {
    elementId: 'authentication-vs-authorization-example-id',
    title: 'Authentication vs. Authorization',
    children: <AuthVsAuthorization />,
  },
  {
    elementId: 'common-authentication-flows-example-id',
    title: 'Common Authentication Flows:A high-level Overview',
    children: <CommonAuthFlows />,
  },
];

const PASSWORD_BASED_AUTH_PAGE_CONTENTS: PageContentI[] = [
  {
    elementId: 'understanding-password-hashing-salting-example-id',
    title: 'Password Hashing & Salting',
    children: <PasswordAndSalting />,
  },
  {
    elementId: 'storing-user-credentials-client-considerations-example-id',
    title: 'Storing User Cred on Client Side',
    children: <StoringUserCredClient />,
  },
];

const TOKEN_BASED__AUTH_WITH_JWT_CONTENTS: PageContentI[] = [
  {
    elementId: 'introduction-to-jwt-example-id',
    title: 'Introduction To JWT',
    children: <IntroductionToJWT />,
  },
  {
    elementId: 'jwt-structure-and-claims-example-id',
    title: `JWT structure and claims`,
    children: <JWTStructureAndClaims />,
  },
];

export {
  INTRODUCTION_TO_AUTH_PAGE_CONTENTS,
  PASSWORD_BASED_AUTH_PAGE_CONTENTS,
  TOKEN_BASED__AUTH_WITH_JWT_CONTENTS,
};
