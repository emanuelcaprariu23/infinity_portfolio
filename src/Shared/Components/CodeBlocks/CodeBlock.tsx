import { MODE_COLOR, ModeColorType } from '@/Shared/interfaces';
import { BoxCardContent, SpaceBetweenRowBox } from '@/Shared/Utils/Helpers/styled-components';
import { theme } from '@/theme';
import { IconButton, Typography } from '@mui/material';
import { Check, Copy } from 'lucide-react';
import React, { JSX, PropsWithChildren, useEffect, useEffectEvent, useState } from 'react';
import { FORMATS_TYPE, FormatType } from './interfaces';

interface CodeBlockProps extends PropsWithChildren {
  text?: string;
  formatType?: FormatType;
  darkMode?: boolean;
}

interface FontColorT {
  backgroundColor: string | undefined;
  color: string;
}

const styles: Record<ModeColorType, { container: FontColorT; label: FontColorT }> = {
  dark: {
    container: {
      backgroundColor: theme.custom.specialPalette?.variant[600],
      color: theme.palette.primary.light,
    },
    label: {
      backgroundColor: theme.custom.specialPalette?.variant[500],
      color: theme.palette.info.contrastText,
    },
  },
  light: {
    container: {
      backgroundColor: theme.custom.specialPalette?.variant[300],
      color: theme.palette.action.active,
    },
    label: {
      backgroundColor: theme.custom.specialPalette?.variant[200],
      color: theme.palette.info.dark,
    },
  },
};

//for now just json format, update on demand
const CodeBlock: React.FC<CodeBlockProps> = ({
  text,
  formatType = FORMATS_TYPE.JSON,
  children,
  darkMode,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const formatted = text
    ? (JSON.parse(JSON.stringify(text)) as string).replaceAll(' ', '').replace('\n', '')
    : '';
  const jsonContent = formatted.replaceAll('{', '').replaceAll('}', '');

  const mode = darkMode ? MODE_COLOR.DARK : MODE_COLOR.LIGHT;
  const style = styles[mode];

  const { container, label } = style;

  const formatContent: Record<FormatType, { content: JSX.Element; textToCopy: string }> = {
    json: {
      content: (
        <>
          {`{`}
          <span style={{ paddingLeft: '10px' }}>{jsonContent}</span>
          {`}`}
        </>
      ),
      textToCopy: '{\n'.concat(jsonContent).concat(`}`),
    },
    javascript: {
      content: <span style={{ paddingLeft: '10px' }}>{jsonContent}</span>,
      textToCopy: jsonContent,
    },
  };

  const copyHandler = () => {
    const jsonFormatted = formatContent[formatType].textToCopy;
    if (!jsonContent) {
      return;
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      setIsCopied(true);
      navigator.clipboard.writeText(jsonFormatted).catch(() => {
        // ignore clipboard errors silently
      });
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = jsonFormatted;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setIsCopied(true);
  };

  const reset = useEffectEvent(async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setIsCopied(false);
        resolve(true);
      }, 3000);
    });
  });

  const content = (
    <>
      <SpaceBetweenRowBox
        sx={{
          ...label,
          paddingLeft: '10px',
          borderRadius: '10px',
          letterSpacing: '2px',
        }}
      >
        <Typography>{formatType}</Typography>
        <IconButton
          sx={{ width: '35px', height: '35px', marginRight: '5px', color: label.color }}
          onClick={copyHandler}
        >
          {isCopied ? <Check /> : <Copy />}
        </IconButton>
      </SpaceBetweenRowBox>
      <Typography
        component="pre"
        style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          padding: '10px 20px 20px',
          color: container.color,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {formatContent[formatType].content}
      </Typography>
    </>
  );

  const finalContent =
    children && children?.toString().length > 0 ? (
      <Typography
        component="span"
        sx={{ padding: '0 10px', display: 'inline-flex', flexDirection: 'row' }}
      >
        {children.toString()}
      </Typography>
    ) : (
      content
    );

  useEffect(() => {
    if (isCopied) reset();
  }, [isCopied]);

  return (
    <BoxCardContent
      sx={{
        border: `1px solid ${theme.custom.specialPalette?.variant[400]}`,
        borderRadius: '10px',
        boxShadow: theme.custom.boxShadows?.main,
        padding: '0',
        backgroundColor: container.backgroundColor,
        display: !text && children ? 'inline-flex' : 'block',
        width: !text ? 'fit-content' : '100%',
      }}
    >
      {finalContent}
    </BoxCardContent>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
