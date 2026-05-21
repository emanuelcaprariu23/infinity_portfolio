import MultipleDefContent from '@/Shared/Components/CodeBlocks/MultipleDefContent';
import Notes from '@/Shared/Components/Notes/Notes';
import { BoxCardContent } from '@/Shared/Utils/Helpers/styled-components';
import { Typography } from '@mui/material';
import React from 'react';

const StoringUserCredClient: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <MultipleDefContent
        contents={[
          {
            title: `Storing User Credentials Securely (Client-Side Considerations)`,
            content: (
              <BoxCardContent>
                <Typography variant="subtitle1">
                  {`The client-side's role is primarily to protect credentials in transit and provide a secure interface for users.`}
                  {`We'll explore techniques like secure input fields, avoiding storage, and the importance of HTTPS`}
                </Typography>
                <Notes
                  notes={[
                    {
                      note: (
                        <Typography variant="h6">
                          The Cardinal Rule: Never Store Passwords Locally
                        </Typography>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: `you should never store passwords in plaintext, or even in an easily reversible format, on the client-side. This includes localStorage, sessionStorage, cookies, or any other client-side storage mechanism.`,
                        },
                        {
                          note: `Any credentials stored client-side are vulnerable to various attacks, including XSS (Cross-Site Scripting) and malicious browser extensions`,
                        },
                        {
                          note: `This is why client-side password storage is an absolute no-go. The server is responsible for secure password storage, using techniques like hashing and salting`,
                        },
                      ],
                    },
                    {
                      note: <Typography variant="h6">Why is this so important?</Typography>,
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <span>
                              <b>Accessibility: </b>{' '}
                              {` Client-side storage is easily accessible through browser developer tools. Anyone with access to the user's computer can inspect the storage and retrieve the passwords if they're stored`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>XSS Vulnerabilities:</b>{' '}
                              {`XSS attacks can allow malicious scripts to execute in the context of your website. These scripts can then steal any data stored on the client-side, including passwords. We'll delve deeper into XSS prevention in a later module.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Malicious Extensions:</b>{' '}
                              {`Browser extensions have broad access to the data on websites. A malicious extension could easily steal passwords stored in the browser.`}
                            </span>
                          ),
                        },
                      ],
                    },
                    {
                      note: <Typography variant="h6">The Importance of HTTPS</Typography>,
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <span>
                              <b>Encryption: </b>{' '}
                              {`: HTTPS uses TLS (Transport Layer Security) to encrypt all data transmitted between the browser and the server, including passwords. Without HTTPS, passwords are sent in plaintext, making them vulnerable to interception.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Authentication:</b>{' '}
                              {` HTTPS verifies the identity of the server, ensuring that the user is connecting to the legitimate website and not a fraudulent one.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Integrity:</b>{' '}
                              {`HTTPS ensures that the data transmitted has not been tampered with during transit.`}
                            </span>
                          ),
                        },
                      ],
                    },
                    {
                      note: (
                        <Typography variant="h6">
                          Avoid Storing Credentials in Memory Longer Than Necessary
                        </Typography>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <span>
                              {`Once you've obtained the password from the user and sent it to the server, clear it from memory as soon as possible. Avoid storing it in variables longer than needed.`}
                            </span>
                          ),
                        },
                      ],
                    },
                    {
                      note: <Typography variant="h6">Content Security Policy (CSP)</Typography>,
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <span>
                              {`CSP is an important mechanism to help mitigate the risk of XSS attacks`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              {`CSP allows you to define a whitelist of sources from which the browser is allowed to load resources, such as scripts, stylesheets, and images`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              {`By restricting the sources from which the browser can load resources, you can significantly reduce the attack surface of your application.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>A basic CSP policy might look like this into html file:</b>
                              {`<meta http-equiv="Content-Security-Policy" content="default-src 'self'">`}
                            </span>
                          ),
                        },
                      ],
                    },
                  ]}
                  specialNotes
                />
              </BoxCardContent>
            ),
          },
        ]}
      />
    </div>
  );
};

StoringUserCredClient.displayName = 'StoringUserCredClient';

export default StoringUserCredClient;
