import CodeBlock from '@/Shared/Components/CodeBlocks/CodeBlock';
import MultipleDefContent from '@/Shared/Components/CodeBlocks/MultipleDefContent';
import Notes from '@/Shared/Components/Notes/Notes';
import { BoxCardContent, FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import { Typography } from '@mui/material';
import React from 'react';

const JWTSimulatedFromBE: React.FC = () => {
  return (
    <FlexWithGapBox>
      <MultipleDefContent
        contents={[
          {
            title: `The Authentication Flow: Requesting a Token`,
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
                          <Typography variant="h6">What FE sends</Typography>
                          <Typography variant="subtitle1">
                            {`To get JWT from BE we need to send a POST request to the authentication endpoint with the user's credentials (like username and password). If the credentials are valid, the server will generate a JWT and send it back in the response. This token can then be used by the client to authenticate subsequent requests to protected resources on the server.`}
                          </Typography>

                          <CodeBlock
                            text={`
                            {
                                  "username": "john.doe",
                                  "password": "mysecretpassword"
                            }`}
                          />

                          <Typography variant="subtitle1">
                            {`This payload is sent to a designated authentication endpoint on the backend, often something like `}{' '}
                            <CodeBlock>/api/login </CodeBlock>
                            or
                            <CodeBlock>/auth/token</CodeBlock>
                          </Typography>

                          <Typography variant="h6">What BE does</Typography>
                          <ol>
                            <li>
                              <strong>Validates Input:</strong> It first checks if the received data
                              (username/password) is well-formed and meets any basic requirements
                              (e.g., not empty).
                            </li>
                            <li>
                              <strong>Verifies Credentials:</strong> It then looks up the provided
                              username in its database. If found, it takes the provided password,
                              hashes it, and compares it against the stored hashed password for that
                              user. (Remember our discussion on password hashing and salting from
                              Module 2?)
                            </li>
                            <li>
                              <strong>Generates JWT:</strong> If the credentials are valid, the
                              backend server will then <em>generate</em> a new JSON Web Token. This
                              JWT will typically contain claims such as the {`user's`} ID, username,
                              and possibly their roles or permissions, along with an expiration
                              time. It then signs this token using a secret key, ensuring its
                              integrity and authenticity.
                            </li>
                            <li>
                              <strong>Responds to Frontend:</strong> Finally, the backend sends an
                              HTTP response back to the frontend. This response typically includes
                              the generated JWT and a success status CodeBlock. If the credentials
                              were invalid, it would send an error status CodeBlock (like{' '}
                              <CodeBlock>401 Unauthorized</CodeBlock>) and an error message.
                            </li>
                          </ol>
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
            title: `Simulating the Backend Response`,
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

JWTSimulatedFromBE.displayName = 'JWTSimulatedFromBE';

export default JWTSimulatedFromBE;
