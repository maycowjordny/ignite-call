import { Box, styled, Text } from "@ignite-ui/react";

export const ProfileBox = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    },

})

export const FormAnnotecion = styled(Text, {
    color: '$gray200',
})