import { BoxCardContent } from '@/Shared/Utils/Helpers/styled-components';
import { Theme } from '@emotion/react';
import { Typography } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import React from 'react';
import { NotesType } from './interfaces';

interface ContainerProps {
  parentSx?: SxProps<Theme>;
  hideNote?: boolean;
}
interface NotesProps {
  notes: NotesType;
  specialNotes?: boolean;
  container?: ContainerProps;
}

const specialNoteStyle = {
  border: '2px solid #2D6A4F',
  padding: '20px',
  backgroundColor: '#52B788',
  color: '#081C15',
} as SxProps<Theme>;

const defaultNoteStyle = {
  border: '1px solid #52B788',
  padding: '20px',
  backgroundColor: '#95D5B2',
  color: '#081C15',
} as SxProps<Theme>;

const Notes: React.FC<NotesProps> = ({ notes, specialNotes = false, container }) => {
  const { hideNote, parentSx } = container ?? {};

  const mergedSx = { ...(specialNotes ? specialNoteStyle : defaultNoteStyle), ...parentSx };

  return (
    <BoxCardContent sx={mergedSx}>
      {!hideNote && <h2>Note</h2>}
      {Array.isArray(notes) ? (
        notes.map((note, index) => (
          <ul key={index}>
            <li
              style={
                note.hideList
                  ? {
                      listStyle: 'none',
                    }
                  : undefined
              }
            >
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
              >
                {note.orderedList && <Typography variant="h6">{index + 1}.</Typography>}
                {typeof note === 'string' ? note : note.note}
              </div>
            </li>
            {note && typeof note !== 'string' && note.subNotes && (
              <BoxCardContent sx={{ paddingLeft: '20px', paddingTop: '10px' }}>
                <ul>
                  {note.subNotes.map((subNote, subIndex) => (
                    <li
                      key={`${index}-${subIndex}`}
                      style={
                        subNote.hideList
                          ? {
                              listStyle: 'none',
                            }
                          : undefined
                      }
                    >
                      {typeof subNote === 'string' ? subNote : subNote.note}
                    </li>
                  ))}
                </ul>
              </BoxCardContent>
            )}
          </ul>
        ))
      ) : (
        <>{notes}</>
      )}
    </BoxCardContent>
  );
};

Notes.displayName = 'Notes';

export default Notes;
