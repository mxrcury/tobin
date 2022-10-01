import styled from 'styled-components'

export const Wrapper = styled.div`
    background:${props=>props.bgColor};
    border:1px solid ${props=>props.bgColor === 'rgb(245, 245, 245)' ? 'rgb(173, 173, 173)' : 'rgb(36, 36, 36)'}
`