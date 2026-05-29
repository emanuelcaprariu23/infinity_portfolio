import MultipleDefContent from '@/Shared/Components/CodeBlocks/MultipleDefContent';
import Notes from '@/Shared/Components/Notes/Notes';
import React from 'react';

const IntroductionToJWT: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <MultipleDefContent
        contents={[
          {
            title: '',
            content: (
              <Notes
                notes={[
                  {
                    note: ``,
                    subNotes: [],
                  },
                ]}
                specialNotes
              />
            ),
          },
        ]}
      />
    </div>
  );
};

IntroductionToJWT.displayName = 'IntroductionToJWT';

export default IntroductionToJWT;
