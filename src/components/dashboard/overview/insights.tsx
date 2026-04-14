'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { ArrowUpIcon } from '@phosphor-icons/react/ArrowUp';
import { CurrencyDollarIcon } from '@phosphor-icons/react/CurrencyDollar';

interface InsightsProps {
  highestCategory: string;
  highestAmount: number;
  monthlyComparison: string;
  sx?: SxProps;
}

export function Insights({ highestCategory, highestAmount, monthlyComparison, sx }: InsightsProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent sx={{ height: '100%' }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="overline">
              Insights
            </Typography>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: 32, width: 32 }}>
              <ArrowUpIcon fontSize="var(--icon-fontSize-sm)" />
            </Avatar>
          </Stack>
          <List dense>
            <ListItem sx={{ p: 0 }}>
              <ListItemAvatar sx={{ minWidth: 32 }}>
                <CurrencyDollarIcon color="warning" fontSize="var(--icon-fontSize-md)" />
              </ListItemAvatar>
              <ListItemText
                primary="Highest spending category"
                secondary={`${highestCategory}: $${highestAmount.toLocaleString()}`}
              />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemAvatar sx={{ minWidth: 32 }}>
                <ArrowUpIcon color="success" fontSize="var(--icon-fontSize-md)" />
              </ListItemAvatar>
              <ListItemText
                primary="Monthly expenses comparison"
                secondary={`Up ${monthlyComparison} from last month`}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}

