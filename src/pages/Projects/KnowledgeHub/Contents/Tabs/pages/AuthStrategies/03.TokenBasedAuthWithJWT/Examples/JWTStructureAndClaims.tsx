import CodeBlock from '@/Shared/Components/CodeBlocks/CodeBlock';
import MultipleDefContent from '@/Shared/Components/CodeBlocks/MultipleDefContent';
import Notes from '@/Shared/Components/Notes/Notes';
import { BoxCardContent, FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import { Typography } from '@mui/material';
import React from 'react';

const JWTStructureAndClaims: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <MultipleDefContent
        contents={[
          {
            title: `The JWT Header`,
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
                          <Typography variant="subtitle2">
                            The header typically consists of two parts: the type of the token, which
                            is JWT, and the signing algorithm being used, such as HMAC SHA256 or
                            RSA. This information helps the recipient of the JWT understand how to
                            process it. The header is a JSON object that is then Base64Url encoded
                          </Typography>

                          <CodeBlock
                            text={`
                            "alg": "HS256",
                            "typ": "JWT"
                            }`}
                          />

                          <Typography variant="subtitle2">
                            After Base64Url encoding, this header would become a string like
                            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. The Base64Url encoding ensures
                            that the header can be safely transmitted in URLs, HTTP headers, and
                            other environments that are text-based
                          </Typography>
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
            title: `The JWT Payload (Claims)`,
            content: (
              <BoxCardContent>
                <Notes
                  container={{ hideNote: true }}
                  notes={[
                    {
                      note: (
                        <Typography variant="subtitle1">
                          {`  The payload of a JWT contains "claims," which are statements about an
                            entity (typically the user) and additional data. Claims are key-value
                            pairs where the key is the claim name and the value is the claim value. There are three types of claims: Registered, Public, and Private Claims`}
                        </Typography>
                      ),
                      hideList: true,
                    },
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="h5">Registered Claims</Typography>
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          hideList: true,
                          note: (
                            <>
                              <ul>
                                <li>
                                  <strong>
                                    <CodeBlock>iss</CodeBlock> (Issuer)
                                  </strong>
                                  : Identifies the principal that issued the JWT.
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>: If a JWT is issued by an
                                      authentication server at{' '}
                                      <CodeBlock>auth.example.com</CodeBlock>, the{' '}
                                      <CodeBlock>iss</CodeBlock> claim would be{' '}
                                      <CodeBlock>auth.example.com</CodeBlock>.
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>:
                                      {` A "Task Manager" application
                                      issues a JWT after a user logs in. The`}{' '}
                                      <CodeBlock>iss</CodeBlock> claim might be{' '}
                                      <CodeBlock>taskmanager.com/auth</CodeBlock>.
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    <CodeBlock>sub</CodeBlock> (Subject)
                                  </strong>
                                  : Identifies the principal that is the subject of the JWT. This is
                                  typically the user ID.
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>:{' '}
                                      {`For a user named "Alice" with user ID "user123", the `}
                                      <CodeBlock>sub</CodeBlock> claim would be{' '}
                                      <CodeBlock>user123</CodeBlock>.
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>:
                                      {` In our "Task Manager" app, after "John Doe" logs in, the `}
                                      <CodeBlock>sub</CodeBlock> claim could be{' '}
                                      <CodeBlock>johndoe_user_id</CodeBlock>.
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    <CodeBlock>aud</CodeBlock> (Audience)
                                  </strong>
                                  : Identifies the recipients that the JWT is intended for.
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>: If a JWT is meant to be used by a{' '}
                                      <CodeBlock>api.example.com</CodeBlock> and{' '}
                                      <CodeBlock>mobile.example.com</CodeBlock> service, the{' '}
                                      <CodeBlock>aud</CodeBlock> claim could be an array:{' '}
                                      <CodeBlock>
                                        [{`"api.example.com", "mobile.example.com"`}]
                                      </CodeBlock>
                                      .
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>:
                                      {` A JWT issued by the "Task Manager" authentication service might have an `}
                                      <CodeBlock>aud</CodeBlock> claim set to{' '}
                                      <CodeBlock>taskmanager-api</CodeBlock> if
                                      {`it's specifically for the backend API.`}
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    <CodeBlock>exp</CodeBlock> (Expiration Time)
                                  </strong>
                                  : Identifies the expiration time on or after which the JWT MUST
                                  NOT be accepted for processing. It is a Unix timestamp (seconds
                                  since epoch).
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>: An <CodeBlock>exp</CodeBlock>{' '}
                                      value of <CodeBlock>1678886400</CodeBlock> would correspond to
                                      March 15, 2023, 12:00:00 PM UTC. This claim prevents replay
                                      attacks where an old token is used.
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>:
                                      {` A JWT for the "Task Manager" might have an `}
                                      <CodeBlock>exp</CodeBlock>
                                      {` claim indicating it's valid for 1 hour from`}
                                      issuance, making it{' '}
                                      <CodeBlock>(current_timestamp + 3600)</CodeBlock>.
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    <CodeBlock>nbf</CodeBlock> (Not Before)
                                  </strong>
                                  : Identifies the time before which the JWT MUST NOT be accepted
                                  for processing. Also a Unix timestamp.
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>: An <CodeBlock>nbf</CodeBlock>{' '}
                                      value of <CodeBlock>1678882800</CodeBlock> would mean the
                                      token is not valid until March 15, 2023, 11:00:00 AM UTC. This
                                      is useful for preventing tokens from being used prematurely.
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>: A token might be issued for a
                                      future event, like a scheduled task, and have an{' '}
                                      <CodeBlock>nbf</CodeBlock> {`set to the task's start time.`}
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    <CodeBlock>iat</CodeBlock> (Issued At)
                                  </strong>
                                  : Identifies the time at which the JWT was issued. Also a Unix
                                  timestamp.
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>: An <CodeBlock>iat</CodeBlock>{' '}
                                      value of <CodeBlock>1678882800</CodeBlock> would correspond to
                                      March 15, 2023, 11:00:00 AM UTC.
                                      {` This provides information about the token's`}
                                      age.
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>:{` The `}
                                      <CodeBlock>iat</CodeBlock>
                                      {` for a "Task Manager" JWT would be the exact time the user successfully logged in and the token was generated.`}
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    <CodeBlock>jti</CodeBlock> (JWT ID)
                                  </strong>
                                  : Provides a unique identifier for the JWT. This claim can be used
                                  to prevent the JWT from being replayed, even if it has not
                                  expired.
                                  <ul>
                                    <li>
                                      <em>Real-World Example</em>: A unique UUID (e.g.,{' '}
                                      <CodeBlock>a1b2c3d4-e5f6-7890-1234-567890abcdef</CodeBlock>
                                      generated for each token issued.
                                    </li>
                                    <li>
                                      <em>Hypothetical Scenario</em>:
                                      {` For the "Task Manager", each login session would generate a unique `}
                                      <CodeBlock>jti</CodeBlock>
                                      {` to allow for server-side revocation if needed.`}
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </>
                          ),
                        },
                      ],
                    },
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="h5">Public Claims</Typography>
                          <Typography variant="subtitle2" sx={{ padding: '0 20px' }}>
                            {`These claims can be defined by anyone who uses JWTs. They should be defined in the IANA JSON Web Token Claims Registry or be defined as a URI that contains a collision-resistant namespace. This helps prevent collisions between custom claim names`}
                          </Typography>
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,

                      subNotes: [
                        {
                          hideList: true,
                          note: (
                            <>
                              <ul>
                                <li>
                                  <em>Real-World Example</em>: An e-commerce platform might include
                                  a public claim like{' '}
                                  <CodeBlock>https://example.com/roles</CodeBlock> with a value of{' '}
                                  <CodeBlock>{`["customer", "premium"]`}</CodeBlock> to indicate
                                  user roles, where <CodeBlock>https://example.com/roles</CodeBlock>{' '}
                                  is a URI ensuring uniqueness.
                                </li>
                                <li>
                                  <em>Hypothetical Scenario</em>:{` The "Task Manager" could use a`}
                                  public claim like{' '}
                                  <CodeBlock>https://taskmanager.com/account_type</CodeBlock> with a
                                  value of <CodeBlock>{`"pro"`}</CodeBlock> or{' '}
                                  <CodeBlock>{`"basic"`}</CodeBlock> to denote subscription tiers.
                                </li>
                              </ul>
                            </>
                          ),
                        },
                      ],
                    },
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="h5">Private Claims</Typography>
                          <Typography variant="subtitle2" sx={{ padding: '0 20px' }}>
                            {`These are custom claims agreed upon by the parties exchanging the JWT. They are not registered or public and are prone to collisions if not carefully managed. It's best practice to prefix private claims with a unique identifier or namespace to avoid conflicts.`}
                          </Typography>
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          hideList: true,
                          note: (
                            <>
                              <ul>
                                <li>
                                  <em>Real-World Example</em>: A company might use a private claim
                                  like <CodeBlock>orgId</CodeBlock> to identify the organization a
                                  user belongs to, e.g.,{' '}
                                  <CodeBlock>{`"orgId": "acme_corp_id"`}</CodeBlock>.
                                </li>
                                <li>
                                  <em>Hypothetical Scenario</em>: In the {` "Task Manager"`} app, a
                                  private claim could be{' '}
                                  <CodeBlock>{`"preferred_theme": "dark"`}</CodeBlock>
                                  {` to store a
                                  user's chosen UI theme directly within the token. Another could be `}
                                  <CodeBlock>{`"task_limit": 50`}</CodeBlock>{' '}
                                  {`for users on a "basic"`}
                                  plan.
                                </li>
                              </ul>
                            </>
                          ),
                        },
                        {
                          hideList: true,
                          note: (
                            <div style={{ marginTop: '10px' }}>
                              <CodeBlock
                                darkMode
                                text={`{
                            "sub": "user_john_doe",
                            "name": "John Doe",
                            "email": "john.doe@example.com",
                            "iat": 1678882800,
                            "exp": 1678886400,
                            "app_roles": ["user", "task_creator"],
                            "team_id": "team_alpha"
                            }`}
                              />
                            </div>
                          ),
                        },
                        {
                          hideList: true,
                          note: (
                            <>
                              <div style={{ marginTop: '10px' }}>
                                Here, <CodeBlock>sub</CodeBlock>, <CodeBlock>iat</CodeBlock>, and{' '}
                                <CodeBlock>exp</CodeBlock> are registered claims.{' '}
                                <CodeBlock>name</CodeBlock> and <CodeBlock>email</CodeBlock> could
                                be considered private claims (though they are common enough to
                                sometimes be treated like public claims in practice).{' '}
                                <CodeBlock>app_roles</CodeBlock> and <CodeBlock>team_id</CodeBlock>{' '}
                                are clearly private claims specific to the {`application's`} needs.
                              </div>
                            </>
                          ),
                        },
                      ],
                    },
                  ]}
                />
              </BoxCardContent>
            ),
          },
          {
            title: `The JWT Signature`,
            content: (
              <BoxCardContent>
                <Notes
                  container={{ hideNote: true }}
                  notes={[
                    {
                      note: (
                        <Typography variant="subtitle1">
                          {` The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message hasn't been changed along the way. To create the signature, you take the Base64Url encoded header, the Base64Url encoded payload, a secret, and the algorithm specified in the header`}
                        </Typography>
                      ),
                      hideList: true,
                    },
                    {
                      hideList: true,
                      note: (
                        <div style={{ marginTop: '10px', width: '100%' }}>
                          <CodeBlock
                            formatType={'javascript'}
                            darkMode
                            text={`HMACSHA256(
                            base64UrlEncode(header) + "." +
                            base64UrlEncode(payload),
                            secret
                            )`}
                          />
                        </div>
                      ),
                    },
                    {
                      hideList: true,
                      note: (
                        <FlexWithGapBox>
                          <Typography variant={'subtitle1'}>
                            If the signatures match, the server can be confident that:
                          </Typography>
                          <ol>
                            <li>
                              The token was issued by a trusted entity that possesses the secret
                              key.
                            </li>
                            <li>
                              The header and payload of the token have not been tampered with since
                              it was signed.
                            </li>
                          </ol>
                        </FlexWithGapBox>
                      ),
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

JWTStructureAndClaims.displayName = 'JWTStructureAndClaims';

export default JWTStructureAndClaims;
