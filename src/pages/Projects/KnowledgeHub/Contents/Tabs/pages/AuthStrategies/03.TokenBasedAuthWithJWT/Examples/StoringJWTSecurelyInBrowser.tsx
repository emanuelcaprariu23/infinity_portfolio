import CodeBlock from '@/Shared/Components/CodeBlocks/CodeBlock';
import MultipleDefContent from '@/Shared/Components/CodeBlocks/MultipleDefContent';
import Notes from '@/Shared/Components/Notes/Notes';
import { BoxCardContent, FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import { theme } from '@/theme';
import { Divider, Typography } from '@mui/material';
import React from 'react';

const StoringJWTSecurelyInBrowser: React.FC = () => {
  return (
    <FlexWithGapBox>
      <MultipleDefContent
        contents={[
          {
            title: `Understanding Client-Side Storage Options`,
            content: (
              <BoxCardContent>
                <Notes
                  container={{
                    hideNote: true,
                    parentSx: {
                      padding: '10px',
                    },
                  }}
                  notes={[
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="subtitle1">
                            Before diving into JWT storage, we have to understand common client-side
                            storage options available in web browsers. Each of these has its own
                            characteristics, accessibility, persistence, and security implications.
                          </Typography>
                          <Notes
                            container={{
                              hideNote: true,
                              parentSx: {
                                borderRadius: '10px',
                                boxShadow: theme.custom.boxShadows?.tertiary,
                              },
                            }}
                            notes={[
                              {
                                note: (
                                  <FlexWithGapBox>
                                    <Typography variant="h5">
                                      Web Storage API: localStorage and sessionStorage
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ padding: '0 20px' }}>
                                      The Web Storage API provides mechanisms by which browsers can
                                      store key/value pairs locally within the {`user's`} browser.
                                      This data persists across browser sessions (for{' '}
                                      <CodeBlock darkMode>localStorage</CodeBlock>) or for the
                                      duration of a single session (
                                      <CodeBlock darkMode>sessionStorage</CodeBlock>)
                                    </Typography>

                                    <Divider sx={{ width: '100%', margin: '20px 0' }} />

                                    <Typography variant="subtitle1" sx={{ padding: '0 20px' }}>
                                      <CodeBlock darkMode>LocalStorage</CodeBlock> allows web
                                      applications to store data persistently in the browser with no
                                      expiration date. This means the data remains even after the
                                      browser window is closed and reopened, or the device is
                                      restarted. {`It's`} stored as simple string key-value pairs.
                                    </Typography>
                                  </FlexWithGapBox>
                                ),
                                hideList: true,
                                orderedList: false,
                                subNotes: [
                                  {
                                    note: (
                                      <span>
                                        <b>Persistence: </b> Data stored in{' '}
                                        <CodeBlock darkMode>localStorage</CodeBlock> remains until
                                        explicitly cleared by the user, the application, or cleared
                                        by the browser (e.g., if a user clears their browser data).
                                      </span>
                                    ),
                                  },
                                  {
                                    note: (
                                      <span>
                                        <b>Scope:</b> Data is tied to the origin (domain, protocol,
                                        and port). A website on{' '}
                                        <CodeBlock darkMode>example.com</CodeBlock> cannot access{' '}
                                        <CodeBlock darkMode>localStorage</CodeBlock> data from{' '}
                                        <CodeBlock darkMode>another-domain.com</CodeBlock>.
                                      </span>
                                    ),
                                  },
                                  {
                                    note: (
                                      <span>
                                        <b>Capacity:</b>{' '}
                                        {`Offers significantly more storage space compared to cookies, typically around 5-10 MB, depending on the browser.`}
                                      </span>
                                    ),
                                  },
                                  {
                                    note: (
                                      <span>
                                        <b>Accessibility:</b> Directly accessible via JavaScript
                                        (e.g.,{' '}
                                        <CodeBlock
                                          darkMode
                                        >{`localStorage.getItem('jwt')`}</CodeBlock>
                                        ). This direct accessibility is a double-edged sword,
                                        offering convenience but also posing security risks.
                                      </span>
                                    ),
                                  },
                                ],
                              },
                              {
                                note: (
                                  <FlexWithGapBox>
                                    <Divider sx={{ width: '100%', margin: '20px 0' }} />
                                    <Typography variant="subtitle1" sx={{ padding: '0 20px' }}>
                                      <CodeBlock darkMode>sessionStorage</CodeBlock> allows web
                                      applications to store data persistently in the browser with no
                                      expiration date. This means the data remains even after the
                                      browser window is closed and reopened, or the device is
                                      restarted. {`It's`} stored as simple string key-value pairs.
                                    </Typography>

                                    <Typography variant="subtitle1" sx={{ padding: '0 20px' }}>
                                      <CodeBlock darkMode>sessionStorage</CodeBlock> is similar to{' '}
                                      <CodeBlock darkMode>localStorage</CodeBlock>
                                      {` but has a critical difference: its
                                      data is cleared when the browser tab or window is closed. It's
                                      session-specific. While useful for temporary data needed
                                      during a single user session (e.g., form data across multiple
                                      pages), it's generally not suitable for storing JWTs that are
                                      meant to keep a user logged in across multiple browser`}
                                      sessions. Since our goal is persistent authentication,{' '}
                                      <CodeBlock darkMode>sessionStorage</CodeBlock> is typically
                                      not the preferred choice for JWTs.
                                    </Typography>
                                  </FlexWithGapBox>
                                ),
                                hideList: true,
                                orderedList: false,
                              },
                              {
                                note: (
                                  <FlexWithGapBox>
                                    <Divider sx={{ width: '100%', margin: '20px 0' }} />
                                    <Typography variant="h5">Cookies</Typography>

                                    <Typography variant="subtitle1" sx={{ padding: '0 20px' }}>
                                      Cookies are small pieces of data that websites store in a
                                      {`    user's browser`}. Unlike{' '}
                                      <CodeBlock darkMode>localStorage</CodeBlock>, cookies are
                                      automatically sent with every HTTP request to the server from
                                      the same domain. This automatic transmission makes them
                                      fundamentally different from{' '}
                                      <CodeBlock darkMode>localStorage</CodeBlock> and a primary
                                      consideration for authentication tokens.
                                    </Typography>
                                  </FlexWithGapBox>
                                ),
                                hideList: true,
                                orderedList: false,
                                subNotes: [
                                  {
                                    note: (
                                      <span>
                                        <b>Persistence: </b> Cookies can be either session cookies
                                        (deleted when the browser closes) or persistent cookies
                                        (have an expiration date set by the server and persist until
                                        that date or until manually cleared).
                                      </span>
                                    ),
                                  },
                                  {
                                    note: (
                                      <span>
                                        <b>Scope:</b> Cookies are tied to a specific domain (and
                                        optionally path). They are automatically sent by the browser
                                        to the server that set them, and potentially to subdomains,
                                        depending on their configuration.
                                      </span>
                                    ),
                                  },
                                  {
                                    note: (
                                      <span>
                                        <b>Capacity:</b> Much smaller than{' '}
                                        <CodeBlock darkMode>localStorage</CodeBlock>, typically
                                        limited to around 4KB per domain.
                                      </span>
                                    ),
                                  },
                                  {
                                    note: (
                                      <span>
                                        <b>Accessibility:</b> Can be configured to be inaccessible
                                        via JavaScript{' '}
                                        <CodeBlock darkMode>(HttpOnly flag)</CodeBlock>, making them
                                        more secure against certain types of attacks. They are
                                        primarily managed by the server via{' '}
                                        <CodeBlock darkMode>Set-Cookie</CodeBlock> HTTP headers.
                                      </span>
                                    ),
                                  },
                                ],
                              },
                              {
                                note: (
                                  <FlexWithGapBox>
                                    <Divider sx={{ width: '100%', margin: '20px 0' }} />
                                    <Typography variant="h6">
                                      Key Cookie Attributes for Security:
                                    </Typography>
                                    <ul>
                                      <li>
                                        <strong>
                                          <CodeBlock>HttpOnly</CodeBlock>:
                                        </strong>{' '}
                                        When a cookie is marked with the{' '}
                                        <CodeBlock>HttpOnly</CodeBlock> flag, it cannot be accessed
                                        or manipulated by client-side JavaScript. This is a crucial
                                        security measure against Cross-Site Scripting (XSS) attacks,
                                        where an attacker might try to steal the {`user's`}
                                        authentication token by injecting malicious JavaScript. If
                                        the JWT is in an <CodeBlock>HttpOnly</CodeBlock> cookie,
                                        JavaScript cannot read it.
                                      </li>
                                      <li>
                                        <strong>
                                          <CodeBlock>Secure</CodeBlock>:
                                        </strong>{' '}
                                        The <CodeBlock>Secure</CodeBlock> flag ensures that the
                                        cookie is only sent over encrypted HTTPS connections. This
                                        prevents the token from being intercepted and read by
                                        attackers if the application is accessed over an insecure
                                        HTTP connection. Always use this flag in production
                                        environments.
                                      </li>
                                      <li>
                                        <strong>
                                          <CodeBlock darkMode>SameSite</CodeBlock>:
                                        </strong>{' '}
                                        The <CodeBlock darkMode>SameSite</CodeBlock> attribute
                                        controls when cookies are sent with cross-site requests.
                                        This is a critical defense against Cross-Site Request
                                        Forgery (CSRF) attacks.
                                        <ul>
                                          <li>
                                            <CodeBlock darkMode>Strict</CodeBlock>: Cookies are only
                                            sent with requests originating from the same site as the
                                            cookie. This provides strong protection but can
                                            sometimes break legitimate cross-site functionality
                                            (e.g., if you have a third-party login flow).
                                          </li>
                                          <li>
                                            <CodeBlock darkMode>Lax</CodeBlock>: Cookies are sent
                                            with top-level navigations (e.g., clicking a link) and
                                            GET requests from other sites, but not with POST
                                            requests or embedded resources. This offers a good
                                            balance between security and usability.
                                          </li>
                                          <li>
                                            <CodeBlock darkMode>None</CodeBlock>: Cookies will be
                                            sent with all requests, including cross-site requests.
                                            When <CodeBlock darkMode>SameSite=None</CodeBlock>, the{' '}
                                            <CodeBlock darkMode>Secure</CodeBlock> attribute{' '}
                                            <em>must</em> also be set, otherwise, the cookie will be
                                            rejected. This option is required for certain cross-site
                                            functionalities but significantly reduces CSRF
                                            protection.
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>

                                    <Typography variant="h6">
                                      <strong>Hypothetical Scenario for Cookies:</strong>
                                    </Typography>
                                    <Typography variant="body1">
                                      Imagine an online banking website. When you log in, the server
                                      sets an authentication cookie. This cookie is marked{' '}
                                      <CodeBlock darkMode>HttpOnly</CodeBlock> and{' '}
                                      <CodeBlock darkMode>Secure</CodeBlock>. Every time you
                                      navigate to a new page within your banking session, your
                                      browser automatically sends this cookie to the server,
                                      authenticating your requests without you having to re-enter
                                      your password. The <CodeBlock darkMode>HttpOnly</CodeBlock>{' '}
                                      flag protects it from malicious JavaScript, and{' '}
                                      <CodeBlock darkMode>Secure</CodeBlock> ensures {`it's`}
                                      only sent over encrypted connections.
                                    </Typography>

                                    <Typography variant="body1">
                                      <strong>Real-World Example:</strong>
                                      Most traditional web applications (e.g., content management
                                      systems like WordPress, e-commerce sites like Amazon) use
                                      cookies for session management. After a user logs in, a
                                      session ID is stored in an{' '}
                                      <CodeBlock darkMode>HttpOnly</CodeBlock>,{' '}
                                      <CodeBlock darkMode>Secure</CodeBlock> cookie. This session ID
                                      is then sent with every subsequent request, allowing the
                                      server to identify the
                                      {` user's session.`}
                                    </Typography>
                                  </FlexWithGapBox>
                                ),
                                hideList: true,
                                orderedList: false,
                              },
                            ]}
                          />
                        </FlexWithGapBox>
                      ),

                      hideList: true,
                      orderedList: false,
                    },
                  ]}
                  specialNotes
                />
              </BoxCardContent>
            ),
          },
          {
            title: `Storing JWTs in localStorage`,
            content: (
              <BoxCardContent>
                <Notes
                  container={{
                    hideNote: true,
                    parentSx: {
                      padding: '10px',
                    },
                  }}
                  notes={[
                    {
                      note: (
                        <FlexWithGapBox sx={{ width: '100%' }}>
                          <Typography variant="h6">Expected Success Response</Typography>

                          <Typography variant="subtitle1">
                            Upon successful authentication, the backend typically responds with an
                            HTTP status CodeBlock of <CodeBlock>200 OK</CodeBlock>. The response
                            body will be a JSON object, and crucially, it will contain the JWT. The
                            exact key for the JWT in the JSON object can vary, but{' '}
                            <CodeBlock>token</CodeBlock> or <CodeBlock>accessToken</CodeBlock> are
                            common.
                          </Typography>

                          <CodeBlock
                            darkMode
                            text={`
                        {
                            "message": "Login successful!",
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmMxMjMiLCJ1c2VybmFtZSI6ImFsaWNlIiwiaWF0IjoxNjQ3NjgyMjAwLCJleHAiOjE2NDc2ODU4MDB9.some-signature-string-here"
                        }
                            `}
                          />
                          <Typography variant="h6">Expected Error Response</Typography>
                          <Typography variant="subtitle1">
                            A common status CodeBlock for invalid credentials is{' '}
                            <CodeBlock>401 Unauthorized</CodeBlock> or{' '}
                            <CodeBlock>400 Bad Request</CodeBlock>. The response body would also be
                            a JSON object, but instead of a token, it would contain an error
                            message.
                          </Typography>
                          <CodeBlock
                            darkMode
                            text={`
                       {
                          "error": "Authentication failed",
                          "details": "User not found or password incorrect"
                        }
                            `}
                          />
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                    },
                  ]}
                />
              </BoxCardContent>
            ),
          },
          {
            title: `Comparative Analysis: localStorage vs. Cookies for JWTs`,
            content: (
              <BoxCardContent>
                <Notes
                  container={{
                    hideNote: true,
                    parentSx: {
                      padding: '10px',
                    },
                  }}
                  specialNotes
                  notes={[
                    {
                      note: (
                        <FlexWithGapBox sx={{ width: '100%' }}>
                          <Typography variant="h6">Expected Success Response</Typography>

                          <Typography variant="subtitle1">
                            Upon successful authentication, the backend typically responds with an
                            HTTP status CodeBlock of <CodeBlock>200 OK</CodeBlock>. The response
                            body will be a JSON object, and crucially, it will contain the JWT. The
                            exact key for the JWT in the JSON object can vary, but{' '}
                            <CodeBlock>token</CodeBlock> or <CodeBlock>accessToken</CodeBlock> are
                            common.
                          </Typography>

                          <CodeBlock
                            darkMode
                            text={`
                        {
                            "message": "Login successful!",
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmMxMjMiLCJ1c2VybmFtZSI6ImFsaWNlIiwiaWF0IjoxNjQ3NjgyMjAwLCJleHAiOjE2NDc2ODU4MDB9.some-signature-string-here"
                        }
                            `}
                          />
                          <Typography variant="h6">Expected Error Response</Typography>
                          <Typography variant="subtitle1">
                            A common status CodeBlock for invalid credentials is{' '}
                            <CodeBlock>401 Unauthorized</CodeBlock> or{' '}
                            <CodeBlock>400 Bad Request</CodeBlock>. The response body would also be
                            a JSON object, but instead of a token, it would contain an error
                            message.
                          </Typography>
                          <CodeBlock
                            darkMode
                            text={`
                       {
                          "error": "Authentication failed",
                          "details": "User not found or password incorrect"
                        }
                            `}
                          />
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                    },
                  ]}
                />
              </BoxCardContent>
            ),
          },
          {
            title: `Storing JWTs in Cookies`,
            content: (
              <BoxCardContent>
                <Notes
                  container={{
                    hideNote: true,
                    parentSx: {
                      padding: '10px',
                    },
                  }}
                  notes={[
                    {
                      note: (
                        <FlexWithGapBox sx={{ width: '100%' }}>
                          <Typography variant="h6">Expected Success Response</Typography>

                          <Typography variant="subtitle1">
                            Upon successful authentication, the backend typically responds with an
                            HTTP status CodeBlock of <CodeBlock>200 OK</CodeBlock>. The response
                            body will be a JSON object, and crucially, it will contain the JWT. The
                            exact key for the JWT in the JSON object can vary, but{' '}
                            <CodeBlock>token</CodeBlock> or <CodeBlock>accessToken</CodeBlock> are
                            common.
                          </Typography>

                          <CodeBlock
                            darkMode
                            text={`
                        {
                            "message": "Login successful!",
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYmMxMjMiLCJ1c2VybmFtZSI6ImFsaWNlIiwiaWF0IjoxNjQ3NjgyMjAwLCJleHAiOjE2NDc2ODU4MDB9.some-signature-string-here"
                        }
                            `}
                          />
                          <Typography variant="h6">Expected Error Response</Typography>
                          <Typography variant="subtitle1">
                            A common status CodeBlock for invalid credentials is{' '}
                            <CodeBlock>401 Unauthorized</CodeBlock> or{' '}
                            <CodeBlock>400 Bad Request</CodeBlock>. The response body would also be
                            a JSON object, but instead of a token, it would contain an error
                            message.
                          </Typography>
                          <CodeBlock
                            darkMode
                            text={`
                       {
                          "error": "Authentication failed",
                          "details": "User not found or password incorrect"
                        }
                            `}
                          />
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                    },
                  ]}
                />
              </BoxCardContent>
            ),
          },
        ]}
      />
    </FlexWithGapBox>
  );
};

StoringJWTSecurelyInBrowser.displayName = 'StoringJWTSecurelyInBrowser';

export default StoringJWTSecurelyInBrowser;
