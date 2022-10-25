import { Anchor, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { BiHash } from 'react-icons/bi'

interface Props {
  variant: 'links' | 'projects'
  title: string
  href: any
  icon?: any
  style?: any
}

const SidebarLink = ({ title, href, icon, style, variant }: Props) => {
  return (
    <Link href={href} passHref>
      <Anchor
        p='xs'
        underline={false}
        sx={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '10px',
          gap: '8px',
          cursor: 'pointer',
          color: '#343a40',
          '&:hover': { backgroundColor: '#F5F7FB', color: '#562BF7' },
        }}>
        {icon ? icon : <BiHash />}
        <Text mt={variant === 'links' ? 4 : 0} color='gray.8'>
          {title}
        </Text>
      </Anchor>
    </Link>
  )
}

export default SidebarLink
