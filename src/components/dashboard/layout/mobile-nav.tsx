'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareUpRightIcon } from '@phosphor-icons/react/ArrowSquareUpRight';
import { CaretUpDownIcon } from '@phosphor-icons/react/CaretUpDown';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';

import { navItems } from './config';
import { navIcons } from './nav-icons';

interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

function MobileNav({ onClose, open }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Drawer
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'var(--mui-palette-neutral-950)',
          color: 'var(--mui-palette-common-white)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: 280,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
    >
      {/* Header */}
      <Stack
        spacing={2}
        sx={{
          p: 3,
        }}
      >
        <Box
          component={NextLink}
          href={paths.dashboard.overview}
          sx={{
            display: 'inline-flex',
          }}
        >
          <Logo
            color="light"
            height={32}
            width={122}
          />
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'var(--mui-palette-neutral-900)',
            border: '1px solid var(--mui-palette-neutral-700)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            p: 1.5,
          }}
          onClick={() => {}}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              color="var(--mui-palette-neutral-400)"
              variant="caption"
            >
              Model
            </Typography>
            <Typography
              color="inherit"
              variant="subtitle2"
            >
              Finance
            </Typography>
          </Box>
          <CaretUpDownIcon />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

      {/* Nav */}
      <Box
        component="nav"
        sx={{
          flex: '1 1 auto',
          p: 2,
        }}
      >
        {renderNavItems({
          pathname,
          items: navItems,
        })}
      </Box>

      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

      {/* Footer */}
      <Stack
        spacing={2}
        sx={{
          p: 2,
        }}
      >
        <div>
          <Typography
            color="var(--mui-palette-neutral-100)"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="var(--mui-palette-neutral-400)"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
        </div>
        <img
          alt="Devias Kit Pro"
          src="/assets/devias-kit-pro.png"
          style={{
            height: 'auto',
            width: 152,
          }}
        />
        <Button
          component="a"
          fullWidth
          href="https://devias.io/product/material-kit-pro"
          startIcon={
            <ArrowSquareUpRightIcon fontSize="small" />
          }
          target="_blank"
          variant="contained"
        >
          Pro Version
        </Button>
      </Stack>
    </Drawer>
  );
}

export { MobileNav };

function renderNavItems({
  items,
  pathname,
}: {
  items: NavItemConfig[] | undefined;
  pathname: string;
}): React.JSX.Element {
  return (
    <Stack
      component="ul"
      spacing={0.5}
      sx={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {items?.map((item) => {
const active = isNavItemActive({
  ...item,
  pathname
} as any);
const { items, icon, href, title, ...other } = item;
        const Icon = navIcons[icon as keyof typeof navIcons];

        return (
<li key={item.key || title}>
              <Box
                component={NextLink}
                href={href ?? '#'}
                sx={{
                  alignItems: 'center',
                  borderRadius: 1,
                  color: active
                    ? 'var(--mui-palette-primary-main)'
                    : 'var(--mui-palette-neutral-300)',
                  display: 'flex',
                  fontWeight: active ? 600 : 500,
                  p: 1.5,
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                  typography: 'subtitle2',
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-action-hover)',
                  },
                }}
              >
{Icon && (
                <Icon 
                  style={{
                    fontSize: 20,
                    marginLeft: -8,
                    marginRight: 16,
                  }} 
                  color={active ? 'primary' : 'action'}
                />
              )}
              <span>{title}</span>
            </Box>
{items && renderNavItems({
              items: items,
              pathname,
            })}
          </li>
        );
      })}
    </Stack>
  );
}

