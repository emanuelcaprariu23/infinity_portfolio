import MultipleDefContent from '@/Shared/Components/CodeBlocks/MultipleDefContent';
import Notes from '@/Shared/Components/Notes/Notes';
import { BoxCardContent, FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import { Typography } from '@mui/material';
import React from 'react';

const IntroductionToJWT: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <MultipleDefContent
        contents={[
          {
            title: `Introduction to JSON Web Tokens (JWT)`,
            content: (
              <BoxCardContent>
                <Typography variant="subtitle1">
                  {`They offer a stateless, secure, and scalable way to verify the identity of users and exchange information between parties`}
                </Typography>
                <Notes
                  notes={[
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="h5">Understanding JSON Web Tokens (JWT)</Typography>

                          <Typography variant="subtitle2" sx={{ padding: '0 20px' }}>
                            {' '}
                            Is a standard for creating data with optional signature and/or
                            encryption whose payload holds JSON that asserts a number of claims
                          </Typography>

                          <Typography variant="h5">Key Characteristics of JWTs</Typography>
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <span>
                              <b>Self-Contained: </b>{' '}
                              {`JWTs contain all the necessary information about the user or entity they represent. This information is encoded within the token itself, reducing the need to query a database for every request.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Stateless:</b>{' '}
                              {`JWTs are stateless, meaning the server does not need to maintain a session for each user. The token itself contains all the information needed to authenticate the user. This simplifies scaling and reduces server-side storage requirements`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Verifiable:</b>{' '}
                              {`JWTs can be digitally signed using a secret key or a public/private key pair. This signature ensures that the token has not been tampered with and that it was issued by a trusted source.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Compact:</b>{' '}
                              {`Browser extensions have broad access to the data on websites. A malicious extension could easily steal passwords stored in the browser.`}
                            </span>
                          ),
                        },
                      ],
                    },
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="h5">JWT Use Cases</Typography>
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <span>
                              <b>Authentication: </b>{' '}
                              {`JWTs contain all the necessary information about the user or entity they represent. This information is encoded within the token itself, reducing the need to query a database for every request.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Authorization:</b>{' '}
                              {`Once a user is authenticated, JWTs can be used to authorize access to specific resources. The token can contain information about the user's roles and permissions, which can be used to determine whether the user is allowed to access a particular resource`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Information Exchange:</b>{' '}
                              {`JWTs can be used to securely transmit information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn’t been tampered with`}
                            </span>
                          ),
                        },
                      ],
                    },
                    {
                      note: (
                        <FlexWithGapBox>
                          <Typography variant="h5">JWT Format</Typography>
                        </FlexWithGapBox>
                      ),
                      hideList: true,
                      orderedList: false,
                      subNotes: [
                        {
                          note: (
                            <FlexWithGapBox>
                              <span>
                                <b>Header: </b>{' '}
                                {`Contains metadata about the token, such as the type of token (JWT) and the signing algorithm used.`}
                              </span>
                              <Typography variant="h6">
                                The header typically consists of two parts:
                              </Typography>
                              <ul>
                                <li>the type of the token, which is JWT</li>
                                <li>
                                  the hashing algorithm being used, such as HMAC SHA256, RSA, or
                                  ECDSA
                                </li>
                              </ul>
                            </FlexWithGapBox>
                          ),
                        },
                        {
                          note: (
                            <FlexWithGapBox>
                              <span>
                                <b>Payload:</b>{' '}
                                {`Contains the claims, which are statements about the user or entity  and additional data.`}
                              </span>
                              <Typography variant="h6">There are three types of claims:</Typography>
                              <ul>
                                <li>registered</li>
                                <li>public</li>
                                <li>private </li>
                              </ul>
                              <Typography variant="h6">Types of Claims:</Typography>
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
                                        <Typography variant="h6">Registered Claims</Typography>
                                        <ul>
                                          <li>
                                            <b>iss</b> (Issuer): Identifies the entity that issued
                                            the JWT.
                                          </li>
                                          <li>
                                            <b>sub</b> (Subject): Identifies the subject of the JWT
                                            (e.g., the user ID).
                                          </li>
                                          <li>
                                            <b>aud</b> (Audience): Identifies the intended
                                            recipient(s) of the JWT.
                                          </li>
                                          <li>
                                            <b>exp</b> (Expiration Time): Identifies the time after
                                            which the JWT is no longer valid.
                                          </li>
                                          <li>
                                            <b>nbf</b> (Not Before): Identifies the time before
                                            which the JWT must not be accepted for processing.
                                          </li>
                                          <li>
                                            <b>iat</b> (Issued At): Identifies the time at which the
                                            JWT was issued.
                                          </li>
                                          <li>
                                            <b>jti</b> (JWT ID): A unique identifier for the JWT.
                                          </li>
                                        </ul>
                                      </FlexWithGapBox>
                                    ),
                                    hideList: true,
                                    orderedList: false,
                                  },
                                  {
                                    note: (
                                      <FlexWithGapBox>
                                        <Typography variant="h6">Public Claims</Typography>
                                        <Typography variant="subtitle2">
                                          These are claims that are defined in the IANA JSON Web
                                          Token Registry or are defined as a URI that contains a
                                          collision resistant namespace. These claims can be used by
                                          anyone
                                        </Typography>
                                        <Typography variant="subtitle2">
                                          {`Example: A company might define a public claim https://example.com/role to store user roles. This claim is publicly defined and can be used by anyone who understands the context of the claim`}
                                        </Typography>
                                      </FlexWithGapBox>
                                    ),
                                    hideList: true,
                                    orderedList: false,
                                  },
                                  {
                                    note: (
                                      <FlexWithGapBox>
                                        <Typography variant="h6">Private Claims</Typography>
                                        <Typography variant="subtitle2">
                                          {`These are custom claims that are defined by the application. They are used to store application-specific information.`}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                          {`Example: A task management application might use a private claim called team_id to store the ID of the team the user belongs to.`}
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
                        },
                        {
                          note: (
                            <FlexWithGapBox>
                              <span>
                                <b>Signature:</b>{' '}
                                {` Used to verify that the token has not been tampered with and that it was issued by a trusted source`}
                              </span>
                              <Typography variant="subtitle1">
                                {`
                              HMACSHA256(
                                base64UrlEncode(header) + "." +
                                base64UrlEncode(payload),
                                secret)
                              `}
                              </Typography>
                            </FlexWithGapBox>
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

IntroductionToJWT.displayName = 'IntroductionToJWT';

export default IntroductionToJWT;
