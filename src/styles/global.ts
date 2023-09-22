import { globalCss } from "@ignite-ui/react"

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        paddding: 0,
        boxSizing: 'border-box'
    },

    body: {
        backgroundColor: '$gray900',
        color: '$gray100',
        '-webkit-font-smooth': 'antialiased',
    }
})