import React from 'react';
import { TemplatePageContent } from '../../components';
import { TOKEN_BASED__AUTH_WITH_JWT_CONTENTS } from '../contents';

const PAGE_TITLE = 'Token Based Authentication With JWT';

const TokenBasedAuthWithJWTContent: React.FC = () => {
  return (
    <TemplatePageContent
      pageTitle={PAGE_TITLE}
      pageContentList={TOKEN_BASED__AUTH_WITH_JWT_CONTENTS}
    />
  );
};

TokenBasedAuthWithJWTContent.displayName = 'TokenBasedAuthWithJWTContent';

export default TokenBasedAuthWithJWTContent;
