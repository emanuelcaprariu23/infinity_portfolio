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
                            <span>
                              <b>Header: </b>{' '}
                              {`Contains metadata about the token, such as the type of token (JWT) and the signing algorithm used.`}
                            </span>
                          ),
                        },
                        {
                          note: (
                            <span>
                              <b>Payload:</b>{' '}
                              {`Contains the claims, which are statements about the user or entity.`}
                            </span>
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
